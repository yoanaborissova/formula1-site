const Racer = require('../models/Racer');

module.exports = {
  getRacers: (req, res) => {
    Racer.find()
      .then((racers) => {
        let resRacers = racers.sort((a, b) => b.points - a.points)
        res
          .status(200)
          .json({ message: 'Fetched racers successfully.', resRacers });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createRacer: (req, res) => {
    const racerObj = req.body;
    Racer.create(racerObj)
      .then((racer) => {
        res.status(200)
          .json({
            message: 'Racer created successfully!',
            racer
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  racerDetails: (req, res) => {
    const racerId = req.params.id;
    Racer.findById(racerId)
      .then((racer) => {
        res.status(200)
          .json({
            message: 'Details fetched successfully.',
            racer
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        throw error;
      });
  },
  editRacer: (req, res) => {
    const racerId = req.params.id;

    Racer.findById(racerId)
      .then((racer) => {
        racer.name = req.body.name;
        racer.information = req.body.information;
        racer.points = req.body.points;
        racer.team = req.body.team;
        racer.imageUrl = req.body.imageUrl;

        racer.save()
          .then(() => {
            res.status(200)
              .json({
                message: 'Racer edited successfully.',
                racer,
              })
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        throw error;
      });
  },
  deleteRacer: (req, res) => {
    const racerId = req.params.id;

    Racer.findByIdAndDelete(racerId)
      .then(() => {
        res.status(200)
          .json({
            message: 'Racer deleted successfully.',
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        throw error;
      });
  }
}