const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoutes");
const adminRouter = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);


connectDB();

app.listen(PORT, () => {
    console.log(`The app is running on http://localhost:${PORT}`);
})