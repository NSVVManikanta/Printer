'Use Strict'
var  commonHelper = require('../Helper')
module.exports = (sequelize,Sequelize)=>{


const printerGroupTriggers= sequelize.define(
    'PrinterGroupTriggers',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        field: 'c1',
    },
    printerGroupId:{
        type : Sequelize.INTEGER,
        allowNull : false,
        field:'c2',
    },
    trigger:{
        type : Sequelize.ENUM(1,2,3),
        allowNull : true,
        field:'c3',
    },
    orderType:{
        type : Sequelize.ENUM(1,2),
        field:'c4', 
    },
    createdAt:{
        type: Sequelize.INTEGER,
        allowNull : false,
        field:'c5',
    },
    updatedAt:{
        type: Sequelize.INTEGER,
        allowNull : false,
        field:'c6',
    },
    createdBy:{
        type: Sequelize.INTEGER,
        allowNull : false,
        field:'c7',
    },
    createdBy:{
        type: Sequelize.INTEGER,
        allowNull : false,
        field:'c8',
    },
},
{
tableName: 't110',
hasTrigger: true,
hooks: {
    beforeCreate(printerGroupObject, options){
        if(!printerGroupObject) 
        return printerGroupObject.createdAt = commonHelper.getTimeStamp();
    },
    beforeUpdate(printerGroupObject, options){
        if(!printerGroupObject) 
        return printerGroupObject.updatedAt = commonHelper.getTimeStamp();
    },
  },
},
);
// printerGroupTriggers.associate = function(models){
//     printerGroupsTriggers.hasMany(models.printerGroups,{foreignkey:"printerGroupId"})
// }
return printerGroupTriggers
}
