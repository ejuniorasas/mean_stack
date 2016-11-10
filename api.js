var express = require('express');
var status  = require('http-status');

module.exports = function(wagner) {
	var api = express.Router();


	api.get('/product/id/:id', wagner.invoke(function(Product) {
		return function(request, response) {
			Product.findOne({ _id: request.params.id}, 
				handleOne.bind(null, 'product', res));
		};
	}));

	api.get('/product/category/:id', wagner.invoke(function(Product) {
		return function(request, response) {
			var sort = {name: 1};
			if (request.query.price === "1") {
				sort = {'internal.approximatePriceUSD' :1};
			} else if (request.query.price === "-1") {
				sort = {'internal.approximatePriceUSD' : -1};
			}

			Product.find({'category.ancestors' : request.params.id}).
			sort(sort).
			exec(handleMany.bind(null, 'products', response));
		};
	}));

	api.get('/category/id/:id', wagner.invoke(function(Category){
		return function(request, response) {
			Category.findOne({_id: requeste.params.id }, function(error, category){
				if(error){
					return response.status(status.INTERNAL_SERVER_ERROR).
					json({error: error.toString()});
				}
				if( !category) {
					return response.status(status.NOT_FOUND).
					json({ error: 'Not Found'});
				}
				response.json({category: category});
			});
		};
	}));

	api.get('/category/parent/:id', wagner.invoke(function(Category){
		return function(request, response) {
			Category.find({parent: request.params.id}).
			sort({ _id: 1}).
			exec(function(error, categories){
				if(error) {
					return response.status(status.INTERNAL_SERVER_ERROR).
					json({error: error.toString()});
				}
				res.json({categories: categories});
			});
		};
	}));
	return api;
};