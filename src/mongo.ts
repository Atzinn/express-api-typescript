import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/posts");

const conn = mongoose.connection;

conn.once('open', () => {
  console.log("DB is connected");
})

const handleError = (err: Error) => {
  console.error(err);
  mongoose.disconnect();
  process.exit(0);
}

conn.on('error', handleError)

conn.on('uncaughtException', handleError)