import mongoose from "mongoose";
import { Listing } from "../models/listing.model.js";
import data from "./data.js";

const initDatabase  =  async () => {
    await  Listing.deleteMany({})
    console.log("deleted database");
    await Listing.insertMany(data)
    console.log("database initializ");
    
}
const connectDb  = async () => {
        main()
        .then(() => console.log("connected to db"))
        .catch(err => console.log(err));

        async function main() {
        await mongoose.connect(`${process.env.MDB_URL}/${process.env.MDB_NAME}`);
        }

        // initDatabase()
}

export default connectDb