const { createUserDB,getUserByEmail } = require(`../repository/user.repository`);

async function createUser(name, surname, email, pwd) {
    const foundUser = await getUserByEmailDB(email);
    if (foundUser.length) throw new Error(`такой email уже зарегестрирован`);

    const data = await createUserDB(name, surname, email, pwd);
    if (!data.length) throw new Error(`объект не создан`)
    return data
}

module.exports = { createUser}