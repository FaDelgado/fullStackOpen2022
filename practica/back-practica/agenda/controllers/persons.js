const agendaRouter = require('express').Router()
const Agenda = require("../models/person");

/* PERSONS */
agendaRouter.get("/", (req, res) => {
    Agenda.find({}).then((person) => {
      res.json(person);
    });
  });
  
  agendaRouter.get("/", (req, res) => {
    Agenda.find({}).then((person) => {
      res.send(`<p>Phonebook has info for ${person.length} people</p>
      <p>${new Date()}</p>`);
    });
  });
  
  agendaRouter.get("/:id", (req, res) => {
    Agenda.findById(req.params.id).then((person) => {
      res.json(person);
    });
  });
  
  agendaRouter.delete("/:id", (req, res, next) => {
    Agenda.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => next(error));
  });
  
  agendaRouter.post("/", (req, res, next) => {
    const body = req.body;
  
    if (body.name === undefined || body.number === undefined) {
      return res.status(400).json({ error: "content missing" });
    }
  
    Agenda.find({ name: body.name }).then((person) => {
      if (person.length > 0) {
        return res.status(400).json({
          error: "Person already exists!",
        });
      }
    });
  
    const agenda = new Agenda({
      name: body.name,
      number: body.number,
    });
  
    agenda
      .save()
      .then((saveAgenda) => saveAgenda.toJSON())
      .then((resultFormatted) => res.json(resultFormatted))
      .catch((error) => next(error));
  });
  
  agendaRouter.put("/:id", (req, res) => {
    const body = req.body;
  
    const newAgenda = {
      name: body.name,
      number: body.number,
    };
  
    Agenda.findByIdAndUpdate(req.params.id, newAgenda, { new: true })
      .then((result) => {
        res.json(result);
      })
      .catch((error) => error);
  });
  
  module.exports = agendaRouter