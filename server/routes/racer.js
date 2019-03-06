const router = require('express').Router();
const racerController = require('../controllers/racer');
const isAuth = require('../middleware/is-auth');

router.get('/racers', racerController.getRacers);
router.post('/racer/create', racerController.createRacer);
router.get('/racer/details/:id', racerController.racerDetails);
router.post('/racer/edit/:id', racerController.editRacer);
router.post('/racer/delete/:id', racerController.deleteRacer);

module.exports = router;