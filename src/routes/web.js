const router = require('express').Router();
const checkApiKey = require('../configs/check')
const homeController = require('../controllers').home;
const taskController = require('../controllers').task;


//landing page

router.get('/', homeController.home);
router.get('/task', taskController.task);

// Api
router.get('/api/data',checkApiKey, taskController.data);
router.post('/api/add',checkApiKey, taskController.add);
router.post('/api/edit/:id',checkApiKey, taskController.edit);
router.post('/api/delete/:id',checkApiKey, taskController.delete);
module.exports = router;
