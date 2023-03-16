const express = require ("express");
const mongoose  = require ("mongoose");
const app = express();
const dotenv  = require ('dotenv');
const userRouter  = require ("./routes/user-routes.js");
const adminRouter  = require  ("./routes/admin-routes.js");
const movieRouter  = require  ("./routes/movies-routes.js");
const bookingRouter = require("./routes/booking-routes.js");
const cors=require('cors');
dotenv.config();
app.use(cors());
const PORT=4500;

//middleware routes
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/movies", movieRouter);
app.use("/booking",bookingRouter)

mongoose.connect(`mongodb+srv://Sahil-Gaikwad:${process.env.MONGODB_PASSWORD}@movie-booking.hkceyod.mongodb.net/${process.env.MONGODB_DATABASE}`
,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}
)
.then(() => 
    console.log("connected successfully")
)
.catch((e) => console.log(e));

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON ${PORT}`);
})