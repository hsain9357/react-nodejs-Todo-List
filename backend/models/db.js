// databases
import mongoose from "mongoose";
import {config} from 'dotenv'
config()

const connection = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.connect(process.env.URL_MONGOOSE);
connection.once("open", () => console.log("connected"));
connection.on("err", (err) => console.log({ mongoose_err_connection: err }));

const User = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 2,
    },
    last_name: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 2,
    },
    img: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      required: true,
      maxlength: 40,
      minlength: 6,
    },
    login_method: String,
  },
  { timestamps: true }
);
const user_schema = mongoose.model("users", User);
export { user_schema };
