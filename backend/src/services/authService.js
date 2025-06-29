const authModel = require('../models/authModel'); 
const bcrypt = require('bcryptjs');
const signInService = async (email,password) => {
     const data = await authModel.getDataByEmail(email);
     if(!data){
      return null; 
     }
     const isPasswordValid = await bcrypt.compare(password, data.password);
     if(!isPasswordValid){
      return null; 
     }
      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
      };
}

module.exports = {
  signInService,
};