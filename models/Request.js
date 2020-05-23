const Sequelize = require("sequelize");
const db = require("../config/database");

const Request = db.define("requests", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  requestTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  requestDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  requestStatus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  requestedAt: {
    type: "TIMESTAMP",
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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

module.exports = Request;
