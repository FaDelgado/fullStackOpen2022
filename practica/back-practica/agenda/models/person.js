/* eslint-disable no-undef */
const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: Number,
    minlength: 8,
    required: true,
  },
});

// Borrar datos no necesarios
agendaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Agenda", agendaSchema);
