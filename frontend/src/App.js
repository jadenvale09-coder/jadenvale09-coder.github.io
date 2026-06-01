import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ArrowRight, CheckCircle2, MonitorSmartphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "@/components/ui/sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WEB3FORMS_ENDPOINT = process.env.REACT_APP_WEB3FORMS_ENDPOINT;
const WEB3FORMS_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_SECONDARY_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_SECONDARY_ACCESS_KEY;
const WEB3FORMS_ACCESS_KEYS = [WEB3FORMS_ACCESS_KEY, WEB3FORMS_SECONDARY_ACCESS_KEY].filter(Boolean);

const logoUrl = "https://customer-assets.emergentagent.com/job_8d6b2f2c-aa55-4423-8a3d-04478a254be3/artifacts/zm2kr6wy_Logoshop%202026-05-18%2011-45-8.jpeg";

const images = {
  hero: "https://static.prod-images.emergentagent.com/jobs/8d6b2f2c-aa55-4423-8a3d-04478a254be3/images/88852336fcdbcd3fee755e2490fba8fbb340ad4b1c288358876cc0101988714e.png",
  design: "https://images.unsplash.com/photo-1637502875124-eb4a9843a2fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGFwdG9wJTIwd2ViJTIwZGVzaWduJTIwZGVza3xlbnwwfHx8fDE3NzkxMjMyMzZ8MA&ixlib=rb-4.1.0&q=85",
  redesign: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBidXNpbmVzcyUyMGNvbnN1bHRhdGlvbiUyMG1lZXRpbmd8ZW58MHx8fHwxNzc5MTIzMjM2fDA&ixlib=rb-4.1.0&q=85",
  about: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBidXNpbmVzcyUyMGNvbnN1bHRhdGlvbiUyMG1lZXRpbmd8ZW58MHx8fHwxNzc5MTIzMjM2fDA&ixlib=rb-4.1.0&q=85",
};

const services = [
  {
    icon: MonitorSmartphone,
    title: "New Website Builds",
    copy: "A fresh site from the ground up, built around your offer, trust, and booked consultations.",
    image: images.design,
    testId: "service-new-website-builds-card",
  },
  {
    icon: Sparkles,
    title: "Website Redesigns",
    copy: "A sharper version of your current site with cleaner visuals, messaging, and visitor flow.",
    image: images.redesign,
    testId: "service-website-redesigns-card",
  },
];

const comparisonItems = [
  {
    label: "Choose a new build if...",
    title: "You need a complete online foundation.",
    details: ["No current site", "New brand or offer", "You want a polished launch from scratch"],
    testId: "comparison-new-build-card",
  },
  {
    label: "Choose a redesign if...",
    title: "Your current site needs to work harder.",
    details: ["Outdated look", "Confusing user flow", "Visitors are not turning into leads"],
    testId: "comparison-redesign-card",
  },
];

const faqs = [
  {
    question: "How long does a new website build take?",
    answer: "Most small business website builds can be planned, designed, and launched in a few weeks depending on the size and content needed.",
    testId: "faq-new-website-build-timeline",
  },
  {
    question: "Do you redesign existing websites?",
    answer: "Yes. AJ Webworks can modernize your current site with cleaner visuals, stronger messaging, and a smoother path to booking a consultation.",
    testId: "faq-website-redesigns",
  },
  {
    question: "What is the difference between a new build and a redesign?",
    answer: "A new build is best when you need a complete website from scratch. A redesign is best when your current site has potential but needs a more professional look and better flow.",
    testId: "faq-new-build-vs-redesign",
  },
  {
    question: "Can the website help me get more consultation requests?",
    answer: "That is the goal. We focus on website design and redesign services for small businesses that need more trust, clearer messaging, and easier ways for visitors to contact them.",
    testId: "faq-consultation-requests",
  },
];

const reviews = [
  {
    rating: "5.0",
    stars: "★★★★★",
    quote: "Clean, professional, and exactly what we needed to start booking better leads.",
    name: "Amanda Brooks",
    businessType: "Home services owner",
    testId: "review-five-star-owner",
  },
  {
    rating: "4.5",
    stars: "★★★★½",
    quote: "The redesign made our business look far more credible and easier to contact.",
    name: "Marcus Lee",
    businessType: "Consulting founder",
    testId: "review-four-half-star-founder",
  },
  {
    rating: "5.0",
    stars: "★★★★★",
    quote: "Simple process, polished result, and a website that finally feels premium.",
    name: "Priya Shah",
    businessType: "Local retail operator",
    testId: "review-five-star-operator",
  },
];

