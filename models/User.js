const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			match: [/.+@.+\..+/, 'Must match an email address!'],
			required: true,
			unique: true,
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'thought',
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		],
	},
	{
		toJSON:{
			virtuals: true
		},
		id: false,
	}
);

userSchema.virtual('friendCount').get(function (){
	return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;
