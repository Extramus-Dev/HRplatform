import mongoose from "mongoose";

const weeklyScheduleSchema = mongoose.Schema({
  Group: { type: String, required: true },
  Schedule: {
    monday: { startTime: { type: String }, endTime: { type: String } },
    tuesday: { startTime: { type: String }, endTime: { type: String } },
    wednesday: { startTime: { type: String }, endTime: { type: String } },
    thursday: { startTime: { type: String }, endTime: { type: String } },
    friday: { startTime: { type: String }, endTime: { type: String } },
  },
});

export default mongoose.models.WeeklySchedule ||
  mongoose.model("WeeklySchedule", weeklyScheduleSchema);
