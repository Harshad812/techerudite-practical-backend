const { emit } = require("nodemon");
const statusCode = require("../helper/statusCode");
const Model = require("../models");
const User = Model.User;

const getSingleUser = async (params) => {
  console.log(params);
  const user = await User.findOne({
    where: params,
  });
  return user;
};

const create = async (req, res) => {
  if (!req.body.email) {
    res.status(statusCode.not_found).send("All field require");
  }

  const user = getSingleUser({ email: req.body.email, role: req.body.role });
  if (user) {
    res.status(statusCode.not_found).send({ message: "User already exist..!" });
  } else {
    try {
      const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };

      const response = await User.create(data);
      res.send(response);
    } catch (err) {
      res
        .status(statusCode.error)
        .send({ message: "Somethind went wrong...!" });
    }
  }
};

const login = async (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(statusCode.not_found).send({
      message: "Email and Password required",
    });
  }
  try {
    const user = await getSingleUser({
      email: req.body.email,
    });

    if (!user) {
      res.status(statusCode.not_found).send({
        message: "Account not found",
      });
    } else if (user?.role !== req.body.role) {
      res.status(statusCode.not_found).send({
        message: "You are not allowed to login from here",
      });
    } else if (user) {
      res.send(user);
    }
  } catch (err) {
    res.status(statusCode.error).send({
      message: "Something went wrong..!",
    });
  }
};

module.exports = { create, login };
