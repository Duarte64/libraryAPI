import mongoose from "mongoose";
import 'dotenv/config';

const MONGODB_URL = process.env.MONGODB_URL ?? "";

mongoose.connect(MONGODB_URL);
const database = mongoose.connection;

export default database;