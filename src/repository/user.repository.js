const pool = require(`../db`);

async function createUserDB(name, surname, email, pwd) {
    const client = await pool.connect();
    try {
        await client.query(`begin`);
        const sql = `INSERT INTO users(name,surname,email, pwd) VALUES ($1,$2,$3,$4) RETURNING *`;
        const result = (await client.query(sql, [name, surname, email, pwd])).rows;
        await client.query(`commit`)
        return result;
    } catch (err) {
        console.log(err.message);
        await client.query(`rollback`);
        return [];
    }
}

async function getUserByEmail(email) {
    const client = await pool.connect();
    const sql = `SELECT * FROM users WHERE email = $1`;
    const result = (await client.query(sql, [email])).rows;
    return result;

}

module.exports = { createUserDB,getUserByEmail };