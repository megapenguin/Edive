const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  User.findAll()
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));

  User.findOne({ where: { id: 1 } });
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
    idFront,
    idBack,
    idWithSelfie,
    userStatus,
  } = req.body;

  User.create({
    firstName,
    lastName,
    userName,
    password,
    address,
    contactNumber,
    email,
    profilePicture,
    idFront,
    idBack,
    idWithSelfie,
    userStatus,
  })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/login", (req, res) => {
  console.log(req.body);

  let { userName, password } = req.body;

  User.findOne({ where: { userName, password } })

    .then((_res) => {
      if (_res) {
        let {
          id,
          userName,
          firstName,
          lastName,
          address,
          contactNumber,
          email,
          profilePicture,
          idFront,
          idBack,
          idWithSelfie,
          userStatus,
        } = _res.dataValues;
        res.json({
          id,
          userName,
          firstName,
          lastName,
          address,
          contactNumber,
          email,
          profilePicture,
          idFront,
          idBack,
          idWithSelfie,
          userStatus,
        });
      } else {
        res.json(_res);
      }

      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/search", (req, res) => {
  console.log(req.body);

  let { userName, id } = req.body;

  User.findOne({ where: { userName, id } })

    .then((_res) => {
      if (_res) {
        let {
          id,
          userName,
          firstName,
          lastName,
          address,
          contactNumber,
          email,
          profilePicture,
          idFront,
          idBack,
          idWithSelfie,
          userStatus,
        } = _res.dataValues;
        res.json({
          id,
          userName,
          firstName,
          lastName,
          address,
          contactNumber,
          email,
          profilePicture,
          idFront,
          idBack,
          idWithSelfie,
          userStatus,
        });
      } else {
        res.json(_res);
      }

      console.log(_res);
    })
    .catch((error) => console.log(error));
});
//search drivers
router.post("/searchusers", (req, res) => {
  // const status = "verified";
  let { userId, firstName, lastName, status } = req.body;
  console.log(firstName);
  console.log(status);
  User.findAll(
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
            userStatus: {
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

//update users
router.post("/updateusers", (req, res) => {
  let { id, firstName, lastName, contactNumber, email, address } = req.body;
  console.log(req.body);

  User.update(
    { firstName, lastName, contactNumber, email, address },
    { where: { id } }
  )
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

//approve users
router.post("/approveusers", (req, res) => {
  let { id, userStatus } = req.body;
  console.log(req.body);

  User.update({ userStatus }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

//get users
router.get("/getusers", (req, res) => {
  const status = "";
  console.log(status);
  User.findAll({
    where: {
      userStatus: {
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

//updating profile pictures
router.post("/updateProfile", (req, res) => {
  let { id, profilePicture } = req.body;
  console.log(req.body);

  User.update({ profilePicture }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

//verifying pictures
router.post("/verificationRequest", (req, res) => {
  let { id, idFront, idBack, idWithSelfie, userStatus } = req.body;
  console.log(req.body);

  User.update({ idFront, idBack, idWithSelfie, userStatus }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

//uploading pictures
router.post("/uploadidfront", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const idFrontFile = req.files.idFrontFile;

  const randomFileName = randomString.generate(15);
  const splitFile = idFrontFile.name.split(".");

  idFrontFile.mv(
    `${__dirname}/../client/public/idfront/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: idFrontFile.name,
        filePath: `/idfront/${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  console.log(idFrontFile.filePath);
});

router.post("/uploadidback", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const idBackFile = req.files.idBackFile;

  const randomFileName = randomString.generate(15);
  const splitFile = idBackFile.name.split(".");

  idBackFile.mv(
    `${__dirname}/../client/public/idback/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: idBackFile.name,
        filePath: `/idback/${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  console.log(idBackFile.filePath);
});

router.post("/uploadidwithselfie", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const idWithSelfieFile = req.files.idWithSelfieFile;

  const randomFileName = randomString.generate(15);
  const splitFile = idWithSelfieFile.name.split(".");

  idWithSelfieFile.mv(
    `${__dirname}/../client/public/idwithselfie/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: idWithSelfieFile.name,
        filePath: `/idwithselfie/${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  console.log(idWithSelfieFile.filePath);
});

router.post("/uploadProfilePict", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const file = req.files.file;

  const randomFileName = randomString.generate(15);
  const splitFile = file.name.split(".");

  file.mv(
    `${__dirname}/../client/public/profilepictures/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: file.name,
        filePath: `/profilepictures/${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  console.log(file.filePath);
});

module.exports = router;
