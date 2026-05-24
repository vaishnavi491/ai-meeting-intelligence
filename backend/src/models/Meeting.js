import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },

    title: {
      type: String,
      required: true,
    },

    transcript: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
    },

    keyPoints: [
      {
        type: String,
      },
    ],

    actionItems: [
      {
        type: String,
      },
    ],

    decisions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;