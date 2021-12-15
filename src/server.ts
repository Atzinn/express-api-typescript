// This file's responsible of setting up and start the server 
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

// Iniatializing express
const app: Express = express();

// Logger
app.use(morgan('dev'));
// Parse request
app.use(express.urlencoded({ extended: false }));
// Accepts JSON data
app.use(express.json());


// Rules for API (CORS)
app.use((req,res,next) => {
  // set cors policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the cors header
  res.header('Access-Control-Allow-Origin', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the cors method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/', routes);

// Erroe handling
app.use((req,res,next) => { 
  const error = new Error('not found');
  return  res.status(404).json({
    message: error.message
  });
})

// Server
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => {
  console.log(`Server runing on: http://localhost:${PORT}`);
})