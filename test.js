var URL_ROOT = 'http://localhost:9998';

describe('Category API', function(){
	var server;
	var Category;

	before(function(){
		var app = express();

		// Bootstrap server
		models = require('.models')(wagner);
		app.use(require('./api')(wagner));

		server = app.listen(9998);

		// Make Category model available in tests
		Category = models.Category;
	});

	after(function(){
		// Shut the server down when we're done
		server.close();
	});

	beforeEach(function(done){
		// Make sure categories are empty before each test
		Category.remove({}, function(error) {
			assert.ifError(error);
			done();
		});
	});

	it('can load a category by id', function(done){
		// Create a single category
		Category.create({_id: 'Electronics'}, function(error, doc){
			assert.ifError(error);
			var url = URL_ROOT + '/category/id/Eletronics';
			// Make an HTTP request to localhost:port/category/id/Eletronics
			superagent.get(url, function(error, response) {
				assert.ifError(error);
				var result;
				// And make sure we got { _id: 'electronics'} back
				assert.doesNotThrow(function(){
					result = JSON.parse(res.text);
				});
				assert.ok(result.category);
				assert.equal(result.category._id, 'Electronics');
				done();
			});
		});
	});

	it('can load all categories that have a certain parent', function(done){
		var categories = [
			{_id: 'Electronics'},
			{_id: 'Phones', parent: 'Electronics'},
			{_id: 'Laptops', parent: 'Electronics'},
			{_id: 'Bacon'}		
		];

		// Create 4 categories
		Category.create(categories, function(error, categories){
			var url = URL_ROOT + '/category/parent/Electoronics';
			superagent.get(url, function(error, response){
				assert.ifError(error);
				var result;
				assert.doesNotThrow(function(){
					result = JSON.parse(response.text);
				});
				assert.equal(result.categories.length, 2);
				assert.equal(result.categories[0]._id, 'Laptops');
				assert.equal(result.categories[1]._id, 'Phones');
				done();
			});
		});
	});
});

/*
var assert = require('assert');

describe('my feature', function() {
	it('works', function() {
		assert.equal('A','A');
	});

	it('fails gracefully', function() {
		assert.throws(function() {
			throw 'Error!';
		});
	});
});

describe('my other feature', function(){
	it('async', function(done){
		setTimeout(function(){
			done();
		},25);
	});
});
*/