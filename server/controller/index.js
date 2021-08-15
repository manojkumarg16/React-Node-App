const db = require("../models");
const Cars = db.cars;

exports.create = (req, res) => {
    if(!req.body.company || !req.body.model) {
        res.status(400).send({
            message : "Company or Model Cannot be Empty!"
        });
        return;
    }
    const car = {
        model: req.body.model,
        company: req.body.company
    };

    Cars.create(car)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || 'Error while adding a new Car'
            })
        })
};

exports.findAll = async (req, res) => {
    await Cars.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while fetching Cars'
            })
        })
};

exports.update = (req, res) => {
    const id = req.params.id;

    if(req.body.company || req.body.model) {
        Cars.update(req.body, {
            where: {id: id}
        })
        .then(data => {
            if(data[0] === 1) {
                res.status(200).send({
                    data: data[0],
                    message: 'Updated Cars Successfully'
                })
            } else {
                res.send({
                    message: `Cannot update Cars for this id: ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while Updating Cars'
            })
        })
    } else {
        res.status(400).send({
            message: "Model or Company cannot be empty!"
        })
    }
};
