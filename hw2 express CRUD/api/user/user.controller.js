const { readDB, findUserByID, writeInDB, createUniqueID, createIdForNewUser } = require("./user.service");


module.exports = {

    getAllUsers: async (req, res) => {
        try {
            const users = await readDB();
            res.json(users);
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const userFromRequest = req.body;
            const users = await readDB()
            const usersArrLength = await readDB().then(arr => arr.length);
      
            const newUser = {
                id: createIdForNewUser(usersArrLength),
                uniqueID: createUniqueID(),
                name: userFromRequest.name,
                age: userFromRequest.age,
            };

            users.push(newUser);
            await writeInDB(users);

            res.status(200).send('User was created');
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const { userID } = req.params;
            const users = await readDB();

            const user = await findUserByID(users, userID);
            if (!user) throw new Error('User does not exist');
    
            
            res.json(user);
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const userFromRequest = req.body;
            const { userID } = req.params;

            const users = await readDB();
            const user = await findUserByID(users, userID);

            if (!user) throw new Error('User does not exist');
            

            const indexInArr = user.id - 1;
            users[indexInArr] = {...users[indexInArr], ...userFromRequest};

            await writeInDB(users);
            res.status(200).send('User was updated');
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userID } = req.params;

            const users = await readDB();
            const user = await findUserByID(users, userID);

            if (!user) throw new Error('User does not exist');
            
            const index = user.id - 1;

            users.splice(index, 1);

            await writeInDB(users);
            res.status(200).send('User was deleted');
        } catch (e) {
            res.status(400).send(e.message);
        }
},
}