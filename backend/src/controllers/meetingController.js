import Meeting from "../models/Meeting.js";

import {
  summarizeMeeting,
} from "../services/aiService.js";


// CREATE MEETING
export const createMeeting = async (req, res) => {
  try {

    const title = String(
      req.body.title || ""
    ).trim();

    let transcript = String(
      req.body.transcript || ""
    ).trim();

    // TEMPORARY AUDIO HANDLING
    if (!transcript && req.file) {

      transcript =
        "Audio uploaded successfully. AI transcription disabled because OpenAI quota is unavailable.";
    }

    // VALIDATION
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Meeting title is required.",
      });
    }

    if (!transcript && !req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Transcript or audio file is required.",
      });
    }

    const aiData =
  await summarizeMeeting(
    transcript
  );
  console.log(aiData);
    const {
      summary = "",
      keyPoints = [],
      actionItems = [],
      decisions = [],
    } = aiData;

    // SAVE MEETING
    const meeting = await Meeting.create({
      user: req.user._id,
      title,
      transcript,
      summary,
      keyPoints,
      actionItems,
      decisions,
    });

    return res.status(201).json({
      success: true,
      meeting,
    });

  } catch (error) {

    console.log("========== ERROR ==========");
    console.log(error);
    console.log("MESSAGE:", error.message);

    if (error.response) {
      console.log("RESPONSE DATA:");
      console.log(error.response.data);
    }

    console.log("===========================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL MEETINGS
export const getMeetings = async (req, res) => {
  try {

    const meetings = await Meeting.find({
  user: req.user._id,
})
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      meetings,
    });

  } catch (error) {

    console.error(
      "MEETING FETCH ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to retrieve meetings at this time.",
    });
  }
};


// GET SINGLE MEETING
export const getMeetingById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid meeting ID",
      });
    }

    const meeting =
      await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    return res.status(200).json({
      success: true,
      meeting,
    });

  } catch (error) {

    console.error(
      "GET MEETING ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to fetch meeting",
    });
  }
};


// DELETE MEETING
export const deleteMeeting = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const meeting =
      await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    await meeting.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Meeting deleted successfully",
    });

  } catch (error) {

    console.error(
      "DELETE MEETING ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete meeting",
    });
  }
};