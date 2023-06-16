require(`dotenv`).config();
const app = require(`./src/app`);

app.listen(process.env.PORT, function () {
    console.log(`STERT server`);
});