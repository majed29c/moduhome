const authModel = require('../models/authModel'); 
const bcrypt = require('bcryptjs');
const signInService = async (email,password) => {
     const data = await authModel.getDataByEmail(email);
     if(!data){
      return {message: "User not found", status: 404}; 
     }
     const isPasswordValid = await bcrypt.compare(password, data.password);
     if(!isPasswordValid){
      return {message: "Invalid password", status: 401}; 
     }
      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
      };
}
const signUpService = async ({userData})=>{
  try{
    const data = await authModel.getDataByEmail(userData.email);
    if(data){
      return {message: "User already exists with this email", status: 409};
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      ...userData,
      password: hashedPassword,
      created_at: new Date().toISOString(),
      role: 'user', 
      is_verified: false,
    };
    const insertedUser = await authModel.insertUser(newUser);
    if(insertedUser==null){
      return {message: "Failed to create user",status: 400};
    }

    return {message: "User created successfully", user: insertedUser,status: 201};  
  }catch(error){
    console.error("Error during signup:", error);
    throw new Error("Failed to sign up");
  } 
};
module.exports = {
  signInService,
  signUpService
};