const express = require('express');
const ConnectDB = require('./DB/DbInit')
require('dotenv').config()
const app= express();
const doctor=require('./app/routes/doctor');
const auth=require('./app/routes/auth')
const user=require('./app/routes/user')
const speciality=require('./app/routes/speciality')
const { invalideRouteHandler } = require('./app/utils/errorHandler');
const session = require("express-session");
const treatment = require('./app/routes/treatment');
const MongoDBSession= require("connect-mongodb-session")(session)
const cors = require("cors")

var corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions))

ConnectDB();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//
const store= new MongoDBSession({
    uri: process.env.URI_DB,
    collection: "Sessions"
})
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    store:store
}))

//____ROUTES_____//
app.get("/",(_req,res)=>{
    res.status(200).json({status:200,message:"Welcome to team-x-backend"})
})
app.use('/doctor',doctor)
app.use('/auth',auth)
app.use('/user',user)
app.use('/speciality',speciality)
app.use('/treatment',treatment)

app.all('*',invalideRouteHandler)
app.listen(process.env.PORT||8000 ,()=>{
    console.log("Server is running on port 8000")
})

