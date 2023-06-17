const { createUserDB, getUserByEmailDB } = require('../repository/user.repository');
const bcrypt = require('bcrypt');

async function createUser(name, surname, email, pwd) {
    const foundUser = await getUserByEmailDB(email);
    if (foundUser.length) throw new Error('this user already exists');

    const salt = 3;
    const hashPassword = await bcrypt.hash(pwd, salt)

    const data = await createUserDB(name, surname, email, hashPassword);
    if (!data.length) throw new Error('passwoerd is not matched');
    return data;
};

async function authUser(email, pwd) {
    const foundUser = await getUserByEmailDB(email);
    if (!foundUser) throw new Error('this user is not exists');

    const isMatched = await bcrypt.compare(pwd, foundUser[0].pwd);
    if (!isMatched) throw new Error('password is wrong');
    return foundUser;
}


module.exports = { createUser, authUser };