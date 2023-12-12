var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var GuideSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  activity: String,
  activity: {
    type: Schema.Types.Array,
    default: [],
  },
  language: String,
  language: {
    type: Schema.Types.Array,
    default: [],
  },
  availableTravels: [
    {
      travelName: {
        type: String,
        required: [true, "Insert your travelName"],
        unique: [true, "travelName have to be unique string."],
      },
      travelType: {
        type: String,
        required: [true, "Insert your travelType"],
        unique: [true, "travelType have to be unique string."],
      },
      travelIntroImageUrl: {
        type: String,
        required: [true, "Insert your travelName"],
      },
      hour: {
        type: Number,
        required: [true, "Insert your travelName"],
      },
      price: {
        type: Number,
        required: [true, "Insert your travelName"],
      },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
});

mongoose.model("Guide", GuideSchema, "guide");
