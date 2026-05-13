import { useCallback, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FiCheck, FiClock, FiCode, FiUserPlus, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../utils/BaseUrl";
import { addRequest, removeRequest } from "../utils/RequestSlice";

function Request() {
  const requestReceived = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const userRequest = useCallback(async () => {
    try {
      const res = await axios.get(baseUrl + "/user/request/recived", { withCredentials: true });
      dispatch(addRequest(res.data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const reviewRequest = async (state, id) => {
    try {
      await axios.post(baseUrl + "/request/review/" + state + "/" + id, {}, { withCredentials: true });
      dispatch(removeRequest(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userRequest();
  }, [userRequest]);

  if (!requestReceived) {
    return (
      <main className="social-stage grid min-h-screen place-items-center px-4 pt-24 text-white">
        <div className="social-empty-card rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center backdrop-blur-xl">
          <FiClock className="mx-auto text-4xl text-rose-200" />
          <h1 className="mt-4 text-3xl font-black">Loading requests</h1>
          <p className="mt-2 text-white/60">Checking who sent good energy.</p>
        </div>
      </main>
    );
  }

  if (requestReceived.length === 0) {
    return (
      <main className="social-stage min-h-screen px-4 pb-10 pt-28 text-white sm:px-6">
        <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center">
          <div className="social-empty-card rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center shadow-2xl shadow-rose-950/25 backdrop-blur-xl">
            <FiUserPlus className="mx-auto text-5xl text-rose-200" />
            <h1 className="mt-5 text-4xl font-black">No requests yet</h1>
            <p className="mt-3 text-white/65">Your inbox is calm. Keep swiping and the right devs will show up.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="social-stage min-h-screen overflow-hidden px-3 pb-10 pt-24 text-white sm:px-6 lg:pt-28">
      <div className="social-orbit" />
      <section className="mx-auto max-w-6xl">
        <div className="social-hero mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-rose-950/20 backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-rose-100">
              <FaHeart />
              Request inbox
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">People who swiped your way.</h1>
            <p className="mt-3 text-sm leading-6 text-white/60">Review incoming dev crushes and choose who gets into your circle.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4 text-center">
            <p className="text-4xl font-black text-rose-100">{requestReceived.length}</p>
            <p className="text-xs font-black uppercase tracking-wide text-white/50">pending</p>
          </div>
        </div>

        <div className="grid gap-4">
          {requestReceived.map((request) => {
            const { firstName, lastName, age, gender, bio, profilePic, skills = [] } = request.fromuserId;
            const fullName = [firstName, lastName].filter(Boolean).join(" ");

            return (
              <article key={request._id} className="social-card grid gap-4 rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-fuchsia-950/10 backdrop-blur-xl md:grid-cols-[auto_1fr_auto] md:items-center">
                <img className="h-24 w-24 rounded-3xl object-cover shadow-xl shadow-black/25" src={profilePic} alt={fullName} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-2xl font-black">{fullName}</h2>
                    {(age || gender) && (
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/70">
                        {[age, gender].filter(Boolean).join(" | ")}
                      </span>
                    )}
                  </div>
                  {bio && <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">{bio}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 bg-slate-950/35 px-3 py-1.5 text-xs font-bold text-white/70">
                        <FiCode className="mr-1 inline" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 md:flex-col">
                  <button className="social-action-btn social-accept flex-1 md:flex-none" onClick={() => reviewRequest("accepted", request._id)}>
                    <FiCheck />
                    Accept
                  </button>
                  <button className="social-action-btn social-reject flex-1 md:flex-none" onClick={() => reviewRequest("rejected", request._id)}>
                    <FiX />
                    Reject
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Request;
