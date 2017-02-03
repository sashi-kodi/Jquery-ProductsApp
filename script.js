$(document).ready(function(){
    var productslist;
    var cur=0;
    
    $('#status').hide();
    $("#getProducts").click(function(){
         $.get('/api/products', function(data){
        productslist = data;
             if(data.length === 0){
                 cur=0;
                  $('#status').text("There are no products in Database");  
                    $('#status').show();
             }
             
                  showProductsData();
             
       
    });
    
    });
   
    
    $("#productsList").on('click', '.updatebtn', function(e){
        var rowElement = $(this).closest('tr');
        var pid= $(rowElement).find('.id').text();
        var pname = $(rowElement).find('.name').val();
        var pprice = $(rowElement).find('.price').val();
        var pqty = $(rowElement).find('.qty').val();
        console.log("pid is :" + pid);
        console.log("pname is" +pname); console.log(pprice); console.log(pqty);
        
        $.ajax({url:'/api/products/' + pid, 
                 method: 'PUT',
                contentType: 'application/json',
                data:JSON.stringify({id:pid, name:pname, price: pprice, qty:pqty}),
                success: function(data,status){
                  $('#status').text(data.message);  
                    $('#status').show();
                    cur--;
                    $("#getProducts").click();
                }
               
               });
        
    });
    
    $("#productsList").on('click', '.deletebtn', function(e){
        var rowElement = $(this).closest('tr');
        var pid= $(rowElement).find('.id').text();
        
        $.ajax({url:'/api/products/' + pid, 
                 method: 'DELETE',
                success: function(data,status){
                  $('#status').text(data.message);  
                    $('#status').show();
                    $("#getProducts").click();
                    
                }
               
               });
    });
    
    
    $("#addProductBtn").click(function(e){
        e.preventDefault();
        var newProductData ={};
        
        newProductData.id = ++cur;
        newProductData.name = $('#newProductname').val();
        newProductData.price = $('#newProductprice').val();
        newProductData.qty = $('#newProductqty').val();
        
        $.post('/api/products', newProductData, function(data,status){
            $('#status').text(data.message);
            $('#status').show();
            $("#getProducts").click();
            $('#newProductname').val("");
             $('#newProductprice').val("");
             $('#newProductqty').val("");
        });
    });
    
    
    
    function showProductsData(){
        $('#productsList').empty();
        var pid=[];
        var text="";
        for(var i=0;i<productslist.length;i++){
            text= "<tr>";
            for(var key in productslist[i]){
                
                if(key !== '_id'){
                    
                    if(key === 'id'){
                        pid.push(productslist[i][key]);
                        text+= "<td class=" + key + ">"  + productslist[i][key] +"</td>";
                    }
                    else{
                        
                    
                    text+= "<td>"  +"<input class='" + key + "' type='text' value='" + productslist[i][key] + "'>"+"</td>";
                    }
                   }// ignore the _id key   
                }
            cur = Math.max.apply(null,pid);
            text+="<td>"+ "<button class='btn btn-primary updatebtn'>Update</button>" +"</td>";
            text+= "<td>" + "<button class='btn btn-danger deletebtn'>Delete</button>" + "</td>";
            text+="</tr>";
            $('#productsList').append(text);
        }//end of for loop
        
    }
    
});
