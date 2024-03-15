const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@notes.shjj8e0.mongodb.net/notes?retryWrites=true&w=majority&appName=notes`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then(() => {
  console.log("note saved!");
  mongoose.connection.close();
});

Note.find({})
  .then((result) => {
    result.forEach((note) => console.log(note));
  })
  .finally(() => {
    mongoose.connection.close();
  });
