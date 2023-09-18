import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery' , true);
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbname: "demo",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // thier use is https://stackoverflow.com/questions/65158360/what-does-usenewurlparser-and-usercreateindex-in-mongoose-connect-do
        })
        isConnected = true;
        console.log('MongoDB is connected');
    } catch (error) {
        console.log("MongoDB connection NOT successful" + error); 
    }
}