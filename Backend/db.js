import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'snooker_management_system'
});

db.connect(err=>{
    if(err) {
        console.error('Error Connecting to MySQl: ' , err.message);
        return;
    }
    console.log('Connected to MySQL database');
});

export default db;
