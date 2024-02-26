import express from 'express';
export const app = express();
//Middleware imports
import helloRouter from './routes/api.js';

//const helloRouter = require('./routes/helloworld.js');

app.use(express.json());

//at url /api/helloworld
app.use('/api', helloRouter);

app.use('/', express.static('../client/build/'));


//Custom 404 if no URLs found
app.use((req, res) => {
  res.status(404).json({content:'Page not found', status:404});
});



export default app;
