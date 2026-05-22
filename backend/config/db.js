import mongoose, { trusted } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect( "mongodb://127.0.0.1:27017/horizonHostel");

        console.log("mongoDB connected");
    } catch(err) {
        console.log(err);   
    }
};
export default connectDB;