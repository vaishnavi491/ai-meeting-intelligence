import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

function Settings() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [profile, setProfile] = useState({ name: "Alex Taylor", email: "alex@meetingiq.com" });
  const [notifications, setNotifications] = useState({ email: true, product: false, updates: true });
  const [preferences, setPreferences] = useState({ aiTone: "Professional", autoSummaries: true, smartTags: true });

  const handleProfileChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const togglePreference = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Account settings</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Personalize your workspace.</h1>
          </div>
          <div className="rounded-3xl bg-slate-900/80 px-5 py-4 text-slate-200 shadow-lg shadow-slate-950/20">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Theme</p>
            <button onClick={toggleTheme} className="mt-3 inline-flex rounded-3xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Switch to {darkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Profile settings</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Account details</h2>
          </div>
          <div className="space-y-6">
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block text-slate-400">Name</span>
              <input name="name" value={profile.name} onChange={handleProfileChange} className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-sky-500" />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block text-slate-400">Email</span>
              <input name="email" value={profile.email} onChange={handleProfileChange} className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-sky-500" />
            </label>
            <button className="rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95">Save profile</button>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">AI preferences</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Smart meeting automation</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(preferences).map(([key, value]) => (
              <button key={key} onClick={() => togglePreference(key)} className="flex w-full items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-left transition hover:border-sky-500/70">
                <div>
                  <p className="font-semibold text-white">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="mt-1 text-sm text-slate-400">{typeof value === "boolean" ? (value ? "Enabled" : "Disabled") : value}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${value ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800/80 text-slate-400"}`}>{value ? "On" : "Off"}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Notifications</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Stay informed</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <button key={key} onClick={() => toggleNotification(key)} className="flex w-full items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-left transition hover:border-sky-500/70">
                <div>
                  <p className="font-semibold text-white">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="mt-1 text-sm text-slate-400">{value ? "Enabled" : "Muted"}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${value ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800/80 text-slate-400"}`}>{value ? "On" : "Off"}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-rose-500/20 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.35em] text-rose-300">Danger zone</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Account actions</h2>
          </div>
          <div className="space-y-4 text-slate-300">
            <p className="rounded-3xl bg-slate-900/80 p-4 text-sm leading-6 text-slate-400">Remove your account and all meeting data. This action is irreversible and requires confirmation.</p>
            <button className="w-full rounded-3xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">Delete account</button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Settings;
