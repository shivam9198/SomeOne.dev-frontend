import axios from "axios";
import { FiBell, FiChevronDown, FiCompass, FiCreditCard, FiLogOut, FiMessageCircle, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import baseUrl from "../utils/BaseUrl";
import { clearfeed } from "../utils/FeedSlice";
import { removeUser } from "../utils/UserSlice";
import BrandMark from "./BrandMark";
import logo from "../assest/logo.png";

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(baseUrl + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearfeed());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const navItems = [
    { label: "Feed", path: "/", icon: FiCompass },
    { label: "Requests", path: "/request", icon: FiBell },
    { label: "Connections", path: "/connections", icon: FiMessageCircle },
    { label: "Premium", path: "/premium", icon: FiCreditCard },
  ];

  const avatar = user?.profilePic || logo;

  return (
    <header className="app-navbar fixed left-0 top-0 z-50 w-full px-3 py-3 sm:px-5">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[1.4rem] border border-white/15 bg-slate-950/75 px-3 text-white shadow-2xl shadow-cyan-950/25 backdrop-blur-xl sm:px-5">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <BrandMark className="nav-logo-glow h-11 w-11 shrink-0" />
          <span className="min-w-0">
            <span className="block truncate text-base font-black tracking-wide sm:text-lg">SomeOne.DEV</span>
            <span className="hidden text-xs font-semibold text-cyan-200/70 sm:block">collab radar online</span>
          </span>
        </Link>

        {user && (
          <>
            <div className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-white/10 p-1 lg:flex">
              {navItems.map(({ label, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `nav-link-pop flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
                      isActive ? "bg-white text-slate-950 shadow-lg shadow-cyan-500/15" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon />
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-2 text-xs font-bold text-fuchsia-100 md:block">
                Yo, {user.firstName}
              </div>

              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  type="button"
                  className="nav-avatar group flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-1.5 pr-2 transition hover:bg-white/15"
                >
                  <span className="h-10 w-10 overflow-hidden rounded-xl bg-white/10">
                    <img alt="profile" src={avatar} className="h-full w-full object-cover" />
                  </span>
                  <FiChevronDown className="hidden text-white/70 transition group-hover:translate-y-0.5 sm:block" />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu z-[60] mt-3 w-60 rounded-3xl border border-white/15 bg-slate-950/95 p-2 text-white shadow-2xl shadow-cyan-950/40 backdrop-blur-xl"
                >
                  <li>
                    <Link to="/profile" className="rounded-2xl font-semibold hover:bg-white/10">
                      <FiUser />
                      Profile
                    </Link>
                  </li>
                  {navItems.slice(1).map(({ label, path, icon: Icon }) => (
                    <li key={path} className="lg:hidden">
                      <Link to={path} className="rounded-2xl font-semibold hover:bg-white/10">
                        <Icon />
                        {label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button onClick={handleLogout} className="rounded-2xl font-semibold text-red-200 hover:bg-red-500/15">
                      <FiLogOut />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
