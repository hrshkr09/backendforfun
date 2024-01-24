import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // to make this searchable
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true, // to make this searchable
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId, //to pass the reference of video model
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"], // to also pass the message we write like this
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } //study about this
);

//This is to encrypt password before getting saved
//pre middleware is part of mongoose
//Study more about this
userSchema.pre("save", async function (next) {
  //to check whether the password is modified or not, if yes then this will execute
  if (!this.isModified("password")) return next();
  //otherwise this will execute
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//This is a custom method for checking if a provided password is correct. It takes a password as an argument.
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccesToken = async function () {
  await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.refreshAccesToken = async function () {
    await jwt.sign(
        {
          _id: this._id,
         
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
      );
};

export const User = mongoose.model("User", userSchema);
