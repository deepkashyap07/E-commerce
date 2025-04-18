import mongoose from "mongoose";

const connectDb = async () => {
    mongoose.connection.on("connected",()=>console.log("connected to database"));
    await mongoose.connect(process.env.MONGODB_URI+ "/E-Commerce-Forever");
}

export default connectDb;