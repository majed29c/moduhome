const authModel = require('../models/authModel');
const bcrypt = require('bcryptjs');

const signInService = async ({ email, password }) => {
  const data = await authModel.getDataByEmail(email.toLowerCase().trim());

  if (!data) {
    return { message: "User not found", status: 404 };
  }

  const isPasswordValid = await bcrypt.compare(password, data.password);
  if (!isPasswordValid) {
    return { message: "Invalid password", status: 401 };
  }
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role,
  };
};const signUpService = async ({ userData }) => {
  try {
    const normalizedEmail = userData.email.toLowerCase().trim();
    const existing = await authModel.getDataByEmail(normalizedEmail);
    if (existing) {
      return { message: "User already exists with this email", status: 409 };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      ...userData,
      email: normalizedEmail,
      password: hashedPassword,
      created_at: new Date().toISOString(),
      role: 'user',
      is_verified: false,
    };

    const insertedUser = await authModel.insertUser(newUser);
    if (!insertedUser) {
      return { message: "Failed to create user", status: 400 };
    }

    // ✅ FIXED: Exclude password from returned user
    const { password, ...safeUser } = insertedUser;

    return { message: "User created successfully", user: safeUser, status: 201 };
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error("Failed to sign up");
  }
};



module.exports = {
  signInService,
  signUpService,
};
