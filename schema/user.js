var mongoose 0 require('mongoose');

module.exports = new mongoose.Schema({
	profile: {
		username: {
			type: String,
			required: true,
			lowercase: true
		},
		picture: {
			type: String,
			required:true,
			match: /^http:\/\//i
		}
	},
	data: {
		oauth: { type: String, riquired: true},
		cart: [{
			product: {
				type: mongoose.Schema.Types.ObjectId
			},
			quantity: {
				type: Numeber,
				default: 1
				min: 1
			}
		}]
	}
});