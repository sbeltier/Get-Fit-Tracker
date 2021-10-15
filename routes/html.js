const router = require("express").Router();
const db = require("../models");
const path = require('path')


// GET homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
    .catch(err => {
        res.status(400).json(err);
    })
})

// GET exercise.html
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
})

// GET stats.html
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))

})

module.exports = router;