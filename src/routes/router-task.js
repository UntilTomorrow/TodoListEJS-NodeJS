const router = require('express').Router();
const taskController = require('../controllers').task;


router.get('/', taskController.task);
router.post('/add', taskController.add);

module.exports = router;