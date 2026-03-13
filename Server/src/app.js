import express from "express";
import cors from "cors";


import router from './routes/index.js';


const app = express()


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//Health check route
app.get('/',(req, res) => {
    res.status(200).json({
        success: false,
        message: 'Vehiqle API is running'
    })
})

app.use('/api', router);

export default app;