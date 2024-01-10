require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();

const uri = process.env.MONGO_URI;


async function connect() {
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error(error);
    }
}

connect();

app.use(express.json()); // Middleware to parse JSON bodies

async function insertCustomer(req, response) {
    try {
      const { name, email /* and other fields from body */ } = req.body;
    
      
      const Customer = mongoose.model('123customer', {
        name : String,
        email : String,
      });
      const newCustomer = new Customer({ name, email  });
  
      // Save the new customer data to the database using Mongoose's save() method
      const result = await newCustomer.save();
  
      response.status(201).json(result); // Send a success response
    } catch (error) {
      response.status(500).json({ error: error.message }); // Send an error response
    }
}

app.post("/insert",insertCustomer);



app.listen(8000, () => {
    console.log("Running In Port 8001");
}); 
  

 