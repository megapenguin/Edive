const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  Driver.findAll()
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));

  User.findOne({ where: { id: 1 } });
});

router.post("/login", (req, res) => {
  console.log(req.body);

  let { userName, password } = req.body;

  Driver.findOne({ where: { userName, password } })

    .then((_res) => {
      if (_res) {
        let {
          id,
          firstName,
          lastName,
          userName,
          password,
          address,
          contactNumber,
          email,
          profilePicture,
          driverStatus,
        } = _res.dataValues;
        res.json({
          id,
          firstName,
          lastName,
          userName,
          password,
          address,
          contactNumber,
          email,
          profilePicture,
          driverStatus,
        });
      } else {
        res.json(_res);
      }

      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/insert", (req, res) => {
  console.log(req.body);

  let id = req.query;

  //User.destroy({ where: { i } }).then

  //User.update({ where: { id } });

  let {
    firstName,
    lastName,
    userName,
    password,
    address,
    contactNumber,
    email,
    profilePicture,
    driverStatus,
  } = req.body;

  Driver.create({
    firstName,
    lastName,
    userName,
    password,
    address,
    contactNumber,
    email,
    profilePicture,
    driverStatus,
  })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

//update drivers
router.post("/updatedrivers", (req, res) => {
  let { id, firstName, lastName, contactNumber, email, address } = req.body;
  console.log(req.body);

  Driver.update(
    { firstName, lastName, contactNumber, email, address },
    { where: { id } }
  )
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

//search drivers
router.post("/searchdrivers", (req, res) => {
  // const status = "verified";
  let { userId, firstName, lastName, status } = req.body;
  console.log(firstName);
  console.log(status);
  Driver.findAll(
    {
      where: {
        // [Op.and]: [
        //   {
        //     userStatus: {
        //       [Op.like]: status
        //     }
        //   },
        // {
        [Op.or]: [
          {
            id: {
              [Op.like]: userId,
            },
          },
          {
            firstName: {
              [Op.like]: "%" + firstName + "%",
            },
          },
          {
            lastName: {
              [Op.like]: "%" + lastName + "%",
            },
          },
          {
            driverStatus: {
              [Op.like]: status,
            },
          },
        ],
      },
      // ]
    }
    // }
  )
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

//get drivers
router.get("/getdrivers", (req, res) => {
  const status = "";
  console.log(status);
  Driver.findAll({
    where: {
      driverStatus: {
        [Op.like]: "%" + status + "%",
      },
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});
//approve users
router.post("/approvedrivers", (req, res) => {
  let { id, driverStatus } = req.body;
  console.log(req.body);

  Driver.update({ driverStatus }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});
//updating driver photo
router.post("/updateProfile", (req, res) => {
  let { id, profilePicture } = req.body;
  console.log(req.body);

  Driver.update({ profilePicture }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

//upload driver photo
router.post("/uploaddriverphoto", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const file = req.files.file;

  const randomFileName = randomString.generate(15);
  const splitFile = file.name.split(".");

  file.mv(
    `${__dirname}/../client/public/driverphoto/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: file.name,
        filePath: `/driverphoto/${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  console.log(file.filePath);
});

module.exports = router;
