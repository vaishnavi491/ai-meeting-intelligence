import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Sparkles } from "lucide-react";

function UploadMeeting() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingText, setMeetingText] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meetingTitle.trim()) {
      toast.error("Please enter meeting title");
      return;
    }
    if (!meetingText.trim() && !file) {
      toast.error("Please enter transcript or upload file");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("title", meetingTitle);
      formData.append("transcript", meetingText);
      if (file) {
        formData.append("file", file);
      }

      const token = localStorage.getItem("token");

const response = await axios.post(
  "http://localhost:5000/api/meetings",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },

    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        setUploadProgress(
          Math.round(
            (progressEvent.loaded * 100) /
            progressEvent.total
          )
        );
      }
    },
  }
);

      setAiResult(response.data.meeting);
      toast.success("Meeting processed successfully");
    } catch (error) {
  console.log(error);

  if (error.response) {
    console.log(error.response.data);
  }

  alert(
    error.response?.data?.message ||
    "Meeting uploaded successfully"
  );
} finally {
      setLoading(false);
      setDragActive(false);
    }
  };

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files.length) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">AI workspace</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Upload, analyze, and action your meetings.</h1>
            </div>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Logout
            </button>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-800/80 bg-slate-900/75 p-8 shadow-inner shadow-slate-950/20">
            <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-r from-indigo-500 to-sky-500 p-5 text-white shadow-lg shadow-indigo-500/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10">
  <UploadCloud size={24} />
</div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-200">Fast upload</p>
                <p className="mt-2 text-lg font-semibold">Drag & drop files or paste transcripts instantly.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Meeting Title</label>
                <input value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} type="text" placeholder="Project sync, sprint review, etc." className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none transition focus:border-sky-500" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Meeting Transcript</label>
                <textarea value={meetingText} onChange={(e) => setMeetingText(e.target.value)} rows="8" placeholder="Paste your meeting transcript here..." className="w-full rounded-[1.5rem] border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none transition focus:border-sky-500" />
              </div>

              <div onDragOver={(e) => { e.preventDefault(); setDragActive(true); }} onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }} onDrop={handleDrop} className={`rounded-[1.5rem] border border-dashed ${dragActive ? "border-sky-400 bg-slate-900/90" : "border-slate-800 bg-slate-950/80"} p-8 text-center transition` }>
                <div className="flex flex-col items-center justify-center gap-3">
                  <FileText size={28} className="text-sky-400" />
                  <p className="text-white">Drag & drop audio or video files here</p>
                  <p className="text-sm text-slate-400">Supports MP3, WAV, MP4. Or click to browse.</p>
                  <input type="file" accept="audio/*,video/*" onChange={handleFileSelect} className="mx-auto mt-3 block w-full cursor-pointer rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-200" />
                </div>
              </div>

              {file && (
                <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 text-slate-200">
                  <p className="text-sm text-slate-400">File preview</p>
                  <p className="mt-2 font-semibold text-white">{file.name}</p>
                  <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}

              {uploadProgress > 0 && (
                <div className="rounded-full bg-slate-900/80 p-1">
                  <div className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" style={{ width: `${uploadProgress}%` }} />
                </div>
              )}

              <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Processing meeting..." : "Process Meeting"}
              </button>
            </form>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Why upload</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Turn meetings into action.</h2>
            <p className="mt-4 text-slate-400">Your meeting notes are transformed into clear summaries, action items, and decisions instantly.</p>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm font-semibold text-white">Instant insights</p>
                <p className="mt-2 text-sm text-slate-400">Review AI results immediately after upload.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm font-semibold text-white">Better outcomes</p>
                <p className="mt-2 text-sm text-slate-400">Keep team priorities aligned with clear outcomes.</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="flex items-center gap-3 text-slate-300">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900/90 text-sky-300">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Success snapshot</p>
                <p className="mt-2 text-lg font-semibold text-white">AI processing ready</p>
              </div>
            </div>
            <p className="mt-4 text-slate-400">Upload recordings or transcripts and let the AI summarize your meeting minutes.</p>
          </section>
        </aside>
      </div>

      {aiResult && (
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white">Latest analysis</h2>
          <p className="mt-3 text-slate-400">Your meeting "{aiResult.title}" has been processed successfully.</p>
          <div className="mt-6 rounded-3xl bg-slate-900/90 p-6 text-slate-200">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Summary</p>
            <p className="mt-4 leading-7 text-slate-300">{aiResult.summary || "A summary will appear here once processing is complete."}</p>
          </div>
        </section>
      )}
    </motion.div>
  );
}

export default UploadMeeting;
