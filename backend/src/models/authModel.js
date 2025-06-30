const { json } = require('express');
const supabase = require('../database/supabase');

const getDataByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('User') 
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;

    return data || null;
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
      .single();
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
