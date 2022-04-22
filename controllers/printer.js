const printerGroups = require('../models/PrinterGroups');
const printerGroupTriggers = require('../models/PrinterGroupTriggers');
const { sequelize } = require("../models/PrinterGroups");
const Joi = require("joi");

//Create Printer
const create = async (req, res) => {
    let t;
    try {
      t = await sequelize.transaction();
      console.log("entered", t);
      const Printer = await printerGroups.create(
        {
          title: req.body.title,
          description: req.body.Description,
          printType: req.body.printType,
        },
        { transaction: t }
      );
      const triggerData = req.body.printerGroupTriggers;
      const preparedTriggerObjArr = triggerData.map((trigger) => {
        trigger.printerGroupId = printerGroups.id;
        return trigger;
      });
      console.log(preparedTriggerObjArr);
      await printerGroupTriggers.bulkCreate(preparedTriggerObjArr, { transaction: t });
      await t.commit();
      res.status(200).send({
        title: Printer.title,
        description: Printer.description,
        printType:Printer.printType,
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(404).send({ error: "The Printer Does not Created!" });
    }
};

//Printer List
const list = async (req, res) => {
    try {
      const find = await printerGroups.findAll({
        include: [
          {
            model: printerGroupTriggers,
          },
        ],
      });
      res.status(200).send(find);
    } catch (err) {
      console.log(err);
      res.status(404).send({ error: "The Printers does not Display!" });
    }
  };
  
  //Update Printer
  const update = async (req, res) => {
    try {
         await printerGroups.update(
          {
            title: req.body.title,
            description: req.body.description,
            printType: req.body.printType,
          },
          { where: { id: printerGroupId } }
        );
        res.status(200).send({
          title:req.body.title,
          description: req.body.description,
          printType: req.body.printType,
        });
    } catch (error) {
      console.log(error);
      res.status(404).send({ error: "The Printer does not update." });
    }
};

//update trigger
const updateTrigger = async (req, res) => {
    try {
        const Id = req.params;
         await printerGroupTriggers.update(
          {
            trigger: req.body.title,
            orderType: req.body.orderType,
          },
          { where: { id: Id} }
        );
        res.status(200).send({
          trigger:req.body.trigger,
          orderType: req.body.printType,
        });
    } catch (error) {
      console.log(error);
      res.status(404).send({ error: "The Printer does not update." });
    }
};
module.exports = { create,list,update,updateTrigger};
