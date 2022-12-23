const fs = require("fs").promises;
const path = require("path");

const usersPath = path.join(__dirname,'../../dataBase', 'users.json')

module.exports = {

    readDB: async () => {
        const users = await fs.readFile(usersPath);
        return JSON.parse(users.toString());
    },

    writeInDB: async (users) => {
        await fs.writeFile(usersPath, JSON.stringify(users));
    },

    findUserByID: async (user, id) => user.find(userInArr => userInArr.id === +id),

     createIdForNewUser: (usersArrLength) => {
        // argument is the usersArray's length
        if (usersArrLength === 0) {
            return 1
        }
        return usersArrLength + 1
    },

    createUniqueID: () => Math.trunc(Math.random() * 1e16).toString(36).toUpperCase(),

}