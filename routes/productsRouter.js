var express = require('express');
var router = express.Router();
var ProductsModel = require('../Models/ProductsModel');
var sortObj = require('sort-object');

router.get('/', function(req,res){
 ProductsModel.find({}, function(err,productsData){
     var newdata=[];
     if(err) console.log('There was an error while trying to read the records from the database');
     else{
         for(var i=0;i<productsData.length;i++){
             //sort each record using sortObj
             
             newdata.push(sortObj(productsData[i],{keys:['id', 'name', 'price', 'qty']}));
             
         }// end of for loop
         res.json(newdata);
     }
 });   
});

router.get('/:pid', function(req,res){
   ProductsModel.findOne({id: req.params.pid}, function(err,data){
       if(err) console.log("Error occured while trying to read the product data from the database");
       else{
         
           res.json(sortObj(data,{keys:['id', 'name', 'price', 'qty']}));
       }
   }); 
});

router.post('/',function(req,res){
   
    var newdata = req.body;
    console.log(newdata);
    ProductsModel.create({name:newdata.name, id:newdata.id, price: newdata.price, qty:newdata.qty}, function(err,data){
        
        if(err) console.log('Error occured while trying to post the new data');
        else{
            res.json({message:"Data has been added succesffully"});
        }
        
    });
    
});

router.put('/:pid', function(req,res){
    var newinfo = req.body;
    ProductsModel.findOne({id: req.params.pid}, function(err,result){
        
        if(err) console.log("Error occured while trying the read the record from the database");
        else{
            if(!result){
                res.json({message:"Such a Product does not exist in the Database"});
            }
            else{
               //update the info from the body
                for(key in newinfo){
                    result[key] = newinfo[key];
                }
                result.save(function(err,data){
                    res.json({message:"Product has been updated in the Database"});
                });
            }
        }
        
    });
});

router.delete('/:pid', function(req,res){
   ProductsModel.findOne({id: req.params.pid}, function(err,result){
     if(err) console.log("Error occured while trying to retrieve product detail from the server : " + req.params.pname);
       else{
           if(!result){
               // result is null means no such product in the databse
               res.json({message:'Such a product does not exist in database'});
           }
           else{
               result.remove(function(err,data){
                  res.json({message:'Product has been deleted successfully'}); 
               });
           }
       }
   }); 
});

module.exports = router;