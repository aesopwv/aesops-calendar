console.log(`Starting SQL test...`);

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'e#j"<x]T5H:(.MOZXs~Uzrg[}kyT[yMt',
    database : 'aesopsevents'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

// create a row in the database
// const record = {
//     event_year: 2025,
//     event_month: 11,
//     event_day: 11,
//     description: "Eat pizza!",
//     completed: 0
// };
// connection.query('INSERT INTO events_table SET ?', record,
//     function (error, results, fields) {
//         if (error) throw error;
//         console.log(results);
//     });

// create some test data in the database
// const records = [
//     {
//         event_year: 2025,
//         event_month: 11,
//         event_day: 11,
//         description: "Eat pizza!",
//         completed: 0
//     },
//     {
//         event_year: 2025,
//         event_month: 11,
//         event_day: 12,
//         description: "Go to the gym!",
//         completed: 0
//     },
//     {
//         event_year: 2025,
//         event_month: 11,
//         event_day: 13,
//         description: "Go to the park!",
//         completed: 0
//     },
//     {
//         event_year: 2025,
//         event_month: 11,
//         event_day: 13,
//         description: "Go to the beach!",
//         completed: 0
//     },
//     {
//         event_year: 2025,
//         event_month: 11,
//         event_day: 15,
//         description: "Go to the movies!",
//         completed: 0
//     },
//     {
//         event_year: 2025,
//         event_month: 11,
//         event_day: 16,
//         description: "Go to the zoo!",
//         completed: 0
//     },
//     {
//         event_year: 2025,
//         event_month: 11,
//         event_day: 17,
//         description: "Go to the museum!",
//         completed: 0
//     },
//     {
//         event_year: 2025,
//         event_month: 11,
//         event_day: 18,
//         description: "Go to the library!",
//         completed: 0
//     }
// ];
// const values = records.map(obj => [obj.event_year, obj.event_month, obj.event_day, obj.description, obj.completed]);
// const columns = ['event_year', 'event_month', 'event_day', 'description', 'completed'];
// const sql = `INSERT INTO events_table (${columns.join(', ')}) VALUES ?`;
// connection.query(sql, [values],
//     function (error, results, fields) {
//         if (error) throw error;
//         console.log(results);
//     });

// // create row in the database for user stuff
// const records = [{
//     username: "John",
//     user_email: "johndoe@gmail.com",
//     user_password: "password123"
//     },
//     {
//     username: "Jane",
//     user_email: "janedoe@gmail.com",
//     user_password: "password456"
//     },
//     {
//     username: "Bob",
//     user_email: "bobjohnson@gmail.com",
//     user_password: "password789"
//     },
//     {
//     username: "Alice",
//     user_email: "alicesmith@gmail.com",
//     user_password: "passwordabc"
//     },
//     {
//     username: "Charlie",
//     user_email: "charliejeffrey@gmail.com",
//     user_password: "passworddef"
//     }]; 
// const values = records.map(obj => [obj.username, obj.user_email, obj.user_password]);
// const columns = ['username', 'user_email', 'user_password'];
// const sql = `INSERT INTO user_table (${columns.join(', ')}) VALUES ?`;
// connection.query(sql, [values],
//     function (error, results, fields) {
//         if (error) throw error;
//         console.log(results);
//     });

// select all of the rows from the database and print them out
// connection.query('SELECT * FROM `events_table`',
//     function (error, results, fields) {
//         // error will be an Error if one occurred during the query
//         // results will contain the results of the query
//         // fields will contain information about the returned results fields (if any)
//         console.log(results);
//     });

// select all of the events for a particular day
// function getDataForSpecificDate(pYear, pMonth, pDay)
// {
//     connection.query(`SELECT * FROM events_table WHERE event_year = ${pYear} AND event_month = ${pMonth} AND event_day = ${pDay}`,
//         function (error, results, fields) {
//             // error will be an Error if one occurred during the query
//             // results will contain the results of the query
//             // fields will contain information about the returned results fields (if any)
//             console.log(results);
//         });
// }
// getDataForSpecificDate(2025, 11, 12);
// getDataForSpecificDate(2025, 11, 11);

// update a specific record


connection.end();

console.log(`SQL test complete!`);