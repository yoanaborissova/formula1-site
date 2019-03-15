const Team = require('../models/Team');

module.exports = {
  getTeams: (req, res) => {
    Team.find()
      .then((teams) => {
        let resTeams = teams.sort((a, b) => b.points - a.points);

        res
          .status(200)
          .json({ message: 'Fetched teams successfully.', resTeams });
      })
      .catch((error) => {
        res.status(500)
            .json({
              message: 'Something went wrong.',
              error
            })
      });
  },
  createTeam: (req, res) => {
    const teamObj = req.body;
    if (teamObj.racers !== null){
      teamObj.racers = teamObj.racers.split(',').join(', ');
    }
    Team.create(teamObj)
    .then((team) => {
      res.status(200)
        .json({
          message: 'Team created successfully!',
          team
        })
    })
    .catch((error) => {
      res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
    });
  },
  teamDetails: (req, res) => {
    const teamId = req.params.id;
    Team.findById(teamId)
    .then((team) => {
      res.status(200)
        .json({
          message: 'Details fetched successfully.',
          team
        })
    })
    .catch((error) => {
      res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
    });
  },
  editTeam: (req, res) => {
    const teamId = req.params.id;

    Team.findById(teamId)
      .then((team) => {
        team.name = req.body.name;
        team.description = req.body.description;
        team.racers = req.body.racers;
        team.imageUrl = req.body.imageUrl;
        team.points = req.body.points;

        team.save()
          .then(() => {
            res.status(200)
              .json({
                message: 'Team edited successfully.',
                team,
              })
          })
      })
      .catch((error) => {
        res.status(500)
            .json({
              message: 'Something went wrong.',
              error
            })
      });
  },
  deleteTeam: (req, res) => {
    const teamId = req.params.id;

    Team.findByIdAndDelete(teamId)
      .then(() => {
        res.status(200)
          .json({
            message: 'Team deleted successfully.',
          })
      })
      .catch((error) => {
        res.status(500)
            .json({
              message: 'Something went wrong.',
              error
            })
      });
  }
}