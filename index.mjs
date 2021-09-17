import cookieParser from 'cookie-parser';
import express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';

// import routes
import apiRoutes from './src/routes/api.mjs';

// insert your own local url here when testing
const TEST_LOCAL_FRONTEND_URL = ['http://localhost:3000', 'http://localhost:3001'];
const FRONTEND_URL = process.env.FRONTEND_URL || TEST_LOCAL_FRONTEND_URL;

// Initialise Express instance
const app = express();

// Set CORS headers
app.use(cors({
  credentials: true,
  origin: FRONTEND_URL,
}));

// Set the Express view engine to expect EJS templates
app.set('view engine', 'ejs');
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));

// Bind route definitions to the Express application
apiRoutes(app);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;

app.listen(PORT);
