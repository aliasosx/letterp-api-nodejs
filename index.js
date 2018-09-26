var express = require('express');
const Dbconnect = require('./libs/dbconnect');
const bcrypt = require('bcrypt');

app = express();
server = require('http').createServer(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let mysqlConn = new Dbconnect();
var conn = mysqlConn.getConnection();


var data;
conn.connect(function(err){
    if(err) throw err;
    app.get('/', function(req, res){
        conn.query("select * from users", function(err, result, field){
            if (err) throw err;
            data = result;
            console.log(data);
            res.send({ data });
        });
    }); 
    //Add User
    app.post('/add', function(req,res){
        try {
            var email = req.body.email;
            var user_name = req.body.user_name;
            var role_id = req.body.role_id;
            let password  = bcrypt.hashSync(req.body.password, 10);
            
            conn.query("insert into users (user_name,email,password_digest,role_id) values ('" + user_name + "','" + email + "','" + password + "','" + role_id + "')", function(err,result,field){ 
                console.log('Data inserted'); 
                res.redirect('/');
            });
        
        } catch(err) {
            console.log(err);
        }
    });
    //Authentication method
    app.post('/login', function(req,res){
        try {
            var email = req.body.email;
            var password = req.body.password;
            let isLogin = false
            conn.query("select password_digest from users where email='" + email +"'", function(err,result,field){
                let hash = result[0].password_digest;

                if (bcrypt.compareSync(password, hash)){
                    res.send({ status:'Successful' });
                } else {
                    res.send({ status:'failed' });
                }
            });
            
        } finally {
            
        }
    });
    //getProductCatehories
    app.get('/product_categories', function(req,res){
        conn.query("select * from product_categories", function(err,result,field){
            res.send(result);
        });
    });
    //add ProductCatehories
    app.post('/add_product_categories', function(req,res) {
        let product_cat_code = req.body.product_cat_code;
        let product_cat_name = req.body.product_cat_name;
        let updated_by = req.body.updated_by;
        conn.query("insert into product_categories(product_cat_code,product_cat_name, updated_by) values ('" + product_cat_code + "','" + product_cat_name + "','" + updated_by + "')", function(err,result,field){
            if(err){
                res.send({ status: 'Insert failed' , 'message': err.sqlMessage });
            } else {
                res.send({ status: 'Success' });
            }
        });
    });
    //Get All Product
    app.get('/products', function(req,res){
        conn.query("select * from products", function(err,result, field){        
            res.send({ result });
        });
    });
    //Add Product
    app.post('/addProduct', function(req,res){
        let product_code = req.body.product_code;
        let product_name = req.body.product_name;
        let product_cat_code = req.body.product_cat_code;
        let photo_src = req.body.photo_src;
        let sale_price = req.body.sale_price;
        let cost_price = req.body.cost_price;
        let updated_by = req.body.updated_by;
        let curr_code  = req.body.curr_code;

        conn.query("insert into products (product_code,product_name,product_cat_code,photo_src,sale_price,cost_price,updated_by,curr_code) values ('" + product_code + "','" + product_name + "','" + product_cat_code + "','" + photo_src + "','" + sale_price + "','" + cost_price + "','" + updated_by + "',"+ curr_code +")", function(err){
            if(err){
                res.send({ status: 'Insert failed' , 'message': err.sqlMessage });
            } else {
                res.send({ status: 'Success' });
            }
        });
        
    });
    //Ordering Management
    app.post('/addOrders', function(req,res){
        let order_id                = req.body.order_id;
        let customer_code           = req.body.customer_code;
        let product_code            = req.body.product_code;
        let quantity                = req.body.quantity;
        let sale_price              = req.body.sale_price;
        let total_price             = req.body.total_price;
        let discount
        let total_with_discount
        let tax
        let total_with_tax
        let Grand_total
        let paid
        let saler

    });

});


server.listen(3000,function(){
    console.log('Server started!') 
}); 