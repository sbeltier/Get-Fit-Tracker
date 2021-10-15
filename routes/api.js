const router = require("express").Router();
const db = require("../models");

// GET last workout
router.get("/workouts", (req, res) => {
    db.Workout.aggregate([
        {
          $addFields: {
            totalDuration:{$sum: "$exercises.duration"}
          }
        }
      ]) 
        .then((lastWorkout) => {
          res.json(lastWorkout);
        })
        .catch((err) => {
            res.json(err);
        })
})


// GET Workouts from the last 7 days
router.get("/workouts/range", (req, res) => {
    console.log('getting workouts for last 7 days')
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .sort({ day: -1 })
        .limit(7)
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
            console.log('workouts retrieved')

        })
        .catch((err) => {
            res.json(err);
        });
})

// POST - Create workout
router.post("/workouts", ({body}, res) => {
    db.Workout.create(body)
    .then(newWorkout => {
        res.json(newWorkout)
        console.log('Workout created!')
    })
    .catch((err) => {
        res.json(err);
    })
})

// PUT - Add exercise to workout
router.put("/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: {
            exercises: req.body
            }
        },
        {
            new: true
        })
        .then(newExercise => {
            res.json(newExercise)
            console.log(newExercise)
        })
        .catch((err) => {
            res.json(err);
        })
        console.log('workout added')

    })


module.exports = router;