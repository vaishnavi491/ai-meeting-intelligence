import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // SAVE TOKEN

      localStorage.setItem("token", data.token);

      // SAVE USER

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // REDIRECT

      window.location.href = "/dashboard";

    } catch (error) {
      console.log(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_20%),radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.15),_transparent_18%),#020617] text-slate-100">

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid w-full gap-10 rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-slate-950/40 lg:grid-cols-[0.9fr_0.7fr] lg:p-12"
        >

          {/* LEFT SIDE */}

          <div className="space-y-8">

            <div className="space-y-3 text-white">

              <p className="text-sm uppercase tracking-[0.35em] text-sky-300/70">
                Welcome back
              </p>

              <h1 className="text-4xl font-semibold">
                Login to MeetingIQ
              </h1>

              <p className="max-w-xl text-slate-400">
                Access your AI meeting intelligence dashboard,
                upload new meetings, and turn conversations into action.
              </p>

            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-inner shadow-slate-950/20">

              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Quick access
              </p>

              <div className="mt-6 grid gap-4">

                <div className="flex items-center gap-3 rounded-3xl bg-slate-950/90 p-4">
                  <Mail size={18} className="text-sky-300" />
                  <span className="text-slate-300">
                    Secure team sign in
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-3xl bg-slate-950/90 p-4">
                  <Lock size={18} className="text-violet-300" />
                  <span className="text-slate-300">
                    AI-enabled meeting access
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">

            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              Login
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-white">
              Enter your credentials
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <label className="block text-sm text-slate-300">

                <span className="mb-2 block">Email</span>

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none transition focus:border-sky-500"
                />

              </label>

              <label className="block text-sm text-slate-300">

                <span className="mb-2 block">Password</span>

                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-white outline-none transition focus:border-sky-500"
                />

              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-500">

              Don’t have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-sky-300 hover:text-sky-200"
              >
                Register
              </Link>

            </p>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Login;