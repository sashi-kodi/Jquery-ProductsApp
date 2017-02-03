var mongoose = require('mongoose');
 var productsSchema = new mongoose.Schema({
     
     name:{type:String, required:true},
     id:{type: Number},
     price: {type: Number},
     qty:{type: Number}
     
 });

var ProductsModel = mongoose.model('ProductsModel', productsSchema, 'ProductsDB');
module.exports = ProductsModel;