import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FiCode, FiCpu, FiHeart, FiLayers, FiStar, FiTrendingUp, FiZap } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../utils/BaseUrl";
import { addfeed } from "../utils/FeedSlice";
import Card from "./Card";

function Feed() {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);
  const [genderFilter, setGenderFilter] = useState("all");

  const fetchFeed = useCallback(async () => {
    if (userFeed) return;

    try {
      const res = await axios.get(baseUrl + "/feed", { withCredentials: true });
      dispatch(addfeed(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, userFeed]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const filteredFeed = useMemo(() => {
    if (!userFeed) return null;
    if (genderFilter === "all") return userFeed;

    return userFeed.filter((profile) => String(profile.gender || "").toLowerCase() === genderFilter);
  }, [genderFilter, userFeed]);

  const stats = [
    { label: "Matches near you", value: filteredFeed?.length || 0, icon: FiLayers },
    { label: "Heart sync", value: "98%", icon: FiHeart },
    { label: "Dev mode", value: "ON", icon: FiCpu },
  ];

  const vibeStack = ["Long talks", "Pair coding", "Coffee", "Side projects", "Soft launch"];
  const genderOptions = [
    { label: "All", value: "all" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  const topUser = filteredFeed?.[0];

  if (!userFeed) {
    return (
      <main className="feed-stage min-h-screen overflow-hidden px-4 pb-10 pt-28 text-white sm:px-6">
        <div className="feed-orbit" />
        <section className="mx-auto grid min-h-[70vh] max-w-6xl place-items-center">
          <div className="feed-loading-card rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-white text-slate-950 shadow-xl shadow-cyan-500/20">
              <FiStar className="text-2xl" />
            </div>
            <h1 className="text-3xl font-black">Scanning the dev universe</h1>
            <p className="mt-3 text-sm font-medium text-white/60">Pulling your next interesting profile into orbit.</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="feed-loader-bar h-full w-1/2 rounded-full" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (userFeed.length <= 0) {
    return (
      <main className="feed-stage min-h-screen overflow-hidden px-4 pb-10 pt-28 text-white sm:px-6">
        <div className="feed-orbit" />
        <section className="mx-auto grid min-h-[70vh] max-w-6xl place-items-center">
          <div className="feed-empty-card max-w-xl rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-lime-300 text-slate-950 shadow-xl shadow-lime-500/20">
              <FiCode className="text-2xl" />
            </div>
            <h1 className="text-3xl font-black">No more dev crushes</h1>
            <p className="mt-3 text-white/70">You are caught up for now. Come back later and maybe the right profile appears.</p>
          </div>
        </section>
      </main>
    );
  }

  if (!topUser) {
    return (
      <main className="feed-stage min-h-screen overflow-hidden px-4 pb-10 pt-28 text-white sm:px-6">
        <div className="feed-orbit" />
        <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center">
          <div className="feed-empty-card w-full rounded-[2rem] border border-white/15 bg-white/10 p-6 text-center shadow-2xl shadow-rose-950/30 backdrop-blur-xl sm:p-8">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-rose-200 text-slate-950 shadow-xl shadow-rose-500/20">
              <FaHeart className="text-2xl" />
            </div>
            <h1 className="text-3xl font-black">No profiles for this filter</h1>
            <p className="mt-3 text-white/70">Try another gender filter and keep the search warm.</p>
            <div className="feed-filter-bar mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2 rounded-3xl border border-white/10 bg-slate-950/35 p-2">
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGenderFilter(option.value)}
                  className={`feed-filter-pill rounded-2xl px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                    genderFilter === option.value ? "is-active bg-rose-200 text-slate-950" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="feed-stage min-h-screen overflow-hidden px-3 pb-8 pt-24 text-white sm:px-6 lg:pt-28">
      <div className="feed-orbit" />
      <div className="feed-scanlines" />
      <div className="feed-love-birds" aria-hidden="true">
        <span className="love-bird love-bird-one">⌁</span>
        <span className="love-bird love-bird-two">⌁</span>
        <span className="love-heart love-heart-one">♥</span>
        <span className="love-heart love-heart-two">♥</span>
        <span className="love-heart love-heart-three">♥</span>
      </div>

      <section className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.78fr_1.1fr_0.78fr] xl:gap-7">
        <aside className="feed-panel hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl lg:block">
          <div className="mb-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-cyan-100">
              <FiStar />
              Dev dating
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight">
              Find a dev who makes your heart compile.
            </h1>
            <p className="mt-4 text-sm leading-6 text-white/60">
              Swipe through real builders, cute bios, shared stacks, and maybe your next favorite notification.
            </p>
          </div>

          <div className="feed-filter-card mb-4 rounded-3xl border border-rose-200/15 bg-rose-300/10 p-3">
            <p className="mb-3 flex items-center gap-2 px-1 text-xs font-black uppercase tracking-wide text-rose-100">
              <FaHeart />
              Looking for
            </p>
            <div className="grid grid-cols-2 gap-2">
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGenderFilter(option.value)}
                  className={`feed-filter-pill rounded-2xl px-3 py-2 text-xs font-black uppercase tracking-wide transition ${
                    genderFilter === option.value ? "is-active bg-rose-200 text-slate-950" : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="feed-stat flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-950">
                    <Icon />
                  </span>
                  <span className="text-sm font-semibold text-white/70">{label}</span>
                </div>
                <span className="font-black text-lime-200">{value}</span>
              </div>
            ))}
          </div>

          <div className="feed-mini-terminal mt-4 rounded-3xl border border-cyan-300/15 bg-slate-950/55 p-4 font-mono text-xs text-cyan-100/80">
            <p>&gt; radar.sync()</p>
            <p className="mt-2 text-rose-200">status: hearts_warming</p>
            <p className="mt-2 text-fuchsia-200">mode: slow_swipe</p>
          </div>
        </aside>

        <section className="feed-card-zone min-w-0 rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-fuchsia-950/20 backdrop-blur-xl sm:p-4">
          <div className="mb-4 flex items-center justify-between px-2 sm:px-1 lg:hidden">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-rose-200">Dev dating</p>
              <h1 className="text-2xl font-black">Find your match</h1>
            </div>
            <span className="feed-live-dot rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1.5 text-xs font-black text-lime-200">
              Live
            </span>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2 px-1 lg:hidden">
            {stats.map(({ label, value }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/35 p-3 text-center">
                <p className="text-lg font-black text-white">{value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/50">{label}</p>
              </div>
            ))}
          </div>

          <div className="feed-filter-bar mb-4 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setGenderFilter(option.value)}
                className={`feed-filter-pill shrink-0 rounded-2xl border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                  genderFilter === option.value ? "is-active bg-rose-200 text-slate-950" : "bg-slate-950/35 text-white/70"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <Card key={topUser._id} user={topUser} />
        </section>

        <aside className="feed-panel hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-fuchsia-950/20 backdrop-blur-xl lg:block">
          <p className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-fuchsia-100">
            <FiZap />
            Loveable vibe
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm font-semibold text-white/60">Today&apos;s stack cloud</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {vibeStack.map((item) => (
                <span key={item} className="feed-tag rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white/80">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-white/10 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-white/60">
              <FiTrendingUp />
              Match pool
            </p>
            <p className="mt-3 text-4xl font-black leading-none text-white">{filteredFeed.length}</p>
            <p className="mt-2 text-sm font-semibold text-white/60">profiles ready to review</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Feed;
