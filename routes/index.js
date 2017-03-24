var express = require('express');
var connection = require('./db.js');
var router = express.Router();

/* GET home page. */
connection.connect(function(err){
if(err)
	console.log("Error in connection :(");
else
	console.log("Database Connected :)");
});

router.get('/', function(req, res, next) {
	 res.render('index', { title: 'Express with EJS' });
	 //next();
});

router.get('/getbooks',function(req,res,next){
	connection.query("select * from books",function(err,result){
		if(err)
			throw err;
		else
			console.log(result);
		res.render('get',{result:result});
	});
});

router.post('/postbooks',function(req,res,next){
	var name = req.body.name;
	var author = req.body.author;
	var price = req.body.price;
	//console.log(price);
	var data = {
		name : name,
		author : author,
		price : price
	};

	connection.query("insert into books set ?",data,function(err,result){
		if(err)
			throw err;
		console.log(result);
		res.render('index',{title:"Book Details Inserted"});
	});
});

router.delete('/delete',function(req,res,next){
	//console.log(req.params.id);
	//console.log("Matta");
	//console.log(req.body.id);
	var id = {
		id : req.body.id
	};
	connection.query("delete from books where ?",id,function(err,result){
		if(err)
			throw err;
		console.log(result);
		res.send("1");
	});
});

router.put('/update',function(req,res,next){
	var id = req.body.id;
	var price = req.body.price;
	//console.log(id);
	//console.log(price);
	connection.query("update books set price = ? where id = ?",[price,id],function(err,result){
		if(err)
			throw err;
		console.log(result);
		res.send("1");
	});
});

module.exports = router;
