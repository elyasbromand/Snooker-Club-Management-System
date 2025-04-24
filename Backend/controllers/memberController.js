import db from "../db.js";

export const createMember = (req,res) => {
    console.log(req.body);

    const {fullName, userName, password, phone, address} = req.body;

    if (!fullName ||!userName || !password || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required' })
      }

    const sql = "INSERT INTO players (FullName, Password, Phone, UserName, Address) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [fullName,  password, phone, userName, address], (err, result) => {
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({message: 'Player Created', id: result.insertId});
    });
};