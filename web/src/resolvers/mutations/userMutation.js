const { sequelize } = require("sequelize");
const { User } = require("../../../models");
const { Op } = require("sequelize");
const jsonwebtoken = require("jsonwebtoken");

module.exports.registerUser = async (_, { input }, context) => {
  const { firstName, lastName, email, password } = input;
  try {
    const userCheck = await User.findOne({
      where: {
        [Op.or]: [{ email: email }],
      },
    });
    if (userCheck) {
      return {
        __typename: "CreateError",
        message: "A user already exists with that email",
      };
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const token = jsonwebtoken.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    );
    let createdUser = {
      employeeId: user.employeeId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return {
      __typename: "RegisterSuccessful",
      user: createdUser,
      token: token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports.login = async (_, { input }, context) => {
  const { email, password } = input;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("No user with that email");
    }
    const isValid = await User.validPassword(password, user.password);

    if (!isValid) {
      throw new Error("Kindly check your credentials and retry");
    }

    const token = jsonwebtoken.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};
