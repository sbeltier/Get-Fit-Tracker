const router = require("express").Router();
const db = require("../models");

// GET all workouts
router.get("/workouts", (req, res) => {
    db.Workout.find({})
    .sort({ date: -1 })
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

// GET Workouts Range
router.get("/workouts/range", (req, res) => {
    db.Workout.find({})
    .sort({ date: -1 })
    .then((workoutRangeData) => {
        res.json(workoutRangeData)
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

// POST - Create workout
router.post("/workouts", ({body}, res) => {
    db.Workout.create(body)
    .then(newWorkout => {
        res.json(newWorkout)
    })
})

// PUT - Add exercise to db
router.put("/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: {
            exercises: req.body
            }
        },
        (error, data) => {
            if (error) {
              res.send(error);
            } else {
              res.send(data);
            }
          }
    )
    console.log('workout added')
})


module.exports = router;