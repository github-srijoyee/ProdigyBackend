require("dotenv").config();
const mongoose=require('mongoose');
const express=require('express');
const cors=require("cors");
const app=express();
const authRoute=require("./router/auth-router");
const contactRoute=require("./router/contact-router");
const serviceRoute=require("./router/service-router")
//const router=require("./router/auth-router");
const adminRoute=require("./router/admin-router");
const connectDb=require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
const BASE_URL=process.env.BASE_URL;

//let's tackle cors
const corsOptions={
    origin:`${BASE_URL}`,
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
}
app.use(cors(corsOptions));

app.use(express.json());

/*const DB='mongodb+srv://srijoyee:j0yee@cluster0.y01buij.mongodb.net/?retryWrites=true&w=majority';
//Middleware
mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((error)=>{
    console.log(`no connection`,error);
})
const middleware=(req,res,next)=>{
    console.log(`Hello my middleware`);
    next();
}
*/
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);

//let's define admin route
app.use("/api/admin",adminRoute);

app.use(errorMiddleware);


    const PORT=5000;

    connectDb().then(()=>{
        app.listen(PORT,()=>{
            console.log(`server is running at port no ${PORT}`);
        });
    });
