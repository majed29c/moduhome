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

module.exports = { getDataByEmail };
