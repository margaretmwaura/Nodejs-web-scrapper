const path = require("path");
require("dotenv").config({ path: path.resolve("./.env") });
// require("dotenv").config({ path: require("find-config")(".env") });
const { sequelize } = require("sequelize");
const { User } = require("../../../models");
const { Op } = require("sequelize");
const jsonwebtoken = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

let encryption_key = process.env.ENCRYPTION_KEY;

module.exports.registerUser = async (_, { input }, context) => {
  console.log("we have been called ayyeee");
  console.log(input);
  console.log("Encryption key " + encryption_key);

  const { first_name, last_name, email, password } = input;

  let de_first_name = CryptoJS.AES.decrypt(first_name, encryption_key).toString(
    CryptoJS.enc.Utf8
  );
  let de_last_name = CryptoJS.AES.decrypt(last_name, encryption_key).toString(
    CryptoJS.enc.Utf8
  );
  let de_email = CryptoJS.AES.decrypt(email, encryption_key).toString(
    CryptoJS.enc.Utf8
  );
  let de_password = CryptoJS.AES.decrypt(password, encryption_key).toString(
    CryptoJS.enc.Utf8
  );

  console.log(de_first_name, de_last_name, de_email, de_password);

  try {
    const userCheck = await User.findOne({
      where: {
        email: {
          [Op.eq]: de_email,
        },
      },
    });
    console.log("Checking gotten user");
    console.log(userCheck);
    if (userCheck) {
      return {
        __typename: "CreateError",
        message: "A user already exists with that email",
      };
    }
    const user = await User.create({
      first_name: de_first_name,
      last_name: de_last_name,
      email: de_email,
      password: de_password,
    });

    let createdUser = {
      // employeeId: user.employeeId,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: user.id,
    };

    return {
      __typename: "RegisterSuccessful",
      user: createdUser,
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
