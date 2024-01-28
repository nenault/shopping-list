const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Shop } = require("../models/shops/shop");

const routes = (app) => {
  const router = express.Router();

  router.post("/shops", (req, res) => {
    const { text } = req.body;

    Shop.findOne({ text }).then((shops) => {
      if (shops) {
        if (shops.isDeleted === false) {
          return res.status(400).json({ message: "Doublon" });
        } else {
          let text = shops.text;
          Shop.findOneAndUpdate(
            { text },
            { isDeleted: false },
            { returnNewDocument: true }
          )
            .then((result) => {
              serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
            })
            .catch((e) => {
              serverResponses.sendError(res, messages.BAD_REQUEST, e);
            });
        }
      } else if (req.body.text) {
        const shop = new Shop({
          text: req.body.text,
        });

        shop
          .save()
          .then((result) => {
            serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
          })
          .catch((e) => {
            serverResponses.sendError(res, messages.BAD_REQUEST, e);
          });
      }
    });
  });

  router.patch("/shops/:id", (req, res) => {
    const updatedShopping = req.body;
    Shop.findByIdAndUpdate(req.params.id, updatedShopping, {
      new: true,
    })
      .then((shops) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, shops);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.get("/", (req, res) => {
    Shop.find({}, { __v: 0 })
      .then((shops) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, shops);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  app.use("/api", router);
};
module.exports = routes;
