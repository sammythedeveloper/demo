// import the express module
const express = require('express');

// create an instance of the express server
const app = express();
// import the mysql module
const mysql = require('mysql2');

// Define the connection parameters for the database
const dbConfig = {
    connectionLimit: 10,
    password: "1234",
    user: "demoapp",
    host: "127.0.0.1",
    database:"demoapp"
}

// Create the connection to the database 
const connection = mysql.createConnection(dbConfig);
// Connect to the database 
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
// Use the express.json() middleware to parse the request body 
app.use(express.json());
// Create a simple get request handler to send a response back  
app.get('/', (req, res) => {
  res.send('Testing!');
});

// Allow CORS to all
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization'
  );
  next();
  });


//Post request handler to add a new employee to the database

app.post("/add-employee", (req, res) => {

// write the sql query to add to the database table employee_test
const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;
  // Execute the query 
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  // Send a response back to the client 
  const response = {
    status: 'success',
    message: 'Employee added succesfully',
  };
  res.status(200).json(response);
});

// post request handler to login an employee which come to this route/login
app.post('/login', (req, res) => {
    console.log(req.body);
     // Write the sql query to retrieve the employee with the email and password provided by the user and compare it with the data in the database 
const sql = `SELECT * FROM employee_test WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
      // Execute the query
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    // Check if the result is empty or not 
    if (result.length > 0) {
      // Send a response back to the client 
      const response = {
        status: 'success',
        message: 'Login successful',
      };
      res.status(200).json(response);
    } else {
      // Send a response back to the client 
      const response = {
        status: 'failure',
        message: 'Login failed',
      };
      res.status(200).json(response);
    }
  });
})



























// set up the port to listen to
const port = 3001;
// Set up the listener code
app.listen(port, () => console.log(`Listening on ${port}`));







// // create a simple get request handler to send a response back

// app.get('/', (req, res) => {
//     res.send('Testing!')
// })
// // Use the express.json() middleware to parse the request body 
// // as JSON and store it in req.body
// app.use(express.json());

// // post request handler to add a new employee to the databas
// app.post("/add-employee",(req, res) =>{
//     console.log((req.body));

//  
// 
// });
    














