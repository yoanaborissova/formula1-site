const router = require('express').Router();
const teamController = require('../controllers/team');
const restrictedPages = require('../middleware/restrictedPages');

router.get('/teams', teamController.getTeams);
router.post('/team/create', restrictedPages.isAdmin, teamController.createTeam);
router.get('/team/details/:id', teamController.teamDetails);
router.post('/team/edit/:id', restrictedPages.isAdmin, teamController.editTeam);
router.post('/team/delete/:id', restrictedPages.isAdmin, teamController.deleteTeam);

module.exports = router;