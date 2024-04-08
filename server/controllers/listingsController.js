const asyncHandler = require('express-async-handler');
const DB = require('../db/db.js');
const db = new DB();
const cache = require('memory-cache');
// const hash = require('object-hash');

exports.postItem = asyncHandler(async (req, res, next) => {
  const formObj = req.body;
  try {
    // imageURIs empty, imageUploader will update the field next
    formObj.imageURIs = [''];
    formObj.ownerID = req.session.username;
    //coordinates gets sent as a string for some reason so
    //we turn it into an array with split
    formObj.coordinates = formObj.coordinates.split(',');
    formObj.objectType = 'item';
    formObj.date = new Date(Date.now()).toLocaleString();
    // Add the listing to the DB
    res.locals.listing = await db.createListing(formObj);
    // invalidate cache
    cache.put(`items-by-user/${req.session.username}`, null);
    cache.put('items', null);
    // pass request to the next middleware (image uploader)
    next();
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,
    });
  }
});

exports.postCar = asyncHandler(async (req, res, next) => {
  const formObj = req.body;
  try {
    // imageURIs empty, imageUploader will update the field next
    formObj.imageURIs = [''];
    formObj.ownerID = req.session.username;
    //coordinates gets sent as a string for some reason so
    //we turn it into an array with split
    formObj.coordinates = formObj.coordinates.split(',');
    formObj.objectType = 'cars';
    formObj.date = new Date(Date.now()).toLocaleString();
    // Add the listing to the DB
    res.locals.listing = await db.createCarListing(formObj);
    // invalidate cache
    cache.put('cars', null);
    // pass request to the next middleware (image uploader)
    next();
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,
    });
  }
});

exports.deleteItem = asyncHandler(async (req, res) => {
  //Needs to check if user is the owner of the item
  const itemID = req.body._id;
  try {
    await db.removeListingByID(itemID);
    // invalidate cache
    cache.put(`item/${itemID.toString()}`, null);
    cache.put(`items-by-user/${req.body.ownerID}`, null);
    cache.put('items', null);
    return res.status(204).json('Item Deleted');
  } catch (e) {
    res.status(400).json({
      content: e.message,
      status: 400,
    });
  }
});

exports.deleteCar = asyncHandler(async (req, res) => {
  //Needs to check if user is the owner of the item
  const itemID = req.body._id;
  try {
    await db.removeCarByID(itemID);
    // invalidate cache
    cache.put(`car/${itemID.toString()}`, null);
    cache.put(`items-by-user/${req.body.ownerID}`, null);
    cache.put('cars', null);
    return res.status(204).json('Item Deleted');
  } catch (e) {
    res.status(400).json({
      content: e.message,
      status: 400,
    });
  }
});

exports.editCar = asyncHandler(async (req, res, next) => {
  const carObj = req.body;
  try {
    //coordinates gets sent as a string for some reason so
    //we turn it into an array with split
    carObj.coordinates = carObj.coordinates.split(',');
    res.locals.listing = await db.updateCarListing(carObj);
    // update cache
    cache.put(`car/${res.locals.listing._id.toString()}`, res.locals.listing);
    // pass request down to image controller
    if (req.files) {
      next();
    } else {
      return res.status(201).send({ status: 201, id: carObj.id });
    }
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,
    });
  }
});

exports.editItem = asyncHandler(async (req, res, next) => {
  const ItemObj = req.body;
  try {
    //coordinates gets sent as a string for some reason so
    //we turn it into an array with split
    ItemObj.coordinates = ItemObj.coordinates.split(',');
    res.locals.listing = await db.updateItemListing(ItemObj);
    // update cache
    cache.put(`item/${res.locals.listing._id.toString()}`, res.locals.listing);
    // invalidate cache
    cache.put(`items-by-user/${res.locals.listing.ownerID}`, null);
    // pass request down to image controller
    if (req.files) {
      next();
    } else {
      return res.status(201).send({ status: 201, id: ItemObj.id });
    }
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,
    });
  }
});

exports.getSingleItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let listing = cache.get(`item/${id}`);
  try {
    if (!listing) {
      listing = await db.readOneItem(id);
      cache.put(`item/${id}`, listing);
    }
    res.status(200).json(listing);
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

exports.getSingleCar = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let carListing = cache.get(`car/${id}`);
  try {
    if (!carListing) {
      carListing = await db.readOneCar(id);
      cache.put(`car/${id}`, carListing);
    }
    res.status(200).json(carListing);
  } catch {
    res.status(500).send('Internal DB error. Could not read car listings');
  }
});

