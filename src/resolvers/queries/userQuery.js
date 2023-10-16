const { sequelize } = require("sequelize");
const { Vowel } = require("../../../models");
const { User } = require("../../../models");
const { Op } = require("sequelize");

// TODO: Make an error type that can be returned when there is no data
module.exports.getUserList = async (root, args, { user }) => {
  try {
    if (!user) throw new Error("You are not authenticated!");
    const { search, pagination, sort } = args;
    var query = {
      offset: 0,
      limit: 5,
      raw: true,
      //this is done to flaten out the join command
      attributes: ["firstName", "lastName", "email"],
      include: [{ attributes: [] }],
    };
    //by defaults query is paginated to limit 5 items
    if (pagination) {
      query.limit = pagination.items;
      query.offset = pagination.items * (pagination.page - 1);
    }
    if (search) {
      query.where = {
        [Op.or]: [
          search.first_name ? { first_name: search.first_name } : null,
          search.last_name ? { lastName: search.last_name } : null,
        ],
      };
    }
    if (sort) {
      query.order = [[sort, "ASC"]];
    }
    return await User.findAll(query);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.getUser = async (_, { email }, context) => {
  try {
    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
