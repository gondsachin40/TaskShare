import mongoose, { mongo } from 'mongoose';
const { Schema } = mongoose;
import * as dotenv from 'dotenv';
dotenv.config();
const url = process.env.URL;
async function main() {
    await mongoose.connect(url);
    console.log('database connected');
}
export default main;
