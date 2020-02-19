var express = require("express");
var tasks = express.Router();
const Task = require("../models/Task");

tasks.get("/list", (req, res) => {
    Task.findAll()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send("error: " + err)
        })
});

tasks.get("/task/:id", (req, res) => {
    Task.findAll({where : {id : req.params.id }})
        .then(task => {
            res.json(task)
        })
        .catch((err) => console.log(err));
});

tasks.post("/task", (req, res) => {
    if(!req.body.name){
        res.status(400)
        res.json({
            error: "Brak nazwy zadania"
        })
    }else{
        Task.create(req.body)
            .then( () => {
                res.send({message: "Dodano zadanie"})
            })
            .catch(err => {
                res.send("Błąd:" + err)
            })
    }
});

tasks.delete("/task/:id", (req, res) => {
    Task.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send({message: "Usunięto zadanie"})
        })
        .catch(err => {
            res.send("Błąd: " + err)
        })
});

tasks.put("/task/:id", (req, res) => {
    if(!req.body.name){
        res.status(400)
        res.json({
            error: "Brak nazwy zadania"
        })
    }else{
        Task.update(
            { name: req.body.name },
            { where: { id: req.params.id } }
        )
            .then( () => {
                res.send({message: "Zaktualizowano zadanie"})
            })
            .catch(err => {
                res.send("Błąd:" + err)
            })
    }
});

module.exports = tasks;
