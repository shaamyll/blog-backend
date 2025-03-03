//mongoose is used to connect node and mongodb => npm i mongoose
const mongoose = require('mongoose')

const connectionString = process.env.connectionString

mongoose.connect(connectionString).then(res=>{
    console.log("BlogServer is connected to DB");
    serverSelectionTimeoutMS: 5000 
    
})
.catch(err=>{
    console.log("error"+err);
    
})