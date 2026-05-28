import { useState } from "react";

export default function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-14 flex-col justify-between">

        {/* TOP */}
        <div>
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-2xl font-bold border border-white/20">
              N
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                NovaBank
              </h1>

              <p className="text-white/80 mt-1">
                Secure Digital Banking
              </p>
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className="max-w-xl">

          <h2 className="text-6xl font-bold leading-tight">
            Banking Built
            <br />
            for the Future.
          </h2>

          <p className="mt-8 text-xl text-white/85 leading-relaxed">
            Smart financial management, real-time
            analytics, instant transfers, and enterprise-grade
            digital banking security.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-5 mt-12">

            <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6">
              <p className="text-white/70 text-sm">
                Global Transactions
              </p>

              <h3 className="text-4xl font-bold mt-2">
                24M+
              </h3>

              <p className="text-emerald-100 mt-2">
                processed securely
              </p>
            </div>

            <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6">
              <p className="text-white/70 text-sm">
                Customer Assets
              </p>

              <h3 className="text-4xl font-bold mt-2">
                $8.4B
              </h3>

              <p className="text-cyan-100 mt-2">
                managed worldwide
              </p>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="text-sm text-white/70">
          © 2026 NovaBank Fintech
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-[#020617]">

        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}
          <div className="lg:hidden mb-10 text-center">

            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl font-bold">
              N
            </div>

            <h1 className="text-4xl font-bold mt-5">
              NovaBank
            </h1>

            <p className="text-slate-400 mt-2">
              Secure Digital Banking
            </p>
          </div>

          {/* AUTH CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-[36px] p-10 shadow-2xl shadow-emerald-500/5">

            {/* LOGIN */}
            {!showRegister ? (
              <>
                <div className="mb-10">

                  <h2 className="text-4xl font-bold">
                    Welcome Back
                  </h2>

                  <p className="text-slate-400 mt-3">
                    Sign in to access your secure account
                  </p>
                </div>

                <div className="space-y-5">

                  <div>
                    <label className="block mb-2 text-sm text-slate-300">
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="login_email"
                      name="login_email"
                      placeholder="you@example.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-slate-300">
                      Password
                    </label>

                    <input
                      type="password"
                      id="login_password"
                      name="login_password"
                      placeholder="••••••••"
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl py-4 font-semibold text-lg hover:opacity-90 transition">
                    Sign In
                  </button>

                </div>

                <div className="mt-8 text-center">

                  <p className="text-slate-400">
                    Don’t have an account?
                  </p>

                  <button
                    onClick={() => setShowRegister(true)}
                    className="mt-3 text-emerald-400 font-semibold hover:text-emerald-300 transition"
                  >
                    Create Account
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* REGISTER */}
                <div className="mb-10">

                  <h2 className="text-4xl font-bold">
                    Create Account
                  </h2>

                  <p className="text-slate-400 mt-3">
                    Open your NovaBank account
                  </p>
                </div>

                <div className="space-y-5">

                  <div>
                    <label className="block mb-2 text-sm text-slate-300">
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="register_name"
                      name="register_name"
                      placeholder="John Doe"
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-slate-300">
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="register_email"
                      name="register_email"
                      placeholder="you@example.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-slate-300">
                      Password
                    </label>

                    <input
                      type="password"
                      id="register_password"
                      name="register_password"
                      placeholder="Create secure password"
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl py-4 font-semibold text-lg hover:opacity-90 transition">
                    Create Account
                  </button>

                </div>

                <div className="mt-8 text-center">

                  <p className="text-slate-400">
                    Already have an account?
                  </p>

                  <button
                    onClick={() => setShowRegister(false)}
                    className="mt-3 text-cyan-400 font-semibold hover:text-cyan-300 transition"
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}