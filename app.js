var express = require("express");

var app = express();



var http = require('http');

var bodyParser = require("body-parser");

var fs = require('fs');



app.use(express.static("views")); // Allow access to content of views folder

app.use(express.static("scripts")); // Allow access to scripts folder


app.use(express.static("images")); // Allow access to images folder



app.set("view engine", "jade"); // This line sets the default view engine 



app.use(bodyParser.urlencoded({extended:true}));



var shops = require("./model/shops.json");


//function to call shops page when shops page is called
app.get('/shops', function(req, res){

  res.render("shops", 

             {shops:shops} // Inside the {} option we call the shop variable from line 18 above 

            ); 

  console.log("Shops page is now rendered");

});



var products = require("./model/products.json"); // allow the app to access the products.json file



// This function calls the index view when somebody goes to the site route.

app.get('/', function(req, res) {

  res.render("index");

  console.log("Home page now rendered"); // the log function is used to output data to the terminal. 

  });





// This function calls the products page when somebody calls the products page

app.get('/products', function(req, res){

  res.render("products", 

             {products:products} // Inside the {} option we call the products variable from line 27 above 

            ); 

  console.log("Products Page is rendered");

  

  

});



// Contact form



app.get('/contact', function(req, res){

  res.render("contact");

  console.log("Page is rendered");

});







// This function calls the show individual shops page

app.get('/details/:name' , function(req, res){

	

	

	// create a function to filter the shops data

	function findShop(which) {

    return which.name === req.params.name;

}

	

	console.log(products.filter(findShop)); // log the split filter based on the check age function 

 indi = shops.filter(findShop); // filter the shops and declare the filtered data as a sepreate variable

	

  res.render("details",

             {indi:indi} // Inside the {} option we call the shops variable from line 10 above

						); 



  console.log("Individual page loaded");

  

});





// This function calls the show individual products page

app.get('/show/:name' , function(req, res){

	

	

	// create a function to filter the products data

	function findProd(which) {

    return which.name === req.params.name;

}

	

	console.log(products.filter(findProd)); // log the split filter based on the check age function 

 indi = products.filter(findProd); // filter the products and declare the filtered data as a sepreate variable

	

  res.render("show",

             {indi:indi} // Inside the {} option we call the products variable from line 10 above

						); 

	

	

  console.log("Individual page loaded");

  

  

});



// Function to call the add product page



app.get('/add', function(req, res){

			 res.render("add");

	     console.log("Page rendered");

			 
			 });


// Function to create a new product



app.post('/add', function(req, res){

	var count = Object.keys(products).length; // Tells us how many products we have

	console.log(count);

	

	// This will look for the current largest id

	

	function getMax(products , id) {

		var max

		for (var i=0; i<products.length; i++) {

			if(!max || parseInt(products[i][id]) > parseInt(max[id]))

				max = products[i];

			

		}

		return max;

	}

	

	var maxPpg = getMax(products, "id");

	newId = maxPpg.id + 1;

	console.log(newId);

	

	// create a new product based on what we have in our form on the add page 

	

	var product = {

		name: req.body.name, 

		id: newId, // this is the variable created above

		category: req.body.category, 

		price: req.body.price,

		image: req.body.image

	};

	

	var json  = JSON.stringify(products); // Convert from object to string

	

	fs.readFile('./model/products.json', 'utf8', function readFileCallback(err, data){

							if (err){

		console.log("oops");

	 }else {

		products.push(product); // add the information from the above variable

		json = JSON.stringify(products, null , 4); // converted back to JSON

		fs.writeFile('./model/products.json', json, 'utf8'); // Write the file back

		

	}});

	res.redirect("/products")

});



// code to render the edit product pageXOffset

app.get('/edit/:name', function(req, res){

	

	console.log("Edit page Shown");

		

	function chooseProd(indOne){

		return indOne.name === req.params.name;	

		}

	

	var indOne = products.filter(chooseProd);

	

	res.render("edit",

						{indOne:indOne}

						);

	

	console.log(indOne);

	});



//edit products function

app.post('/edit/:name', function(req, res){

	var json = JSON.stringify(products);

	

	var keyToFind = req.params.name; // call name from the url

			

			// var str = products;

			

			var data = products;

			var index = data.map(function(product) {return product.name;}).indexOf(keyToFind)

			

			var x = req.body.newname;

			var y = req.body.newcategory;

			var z = req.body.newprice;

			var w = req.body.newimage;

			

			products.splice(index, 1 , {name: x, category: y, price: z , image: w} );

			

			json = JSON.stringify(products, null, 4);

			

			fs.writeFile('./model/products.json', json, 'utf8'); // Writing the data back to the file


// 	fs.readFile('./model/products.json', 'utf8', function readFileCallback(err, data1){

// 		if (err){

// 			console.log("something Went Wrong");

// 		} else {

			
// 		}
		

// 	})

	res.redirect("/products");

});



