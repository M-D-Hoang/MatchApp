const asyncHandler = require('express-async-handler');

/**
 * Converts an address to coordinates
 */
exports.addressToCoordinates = asyncHandler(async (req, res) => {
  
  try {
    if(!process.env.LOCATION_SECRET){
      res.status = 500;
      res.json({
        content: 'Location Key Not Provided',
        status: 500,
      });
    }
    if(!req.params){
      throw new Error ('Empty address provided');
    }
    const resp = await fetch(`https://geocode.maps.co/`
    + `search?q=${req.params.address}&api_key=${process.env.LOCATION_SECRET}`);
    if(!resp.ok){
      throw new Error ('Empty address provided');
    }
    const json = await resp.json();
    return res.status(200).json(json.map((elem) => {
      return {
        id:elem.place_id,
        name:elem.display_name,
        coordinates:[elem.lat, elem.lon]
      };
    }));
  } catch (e) {
    res.status = 400;
    res.json({
      content: e.message,
      status: 400,
    });
  }
});
  