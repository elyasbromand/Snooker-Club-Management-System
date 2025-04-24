import db from '../db.js';
import bodyParser from 'body-parser';

//get all users
export const getAllUsers = (req,res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if(err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
};

//create user
export const createUser = (req,res) => {
    const {name, email} = req.body;
    // const name = req.body["name"];
    // const email = req.body["email"];
    // console.log(req.body);
    //simple validation
    if(!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    const sql = 'INSERT INTO users (name , email) VALUES (?,?)';
    db.query(sql, [name, email], (err, result) => {
        if(err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({
            message: 'User created successfully',
            userId: result.insertId
        });
    });

};

//update user
export const updateUser = (req,res) =>{
    const {id} = req.params;
    const {name,email} = req.body;

    //simple validation
    if(!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if(err) {
            console.error('Update error:', err);
            return res.status(500).json({ error: 'Database error' });  
        }
        if(result.affectedRows === 0) {
            return res.status(404).json({error: 'Database error'});
        }
        res.status(200).json({message: 'User updated successfully'});
    });
};

//delete user
export const deleteUser = (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        console.log(result);
        if(err) {
            console.error('Delete error:', err);
            return res.status(500).json({ error: 'Database error' });   
        }

        if(result.affectedRows === 0) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({message: 'User deleted successfully'});
    });
};
