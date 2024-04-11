# Performance Report

## Server-Side Caching
To improve loading time of the app, server-side caching can be helpful, as it reduces the API response time significantly.

FMP's API sends requests to MongoDB to retrieve information about listings. Some of the response JSONs can get quite long, such as getAllListings, and others are shorter, like getListingsByID. But most importantly, every DB request sent adds to the overall latency. 

This is bad for user experience, so we should try to minimise the nubmer of times we hit the DB and try to cache DB responses.

Many Node libraries exist to help accomplish this task. Some of the advanced libraries manage the DB connection and/or use redis to manage in-memory cache. After doing research on the topic, we came to a conclusion that the simplest caching library like memory-cache would be enough for our project, as other solutions require much more complex setup.

The problem that we encountered when integrating server-side caching was invalidating cache. Due to the nature of our project, we have a lot of data related to listings that changes very frequently in the DB, especially if we have many users accessing our website at the same time. We needed to find a way to invalidate specific cache entries to make sure that users always see the correct info in the app.

To do so, we wrote code to erase cache entries whenever the edit or remove function is called. Theoretically, this should've solved the problem, but in practise, after we've deployed the update, we still had the issue where the user was presented with stale data after updating a listing.

Unfortunately, too little time was dedicated to testing this feature in production-like environment, and due to the time constraints, we decided to drop the feature for our final submission.

If we were to have a fourth sprint, we could fix any problems with caching, as most of the code is already there, and only the invalidating part should be investigated. For this feature specifically, I think a second deployment could be very helpful.

## Client-Side Caching

Client-side caching helps reduce the number of API requests that the user's browser makes when using the app. This can reduce load time and save network usage, which is especially great for users on mobile and/or with limited internet plans.

Similar to the issue described before, we need to ensure that the client sends a request if any data in the DB has changed instead of using cache. This becomes more challenging on the front end, as the way browser cache get invalidated is by its age.

In our case, we can safely set cache headers in our server to a longer max-age for static content. However, we need to fine-tune the cache headers for API responses in functions like getListings, where reponse data can change very often.

It is possible to have a setup where if a client has some cached data, it will still send a request to the server to check if the data has changed, and if it hasn't, then cached value will be used.

Due to the time constraints, we decided to drop the feature. If we were to have a fourth sprint, this feature wouldn't require a lot of new code, since all we have to do is to add a line similar to this in different part of the server code:

```res.set('Cache-control', 'public, max-age=31536000');```

However, thorough testing would be necessary to ensure the proper functioning, as our front end code has gotten quite complex by the end of sprint 3.

A good article on the topic for potential future development:
https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers

## Server-Side Image Compression

Compressing images on the backend is a great way to save network usage and to reduce the blob storage usage. Our webapp relies heavily on images submitted by users, and it is important to ensure that the file size is reasonable for fast loading time and overall healthy server performance.

We decided to use sharp as the library that does image resizing and encoding in webp format. We chose webp specifically because it is the next-gen web image format that outperforms jpeg, png and gif in terms of file size. It is improtant to note that this format is new and is not supported by older browsers, but we decided that we're okay with the sacrifice.

A middleware has been implemented that resizes images to a max of 1000px and applies compression (80% quality setting with nearLossless compression algorithm - which was found to be a reasonable config for our application) as a part of image upload. This means that every time the user creates a new listing or edits one and uploads images, the original files will be processed and only the compressed version is sent to the blob storage.

This comes with some disadvantages, as the compression process can take some time. We discovered that the deployment server can actually be visibily slow if user submits large images in higher resolutions. A simple solution to that could be a max size requirement on the front end form and on the backend controller.

The advantages of this middleware are mostly visible with larger images, and as an example an 8 MB picture is compressed down to about 1.5 MB. It performs a bit worse with small pictures (<1 MB), but since a typical user will be taking pictures of items to sell with their phones, it is expected that compression will be advantageous in most scenarios.

If we were to have a fourth sprint, we could try to figure out if we can improve the compression time by changing sharp config or any Azure setting, but this would be a lower priority task.
