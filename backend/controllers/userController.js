import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//routes for user login
const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email})
        if(!user) {
          return  res.json({success:false,message:"either email or password is incorrect"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
           return res.json({success:"false",message:"either email or password is incorrect"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
};

//routes for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user alraedy exist" });
    }

    //validating email format & strong passowrd
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message: "Please enter a strong paswword",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    //generating tokens
    const token = createToken(user._id);
    res.json({ success: true, message: "user created succesfully" ,token});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})  
  }
};

//route for adminLogin
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { loginUser, registerUser, adminLogin };
