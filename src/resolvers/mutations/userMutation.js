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

  const { first_name, last_name, email } = input;

  let de_first_name = CryptoJS.AES.decrypt(first_name, encryption_key).toString(
    CryptoJS.enc.Utf8
  );
  let de_last_name = CryptoJS.AES.decrypt(last_name, encryption_key).toString(
    CryptoJS.enc.Utf8
  );
  let de_email = CryptoJS.AES.decrypt(email, encryption_key).toString(
    CryptoJS.enc.Utf8
  );

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
