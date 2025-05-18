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
  secret: 'no-secret-key-for-now',
  resave: true, 
  saveUninitialized: true, 
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax', 
  }
}));



//middleware 
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.get("/api/checkSession", (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ valid: true, user: req.session.user });
  } else {
    res.status(401).json({ valid: false });
  }
});

app.post('/api/logout', (req, res) => {
  
  res.clearCookie('session-token', { 
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production' 
  });
  
  
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

app.listen(PORT, (err) => {
    if(err){ 
        throw err;
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
})
