const jwt = require('jsonwebtoken');
const supabase = require('../database/supabase');
const signInService = require('../services/authService').signInService;
const signUpService = require('../services/authService').signUpService;
const Signin = async (req, res) => {
   try{
      const user = await signInService(req.body);
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
const Signup = async (req,res)=>{
   try{
      const data = await signUpService({userData: req.body});
      if(data.status && data.status === 409){
         return res.status(409).json({message: data.message});
      }
      if(data.status && data.status === 400){
         return res.status(400).json({message: data.message});
      }
      if(data.status && data.status === 201){
         return res.status(201).json({message: data.message, user: data.user});
      }
      return res.status(500).json({message: "Internal Server Error"});
   }catch(error){
      console.error("Error during sign-up:", error);
      return res.status(500).json({message: "Internal Server Error"});
   }  
}

module.exports = { Signin, Signup };
