import { useEffect, useState } from "react";
import axios from "axios";
import { FaCrown, FaHeart } from "react-icons/fa";
import { FiCheckCircle, FiShield, FiStar, FiTrendingUp, FiZap } from "react-icons/fi";
import baseUrl from "../utils/BaseUrl";

function Premium() {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState("");
  const [error, setError] = useState("");

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(baseUrl + "/verify/payment", { withCredentials: true });
      setIsUserPremium(Boolean(res.data.isPremium));
    } catch (err) {
      console.log(err);
    } finally {
      setIsChecking(false);
      setLoadingPlan("");
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handlePayment = async (type) => {
    setError("");
    setLoadingPlan(type);

    try {
      const order = await axios.post(baseUrl + "/payment/create", { membershipType: type }, { withCredentials: true });
      const { keyId, amount, currency, orderId, notes } = order.data;

      if (!window.Razorpay) {
        setError("Payment window could not load. Please refresh and try again.");
        setLoadingPlan("");
        return;
      }

      const options = {
        key: keyId,
        amount,
        currency,
        name: "SomeOne.Dev",
        description: "Connect with other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName,
          email: notes.email,
        },
        theme: {
          color: "#fb7185",
        },
        handler: verifyPremiumUser,
        modal: {
          ondismiss: () => setLoadingPlan(""),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || err?.response?.data || "Could not start payment. Please try again.");
      setLoadingPlan("");
    }
  };

  const plans = [
    {
      name: "Silver",
      price: "₹300",
      period: "3 months",
      tone: "cyan",
      icon: FiStar,
      tagline: "For active swipers who want more reach.",
      features: ["100 connection requests per day", "Blue tick profile shine", "Unlimited chats", "Better profile visibility"],
    },
    {
      name: "Gold",
      price: "₹700",
      period: "6 months",
      tone: "rose",
      icon: FaCrown,
      tagline: "For serious dev dating main-character energy.",
      features: ["Unlimited connection requests", "Priority blue tick glow", "Unlimited chats", "Maximum discovery boost"],
      popular: true,
    },
  ];

  if (isChecking) {
    return (
      <main className="premium-stage grid min-h-screen place-items-center px-4 pt-24 text-white">
        <div className="premium-loader rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center backdrop-blur-xl">
          <FiZap className="mx-auto text-4xl text-rose-200" />
          <h1 className="mt-4 text-3xl font-black">Checking your glow pass</h1>
          <p className="mt-2 text-white/60">One tiny premium scan...</p>
        </div>
      </main>
    );
  }

  if (isUserPremium) {
    return (
      <main className="premium-stage min-h-screen px-4 pb-10 pt-28 text-white sm:px-6">
        <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center">
          <div className="premium-owned-card rounded-[2rem] border border-rose-200/20 bg-white/10 p-8 text-center shadow-2xl shadow-rose-950/30 backdrop-blur-xl">
            <FaCrown className="mx-auto text-5xl text-rose-200" />
            <h1 className="mt-5 text-4xl font-black">You are already premium</h1>
            <p className="mt-3 text-white/65">Your profile is glowing. Go make some dev hearts compile.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="premium-stage min-h-screen overflow-hidden px-3 pb-10 pt-24 text-white sm:px-6 lg:pt-28">
      <div className="premium-glow-orbit" />
      <section className="mx-auto max-w-7xl">
        <div className="premium-hero mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-300/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-rose-100">
            <FaHeart />
            Premium glow-up
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
            Boost your profile. Get more dev crushes.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
            Upgrade your visibility, unlock more requests, and make your SomeOne.DEV card feel impossible to ignore.
          </p>
        </div>

        {error && (
          <p className="mx-auto mt-6 max-w-2xl rounded-2xl border border-red-200/25 bg-red-500/15 px-4 py-3 text-center text-sm font-bold text-red-100">
            {error}
          </p>
        )}

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article
                key={plan.name}
                className={`premium-plan-card ${plan.popular ? "is-popular" : ""} flex h-full flex-col rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7`}
              >
                <div className="min-h-[2rem]">
                  {plan.popular && (
                    <p className="inline-flex rounded-full bg-rose-200 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-slate-950">
                      Most loved
                    </p>
                  )}
                </div>

                <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className={`premium-plan-icon premium-${plan.tone} grid h-12 w-12 place-items-center rounded-2xl text-xl`}>
                        <Icon />
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-3xl font-black">{plan.name}</h2>
                        <p className="mt-1 max-w-sm text-sm font-semibold leading-6 text-white/55">{plan.tagline}</p>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <p className="text-4xl font-black">{plan.price}</p>
                    <p className="text-xs font-bold uppercase tracking-wide text-white/50">{plan.period}</p>
                  </div>
                </div>

                <div className="mt-6 grid flex-1 content-start gap-3">
                  {plan.features.map((feature) => (
                    <p key={feature} className="flex min-h-[3.25rem] items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3 text-sm font-bold leading-5 text-white/75">
                      <FiCheckCircle className="shrink-0 text-rose-200" />
                      {feature}
                    </p>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handlePayment(plan.name)}
                  disabled={Boolean(loadingPlan)}
                  className={`premium-buy-btn mt-6 w-full rounded-2xl px-5 py-4 text-sm font-black uppercase tracking-wide text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    plan.popular ? "premium-buy-rose" : "premium-buy-cyan"
                  }`}
                >
                  {loadingPlan === plan.name ? "Opening payment..." : `Buy ${plan.name}`}
                </button>
              </article>
            );
          })}
        </div>

        <div className="premium-trust-row mt-6 grid gap-3 md:grid-cols-3">
          {[
            { icon: FiShield, label: "Secure Razorpay checkout" },
            { icon: FiTrendingUp, label: "More profile visibility" },
            { icon: FiZap, label: "Instant premium verification" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/10 p-4 text-center font-bold text-white/70 backdrop-blur-xl">
              <Icon className="mx-auto mb-2 text-rose-200" />
              {label}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Premium;
