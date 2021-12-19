// This file's responsible of setting up and start the server 
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

// Config file of MongoDB connection
import './mongo';

// Iniatializing express
const app: Express = express();

// Logger
app.use(morgan('dev'));
// Parse request
app.use(express.urlencoded({ extended: false }));
// Accepts JSON data
app.use(express.json());

// Api routes
app.use('/api/posts', routes);

// Erroe handling
app.use((req,res,next) => { 
  const error = new Error('not found');
  return  res.status(404).json({
    message: error.message
  });
});

// Server
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => {
  console.log(`Server runing on: http://localhost:${PORT}`);
});