import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to the database successfully");

    }catch(err){
        console.log("Error in connecting to the database",err);
        process.exit(1);
    }
}