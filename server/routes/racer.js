const router = require('express').Router();
const racerController = require('../controllers/racer');
const restrictedPages = require('../middleware/restrictedPages');

router.get('/racers', racerController.getRacers);
router.post('/racer/create', restrictedPages.isAdmin, racerController.createRacer);
router.get('/racer/details/:id', racerController.racerDetails);
router.post('/racer/edit/:id', restrictedPages.isAdmin, racerController.editRacer);
router.post('/racer/delete/:id', restrictedPages.isAdmin, racerController.deleteRacer);

module.exports = router;