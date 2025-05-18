import db from './db.js';
import express from 'express';
import bodyParser from 'body-parser';
import memberRoutes from './routes/memberRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from "cors";
import session from 'express-session';


const app = express();
const PORT = 5000;

app.use(session({
  secret: 'your-secret-key',
  resave: true, 
  saveUninitialized: true, 
  cookie: {
    secure: false, // Change to true if using HTTPS
    httpOnly: true,
    sameSite: 'lax', 
  }
}));



//middleware 
app.use(bodyParser.json()); //for json file
app.use(express.urlencoded({ extended: true })); //for form data
app.use(cors({
  origin: 'http://localhost:5173', // My React port
  credentials: true // Required for sessions
}));

app.get("/api/checkSession", (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ valid: true, user: req.session.user });
  } else {
    res.status(401).json({ valid: false });
  }
});

app.post('/api/logout', (req, res) => {
  // Clear the session cookie
  res.clearCookie('session-token', { 
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production' // Use secure in production
  });
  
  // Or if you're using session store (like express-session)
  req.session.destroy(err => {
    if (err) {
      console.error('Session destruction error:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

//routes
app.use('/api/players',memberRoutes);
app.use('/uploads', express.static("uploads"));
app.use('/api/admin',adminRoutes);

//Start Server
app.listen(PORT, (err) => {
    if(err){ 
        throw err;
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
})