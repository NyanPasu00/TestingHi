require("dotenv").config();
const mongoose = require('mongoose');


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

 