import mongoose from "mongoose";

let connection; 
export async function init(){
    if(connection){
        return connection;
    }
    try {
        connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("the db is connect");
        return connection;
        
    } catch (error) {
        throw new Error(error);
    }
}