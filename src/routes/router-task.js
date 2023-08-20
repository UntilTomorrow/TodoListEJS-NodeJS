const router = require('express').Router();
const taskController = require('../controllers').task;


router.get('/', taskController.task);
router.post('/add', taskController.add);
router.post('/delete/(:id)', taskController.delete);
module.exports = router;