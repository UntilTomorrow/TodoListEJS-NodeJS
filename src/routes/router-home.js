const router = require('express').Router();
const homeController = require('../controllers').home;

router.get('/', homeController.home);

module.exports  = {
    home,
};