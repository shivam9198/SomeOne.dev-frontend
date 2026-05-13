/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FiCamera, FiCheckCircle, FiCode, FiImage, FiSave, FiTrash2, FiUser, FiZap } from "react-icons/fi";
import { useDispatch } from "react-redux";
import baseUrl from "../utils/BaseUrl";
import { addUser } from "../utils/UserSlice";

function ProfileEdit({ user }) {
  const dispatch = useDispatch();
  const [firstName, setfirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [profilePic, setprofilePic] = useState(user.profilePic || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setskills] = useState(user.skills || []);
  const [bio, setbio] = useState(user.bio || "");
  const [skillInput, setSkillInput] = useState("");
  const [error, seterror] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fullName = `${firstName || "Your"} ${lastName || "Profile"}`.trim();
  const profileScore = useMemo(() => {
    const fields = [firstName, lastName, profilePic, age, gender, bio, skills.length > 0];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [age, bio, firstName, gender, lastName, profilePic, skills.length]);

  const getErrorMessage = (err) =>
    err?.response?.data?.message || err?.response?.data || "Could not save profile. Please try again.";

  const saveProfile = async () => {
    seterror("");
    setSuccess("");
    setIsSaving(true);

    try {
      const res = await axios.patch(
        baseUrl + "/profileedit",
        {
          firstName,
          lastName,
          profilePic,
          age,
          gender,
          skills,
          bio,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      setSuccess("Profile updated. Your dev dating card is looking sharp.");
    } catch (err) {
      seterror(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = () => {
    const newSkill = skillInput.trim();
    if (!newSkill) return;
    if (skills.some((skill) => skill.toLowerCase() === newSkill.toLowerCase())) {
      setSkillInput("");
      return;
    }

    setskills((prevSkills) => [...prevSkills, newSkill]);
    setSkillInput("");
  };

  const handleSkillsChange = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skillToRemove) => {
    setskills((prevSkills) => prevSkills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <main className="profile-stage min-h-screen overflow-hidden px-3 pb-10 pt-24 text-white sm:px-6 lg:pt-28">
      <div className="profile-love-orbit" />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.78fr]">
        <section className="profile-editor-panel rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-rose-950/25 backdrop-blur-xl sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-rose-100">
                <FaHeart />
                Profile studio
              </p>
              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">Make your dev card irresistible.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                Add a cute bio, clean photo, and stack signals so the right people know why they should swipe right.
              </p>
            </div>

            <div className="profile-score-card rounded-3xl border border-white/15 bg-slate-950/45 p-4 text-center">
              <p className="text-xs font-black uppercase tracking-wide text-white/50">Profile glow</p>
              <p className="mt-1 text-4xl font-black text-rose-100">{profileScore}%</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="profile-field">
              <span>First name</span>
              <input value={firstName} onChange={(event) => setfirstName(event.target.value)} placeholder="Your first name" />
            </label>
            <label className="profile-field">
              <span>Last name</span>
              <input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Your last name" />
            </label>
          </div>

          <label className="profile-field mt-4">
            <span className="flex items-center gap-2">
              <FiImage />
              Photo URL
            </span>
            <input type="url" value={profilePic} onChange={(event) => setprofilePic(event.target.value)} placeholder="https://your-photo-url.com/image.jpg" />
          </label>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="profile-field">
              <span>Age</span>
              <input
                type="number"
                value={age}
                onChange={(event) => setAge(Math.max(0, Number(event.target.value)))}
                placeholder="21"
              />
            </label>
            <label className="profile-field">
              <span>Gender</span>
              <select value={gender} onChange={(event) => setGender(event.target.value)}>
                <option value="">Choose gender</option>
                <option value="Male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="profile-skill-box mt-4 rounded-3xl border border-white/12 bg-slate-950/35 p-4">
            <label className="profile-field">
              <span className="flex items-center gap-2">
                <FiCode />
                Skills
              </span>
              <div className="flex gap-2">
                <input
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={handleSkillsChange}
                  placeholder="Type React, Node, UI... then Enter"
                />
                <button type="button" onClick={addSkill} className="profile-add-btn">
                  Add
                </button>
              </div>
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span key={skill} className="profile-skill-chip">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                      <FiTrash2 />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-sm font-semibold text-white/45">No skills yet. Add the stuff you are proud of.</p>
              )}
            </div>
          </div>

          <label className="profile-field mt-4">
            <span>Bio</span>
            <textarea
              value={bio}
              onChange={(event) => {
                if (event.target.value.length <= 140) setbio(event.target.value);
              }}
              placeholder="Write a short intro that feels like you."
            />
          </label>
          <div className="mt-2 flex items-center justify-between text-xs font-bold">
            <span className={bio.length >= 140 ? "text-red-200" : "text-white/45"}>{bio.length}/140 characters</span>
            <span className="text-rose-100/70">keep it sweet, not corporate</span>
          </div>

          {error && <p className="profile-alert profile-alert-error">{error}</p>}
          {success && (
            <p className="profile-alert profile-alert-success">
              <FiCheckCircle />
              {success}
            </p>
          )}

          <button type="button" onClick={saveProfile} disabled={isSaving} className="profile-save-btn mt-5">
            <FiSave />
            {isSaving ? "Saving..." : "Save profile"}
          </button>
        </section>

        <aside className="profile-preview-panel rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-fuchsia-950/25 backdrop-blur-xl sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-rose-100/80">Live preview</p>
              <h2 className="text-2xl font-black">Swipe card energy</h2>
            </div>
            <FiZap className="text-rose-200" />
          </div>

          <div className="profile-preview-card overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950">
            <div className="relative h-[540px]">
              {profilePic ? (
                <img src={profilePic} alt={fullName} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center bg-gradient-to-br from-rose-300/40 via-fuchsia-400/30 to-cyan-300/30">
                  <FiCamera className="text-6xl text-white/70" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-black uppercase tracking-wide backdrop-blur">
                  <FaHeart className="mr-1 inline text-rose-200" />
                  Date-ready
                </span>
                {(age || gender) && (
                  <span className="rounded-full border border-white/20 bg-slate-950/35 px-3 py-1.5 text-xs font-bold backdrop-blur">
                    {[age, gender].filter(Boolean).join(" | ")}
                  </span>
                )}
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/15 bg-slate-950/50 p-4 backdrop-blur-xl">
                <h3 className="truncate text-4xl font-black">{fullName}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-rose-100/80">
                  <FiUser />
                  Here to find a real coding connection
                </p>
                {bio && <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/70">{bio}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default ProfileEdit;
