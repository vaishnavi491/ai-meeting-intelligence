import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { motion } from "framer-motion";
import { UserPlus, ShieldCheck } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.16),_transparent_20%),radial-gradient(circle_at_80%_10%,_rgba(14,165,233,0.14),_transparent_18%),#020617] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid w-full gap-10 rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-slate-950/40 lg:grid-cols-[0.9fr_0.7fr] lg:p-12">
          <div className="space-y-8">
            <div className="space-y-3 text-white">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400/80">Create your account</p>
              <h1 className="text-4xl font-semibold">Start your AI meeting journey.</h1>
              <p className="max-w-xl text-slate-400">Register to unlock your AI dashboard, track meetings, and drive action from every conversation.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-inner shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Why join</p>
              <div className="mt-6 grid gap-4">
                <div className="flex items-center gap-3 rounded-3xl bg-slate-950/90 p-4">
                  <UserPlus size={18} className="text-cyan-300" />
                  <span className="text-slate-300">Team-ready intelligence</span>
                </div>
                <div className="flex items-center gap-3 rounded-3xl bg-slate-950/90 p-4">
                  <ShieldCheck size={18} className="text-violet-300" />
                  <span className="text-slate-300">Secure meeting analytics</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Register</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Join MeetingIQ</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Name</span>
                <input name="name" value={formData.name} onChange={handleChange} className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none transition focus:border-sky-500" placeholder="Alex Taylor" />
              </label>
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Email</span>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none transition focus:border-sky-500" placeholder="you@company.com" />
              </label>
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Password</span>
                <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none transition focus:border-sky-500" placeholder="Create a password" />
              </label>
              <button type="submit" className="w-full rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-95">Register</button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/" className="font-semibold text-sky-300 hover:text-sky-200">Login</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
