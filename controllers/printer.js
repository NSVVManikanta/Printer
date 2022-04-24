const printerGroups = require('../models/PrinterGroups');
const printerGroupTriggers = require('../models/PrinterGroupTriggers');
const { sequelize } = require("../models/PrinterGroups");
const Joi = require("joi");

//Create Printer
const schema = Joi.object({
    title: Joi.string().alphanum().min(0).max(250).required(),
    description: Joi.string().alphanum().min(0).max(250).required(),
    printType: Joi.enum().required(),
    triggers: Joi.array().items(
      Joi.object({
        trigger: Joi.enum().required(),
        orderType:Joi.enum().required(),
      })
    ),
  });
const create = async (req, res) => {
    try{
    const dataToValidate = {
        title: req.body.title,
        description: req.body.description,
        printType: req.body.printType,
        triggers: req.body.triggers,
      };
      const schemaerr = schema.validate(dataToValidate);
  if (schemaerr.error) {
    return res.status(404).send(schemaerr.error.message);
  } else { 
    let t;
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
  const schema1 = Joi.object({
    title: Joi.string().alphanum().min(2).max(250).required(),
    description: Joi.string(),
    printType: Joi.enum(),
  });
  const update = async (req, res) => {
      try{
        const dataToValidate1 = {
            title: req.body.title,
            description: req.body.description,
            printType: req.body.printType,
          };
          const schemaerr1 = schema1.validate(dataToValidate1);
          if (schemaerr1.error) {
            return res.send(schemaerr1.error.message);
          } else {
        const printerGroupId =req.params;
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
    }
    } catch (error) {
      console.log(error);
      res.status(404).send({ error: "The Printer does not update." });
    }

};

//update trigger
const schema2 = Joi.object({
    trigger: Joi.enum(),
    orderType: Joi.enum(),
  });
const updateTrigger = async (req, res) => {
    try{
        const dataToValidate2 = {
            trigger: req.body.trigger,
            orderType: req.body.orderType,
          };
          const schemaerr1 = schema2.validate(dataToValidate2);
          if (schemaerr1.error) {
            return res.send(schemaerr1.error.message);
          } else {
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
          orderType: req.body.orderType,
        });
    }
    } catch (error) {
      console.log(error);
      res.status(404).send({ error: "The Printer does not update." });
    }
};
module.exports = { create,list,update,updateTrigger};
