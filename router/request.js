const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  Request.findAll()
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));

  Request.findOne({ where: { id: 1 } });
});

router.post("/insert", (req, res) => {
  console.log(req.body);

  let id = req.query;

  //User.destroy({ where: { i } }).then

  //User.update({ where: { id } });

  let {
    userId,
    driverId,
    address,
    requestTime,
    requestDate,
    requestStatus,
  } = req.body;

  Request.create({
    userId,
    driverId,
    address,
    requestTime,
    requestDate,
    requestStatus,
  })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/getrequest", (req, res) => {
  const status = "waiting";
  let { driverId } = req.body;
  console.log(driverId);
  console.log(status);
  Request.findAll({
    where: {
      [Op.and]: [
        {
          requestStatus: {
            [Op.like]: status,
          },
        },
        {
          [Op.or]: [
            {
              driverId: {
                [Op.like]: driverId,
              },
            },
          ],
        },
      ],
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

router.post("/getuserrequests/:userId", (req, res) => {
  console.log(req.params.userId);

  const userId = req.params.userId;
  console.log(userId);
  Request.findAll({
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

router.post("/getuserrequest", (req, res) => {
  let { userId } = req.body;
  console.log(driverId);
  Request.findAll({
    where: {
      userId: {
        [Op.like]: userId,
      },
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

router.post("/getacceptedrequest", (req, res) => {
  const status = "accepted";
  let { driverId } = req.body;
  console.log(driverId);
  console.log(status);
  Request.findAll({
    where: {
      [Op.and]: [
        {
          requestStatus: {
            [Op.like]: status,
          },
        },
        {
          [Op.or]: [
            {
              driverId: {
                [Op.like]: driverId,
              },
            },
          ],
        },
      ],
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

router.post("/acceptrequest", (req, res) => {
  let { id, requestStatus } = req.body;
  console.log(req.body);

  Request.update({ requestStatus }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/declinerequest", (req, res) => {
  let { id, requestStatus } = req.body;
  console.log(req.body);

  Request.update({ requestStatus }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
