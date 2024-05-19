/**
 * Database Configuration File
 *  @author Sanket Agrawal
 */

import mongoose from 'mongoose'
import config from './config.js';

const mongoUri = config.MONGO_URI;

const connectDatabase = async () => {
    try{
        const conn = await mongoose.connect(mongoUri);

        console.log(`Connected to MongoDB : ${conn.connection.host}`)
    }catch(error){
        console.error('Failed to connect to MongoDB: ',error)
 }
}

export{
    connectDatabase
}
