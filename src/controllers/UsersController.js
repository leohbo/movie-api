const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")


class UsersController {
async create(request, response) {
const {name, email, password} = request.body;
const database = await sqliteConnection();

const checkIfUserExists = await database.get("SELECT * FROM users WHERE email= (?)",[email])

if(checkIfUserExists) {
throw new AppError("Este e-mail já segue em uso")

}

await database.run("INSERT INTO users(name, email, password) VALUES(?,?,?)"
[name, email, password]
)

return response.status(201).json()

}
 }

module.exports = UsersController;