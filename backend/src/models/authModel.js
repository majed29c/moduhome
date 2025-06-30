const { json } = require('express');
const supabase = require('../database/supabase');

const getDataByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('User') 
      .select('*')
      .eq('email', email)
      .maybeSingle();
    if (error) {
      console.error("Error fetching email:", error);
      return null; 
    }
    return data ? data : null;
  } catch (error) {
    console.error("Error fetching email:", error);
    throw new Error("Failed to fetch email");
  }
};

const insertUser = async (userData)=>{
  const {confirmPassword, ...userDetails} = userData; 
  try{
    
    const { data, error } = await supabase
      .from('User')
      .insert([userDetails])
      .select()
      .maybeSingle(); 
      if(error) {
        console.error("Error inserting user:", error);
        return null; 
      }
      return data? data : null;
}catch(error){
    console.error("Error during user insertion:", error);
    throw new Error("Failed to insert user");
  }
};
module.exports = { getDataByEmail, insertUser };
