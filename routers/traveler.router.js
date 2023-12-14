var router = require("express").Router(),
    travelerCtr = require("../controllers/traveler.controller");

router.post("/create/:id", travelerCtr.create);
router.post("/book/:id", travelerCtr.book);

module.exports = router;