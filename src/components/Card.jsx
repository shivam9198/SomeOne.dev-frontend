/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FiCode, FiMapPin, FiRotateCcw, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import baseUrl from "../utils/BaseUrl";
import { removefeed } from "../utils/FeedSlice";

function Card({ user }) {
  const { _id, firstName, lastName, profilePic, skills = [], bio, age, gender } = user;
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const latestDrag = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [decision, setDecision] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const visibleSkills = skills.slice(0, 4);
  const rotate = Math.max(Math.min(drag.x / 18, 14), -14);
  const interestedOpacity = Math.min(Math.max(drag.x / 120, 0), 1);
  const ignoredOpacity = Math.min(Math.max(-drag.x / 120, 0), 1);

  const sendRequest = async (status) => {
    try {
      await axios.post(baseUrl + "/request/" + status + "/" + _id, {}, { withCredentials: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  const commitDecision = (status) => {
    if (isSending) return;

    const direction = status === "interested" ? 1 : -1;
    setIsSending(true);
    setDecision(status);
    setDrag({ x: direction * (window.innerWidth + 220), y: latestDrag.current.y || -42 });

    window.setTimeout(() => {
      dispatch(removefeed(_id));
      sendRequest(status);
    }, 420);
  };

  const resetCard = () => {
    setDecision(null);
    setDrag({ x: 0, y: 0 });
    latestDrag.current = { x: 0, y: 0 };
  };

  const handlePointerDown = (event) => {
    if (isSending) return;

    dragStart.current = {
      x: event.clientX - drag.x,
      y: event.clientY - drag.y,
    };
    cardRef.current?.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (!isDragging || isSending) return;

    const nextDrag = {
      x: event.clientX - dragStart.current.x,
      y: event.clientY - dragStart.current.y,
    };

    latestDrag.current = nextDrag;
    setDrag(nextDrag);
  };

  const handlePointerUp = (event) => {
    if (!isDragging) return;

    cardRef.current?.releasePointerCapture(event.pointerId);
    setIsDragging(false);

    if (latestDrag.current.x > 130) {
      commitDecision("interested");
      return;
    }

    if (latestDrag.current.x < -130) {
      commitDecision("ignored");
      return;
    }

    resetCard();
  };

  return (
    <div className="swipe-shell w-full">
      <div className="swipe-stack mx-auto w-full max-w-[430px]">
        <div className="swipe-back-card swipe-back-card-one" />
        <div className="swipe-back-card swipe-back-card-two" />

        <article
          ref={cardRef}
          className={`swipe-card relative h-[70vh] min-h-[560px] max-h-[760px] w-full cursor-grab overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950 shadow-2xl shadow-cyan-950/45 ${
            isDragging ? "is-dragging cursor-grabbing" : ""
          }`}
          style={{
            transform: `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${rotate}deg)`,
            transition: isDragging ? "none" : "transform 520ms cubic-bezier(0.2, 0.88, 0.2, 1)",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <img className="h-full w-full select-none object-cover" src={profilePic} alt={fullName || "User profile"} draggable="false" />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06),rgba(2,6,23,0.16)_34%,rgba(2,6,23,0.94)_100%)]" />
          <div className="swipe-card-shine" />

          <div className="pointer-events-none absolute left-5 top-6 rotate-[-10deg] rounded-2xl border-4 border-lime-300 px-5 py-2 text-2xl font-black uppercase tracking-widest text-lime-200 shadow-2xl shadow-lime-500/20" style={{ opacity: interestedOpacity }}>
            Like
          </div>
          <div className="pointer-events-none absolute right-5 top-6 rotate-[10deg] rounded-2xl border-4 border-red-300 px-5 py-2 text-2xl font-black uppercase tracking-widest text-red-200 shadow-2xl shadow-red-500/20" style={{ opacity: ignoredOpacity }}>
            Nope
          </div>

          <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5 text-white">
            <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-black uppercase tracking-wide backdrop-blur">
              <FaHeart className="mr-1 inline text-rose-200" />
              Date-ready dev
            </span>
            {(age || gender) && (
              <span className="rounded-full border border-white/20 bg-slate-950/35 px-3 py-1.5 text-xs font-bold backdrop-blur">
                {[age, gender].filter(Boolean).join(" | ")}
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
            <div className="rounded-[1.6rem] border border-white/15 bg-slate-950/45 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate text-4xl font-black leading-none tracking-tight sm:text-5xl">
                    {fullName || "Developer"}
                  </h2>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-cyan-100/80">
                    <FiMapPin />
                    Here to find a real coding connection
                  </p>
                </div>
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-lg font-black text-slate-950 shadow-xl shadow-cyan-500/20">
                  {age || "DEV"}
                </div>
              </div>

              {bio && <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/70">{bio}</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                {visibleSkills.length > 0 ? (
                  visibleSkills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80">
                      <FiCode className="mr-1 inline" />
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70">
                    Skills dropping soon
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>

        <div className="mt-5 flex items-center justify-center gap-5">
          <button
            type="button"
            disabled={isSending}
            onClick={() => commitDecision("ignored")}
            className="swipe-action swipe-action-nope grid h-16 w-16 place-items-center rounded-3xl border border-white/15 bg-white text-2xl text-red-500 shadow-2xl shadow-red-950/30 transition disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Ignore profile"
          >
            <FiX />
          </button>
          <button
            type="button"
            disabled={isSending}
            onClick={resetCard}
            className="swipe-action grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/10 text-lg text-white shadow-xl transition disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Reset card position"
          >
            <FiRotateCcw />
          </button>
          <button
            type="button"
            disabled={isSending}
            onClick={() => commitDecision("interested")}
            className="swipe-action swipe-action-like grid h-16 w-16 place-items-center rounded-3xl border border-white/15 bg-rose-300 text-2xl text-slate-950 shadow-2xl shadow-rose-950/30 transition disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Interested in profile"
          >
            <FaHeart />
          </button>
        </div>

        <p className="mt-3 text-center text-xs font-bold text-white/50">
          Drag left to skip, right to vibe.
        </p>
        {decision && (
          <p className="mt-2 text-center text-sm font-black text-white">
            {decision === "interested" ? "Heart sent..." : "Soft pass..."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Card;
