import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB got connected"))
    .catch((error) => {
      console.log("DB connection issues");
      console.log(error);
      process.exit(1);
    });
};

export default connectWithDb;
