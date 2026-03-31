const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Food title is required"],
		},
		description: {
			type: String,
			required: [true, "Food description is required"],
		},
		price: {
			type: Number,
			required: [true, "Food price is required"],
		},
		imageUrl: {
			type: String,
			default:
				"https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?s=2048x2048&w=is&k=20&c=wydysVEp52o1ULrj9XWI_f8M2lZ06qm8xlBl6GmjTSQ=g",
		},
		foodTags: {
			type: String,
		},
		catgeory: {
			type: String,
		},
		code: {
			type: String,
		},
		isAvailabe: {
			type: Boolean,
			default: true,
		},
		isVeg: {
			type: Boolean,
			default: false,
		},
		rating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
		ratingCount: {
			type: Number,
			default: 0,
		},
		popularity: {
			type: Number,
			default: 0,
		},
		averageRating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
		reviewCount: {
			type: Number,
			default: 0,
		},
		ratings: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				rating: {
					type: Number,
					min: 1,
					max: 5,
				},
				comment: {
					type: String,
					default: "",
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Foods", foodSchema);
