

var  commonHelper = require('../Helper');
module.exports = (sequelize,Sequelize)=>{
const printerGroups= sequelize.define(
    'PrinterGroups',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        field: 'c1',
    },
    title:{
        type : Sequelize.STRING,
        allowNull : false,
        field:'c2',
    },
    description:{
        type : Sequelize.STRING,
        allowNull : true,
        field:'c3',
    },
    printType:{
        type : Sequelize.ENUM(1,2),
        field:'c4', 
    },
    printerCount:{
        type : Sequelize.INTEGER,
        field:'c5',
    },
    createdAt:{
        type: Sequelize.INTEGER,
        allowNull : false,
        field:'c6',
    },
    updatedAt:{
        type: Sequelize.INTEGER,
        allowNull : false,
        field:'c7',
    },
    createdBy:{
        type: Sequelize.INTEGER,
        allowNull : false,
        field:'c8',
    },
    updatedBy:{
        type: Sequelize.INTEGER,
        allowNull : false,
        field:'c9',
    },
    activeStatus:{
        type : Sequelize.BOOLEAN,
        allowNull : false,
        field:'c10',
    },
   
},
{
tableName: 't109',
hasTrigger: true,
hooks: {
    beforeCreate(printerGroupObject, options){
        if(!printerGroupObject) 
        return printerGroupObject.createdAt =commonHelper.getTimeStamp();
    },
    beforeUpdate(printerGroupObject, options){
        if(!printerGroupObject) 
        return printerGroupObject.updatedAt =commonHelper.getTimeStamp();
    },
  },
},
);
// printerGroups.associate = function(models){
//     printerGroups.belongsTo(models.printerGroupTriggers,{foreignkey:"printerGroupId"})
// }
printerGroups.hasMany(printerGroupTriggers,{ foreignKey: 'printerGroupId' });
printerGroupTriggers.belongsTo(printerGroups);
return printerGroups;
}

