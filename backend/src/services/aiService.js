export const summarizeMeeting = async (
  transcript
) => {

  try {

    const text = transcript || "";

    // Split sentences
    const sentences =
      text.split(".");

    // Summary
    const summary =
      sentences
        .slice(0, 3)
        .join(". ")
        .trim() + ".";

    // Action Items
    const actionItems =
      sentences.filter((s) =>
        s.toLowerCase().includes("action")
      );

    // Decisions
    const decisions =
      sentences.filter((s) =>
        s.toLowerCase().includes("decided")
      );

    // Key Points
    const keyPoints =
      sentences
        .slice(0, 5)
        .map((s) => s.trim())
        .filter(Boolean);

    // Risks
    const risks =
      sentences.filter((s) =>
        s.toLowerCase().includes("risk")
      );

    return {

      summary:
        summary ||
        "AI summary generated.",

      keyPoints:
        keyPoints.length
          ? keyPoints
          : [
              "Meeting discussion analyzed",
            ],

      actionItems:
        actionItems.length
          ? actionItems
          : [
              "No action items detected",
            ],

      decisions:
        decisions.length
          ? decisions
          : [
              "No decisions detected",
            ],

      risks:
        risks.length
          ? risks
          : [
              "No risks detected",
            ],

      sentiment:
        "Positive",
    };

  } catch (error) {

    console.log(error);

    return {

      summary:
        "AI summary failed.",

      keyPoints: [],

      actionItems: [],

      decisions: [],

      risks: [],

      sentiment: "Neutral",
    };
  }
};