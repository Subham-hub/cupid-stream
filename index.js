import "dotenv/config";
import cloudinary from "cloudinary";

import httpServer from "./app.js";
import dbConnect from "./backend/config/connectMongo.js";

const {
  PORT,
  CLOUDINARY_NAME: cloud_name,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINARY_API_SECRET: api_secret,
} = process.env;

dbConnect();
cloudinary.config({ cloud_name, api_key, api_secret });

httpServer.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server is up at ${PORT}`);
});
