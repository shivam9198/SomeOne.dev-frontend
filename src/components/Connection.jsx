import { useCallback, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FiCode, FiMessageCircle, FiUsers, FiZap } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../utils/BaseUrl";
import { addConnection } from "../utils/ConnectionSlice";

function Connection() {
  const dispatch = useDispatch();
  const userConnections = useSelector((store) => store.connections);

  const getConnections = useCallback(async () => {
    if (userConnections !== null) return;

    try {
      const res = await axios.get(baseUrl + "/user/connections", { withCredentials: true });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, userConnections]);

  useEffect(() => {
    getConnections();
  }, [getConnections]);

  if (!userConnections) {
    return (
      <main className="social-stage grid min-h-screen place-items-center px-4 pt-24 text-white">
        <div className="social-empty-card rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center backdrop-blur-xl">
          <FiUsers className="mx-auto text-4xl text-rose-200" />
          <h1 className="mt-4 text-3xl font-black">Loading connections</h1>
          <p className="mt-2 text-white/60">Gathering your dev circle.</p>
        </div>
      </main>
    );
  }

  if (userConnections.length === 0) {
    return (
      <main className="social-stage min-h-screen px-4 pb-10 pt-28 text-white sm:px-6">
        <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center">
          <div className="social-empty-card rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center shadow-2xl shadow-rose-950/25 backdrop-blur-xl">
            <FiUsers className="mx-auto text-5xl text-rose-200" />
            <h1 className="mt-5 text-4xl font-black">No connections yet</h1>
            <p className="mt-3 text-white/65">Start swiping and build your developer circle one match at a time.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="social-stage min-h-screen overflow-hidden px-3 pb-10 pt-24 text-white sm:px-6 lg:pt-28">
      <div className="social-orbit" />
      <section className="mx-auto max-w-7xl">
        <div className="social-hero mb-6 grid gap-4 rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-rose-950/20 backdrop-blur-xl lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-rose-100">
              <FaHeart />
              Your circle
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Connections worth building with.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">A clean place for the devs who matched your energy.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "matches", value: userConnections.length, icon: FiUsers },
              { label: "chats", value: "∞", icon: FiMessageCircle },
              { label: "vibe", value: "hot", icon: FiZap },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4 text-center">
                <Icon className="mx-auto mb-2 text-rose-200" />
                <p className="text-2xl font-black">{value}</p>
                <p className="text-[10px] font-black uppercase tracking-wide text-white/45">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {userConnections.map((connection) => {
            const { firstName, lastName, age, gender, bio, _id, profilePic, skills = [] } = connection;
            const fullName = [firstName, lastName].filter(Boolean).join(" ");

            return (
              <article key={_id} className="connection-card overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl shadow-fuchsia-950/10 backdrop-blur-xl">
                <div className="relative h-52">
                  <img className="h-full w-full object-cover" src={profilePic} alt={fullName} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-black uppercase tracking-wide backdrop-blur">
                    connected
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-2xl font-black">{fullName}</h2>
                      {(age || gender) && <p className="mt-1 text-sm font-bold text-white/55">{[age, gender].filter(Boolean).join(" | ")}</p>}
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-200 text-slate-950">
                      <FaHeart />
                    </span>
                  </div>
                  {bio && <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/65">{bio}</p>}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 bg-slate-950/35 px-3 py-1.5 text-xs font-bold text-white/70">
                        <FiCode className="mr-1 inline" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Connection;
