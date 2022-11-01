const { sequelize } = require("sequelize");
const { User } = require("../../../models");

module.exports.registerUser = async (
  root,
  { firstName, lastName, email, password }
) => {
  try {
    const userCheck = await User.findOne({
      where: {
        [Op.or]: [{ email: email }],
      },
    });
    if (userCheck) {
      throw new Error("Email or Employee id already exists");
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const token = jsonwebtoken.sign(
      { employeeId: user.employeeId, email: user.email },
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
      token,
      // user: createdUser,
      // message: "Registration succesfull",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports.login = async (_, { email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("No user with that email");
    }
    const isValid = await User.validPassword(password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password");
    }

    // return jwt
    const token = jsonwebtoken.sign(
      { employeeId: user.employeeId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      // user,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
