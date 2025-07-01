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
  try{
    const { data, error } = await supabase
      .from('User')
      .insert([userData])
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

const verifyEmailByToken = async (email) => {
  const { data, error } = await supabase
    .from('User')
    .update({ is_verified: true })
    .eq('email', email)
    .select()
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
};
const deleteUser = async (email)=>{
  try{
    const {data,error}= await supabase.from('User').delete().eq('email',email).select().maybeSingle();
    if(error){
      console.error("Error deleting user:", error);
      return null; 
    }
    return data ? data : null;
  }
  catch(error){
    console.error("Error during user deletion:", error);
    throw new Error("Failed to delete user");
  }
}
module.exports = { getDataByEmail, insertUser,verifyEmailByToken };
