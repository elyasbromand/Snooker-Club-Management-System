import db from './db.js';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import cors from "cors";

const app = express();
const PORT = 5000;

//middleware 
app.use(bodyParser.json()); //for json file
app.use(express.urlencoded({ extended: true })); //for form data
app.use(cors());

//routes
app.use('/api/users',userRoutes);
app.use('/api/players',memberRoutes);

//Start Server
app.listen(PORT, (err) => {
    if(err){ 
        throw err;
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
})