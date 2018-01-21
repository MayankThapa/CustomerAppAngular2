const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var MONGOLAB_URI = 'mongodb://localhost/CustomerApp';
const customer = require('./server/routes/customer.controller.server')

// var dbSource = module.exports = mongoose();

// var entries = [ 
//   {
//     billNumber:'Data1',
//     billDate:'student',
//     tax:4355453,
//     Date_of_birth:new Date(1996,10,17)
// }
// ] // a huge array containing the entry objects

// var createNewEntries = function(db, entries, callback) {

//     // Get the collection and bulk api artefacts
//     var collection = db.collection('billing'),          
//         bulk = collection.initializeOrderedBulkOp(), // Initialize the Ordered Batch
//         counter = 0;    

//     // Execute the forEach method, triggers for each entry in the array
//     entries.forEach(function(obj) {         

//         bulk.insert(obj);           
//         counter++;

//         if (counter % 1000 == 0 ) {
//             // Execute the operation
//             bulk.execute(function(err, result) {  
//                 // re-initialise batch operation           
//                 bulk = collection.initializeOrderedBulkOp();
//                 callback();
//             });
//         }
//     });             

//     if (counter % 1000 != 0 ){
//         bulk.execute(function(err, result) {
//             // do something with result 
//             callback();             
//         }); 
//     } 
// };



//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(morgan('dev'));

//database configurarion
mongoose.connect(MONGOLAB_URI, function(err,response){
    if(err){
      console.log('falied to connect');
    }
    else {
      console.log('connected to db' +MONGOLAB_URI );
    //   createNewEntries(response, entries, function() {
    //     response.close();
    // });
    }
  })
  
//client side
app.use(express.static(path.join(__dirname, 'dist')));

//To handle api routes
app.use('/api',customer);

//server
app.listen(port,()=>{
    console.log(`server is running in ${port}`)
})