const BrowserGraphic = () => (
  <div className="react-browser-graphic" aria-hidden="true">
    <div className="react-browser-top"><span /><span /><span /></div>
    <div className="react-browser-body">
      <span className="react-browser-line wide" />
      <span className="react-browser-line short" />
      <span className="react-browser-button" />
    </div>
  </div>
);

const VisualShowcase = () => (
  <section className="visual-showcase-react px-5 py-24 sm:px-8 lg:px-10 lg:py-32" data-testid="visual-showcase-section">
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.72fr_1.28fr]">
      <div className="animate-rise" data-testid="visual-showcase-copy">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-blue-900" data-testid="visual-showcase-eyebrow">
          Visual strategy
        </p>
        <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl" data-testid="visual-showcase-title">
          Designed to make the next step obvious.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg" data-testid="visual-showcase-description">
          Every page should guide visitors from first impression to booked consultation with clean visuals, clear proof, and a simple action path.
        </p>
      </div>
      <div className="website-preview-graphic-react" aria-label="Graphic showing a website conversion layout" data-testid="website-preview-graphic">
        <div className="preview-window-react">
          <div className="preview-toolbar-react">
            <span /><span /><span />
            <div>ajwebworks.com</div>
          </div>
          <div className="preview-layout-react">
            <div className="preview-hero-block-react">
              <span className="preview-pill-react" />
              <span className="preview-title-line-react" />
              <span className="preview-title-line-react small" />
              <span className="preview-cta-line-react" />
            </div>
            <div className="preview-side-panel-react">
              <span /><span /><span />
            </div>
          </div>
        </div>
        <div className="floating-stat-react stat-one-react" data-testid="graphic-stat-trust">
          <strong>Trust</strong>
          <span>Clear first impression</span>
        </div>
        <div className="floating-stat-react stat-two-react" data-testid="graphic-stat-action">
          <strong>Action</strong>
          <span>One obvious next step</span>
        </div>
        <div className="conversion-path-react" aria-hidden="true">
          <span>Visit</span><i /><span>Trust</span><i /><span>Book</span>
        </div>
      </div>
    </div>
  </section>
);

const scrollToLeadForm = () => {
  const leadCard = document.getElementById("lead-form-card");
  if (!leadCard) return;

  const cardPosition = leadCard.getBoundingClientRect();
  const isComfortablyVisible = cardPosition.top > 120 && cardPosition.bottom < window.innerHeight - 24;
  if (isComfortablyVisible) return;

  window.scrollTo({ top: window.scrollY + cardPosition.top - 112, behavior: "smooth" });
};

const BrandMark = ({ mode = "light", testId = "brand-mark" }) => (
  <div className="flex items-center gap-3" data-testid={testId}>
    <img
      src={logoUrl}
      alt="AJ Webworks logo"
      className="h-11 w-11 rounded-xl border border-slate-200 bg-white object-cover p-1 shadow-sm"
      data-testid={`${testId}-logo-image`}
    />
    <div>
      <p
        className={`font-heading text-lg font-extrabold tracking-tight ${mode === "dark" ? "text-white" : "text-slate-950"}`}
        data-testid={`${testId}-name`}
      >
        AJ Webworks
      </p>
      <p className={mode === "dark" ? "text-xs text-slate-400" : "text-xs text-slate-500"} data-testid={`${testId}-tagline`}>
        Websites that sell
      </p>
    </div>
  </div>
);

const LeadForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const sendToWeb3Forms = async (accessKey) => {
        const web3Payload = new FormData();
        web3Payload.append("access_key", accessKey);
        web3Payload.append("subject", "New consultation request from AJ Webworks");
        web3Payload.append("from_name", "AJ Webworks Website");
        web3Payload.append("name", formData.name);
        web3Payload.append("email", formData.email);
        web3Payload.append("phone", formData.phone);
        web3Payload.append("message", formData.message);

        const web3Response = await axios.post(WEB3FORMS_ENDPOINT, web3Payload);
        if (!web3Response.data?.success) {
          throw new Error(web3Response.data?.message || "Web3Forms submission failed");
        }
        return web3Response.data;
      };

      await Promise.all(WEB3FORMS_ACCESS_KEYS.map((accessKey) => sendToWeb3Forms(accessKey)));

      await axios.post(`${API}/leads`, formData).catch(() => null);

      toast.success("Consultation request sent", {
        description: "Your message was delivered to both business inboxes.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please check your details and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card id="lead-form-card" className="lead-card overflow-hidden border-slate-200 bg-white/95 shadow-2xl shadow-blue-950/10" data-testid="hero-lead-form-card">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6" data-testid="lead-form-intro">
          <BrowserGraphic />
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-800" data-testid="lead-form-eyebrow">
            Free consultation
          </p>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-slate-950" data-testid="lead-form-title">
            Start with a better website plan.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600" data-testid="lead-form-description">
            Tell us what you need. We’ll map the fastest path to a cleaner, higher-converting site.
          </p>
        </div>

        <form id="lead-form" onSubmit={handleSubmit} className="space-y-4" data-testid="hero-lead-form">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700" data-testid="lead-form-name-label">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              minLength={2}
              className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 focus-visible:ring-blue-300"
              data-testid="lead-form-name-input"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700" data-testid="lead-form-email-label">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              required
              className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 focus-visible:ring-blue-300"
              data-testid="lead-form-email-input"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700" data-testid="lead-form-phone-label">
              Phone number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 focus-visible:ring-blue-300"
              data-testid="lead-form-phone-input"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700" data-testid="lead-form-message-label">
              What are you building?
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="I need a new site, redesign, or a cleaner way to book clients..."
              required
              minLength={8}
              className="min-h-28 rounded-xl border-slate-200 bg-slate-50/70 px-4 py-3 focus-visible:ring-blue-300"
              data-testid="lead-form-message-input"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-blue-900 px-6 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-900/25"
            data-testid="hero-lead-form-submit-button"
          >
            {isSubmitting ? "Sending..." : "Book a free consultation"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <p className="text-center text-xs text-slate-500" data-testid="lead-form-privacy-note">
            No pressure. Just a clear next step.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const trustPoints = ["Conversion-first design", "Clear launch process", "Built for trust"];

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950" data-testid="landing-page-root">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/82 backdrop-blur-xl" data-testid="site-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <BrandMark testId="header-brand-mark" />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation" data-testid="header-navigation">
            <a href="#services" className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-900" data-testid="header-services-link">
              Services
            </a>
            <a href="#about" className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-900" data-testid="header-about-link">
              About
            </a>
            <button
              onClick={scrollToLeadForm}
              className="rounded-full bg-blue-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-900/25"
              data-testid="header-consultation-button"
            >
              Book a free consultation
            </button>
          </nav>
          <button
            onClick={scrollToLeadForm}
            className="rounded-full bg-blue-900 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-900/20 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-blue-800 md:hidden"
            data-testid="mobile-header-consultation-button"
          >
            Book call
          </button>
        </div>
      </header>

      <section className="relative isolate px-5 pb-20 pt-32 sm:px-8 lg:px-10 lg:pb-28 lg:pt-36" data-testid="hero-section">
        <div className="absolute left-0 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-blue-100/70 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-18rem] top-28 -z-10 h-[42rem] w-[42rem] rounded-full bg-slate-200/70 blur-3xl" aria-hidden="true" />
        <div className="hero-graphic-system-react" aria-hidden="true">
          <span className="graphic-orb-react orb-one-react" />
          <span className="graphic-orb-react orb-two-react" />
          <span className="graphic-line-react line-one-react" />
          <span className="graphic-line-react line-two-react" />
          <span className="graphic-dot-react dot-one-react" />
          <span className="graphic-dot-react dot-two-react" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="animate-rise" data-testid="hero-copy-column">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-900 shadow-sm" data-testid="hero-eyebrow-badge">
              <span className="h-2 w-2 rounded-full bg-blue-700" aria-hidden="true" />
              Premium websites for growing businesses
            </div>
            <h1 className="font-heading text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl" data-testid="hero-headline">
              Premium websites that drive revenue.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg" data-testid="hero-subheadline">
              AJ Webworks provides website design and redesign services for small businesses that want more trust, clearer messaging, and more booked consultations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-testid="hero-cta-row">
              <button
                onClick={scrollToLeadForm}
                className="group rounded-full bg-blue-900 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-2xl hover:shadow-blue-900/25"
                data-testid="hero-primary-consultation-button"
              >
                Book a free consultation
                <ArrowRight className="ml-2 inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <a
                href="#services"
                className="rounded-full border border-slate-200 bg-white px-7 py-4 text-center text-sm font-bold text-slate-800 shadow-sm transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"
                data-testid="hero-services-link"
              >
                View services
              </a>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3" data-testid="hero-trust-points">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm font-semibold text-slate-700" data-testid={`hero-trust-point-${point.toLowerCase().replaceAll(" ", "-")}`}>
                  <CheckCircle2 className="h-4 w-4 text-blue-800" aria-hidden="true" />
                  {point}
                </div>
              ))}
            </div>

            <div className="mt-8 max-w-2xl rounded-[1.5rem] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur" data-testid="hero-social-proof-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-testid="hero-social-proof-content">
                <div data-testid="hero-social-proof-copy">
                  <p className="mt-1 text-sm font-bold text-slate-800" data-testid="hero-social-proof-headline">
                    Recent 4.5 and 5-star feedback from business owners.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2" data-testid="hero-social-proof-rating-list">
                  {reviews.slice(0, 2).map((review) => (
                    <span
                      key={review.testId}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-extrabold tracking-tight text-slate-500"
                      data-testid={`hero-social-proof-rating-${review.rating.replace(".", "-")}`}
                    >
                      {review.rating} {review.stars}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.82fr_1fr]" data-testid="hero-visual-and-form-column">
            <div className="relative hidden overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10 lg:block" data-testid="hero-stock-image-card">
              <img src={images.hero} alt="Premium website planning workspace" className="h-full min-h-[30rem] w-full object-cover" data-testid="hero-stock-image" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 backdrop-blur" data-testid="hero-image-caption-card">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-900" data-testid="hero-image-caption-label">Strategy first</p>
                <p className="mt-1 text-sm font-semibold text-slate-800" data-testid="hero-image-caption-text">A clear path from click to customer.</p>
              </div>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <VisualShowcase />

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-8 sm:px-8 lg:px-10" data-testid="social-proof-section">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500" data-testid="social-proof-label">
            Recent review highlights
          </p>
          <div className="grid gap-4 md:grid-cols-3" data-testid="review-card-list">
            {reviews.map((review) => (
              <article key={review.testId} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" data-testid={review.testId}>
                <div className="flex items-center gap-3" data-testid={`${review.testId}-rating-row`}>
                  <span className="font-heading text-xl font-extrabold text-blue-900" data-testid={`${review.testId}-rating`}>
                    {review.rating}
                  </span>
                  <span className="text-sm font-black tracking-[0.08em] text-blue-800" aria-label={`${review.rating} star review`} data-testid={`${review.testId}-stars`}>
                    {review.stars}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600" data-testid={`${review.testId}-quote`}>
                  “{review.quote}”
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400" data-testid={`${review.testId}-name`}>
                  {review.name}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500" data-testid={`${review.testId}-business-type`}>
                  {review.businessType}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32" data-testid="services-section">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl" data-testid="services-heading-block">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-blue-900" data-testid="services-eyebrow">
              Services
            </p>
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl" data-testid="services-title">
              Focused services. Better conversion.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg" data-testid="services-description">
              New websites and redesigns that look credible, load with purpose, and guide buyers to the next step.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2" data-testid="services-card-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10"
                  data-testid={service.testId}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100" data-testid={`${service.testId}-image-wrap`}>
                    <img src={service.image} alt={`${service.title} service`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" data-testid={`${service.testId}-image`} />
                  </div>
                  <div className="p-7" data-testid={`${service.testId}-content`}>
                    <div className="mb-5 flex items-center justify-between" data-testid={`${service.testId}-topline`}>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-900" data-testid={`${service.testId}-icon`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-sm font-extrabold text-slate-300" data-testid={`${service.testId}-number`}>
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl font-extrabold tracking-tight text-slate-950" data-testid={`${service.testId}-title`}>
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600" data-testid={`${service.testId}-copy`}>
                      {service.copy}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:p-10" data-testid="service-comparison-section">
            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between" data-testid="service-comparison-heading-block">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-blue-900" data-testid="service-comparison-eyebrow">
                  New build vs. redesign
                </p>
                <h3 className="font-heading text-2xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-3xl" data-testid="service-comparison-title">
                  Not sure which one you need?
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600" data-testid="service-comparison-description">
                We keep the choice simple: start fresh when you need a full foundation, redesign when your existing site has potential but needs polish.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2" data-testid="service-comparison-grid">
              {comparisonItems.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm" data-testid={item.testId}>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-900" data-testid={`${item.testId}-label`}>
                    {item.label}
                  </p>
                  <h4 className="mt-3 font-heading text-xl font-extrabold tracking-tight text-slate-950" data-testid={`${item.testId}-title`}>
                    {item.title}
                  </h4>
                  <ul className="mt-5 space-y-3" data-testid={`${item.testId}-list`}>
                    {item.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm font-semibold text-slate-700" data-testid={`${item.testId}-${detail.toLowerCase().replaceAll(" ", "-")}`}>
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-800" aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-slate-950 px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32" data-testid="about-section">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30" data-testid="about-image-card">
            <img src={images.about} alt="Business consultation meeting" className="aspect-[4/3] w-full object-cover opacity-90" data-testid="about-stock-image" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-slate-950/78 p-5 backdrop-blur-xl" data-testid="about-stat-card">
              <p className="font-heading text-3xl font-extrabold text-white" data-testid="about-stat-value">3-step</p>
              <p className="mt-1 text-sm text-slate-300" data-testid="about-stat-description">Plan, design, launch — without clutter.</p>
            </div>
          </div>
          <div data-testid="about-copy-block">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-blue-200" data-testid="about-eyebrow">
              About us
            </p>
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl" data-testid="about-title">
              Your partners in digital growth.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg" data-testid="about-description">
              AJ Webworks builds polished websites with a simple goal: make your business easier to trust and easier to contact.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3" data-testid="about-proof-grid">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5" data-testid="about-proof-strategy">
                <p className="font-heading text-2xl font-extrabold" data-testid="about-proof-strategy-value">01</p>
                <p className="mt-2 text-sm text-slate-300" data-testid="about-proof-strategy-label">Clear strategy</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5" data-testid="about-proof-design">
                <p className="font-heading text-2xl font-extrabold" data-testid="about-proof-design-value">02</p>
                <p className="mt-2 text-sm text-slate-300" data-testid="about-proof-design-label">Premium design</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5" data-testid="about-proof-launch">
                <p className="font-heading text-2xl font-extrabold" data-testid="about-proof-launch-value">03</p>
                <p className="mt-2 text-sm text-slate-300" data-testid="about-proof-launch-label">Smooth launch</p>
              </div>
            </div>
            <button
              onClick={scrollToLeadForm}
              className="mt-9 rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-black/20 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-blue-50"
              data-testid="about-consultation-button"
            >
              Book a free consultation
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8 lg:px-10 lg:py-32" data-testid="faq-section">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div data-testid="faq-heading-block">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-blue-900" data-testid="faq-eyebrow">
              FAQ
            </p>
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl" data-testid="faq-title">
              Quick answers before you book.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg" data-testid="faq-description">
              A few common questions about new website builds, redesigns, and what to expect when working with AJ Webworks.
            </p>
            <button
              onClick={scrollToLeadForm}
              className="mt-8 rounded-full bg-blue-900 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-2xl hover:shadow-blue-900/25"
              data-testid="faq-consultation-button"
            >
              Still have questions? Book a free consultation
            </button>
          </div>

          <div className="space-y-4" data-testid="faq-list">
            {faqs.map((faq) => (
              <article key={faq.testId} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm" data-testid={faq.testId}>
                <h3 className="font-heading text-xl font-extrabold tracking-tight text-slate-950" data-testid={`${faq.testId}-question`}>
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600" data-testid={`${faq.testId}-answer`}>
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10" data-testid="final-cta-section">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-950 via-blue-900 to-slate-800 p-8 text-white shadow-2xl shadow-blue-950/20 sm:p-12 lg:p-16" data-testid="final-cta-card">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div data-testid="final-cta-copy">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-blue-200" data-testid="final-cta-eyebrow">
                Ready to scale?
              </p>
              <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl" data-testid="final-cta-title">
                Let’s turn your website into a stronger sales asset.
              </h2>
            </div>
            <button
              onClick={scrollToLeadForm}
              className="rounded-full bg-white px-7 py-4 text-sm font-bold text-blue-950 shadow-xl shadow-black/20 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-blue-50"
              data-testid="final-cta-consultation-button"
            >
              Book a free consultation
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-10 sm:px-8 lg:px-10" data-testid="site-footer">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <BrandMark testId="footer-brand-mark" />
          <p className="text-sm text-slate-500" data-testid="footer-copyright">
            © 2026 AJ Webworks. Modern websites for growing businesses.
          </p>
        </div>
      </footer>
    </main>
  );
};

function App() {
  return (
    <div className="App" data-testid="app-shell">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
