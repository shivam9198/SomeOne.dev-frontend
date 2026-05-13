import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiEye, FiEyeOff, FiZap } from "react-icons/fi";
import { addUser } from "../utils/UserSlice";
import { clearfeed } from "../utils/FeedSlice";
import baseUrl from "../utils/BaseUrl";
import backgroundImage from "../assest/background.jpg";
import BrandMark from "./BrandMark";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [authError, setAuthError] = useState(null);
  const [isLoginForm, setisLoginForm] = useState(true);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authTitle = isLoginForm ? "Welcome back" : "Create your account";
  const authSubtitle = isLoginForm
    ? "Sign in to keep discovering developers, requests, and connections."
    : "Join SomeOne.DEV and build a profile that helps the right people find you.";

  const formatServerError = (data) => {
    if (!data) return "";
    if (typeof data === "string") return data;
    if (Array.isArray(data)) {
      return data
        .map((item) => item?.msg || item?.message || item)
        .filter(Boolean)
        .join(" ");
    }
    if (Array.isArray(data.errors)) {
      return data.errors
        .map((item) => item?.msg || item?.message || item)
        .filter(Boolean)
        .join(" ");
    }
    return data.message || data.error || "";
  };

  const getErrorMessage = (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const rawMessage = formatServerError(data) || error?.message || "Something went wrong!";
    const message = String(rawMessage);
    const lowerMessage = message.toLowerCase();

    if (!navigator.onLine) {
      return {
        title: "You are offline",
        message: "Please check your internet connection and try again.",
        hint: "Your form data is still here.",
      };
    }

    if (!isLoginForm && (status === 409 || lowerMessage.includes("duplicate") || lowerMessage.includes("already"))) {
      return {
        title: "Account already exists",
        message: "This email is already registered. Login instead, or use a different email address.",
        hint: "Tip: switch to Login from the top tabs.",
      };
    }

    if (status === 401 || lowerMessage.includes("invalid") || lowerMessage.includes("wrong")) {
      return {
        title: "Login details are not matching",
        message: "Please check your email and password, then try again.",
        hint: "Passwords are case-sensitive.",
      };
    }

    if (status === 400 || lowerMessage.includes("required") || lowerMessage.includes("valid")) {
      return {
        title: "Please check the form",
        message,
        hint: "Make sure all required fields are filled correctly.",
      };
    }

    return {
      title: "Request failed",
      message,
      hint: "Please try again in a moment.",
    };
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      baseUrl + "/login",
      { email, password },
      { withCredentials: true },
    );

    dispatch(addUser(res.data));
    dispatch(clearfeed());
    return navigate("/");
  };

  const handlesignup = async () => {
    const res = await axios.post(
      baseUrl + "/signup",
      { firstName, lastName, email, password },
      { withCredentials: true },
    );

    dispatch(addUser(res.data));
    dispatch(clearfeed());
    return navigate("/");
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);

    try {
      await (isLoginForm ? handleSubmit() : handlesignup());
    } catch (error) {
      setAuthError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleForm = () => {
    setAuthError(null);
    setisLoginForm((value) => !value);
  };

  return (
    <main className="auth-stage min-h-screen overflow-hidden bg-[#09090f] text-slate-950">
      <div className="auth-noise" />
      <div className="auth-grid" />
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden min-h-screen overflow-hidden text-white lg:block">
          <img
            src={backgroundImage}
            alt=""
            className="auth-hero-image absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,9,15,0.95),rgba(9,9,15,0.58),rgba(20,184,166,0.30))]" />
          <div className="auth-rave-lines" />
          <div className="relative z-10 flex min-h-screen flex-col justify-between px-12 py-10 xl:px-16">
            <div className="auth-pop-in flex items-center gap-3">
              <BrandMark className="auth-logo-spin h-12 w-12" />
              <div>
                <p className="text-lg font-bold tracking-wide">SomeOne.DEV</p>
                <p className="text-sm text-white/70">Developer network</p>
              </div>
            </div>

            <div className="auth-slide-up max-w-2xl pb-12">
              <p className="auth-glow-pill mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
                <FiZap className="text-lime-300" />
                Meet builders. Ship loud. Grow faster.
              </p>
              <h1 className="text-5xl font-black leading-tight text-white xl:text-6xl">
                Find people who make your next project possible.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                A cleaner place for developers to connect by skills, interests, and real work.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-3 gap-3 text-sm text-white/80">
              {["Skill-first profiles", "Focused requests", "Useful connections"].map((item) => (
                <div key={item} className="auth-chip rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <FiCheckCircle className="mb-3 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative flex min-h-screen items-start justify-center px-3 py-5 sm:px-6 sm:py-8 lg:items-center lg:px-10">
          <div className="auth-phone-strip absolute left-0 top-0 h-2 w-full lg:hidden" />
          <div className="auth-form-wrap w-full max-w-[480px]">
            <div className="auth-mobile-hero mb-4 overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 shadow-2xl shadow-cyan-950/30 backdrop-blur lg:hidden">
              <div className="relative min-h-[230px] p-4 text-white">
                <img
                  src={backgroundImage}
                  alt=""
                  className="auth-hero-image absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,15,0.30),rgba(9,9,15,0.76)),linear-gradient(130deg,rgba(34,211,238,0.32),transparent_42%,rgba(244,114,182,0.32))]" />
                <div className="auth-rave-lines" />

                <div className="relative z-10 flex min-h-[198px] flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <BrandMark className="auth-logo-spin h-11 w-11" />
                    <div>
                      <p className="text-base font-black">SomeOne.DEV</p>
                      <p className="text-xs text-white/70">Developer network</p>
                    </div>
                  </div>

                  <div>
                    <p className="auth-glow-pill mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/90 backdrop-blur">
                      <FiZap className="text-lime-300" />
                      Ship loud
                    </p>
                    <h1 className="max-w-[17rem] text-3xl font-black leading-tight text-white">
                      Meet devs who match your energy.
                    </h1>
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold text-white/90">
                      {["Find your squad", "Code collabs", "Vibe matched"].map((item) => (
                        <span key={item} className="auth-mobile-badge rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="auth-card rounded-[1.5rem] border border-white/70 bg-white/95 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
              <div className="relative z-10 mb-6 sm:mb-7">
                <div className="mb-4 grid grid-cols-2 rounded-2xl bg-slate-100 p-1 sm:mb-5">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError(null);
                      setisLoginForm(true);
                    }}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isLoginForm ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError(null);
                      setisLoginForm(false);
                    }}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      !isLoginForm ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Sign up
                  </button>
                </div>

                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  {authTitle}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">{authSubtitle}</p>
              </div>

              <form className="relative z-10 space-y-3.5 sm:space-y-4" onSubmit={handleAuthSubmit}>
                {!isLoginForm && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700 sm:mb-2">First name</span>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(event) => setfirstName(event.target.value)}
                        placeholder="Shivam"
                        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-400 focus:bg-white focus:ring-4 focus:ring-fuchsia-100 sm:h-12 sm:text-base"
                        required={!isLoginForm}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700 sm:mb-2">Last name</span>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(event) => setlastName(event.target.value)}
                        placeholder="Gupta"
                        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-400 focus:bg-white focus:ring-4 focus:ring-fuchsia-100 sm:h-12 sm:text-base"
                        required={!isLoginForm}
                      />
                    </label>
                  </div>
                )}

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-slate-700 sm:mb-2">Email address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setemail(event.target.value)}
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100 sm:h-12 sm:text-base"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-slate-700 sm:mb-2">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setpassword(event.target.value)}
                      placeholder="Enter your password"
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100 sm:h-12 sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </label>

                {authError && (
                  <div className="auth-error rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <div className="flex gap-3">
                      <FiAlertCircle className="mt-0.5 shrink-0 text-lg" />
                      <div>
                        <p className="font-bold">{authError.title}</p>
                        <p className="mt-1 font-medium">{authError.message}</p>
                        {authError.hint && <p className="mt-1 text-red-500">{authError.hint}</p>}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="auth-submit group flex min-h-11 w-full items-center justify-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-12 sm:py-4"
                >
                  {isSubmitting ? "Please wait..." : isLoginForm ? "Login to account" : "Create account"}
                  {!isSubmitting && <FiArrowRight className="transition group-hover:translate-x-1" />}
                </button>
              </form>

              <p className="relative z-10 mt-5 text-center text-sm text-slate-500 sm:mt-7">
                {isLoginForm ? "New to SomeOne.DEV?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="ml-2 font-bold text-fuchsia-700 transition hover:text-slate-950"
                >
                  {isLoginForm ? "Create an account" : "Login instead"}
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
