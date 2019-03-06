const router = require('express').Router();
const teamController = require('../controllers/team');
const isAuth = require('../middleware/is-auth');

router.get('/teams', teamController.getTeams);
router.post('/team/create', teamController.createTeam);
router.get('/team/details/:id', teamController.teamDetails);
router.post('/team/edit/:id', teamController.editTeam);
router.post('/team/delete/:id', teamController.deleteTeam);

module.exports = router;