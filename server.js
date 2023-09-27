import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from 'path';

//condigure env-- to use env file in our code.
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

//Routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//REST
// app.get('/' , (req , res)=>{
//     console.log("running");
//     res.send("<h1>Welcome to ecommerce</h1>")
// })

app.use('*',function(req, res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})


const PORT = process.env.PORT || 8080;
//run listen
app.listen(PORT, ()=>{
    console.log(`server running on ${process.env.DEV_MODE} in port ${PORT}`.bgCyan.white);
})