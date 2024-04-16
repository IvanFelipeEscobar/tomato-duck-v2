import mongoose from 'mongoose'
import 'dotenv/config'
mongoose.connect(
     process.env.MONGODB_URI    || 
    'mongodb://127.0.0.1:27017/tomatoduck-v2'  
)
export const db = mongoose.connection;
db.on('error', console.error.bind(console, ' ~ Error connecting to Mongo DB ~ '))
