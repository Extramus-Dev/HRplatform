import mongoose from "mongoose";

const statusEnum = ["Not Submitted", "Needs Review", "Incorrect", "Correct"];

const InternSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  startDate: { type: String },
  endDate: { type: String },
  durationInWeeks: { type: Number },
  departement: { type: String, maxlength: 30 },
  position: { type: String, maxlength: 30 },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  attendance: {
    statusOfTheDay: { type: String, default: '' },
    present: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    dayOff: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    late: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    excusedLeave: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    sick: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    unexcusedleave: {
      count: { type: Number, default: 0 },
      dates: Array
    }
  },
  departure: {
    departureDate: String,
    departureTime: String,
    departureCity: String,
    pickBy: String,
  },
  documents: {
    learningAgreementAfter: {
      type: String,
      enum: statusEnum,
      default: "Not Submitted",
    },
    accommodationLetter: {
      type: String,
      enum: statusEnum,
      default: "Not Submitted",
    },
    internDevelopmentPlan: {
      type: String,
      enum: statusEnum,
      default: "Not Submitted",
    },
    confidentialityAgrement: {
      type: String,
      enum: statusEnum,
      default: "Not Submitted",
    },
  }
});

export default mongoose.models.Intern || mongoose.model("Intern", InternSchema);
