const Sequelize = require("sequelize");
const db = require("../config/database");

const Record = db.define("records", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  requestId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  driverId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  information: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  result: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Record;
