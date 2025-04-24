import mysql from 'mysql2';

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'snooker_management_system'
});

//Connect to MySQL
db.connect(err=>{
    if(err) {
        console.error('Error Connecting to MySQl: ' , err.message);
        return;
    }
    console.log('Connected to MySQL database');
});

export default db;