import mongoose from 'mongoose'
mongoose.connect(
    'mongodb://127.0.0.1:27017/tomatoduck-v2' ,
    // || MONGODB_URI    to do: MONGODB_URI: add from atalas config
)
export const db = mongoose.connection;
db.on('error', console.error.bind(console, ' ~ Error connecting to Mongo DB ~ '))
