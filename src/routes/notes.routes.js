const {Router} = require("express");

const NotesController = require("../controllers/NotesController")

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.get("/", notesController.index);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;