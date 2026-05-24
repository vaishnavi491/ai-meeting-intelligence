import { useEffect, useState } from "react";
import axios from "axios";

function MeetingHistory() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");

const response = await axios.get(
  "http://localhost:5000/api/meetings",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setMeetings(response.data.meetings || []);

      setMeetings(response.data.meetings || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMeeting = async (id) => {
    try {
      const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/meetings/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMeetings((prev) =>
      prev.filter((meeting) => meeting._id !== id)
    );

  } catch (error) {
    console.log(error);
    alert("Delete failed");
  }
};

      setMeetings(
        meetings.filter((meeting) => meeting._id !== id)
      );

    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Meeting History
      </h1>

      {meetings.length === 0 ? (
        <div className="bg-slate-800 rounded-2xl p-6">
          No meetings found
        </div>
      ) : (
        <div className="space-y-4">

          {meetings.map((meeting) => (
            <div
              key={meeting._id}
              className="bg-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between">

                <div>
                  <h2 className="text-2xl font-bold">
                    {meeting.title || "Untitled Meeting"}
                  </h2>

                  <p className="mt-3 text-slate-300">
                    {meeting.summary || "No summary available"}
                  </p>
                </div>

                <button
                  onClick={() => deleteMeeting(meeting._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MeetingHistory;