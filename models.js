var mongoose = require('mongoose');

module.exports = function(wagner){
	mongoose.connect('mongodb://192.168.99.100:32768/test');

	var Category = mongoose.model('Category', require('./schema/category'), 'categories');

	var Product = mongoose.model('Product', require('./schema/product'), 'products');

	var models = {
		Category: Category,
		Product: Product
	};

	// To ensure Dry-ness, register factories in a loop

	_.each(models, function(value, key) {
		wagner.factory(key, function() {
			return value;
		});
	});
	/*
	wagner.factory('Category', function(){
		return Category;
	});

	return {
		Category: Category;
	}*/
};