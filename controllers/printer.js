// const printerGroups = require('../models/PrinterGroups');
// const triggers = require('../models/triggers');
//const { sequelize } = require("../models/PrinterGroups");
const db = require("../util/database");
const printerGroups = db.printerGroups;
const triggers = db.triggers;
const Joi = require("joi");

//Create Printer
const schema = Joi.object().keys({
  title: Joi.string().alphanum().min(0).max(250).required(),
  description: Joi.string().required(),
  printType: Joi.string().valid("A", "B"),
  activeStatus: Joi.boolean(),
  triggers: Joi.array().items(
    Joi.object().keys({
      trigger: Joi.string().valid("A", "B", "C"),
      orderType: Joi.string().valid("A", "B"),
    })
  ),
});
const create = async (req, res) => {
  let t;
  try {
    const dataToValidate = {
      title: req.body.title,
      description: req.body.description,
      printType: req.body.printType,
      activeStatus: req.body.activeStatus,
      triggers: req.body.triggers,
    };
    const schemaerr = schema.validate(dataToValidate);
    if (schemaerr.error) {
      return res.status(404).send(schemaerr.error.message);
    } else {
      t = await db.sequelize.transaction();
      console.log("entered", t);
      const Printer = await printerGroups.create(
        {
          title: req.body.title,
          description: req.body.Description,
          printType: req.body.printType,
          activeStatus: req.body.activeStatus,
        },
        { transaction: t }
      );
      const triggerData = req.body.triggers;
      const preparedTriggerObjArr = triggerData.map((trigger) => {
        trigger.printerGroupId = printerGroups.id;
        return trigger;
      });
      console.log(preparedTriggerObjArr);
      await triggers.bulkCreate(preparedTriggerObjArr, { transaction: t });
      await t.commit();
      res.status(200).send({
        title: Printer.title,
        description: Printer.description,
        printType: Printer.printType,
        activeStatus: Printer.activeStatus,
      });
    }
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send({ error: "The Printer Does not Created!" });
  }
};

//Printer List
const list = async (req, res) => {
  try {
    const find = await printerGroups.findAll(
      {
        include: [
          {
            model: triggers,
          },
        ],
      },
      { where: { activeStatus: true } }
    );
    res.status(200).send(find);
  } catch (err) {
    console.log(err);
    res.status(404).send({ error: "The Printers does not Display!" });
  }
};

//Update Printer
const schema1 = Joi.object({
  title: Joi.string().alphanum().min(2).max(250).required(),
  description: Joi.string(),
  printType: Joi.string().valid("A", "B"),
});
const update = async (req, res) => {
  try {
    const dataToValidate1 = {
      title: req.body.title,
      description: req.body.description,
      printType: req.body.printType,
    };
    const schemaerr1 = schema1.validate(dataToValidate1);
    if (schemaerr1.error) {
      return res.send(schemaerr1.error.message);
    } else {
      const printerId = req.params.printerId;
      await printerGroups.update(
        {
          title: req.body.title,
          description: req.body.description,
          printType: req.body.printType,
        },
        { where: { id: printerId } }
      );
      res.status(200).send({
        title: req.body.title,
        description: req.body.description,
        printType: req.body.printType,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "The Printer does not update." });
  }
};

//update trigger
const schema2 = Joi.object({
  trigger: Joi.string().valid("A", "B", "C"),
  orderType: Joi.string().valid("A", "B"),
});
const updateTrigger = async (req, res) => {
  try {
    const dataToValidate2 = {
      trigger: req.body.trigger,
      orderType: req.body.orderType,
    };
    const schemaerr1 = schema2.validate(dataToValidate2);
    if (schemaerr1.error) {
      return res.send(schemaerr1.error.message);
    } else {
      const printerId = req.params.printerId;
      await triggers.update(
        {
          trigger: req.body.title,
          orderType: req.body.orderType,
        },
        { where: { id: printerId } }
      );
      res.status(200).send({
        trigger: req.body.trigger,
        orderType: req.body.orderType,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "The Printer does not update." });
  }
};
module.exports = { create, list, update, updateTrigger };

