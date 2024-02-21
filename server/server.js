import express from 'express';
export const app = express();
//Middleware imports
import helloRouter from './routes/helloworld.js';
import listingsRouter from './routes/listings.js';

app.use(express.json());

//for testing only, we will remove it eventually
app.use('/test-api', helloRouter);

app.use('/api/listings', listingsRouter);

app.use('/', express.static('../client/build/'));

//Custom 404 if no URLs found
app.use((req, res) => {
  res.status(404).json({content:'Page not found', status:404});
});

export default app;
