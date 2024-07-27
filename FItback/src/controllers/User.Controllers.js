import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// import jwt from "jsonwebtoken";
           


//generate acces om referes token
const generateAccessAndRefereshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating referesh and access token"
      );
    }
  };




  //user registration api
  const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password ,gender,age} = req.body;
    //check field is empty or not
    if 
         (
            [fullName, email, username, password, gender, age].some(
                (field) => typeof field === 'string' && field.trim() === ''
            )
    ) {
      throw new ApiError(400, "All fields are required");
    }
    // check user already exist or not
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }
    // create entry in db
    const user = await User.create({
      fullName,
      email,
      password,
      username: username.toLowerCase(),
      age,
      gender
    });
    //
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken" // passwor and refresh token not check
    );
    // check creater user aaya ya nhi
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registring the user");
    }
    // return respone
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  });

  export {registerUser,generateAccessAndRefereshTokens}