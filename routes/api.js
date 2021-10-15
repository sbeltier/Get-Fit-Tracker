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

// GET aggregate
router.get('/workouts', (req, res) => {
     Workout.aggregate([
         {
             $addFields: {
                 totalDuration: {
                     $sum: '$exercises.duration',
                 },
             },
         },
     ])
         .then((dbWorkouts) => {
             res.json(dbWorkouts);
         })
         .catch((err) => {
             res.json(err);
         });
 });

// GET workout ID
router.get("/workouts/:id", (req, res) => {
    Workout.findById({
      _id: req.params.id
    })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

// GET Workouts Range
router.get("/workouts/range", (req, res) => {
    Workout.aggregate([
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
        .sort({ day: 1 })
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
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