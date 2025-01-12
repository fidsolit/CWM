import mongoose, { Schema } from "mongoose";

const Userschema = new Schema(
  {
    Username: String,
    Password: String,
    role: String,
    ActiveStatus: String,
    IsAdmin: Boolean,
  },
  { timestamps: true }
);

const Users = mongoose.models.Users || mongoose.model("Users", Userschema);

export default Users;
