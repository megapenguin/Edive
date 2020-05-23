const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/getrecords", (req, res) => {
  Record.findAll()
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

router.post("/searchrecords", (req, res) => {
  let { transactionId } = req.body;
  Record.findAll({
    where: {
      id: {
        [Op.like]: transactionId,
      },
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

router.post("/insert", (req, res) => {
  console.log(req.body);
  let id = req.query;
  //User.destroy({ where: { i } }).then
  //User.update({ where: { id } });
  let { requestId, userId, driverId, information, result } = req.body;
  Record.create({
    requestId,
    userId,
    driverId,
    information,
    result,
  })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/getuserrecords/:userId", (req, res) => {
  console.log(req.params.userId);

  const userId = req.params.userId;
  console.log(userId);
  Record.findAll({
    where: {
      userId: userId,
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
