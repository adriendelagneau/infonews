import mongoose from "mongoose";

const connect = async () => {
 // mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected')
  } catch (error) {
    console.log(err)

    throw new Error("Connection failed!");
  }
};

export default connect;