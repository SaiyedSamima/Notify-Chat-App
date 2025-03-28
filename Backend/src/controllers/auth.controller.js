import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        // console.log("Received signup data:", req.body);
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("signup error", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async (req, res) => {

   const {email, password} = req.body;

   try {
   
    const user = await User.findOne({email})
    const token = generateToken(user._id,res);
    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if(!isPassword){
        return res.status(400).json({message:"Incuorrect Password"})
    }

    // generateToken(user._id);

    res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic,
        token: token
    });


   } catch (error) {
    console.log("login error", error.message);
    res.status(500).json({ message: "Something went wrong" });
   }
};

export const logout = (req, res) => {
    
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("logout error", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// export const updateProfile = async (req, res) => {
// try {
//     const {profilePic} = req.body;
//     const userId = req.user._id;

    
//     console.log("Received update profile data:", req.body); 
    
//     if(!profilePic){
//         return res.status(400).json({message:"Profile picture is required"});
//     }
//     const uploadResponce =  await cloudinary.uploader.upload(profilePic);

//     const updatedUser = await User.findByIdAndUpdate
//     (userId, {profilePic: uploadResponce.secure_url}, {new:true});
    
//     res.status(200).json(updatedUser)

// } catch (error) {
//     console.log("updateProfile error", error.message);
//     res.status(500).json({ message: "Something went wrong" });
// }
// };

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("updateProfile error", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("checkAuth error", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};