const {hash} = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")


class UsersController {
async create(request, response) {
const {name, email, password} = request.body;

const database = await sqliteConnection();
const checkIfUserExists = await database.get("SELECT * FROM users WHERE email = (?)",[email])

if(checkIfUserExists) {
throw new AppError("Este e-mail já segue em uso")

}

const hashedPassword = await hash(password, 8);

await database.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  )



return response.status(201).json()

}

async update(request, response) {
const{name, email} = request.body;
const{id} = request.params;

const database = await sqliteConnection();
const user = await database.get("SELECT * FROM users WHERE id = (?)",[id]);

if(!user) {
  throw new AppError("Usuário não encontrado")
}

const userwithUpdatedEmail = await database.get("SELECT FROM * users WHERE id email = (?)", [email])

if(userwithUpdatedEmail && userwithUpdatedEmail.id !== user.id) {
  throw new AppError("Este e-mail já segue em uso")

}

user.name = name;
user.email = email;

await database.run(`
  UPDATE users SET
  name = ?,
  email = ?,
  password = ?,
  updated_at = ?
  WHERE id = ?`,[user.name, user.email, update_at = DATETIME('now'), id])

return response.json();


/*
if(password && old_password) {
throw new AppError("É necessário informar a senha antiga")


  }
  
  const checkOldPassword = await compare(old_password, user.password) 
 
*/
}
 }


module.exports = UsersController;