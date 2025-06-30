const jwt = require('jsonwebtoken');
const supabase = require('../database/supabase');
const signInService = require('../services/authService').signInService;
const Signin = async (req, res) => {
   const {email, password} = req.body; 
   if(!email || !password){
     return res.status(401).json({message : "Please Enter an Email and a Password"});
   } 

   try{
      const user = await signInService(email, password);
      if(!user){
         return res.status(401).json({message: "Invalid email or password"});
      }
      return res.status(200).json({
         message: "Sign-in successful",
         user:user,
        });
   }catch(error){
     console.error("Error during sign-in:", error);
     return res.status(500).json({message: "Internal Server Error"});
   }  
  
};
const Signup = (req,res,next)=>{
   const {firstName,lastName,email,password, confirmPassword} = req.body;
}

module.exports = { Signin, Signup };
