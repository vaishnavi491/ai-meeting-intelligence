import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Sparkles, Trash2, Download } from "lucide-react";

function MeetingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    fetchMeeting();
  }, []);

  const fetchMeeting = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/meetings/${id}`);
      setMeeting(response.data.meeting);
    } catch (err) {
      console.log(err);
      setError("Failed to load meeting details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meeting?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/meetings/${id}`);
      toast.success("Meeting deleted");
      navigate("/meetings");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const downloadPDF = () => {
    if (!meeting) return;

    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(20);
    doc.text(meeting.title || "Meeting", 20, y);
    y += 15;
    doc.setFontSize(11);
    doc.text(`Created: ${new Date(meeting.createdAt).toLocaleString()}`, 20, y);
    y += 15;
    doc.setFontSize(16);
    doc.text("Summary", 20, y);
    y += 10;
    doc.setFontSize(12);
    const summaryLines = doc.splitTextToSize(meeting.summary || "", 170);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 7 + 10;
    if (meeting.keyPoints?.length) {
      doc.setFontSize(16);
      doc.text("Key Points", 20, y);
      y += 10;
      doc.setFontSize(12);
      meeting.keyPoints.forEach((point) => {
        const lines = doc.splitTextToSize(`� ${point}`, 170);
        doc.text(lines, 20, y);
        y += lines.length * 7 + 5;
      });
      y += 5;
    }
    if (meeting.actionItems?.length) {
      doc.setFontSize(16);
      doc.text("Action Items", 20, y);
      y += 10;
      doc.setFontSize(12);
      meeting.actionItems.forEach((item) => {
        const lines = doc.splitTextToSize(`� ${item}`, 170);
        doc.text(lines, 20, y);
        y += lines.length * 7 + 5;
      });
      y += 5;
    }
    if (meeting.decisions?.length) {
      doc.setFontSize(16);
      doc.text("Decisions", 20, y);
      y += 10;
      doc.setFontSize(12);
      meeting.decisions.forEach((decision) => {
        const lines = doc.splitTextToSize(`� ${decision}`, 170);
        doc.text(lines, 20, y);
        y += lines.length * 7 + 5;
      });
      y += 10;
    }
    doc.setFontSize(16);
    doc.text("Transcript", 20, y);
    y += 10;
    doc.setFontSize(11);
    const transcriptLines = doc.splitTextToSize(meeting.transcript || "", 170);
    doc.text(transcriptLines, 20, y);
    doc.save(`${meeting.title || "meeting-summary"}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-100">
        Loading meeting...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-slate-100">
        <p className="text-red-400 text-xl">{error}</p>
        <Link to="/meetings" className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Back to Meetings</Link>
      </div>
    );
  }

  const tabs = [
    { id: "summary", label: "Summary" },
    { id: "keyPoints", label: "Key Points" },
    { id: "actionItems", label: "Action Items" },
    { id: "decisions", label: "Decisions" },
    { id: "transcript", label: "Transcript" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-8">
      <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-400">
              <Sparkles size={14} /> AI analysis ready
            </div>
            <div>
              <p className="text-sm text-slate-400">Meeting detail</p>
              <h1 className="mt-2 text-4xl font-semibold text-white">{meeting.title}</h1>
            </div>
            <p className="text-slate-400">{meeting.summary || "No summary available yet."}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-400">
              <span>Created {new Date(meeting.createdAt).toLocaleString()}</span>
              <span>{meeting.actionItems?.length || 0} action items</span>
              <span>{meeting.decisions?.length || 0} decisions</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/meetings" className="inline-flex items-center gap-2 rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm text-slate-200 transition hover:border-slate-700"> <ArrowLeft size={16} /> Back</Link>
            <button onClick={downloadPDF} className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95"><Download size={16} /> Export PDF</button>
            <button onClick={handleDelete} className="inline-flex items-center gap-2 rounded-3xl border border-rose-500 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"><Trash2 size={16} /> Delete</button>
          </div>
        </div>

        <div className="sticky top-[120px] z-10 overflow-x-auto rounded-[2rem] border border-slate-800/90 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/20">
          <div className="flex min-w-[640px] gap-2">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${activeTab === tab.id ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950" : "bg-slate-950/80 text-slate-300 hover:bg-slate-900"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          {activeTab === "summary" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">Executive Summary</h2>
              <p className="text-slate-300 leading-8">{meeting.summary || "No summary available"}</p>
              <div className="rounded-2xl bg-slate-900 p-6 mt-6">

  <h2 className="text-2xl font-bold mb-4">
    Action Items
  </h2>

  <ul className="space-y-3">

    {meeting.actionItems?.map(
      (item, index) => (

        <li
          key={index}
          className="bg-slate-800 p-3 rounded-xl"
        >
          {item}
        </li>
      )
    )}

  </ul>

</div>

<div className="rounded-2xl bg-slate-900 p-6 mt-6">

  <h2 className="text-2xl font-bold mb-4">
    Decisions
  </h2>

  <ul className="space-y-3">

    {meeting.decisions?.map(
      (item, index) => (

        <li
          key={index}
          className="bg-slate-800 p-3 rounded-xl"
        >
          {item}
        </li>
      )
    )}

  </ul>

</div>

<div className="rounded-2xl bg-slate-900 p-6 mt-6">

  <h2 className="text-2xl font-bold mb-4">
    Key Points
  </h2>

  <ul className="space-y-3">

    {meeting.keyPoints?.map(
      (item, index) => (

        <li
          key={index}
          className="bg-slate-800 p-3 rounded-xl"
        >
          {item}
        </li>
      )
    )}

  </ul>

</div>
            </div>
          )}

          {activeTab === "keyPoints" && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-white">Key points</h2>
              <div className="space-y-3">
                {(meeting.keyPoints || []).map((point, index) => (
                  <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-slate-200">
                    <p>{point}</p>
                  </div>
                ))}
                {!(meeting.keyPoints?.length) && <p className="text-slate-500">No key points were detected.</p>}
              </div>
            </div>
          )}

          {activeTab === "actionItems" && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-white">Action items</h2>
              <div className="space-y-3">
                {(meeting.actionItems || []).map((item, index) => (
                  <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-slate-200">
                    <p>{item}</p>
                  </div>
                ))}
                {!(meeting.actionItems?.length) && <p className="text-slate-500">No action items were created.</p>}
              </div>
            </div>
          )}

          {activeTab === "decisions" && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-white">Decisions</h2>
              <div className="space-y-3">
                {(meeting.decisions || []).map((decision, index) => (
                  <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-slate-200">
                    <p>{decision}</p>
                  </div>
                ))}
                {!(meeting.decisions?.length) && <p className="text-slate-500">No decisions were recorded.</p>}
              </div>
            </div>
          )}

          {activeTab === "transcript" && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-white">Transcript</h2>
              <div className="max-h-[600px] overflow-y-auto rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 text-slate-200 shadow-inner shadow-slate-950/10">
                <p className="whitespace-pre-wrap leading-7">{meeting.transcript || "Transcript is not available."}</p>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">AI highlights</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-200">
                <p className="text-sm text-slate-400">Estimated speaking time</p>
                <p className="mt-2 text-lg font-semibold text-white">{meeting.duration || "42 min"}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-200">
                <p className="text-sm text-slate-400">AI priority focus</p>
                <p className="mt-2 text-lg font-semibold text-white">{meeting.priority || "Product rollout"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Share insights</h2>
            <p className="mt-3 text-slate-400">Copy sections or export to PDF for your team.</p>
            <button className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95"><Download size={16} /> Export summary</button>
          </section>
        </aside>
      </div>
    </motion.div>
  );
}

export default MeetingDetail;
