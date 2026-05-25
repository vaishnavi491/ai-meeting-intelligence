import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("newest");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get("https://ai-meeting-intelligence-ng81.onrender.com/api/meetings");
      setMeetings(response.data.meetings || []);
    } catch (error) {
      console.log(error);
      setError("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  };

  const filteredMeetings = useMemo(() => {
    let filtered = meetings.filter((meeting) => meeting.title.toLowerCase().includes(search.toLowerCase()));

    if (filter === "action") {
      filtered = filtered.filter((meeting) => meeting.actionItems?.length > 0);
    }
    if (filter === "decision") {
      filtered = filtered.filter((meeting) => meeting.decisions?.length > 0);
    }

    if (sort === "oldest") {
      filtered = filtered.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      filtered = filtered.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [meetings, search, sort, filter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="h-8 w-48 rounded-full bg-slate-900/80 animate-pulse" />
            <div className="mt-6 space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="h-40 rounded-[2rem] bg-slate-900/80 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 flex items-center justify-center">
        <div className="rounded-[2rem] border border-red-500/20 bg-slate-950/80 p-10 text-center shadow-2xl shadow-red-500/10">
          <p className="text-xl font-semibold text-rose-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="min-h-screen space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Meeting History</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Search and manage your AI meetings.</h1>
          </div>
          <Link to="/upload" className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:opacity-95">
            <Sparkles size={18} /> New Meeting
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-inner shadow-slate-950/20">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search meetings by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent pl-12 text-slate-100 outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-3 text-sm text-slate-300">
              <p className="font-semibold text-white">Sort</p>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="mt-2 w-full bg-transparent text-slate-100 outline-none">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-3 text-sm text-slate-300">
              <p className="font-semibold text-white">Filter</p>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="mt-2 w-full bg-transparent text-slate-100 outline-none">
                <option value="all">All meetings</option>
                <option value="action">With action items</option>
                <option value="decision">With decisions</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/30 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">No meetings yet</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Your workspace is empty.</h2>
          <p className="mt-3 text-slate-400">Upload your first meeting to start generating AI insights.</p>
          <Link to="/upload" className="mt-6 inline-flex rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95">
            Upload a meeting
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredMeetings.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/30 text-center">
              <p className="text-xl font-semibold text-white">No meetings matched your search.</p>
              <p className="mt-2 text-slate-400">Try another keyword or filter.</p>
            </div>
          ) : (
            filteredMeetings.map((meeting) => {
              const status = meeting.decisions?.length > 0 ? "Decision" : meeting.actionItems?.length > 0 ? "Action" : "Review";

              return (
                <motion.div whileHover={{ y: -6 }} key={meeting._id} className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/25 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white line-clamp-2">{meeting.title}</h3>
                      <p className="mt-3 text-slate-400 line-clamp-4">{meeting.summary || "No summary available"}</p>
                    </div>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">{status}</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                    <span>{new Date(meeting.createdAt).toLocaleString()}</span>
                    <span>{meeting?.actionItems?.length || 0} actions</span>
                  </div>
                  <Link to={`/meetings/${meeting._id}`} className="mt-6 inline-flex text-sky-300 hover:text-white">View details ?</Link>
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </motion.div>
  );
}

export default Meetings;
