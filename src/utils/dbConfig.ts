import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect("mongodb+srv://user:1234@cluster0.dvmvmpu.mongodb.net/?retryWrites=true&w=majority");

export default connectMongo;