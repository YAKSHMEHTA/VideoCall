import { useContext, useState } from "react";
import "../App.css";
import { AuthContext } from "../Contexts/AuthContext";

const EyeIcon = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const gridBg = {
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
  `,
  backgroundSize: "56px 56px",
};

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const { handleRegister, handleLogin } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "signup") {
      try {
        let res = await handleRegister(form.name, form.username, form.password);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    } else if (mode === "login") {
      try {
        let res = await handleLogin(form.username, form.password);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const inputClass =
    "w-full bg-[#111111] border h-12 rounded-sm border-[#222222] text-[#f0ede8] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a87c] focus:ring-1 focus:ring-[#c9a87c]/20 transition-all duration-200 placeholder:text-[#333333]";

  return (
    <div
      className="min-h-screen bg-[#0c0c0c] flex flex-col justify-between"
      style={gridBg}
    >
      {/* Expanded vertical padding on the parent wrapper */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-20 md:py-28">
        <div className="w-full max-w-[420px]">
          {/* Tagline section spacing */}
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px w-8 bg-[#2a2a2a]" />
            <span
              className="text-[#555555] text-[10px] tracking-[0.22em] uppercase"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {mode === "login" ? "Welcome back" : "New account"}
            </span>
            <div className="h-px w-8 bg-[#2a2a2a]" />
          </div>

          {/* Heading spacing */}
          <h1
            className="text-[#f0ede8] text-5xl leading-[1.15] text-center mb-12"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {mode === "login" ? (
              <>
                Sign <em className="not-italic italic text-[#c9a87c]">in.</em>
              </>
            ) : (
              <>
                Get{" "}
                <em className="not-italic italic text-[#c9a87c]">started.</em>
              </>
            )}
          </h1>

          {/* Mode switch toggle spacing */}
          <div className="flex bg-[#111111] border rounded-sm border-[#1e1e1e] p-[4px] mb-10">
            {[
              { key: "login", label: "Sign in" },
              { key: "signup", label: "Create account" },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`flex-1 py-2.5 text-xs rounded-sm font-medium tracking-wide transition-all duration-200 ${
                  mode === key
                    ? "bg-[#f0ede8] text-[#0c0c0c] shadow-sm"
                    : "text-[#555555] hover:text-[#f0ede8]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form input vertical gap (increased to space-y-6) */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-[10px] tracking-[0.18em] uppercase text-[#555555]"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-[10px] tracking-[0.18em] uppercase text-[#555555]"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="username"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[10px] tracking-[0.18em] uppercase text-[#555555]"
                >
                  Password
                </label>
                {mode === "login" && (
                  <a
                    href="#"
                    className="text-[10px] text-[#c9a87c] hover:text-[#d4b88a] transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  aria-label={showPass ? "Hide password" : "Show password"}
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#444444] hover:text-[#c9a87c] transition-colors duration-200 p-1"
                >
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <p className="text-[#555555] text-[10px] leading-relaxed pt-2 pb-1">
                By creating an account you agree to our{" "}
                <a
                  href="#"
                  className="text-[#c9a87c] hover:text-[#d4b88a] hover:underline underline-offset-2 transition-all"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[#c9a87c] hover:text-[#d4b88a] hover:underline underline-offset-2 transition-all"
                >
                  Privacy Policy
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-4 bg-[#f0ede8] text-white rounded-sm  py-3 text-sm font-medium tracking-wide hover:bg-white hover:shadow-[0_0_15px_rgba(240,237,232,0.15)] active:scale-[0.98] transition-all duration-200"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          {/* Separator margins */}
          <div className="flex items-center gap-4 my-9">
            <div className="flex-1 h-px bg-[#1a1a1a]" />
            <span className="text-[#333333] text-[10px] tracking-widest uppercase">
              or
            </span>
            <div className="flex-1 h-px bg-[#1a1a1a]" />
          </div>

          <button
            type="button"
            className="w-full h-12 rounded-sm border border-[#222222] bg-transparent text-[#555555] py-3 text-sm hover:border-[#444444] hover:text-[#f0ede8] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="text-center text-[#555555] text-xs mt-10 tracking-wide">
            {mode === "login" ? (
              <>
                No account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-[#c9a87c] hover:text-[#d4b88a] hover:underline underline-offset-2 transition-all duration-200 ml-1"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-[#c9a87c] hover:text-[#d4b88a] text-white hover:underline underline-offset-2 transition-all duration-200 ml-1"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Footer padding */}
      <footer className="border-t border-[#141414] px-8 py-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <span
          className="text-[#555555] text-xs"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Vex
        </span>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Status"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#444444] text-[10px] tracking-widest uppercase hover:text-[#f0ede8] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