exports.getItemsFiltered = asyncHandler(async (req, res) => {
  try {
    const {
      keyword,
      condition,
      extraField,
      category,
      minPrice,
      maxPrice,
      page,
      sortField,
      sortOrder,
    } = req.query;

    const filter = {};

    if (keyword) {
      //contains title
      filter.title = { $regex: keyword, $options: 'i' };
    }

    if (condition) {
      filter.condition = condition;
    }
    if (extraField) {
      filter.extraField = extraField;
    }
    if (category) {
      filter.category = category;
    }
    if (minPrice) {
      filter.price = { $gte: minPrice };
    }
    if (maxPrice) {
      filter.price = { $lte: maxPrice };
    }

    // COMPRESSION STUFF
    /*let items = [];
    items.push(cache.get('items'));

    // add items hash to be able to invalidate cache
    console.log('now');
    console.log(items);

    // TODO: try to just put items in filter obj
    filter.items = hash(Array.from(items));

    // hash filter object
    let params = hash(filter);
    params += page ? `/${page}` : '';
    params += sortField ? `/${sortField}` : '';
    params += sortOrder ? `-${sortOrder}` : '';
    // try to get an entry with the same hash (same filters) in cache
    let listings = cache.get(`items/${params}`);
    if (!listings) {
      listings = await db.readAllFilteredListings(
        filter,
        page,
        sortField,
        sortOrder
      );
      // params account for filters by user and items currently in db
      // shall the filters or items in db change for next request, a new cache entry will be saved
      // cache for 5 mins because this cache is never cleared otherwise
      cache.put(`items/${params}`, listings, 300000);
    } else {
      console.log('got cache for ur specific filters: ITEM');
    }*/

    // query DB without compression
    const listings = await db.readAllFilteredListings(
      filter,
      page,
      sortField,
      sortOrder
    );
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

exports.getCarsFiltered = asyncHandler(async (req, res) => {
  try {
    const {
      condition,
      make,
      model,
      bodyType,
      transmission,
      driveTrain,
      page,
      sortField,
      sortOrder,
    } = req.query;

    const filter = {};
    if (condition) {
      filter.condition = condition;
    }
    if (make) {
      filter.make = make;
    }
    if (model) {
      filter.model = model;
    }
    if (bodyType) {
      filter.bodyType = bodyType;
    }
    if (transmission) {
      filter.transmission = transmission;
    }
    if (driveTrain) {
      filter.driveTrain = driveTrain;
    }

    // COMPRESSION STUFF
    /*
    // add cars hash to be able to invalidate cache
    filter.hash = hash(cache.get('cars'));

    // hash filter object
    let params = hash(filter);
    params += page ? `/${page}` : '';
    params += sortField ? `/${sortField}` : '';
    params += sortOrder ? `-${sortOrder}` : '';
    // try to get an entry with the same hash (same filters) in cache
    let carListings = cache.get(`cars/${params}`);
    if (!carListings) {
      carListings = await db.readAllFilteredCarListings(
        filter,
        page,
        sortField,
        sortOrder
      );
      // params account for filters by user and cars currently in db
      // shall the filters or cars in db change for next request, a new cache entry will be saved
      // cache for 5 mins because this cache is never cleared otherwise
      cache.put(`cars/${params}`, carListings, 300000);
    } else {
      console.log('got cache for ur specific filters: CAR');
    }*/

    // query DB without compression
    const carListings = await db.readAllFilteredCarListings(
      filter,
      page,
      sortField,
      sortOrder
    );
    res.status(200).json(carListings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal DB error. Could not read car listings');
  }
});

exports.getUserItems = asyncHandler(async (req, res) => {
  const username = req.params.username;
  try {
    let listings = cache.get(`items-by-user/${username}`);
    if (!listings) {
      listings = await db.getItemsFromUser(username);
      cache.put(`items-by-user/${username}`, listings);
    }
    res.status(200).json(listings);
  } catch {
    res.status(500).send('Internal DB error. Could not read listings');
  }
});

exports.getAll = asyncHandler(async (req, res) => {
  try {
    // try to get items from cache
    let listings = cache.get('items');
    if (!listings) {
      listings = await db.readAllListings();
      cache.put('items', listings);
    }
    // try to get cars from cache
    let carListings = cache.get('cars');
    if (!carListings) {
      carListings = await db.readAllCarListings();
      cache.put('cars', carListings);
    }
    // combine items with cars
    const combined = listings.concat(carListings);
    // send all listings
    res.status(200).json(combined);
  } catch {
    res.status(500).send('Internal DB error. Could not read all listings');
  }
});