// delete products



	app.get('/delete/:name', function(req, res){

		// allow to access file we want to modify

		

		fs.readFile('./model/products.json');

		

		var keytoFind = req.params.name; // go through products and find position based on item name

		

		var index2 = products.map(function(d) {return d.name;}).indexOf(keytoFind); // we are finding position and declare that position as variable index2

		// log the position and the name of the products in the console

		

		console.log("one to delete is" + keytoFind);

		products.splice(index2, 1);  // this deletes one product only from location name occurs

		

		json = JSON.stringify(products, null, 4);

        fs.writeFile('./model/products.json', json, 'utf8');  //  write data back to our persistent data

        

        console.log("it worked");

        res.redirect("/products")

	});

//function to add a new shop

app.get('/addshop', function(req, res){
		 res.render("addshop");//shows the addshop jade file
	     console.log(" page rendered")	 
			 });

// Function to create a new shop

app.post('/addshop', function(req, res){
	var count = Object.keys(shops).length; // Tells us how many shops we have
	console.log(count);
	
	// This will look for the current largest id
	
	function getMaxID(shops, id) {
		var maxID
		for (var i=0; i<shops.length; i++) {
			if(!maxID || parseInt(shops[i][id]) > parseInt(maxID[id]))
				maxID = shops[i];
		}
		return maxID;
	}
	
	var maxShops1= getMaxID(shops, "id");
	var newShopID= maxShops1.id + 1;
	console.log(maxShops1.id);
	
	// create a new shop based on what we have in our form on the add page 
	
	var shop = {
		name: req.body.newname, 
		id: newShopID, // this is the variable created above
		address: req.body.newaddress,
		phone: req.body.newphone,
		email: req.body.newemail,
		image: req.body.newimage
	};
	var bodyParser = require("body-parser");//to parse 
	var json  = JSON.stringify(shops); // Convert from object to string
	
	fs.readFile('./model/shops.json', 'utf8', function readFileCallback(err, data){
							if (err){
		console.log("oops");
	 }else {
		shops.push(shop); // add the information from the above variable
		json = JSON.stringify(shops, null , 4); // converted back to JSON
		fs.writeFile('./model/shops.json', json, 'utf8'); // Write the file back
		
	}});
	console.log(shop)
	res.redirect("/shops")
});

// code to render the editshop page

app.get('/editshop/:name', function(req, res){

	

	console.log("Edit page Shown");

		

	function chooseShop(indShop){

		return indShop.name === req.params.name;	

		}

	

	var indShop = shops.filter(chooseShop);

	

	res.render("editshop",

						{indShop:indShop}

						);

	

	console.log(indShop);

	});



//edit shops function 

app.post('/editshop/:name', function(req, res){

	var json = JSON.stringify(shops);

	

	var keyToFind = req.params.name; // call name from the url

			

			// var str = shops;

			

			var data = shops;

			var index = data.map(function(shop) {return shop.name;}).indexOf(keyToFind)

			

			var x = req.body.newname;

			var y = req.body.newaddress;

			var z = req.body.newemail;

			var w = req.body.newphone;
			
			var v = req.body.newimage;

			

			shops.splice(index, 1 , {name: x, address: y, email: z , phone: w, image: v} );

			

			json = JSON.stringify(shops, null, 4);

			

			fs.writeFile('./model/shops.json', json, 'utf8'); // Writing the data back to the file


// 	fs.readFile('./model/products.json', 'utf8', function readFileCallback(err, data1){

// 		if (err){

// 			console.log("something Went Wrong");

// 		} else {

			
// 		}
		

// 	})

	res.redirect("/shops");

});

// function to delete shops

	app.get('/deleteshop/:name', function(req, res){
		
		// allow access to file we want to modify
		fs.readFile('./model/shops.json');

		var keytoFind = req.params.name; // start of loop to find position based on item name

		var indexShop = shops.map(function(a) {return a.name;}).indexOf(keytoFind); // we are finding position and declare that position as variable index2

		// log the position and the name of the shops in the console
		console.log("one to delete is" + keytoFind);

		shops.splice(indexShop, 1);  // this deletes one shop only from location name occurs

		json = JSON.stringify(shops, null, 4);

        fs.writeFile('./model/shops.json', json, 'utf8');  //  write data back to our persistent data
        
        console.log("Deleted");

		res.redirect('/shops')
	});	


// This function gets the application up and running on the development server.

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){

  console.log("We are operational");

})