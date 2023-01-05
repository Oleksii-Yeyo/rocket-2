// const users = require("../../dataBase/users");
const User = require("../../dataBase/User");

module.exports = {
  
  getUsers: () => User.find(),

  getSingleUser: (userId) => User.findById(userId),

  createUser: (userObject) => User.create(userObject),

  deleteUser: (userId) => User.deleteOne(userId),

  updateUser: async (userId, newUser) => {
    const user = await User.findByIdAndUpdate(userId, newUser);
    return user;
  },

  findUserByEmail: (email) => User.find({email}),

};
