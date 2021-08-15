const router = require('express').Router();
const controller = require('../controller'); 

router.get('/api/cars', controller.findAll);

router.post('/api/cars', controller.create);

router.put('/api/cars/:id', controller.update);

module.exports = router;