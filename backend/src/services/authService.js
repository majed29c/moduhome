const authModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../utils/sendVerificationEmail').sendVerificationEmail;
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
};
const signUpService = async ({ userData }) => {
  try {
    const normalizedEmail = userData.email.toLowerCase().trim();
    const existing = await authModel.getDataByEmail(normalizedEmail);
    if (existing) {
      return { message: "User already exists with this email", status: 409 };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userDetails = {
      ...userData,
      email: normalizedEmail,
      password: hashedPassword,
      created_at: new Date().toISOString(),
      role: 'user',
      is_verified: false,
    };
    const {confirmPassword, ...newUser} = userDetails;

    const insertedUser = await authModel.insertUser(newUser);
    if (!insertedUser) {
      return { message: "Failed to create user", status: 400 };
    }

    const { password, ...safeUser } = insertedUser;
    const token = jwt.sign(
        { email: insertedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
      );

    await sendVerificationEmail(insertedUser.email, token);
    return { message: "User created successfully", user: safeUser, status: 201 };
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error("Failed to sign up");
  }
};

const verifyEmailService = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const result = await authModel.verifyEmailByToken(email);

    if (!result) {
      return { status: 400, message: 'Failed to verify email.' };
    }

    return { status: 200, message: 'Email verified successfully!' };
  } catch (err) {
    return { status: 400, message: 'Invalid or expired token.' };
  }
};



module.exports = {
  signInService,
  signUpService,
  verifyEmailService
};
