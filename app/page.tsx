"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBriefcase,
  faChartLine,
  faCheck,
  faClock,
  faComments,
  faCompass,
  faLayerGroup,
  faShieldHalved,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import InteractiveChart from "@/components/InteractiveChart";
import Reveal from "@/components/Reveal";

const goals = [
  ["Growing an Investment Portfolio", faChartLine],
  ["Retirement Planning", faClock],
  ["Protecting Family Wealth", faShieldHalved],
  ["Building a Financial Strategy", faCompass],
] as const;

const services = [
  ["Investment Management", "Purpose-built portfolios guided by research, diversification, and disciplined risk management.", faChartLine],
  ["Retirement Planning", "A coordinated strategy designed to support your lifestyle, income needs, and long-term security.", faClock],
  ["Wealth Preservation", "Thoughtful planning to protect what you have built and prepare wealth for future generations.", faShieldHalved],
  ["Financial Strategy", "A clear plan connecting your investments with your career, family, and broader financial objectives.", faCompass],
  ["Portfolio Guidance", "Ongoing review and guidance as markets, priorities, and financial circumstances evolve.", faLayerGroup],
  ["Brokerage Services", "Access to investment opportunities aligned with your goals, timeline, and tolerance for risk.", faBriefcase],
] as const;

const stats = [
  ["$752M", "Assets under management"],
  ["340+", "Private client families"],
  ["11.4%", "10-year annualized net return"],
  ["94%", "5-year client retention"],
  ["4×", "Barron’s Top 100 recognition"],
];

const testimonials = [
  ["Mary helped us turn several disconnected accounts into one clear strategy. We now understand what each investment is intended to do and how it supports our family’s plans.", "AM", "A. & K. Mensah", "Business owners"],
  ["The greatest difference has been clarity. Every recommendation is explained in plain language, with careful attention to risk, timing, and the responsibilities that matter to us.", "JR", "J. Rhodes", "Senior technology executive"],
  ["What stands out is the consistency of the guidance. Our plan is reviewed as our circumstances change, and we always know what the next decision means for our long-term objectives.", "LT", "L. Thompson", "Retired healthcare professional"],
];

const steps = [
  ["Discovery Consultation", "A confidential 45-minute conversation with me directly, not an assistant. I want to understand your full financial picture: goals, concerns, timeline, and what has not worked with previous advisors. No sales pressure, no agenda beyond clarity."],
  ["Portfolio Diagnostic", "I personally audit your existing holdings: fee drag, hidden concentration risks, tax inefficiencies, and gaps in downside protection. You’ll receive a written diagnostic within 10 business days, at no cost and with no obligation."],
  ["Custom Investment Plan", "I present a fully personalized Investment Policy Statement: target allocation, risk parameters, income requirements, and a phased transition strategy built to minimize disruption and tax events. You’ll understand every decision before we make it."],
  ["Smooth Onboarding", "I manage account setup, custodian transfers, and initial position building personally. Most clients are fully transitioned within 30 days, with clear communication at each stage so nothing is a surprise."],
  ["Ongoing Direct Partnership", "Your strategy is reviewed continuously as markets, tax conditions, family priorities, and financial goals change. You receive clear reporting and direct access whenever a decision needs to be made."],
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [goal, setGoal] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoPrompt, setAutoPrompt] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAutoPrompt(true);
      setModalOpen(true);
    }, 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen || !submitted) return;
    const timer = window.setTimeout(() => setModalOpen(false), 5000);
    return () => window.clearTimeout(timer);
  }, [modalOpen, submitted]);

  useEffect(() => {
    if (!modalOpen || !autoPrompt || goal || submitted) return;
    const timer = window.setTimeout(() => setModalOpen(false), 3000);
    return () => window.clearTimeout(timer);
  }, [autoPrompt, goal, modalOpen, submitted]);

  const openConsultation = () => {
    setGoal("");
    setSubmitted(false);
    setSubmitError("");
    setIsSubmitting(false);
    setAutoPrompt(false);
    setModalOpen(true);
  };

  return (
    <main className="overflow-hidden bg-ink">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex h-[78px] max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <a href="#top" aria-label="Mary E. Brown" style={{ fontFamily: "var(--font-signature), cursive" }} className="text-[31px] leading-none sm:text-[35px]"><span className="text-ivory">Mary E.</span> <span className="text-gold">Brown</span></a>
          <button className="grid gap-1.5 lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation"><span className="h-px w-6 bg-gold"/><span className="h-px w-6 bg-gold"/></button>
          <nav className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-[78px] flex-col gap-5 bg-ink px-6 py-6 lg:static lg:flex lg:flex-row lg:gap-9 lg:bg-transparent lg:p-0`}>
            {[["About", faBriefcase], ["Strategy", faCompass], ["Results", faChartLine], ["Process", faLayerGroup], ["Eligibility", faShieldHalved]].map(([item, icon]) => <a key={item as string} href={`#${(item as string).toLowerCase()}`} onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 text-[10px] uppercase tracking-[.2em] text-mist transition hover:text-gold"><FontAwesomeIcon icon={icon as typeof faBriefcase} className="w-3.5 text-[13px] text-gold"/>{item as string}</a>)}
          </nav>
          <button className="gold-button hidden lg:inline-flex" onClick={openConsultation}>Book a Consultation</button>
        </div>
      </header>

      <section id="top" className="grid min-h-[calc(100vh-78px)] lg:grid-cols-[1.08fr_.92fr]">
        <div className="order-2 flex flex-col justify-center px-6 py-20 sm:px-12 lg:order-1 lg:px-[6vw]">
          <SectionLabel>Strategic wealth management for a secure future</SectionLabel>
          <h1 className="mt-10 max-w-4xl font-display text-[52px] font-normal leading-[.98] tracking-[-.035em] sm:text-[72px] xl:text-[94px]">Build, Protect &amp; Grow Your Wealth <em className="font-normal text-gold">With Confidence</em></h1>
          <p className="body-copy mt-8 max-w-2xl text-[15px]">Personalized investment management and financial strategies designed around your goals, risk profile, and future.</p>
          <div className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <button className="gold-button shrink-0 whitespace-nowrap" onClick={openConsultation}>Schedule a Consultation <FontAwesomeIcon icon={faArrowRight}/></button>
            <a href="#results" className="border-b border-gold pb-1 text-[10px] uppercase tracking-[.16em]">Get Full Report</a>
          </div>
          <div className="mt-16 grid gap-y-5 border-t border-gold/20 pt-7 sm:grid-cols-3">
            {[["10+", "Years of experience"], ["340+", "Private client families"], ["94%", "Five-year client retention"]].map(([value,label], index) => <div key={label} className={`group flex items-center gap-2.5 sm:px-5 ${index > 0 ? "sm:border-l sm:border-gold/25" : "sm:pl-0"}`}><strong className="font-display text-3xl font-medium text-gold transition duration-300 group-hover:text-[#e2c65b]">{value}</strong><span className="max-w-[125px] text-[9px] uppercase leading-4 tracking-[.12em] text-mist">{label}</span></div>)}
          </div>
        </div>
        <div className="relative order-1 min-h-[540px] lg:order-2 lg:min-h-full">
          <Image src="/mary-eklund-brown.jpeg" alt="Mary Eklund Brown at her desk" fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover object-[52%_center]"/>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-transparent lg:to-transparent"/>
        </div>
      </section>

      <section id="about" className="bg-deep px-6 py-24 sm:px-12 lg:py-32">
        <Reveal className="mx-auto max-w-content">
          <SectionLabel>About me</SectionLabel>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div><h2 className="display-title">Mary Eklund Brown<br/><em>Financial Advisor &amp; Broker</em></h2><p className="mt-7 text-[10px] uppercase tracking-[.18em] text-gold">10+ years of financial-market experience</p></div>
            <div className="space-y-5 body-copy">
              <p>For more than a decade, I have helped individuals, families, and professionals make informed financial decisions and build strategies designed to grow, protect, and preserve their wealth.</p>
              <p>My approach to financial advisory is highly personal. I take the time to understand each client’s financial position, ambitions, responsibilities, risk tolerance, and long-term priorities before developing an investment strategy tailored specifically to them.</p>
              <p>I believe successful wealth management requires a clear strategy, disciplined risk management, careful planning, and the ability to adapt as markets and personal circumstances evolve.</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="strategy" className="px-6 py-24 sm:px-12 lg:py-32">
        <div className="mx-auto max-w-content">
          <SectionLabel>Worldwide financial services</SectionLabel>
          <div className="mt-10 grid gap-9 lg:grid-cols-2 lg:gap-24"><h2 className="display-title">Comprehensive Wealth &amp;<br/><em>Investment Solutions</em></h2><p className="body-copy lg:pt-3">Financial guidance should feel clear, coordinated, and personal. Every strategy is built to support your goals while carefully considering opportunity, time, and risk.</p></div>
          <div className="mt-16 grid border-l border-t border-gold/20 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([title, copy, icon], index) => <Reveal key={title} delay={index * 75} className="h-full"><article className={`h-full min-h-[260px] border-b border-r border-gold/20 p-8 transition duration-300 hover:-translate-y-1 hover:border-gold/50 ${index === 4 ? "bg-gold/10" : "bg-panel/20"}`}><FontAwesomeIcon icon={icon} className="text-lg text-gold"/><h3 className="mt-7 font-display text-xl">{title}</h3><p className="body-copy mt-3 text-xs">{copy}</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <section id="results" className="bg-deep px-6 py-24 sm:px-12 lg:py-32">
        <div className="mx-auto max-w-content">
          <SectionLabel>Results &amp; social proof</SectionLabel>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <h2 className="display-title max-w-[620px]">Trusted by those who have<br/>the most to <em>protect</em></h2>
            <p className="body-copy text-right lg:ml-auto lg:max-w-[350px]">Client identities protected. All outcomes represent verified, anonymized data from my own client relationships.</p>
          </div>
          <div className="mt-16 grid border-l border-t border-gold/20 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map(([value,label], index) => <Reveal key={label} delay={index * 90} className="h-full"><div className="flex h-full min-h-[138px] flex-col items-center justify-center border-b border-r border-gold/20 px-5 text-center transition duration-300 hover:bg-gold/5"><strong className="font-display text-[32px] font-normal text-gold">{value}</strong><span className="mt-1 max-w-[150px] text-[10px] uppercase leading-[1.8] tracking-[.13em] text-mist">{label}</span></div></Reveal>)}
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {testimonials.map(([quote, initials, name, detail], index) => <Reveal key={name} delay={index * 120} className="h-full"><article className="border-panel flex h-full min-h-[320px] flex-col p-8 transition duration-300 hover:-translate-y-1 hover:border-gold/40"><div className="text-sm tracking-[.12em] text-gold">★★★★★</div><blockquote className="mt-7 flex-1 font-display text-[16px] italic leading-[1.8] text-ivory"><span className="mr-1 text-3xl leading-none text-gold">“</span>{quote}</blockquote><div className="mt-7 flex items-center gap-4"><span className="grid size-11 place-items-center rounded-full bg-deep font-display text-sm text-gold">{initials}</span><div><strong className="text-xs font-semibold">{name}</strong><p className="mt-1 text-[9px] uppercase leading-4 tracking-[.13em] text-mist">{detail}</p></div></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-12 lg:py-32">
        <div className="mx-auto max-w-content">
          <SectionLabel>Market insight grounded in experience</SectionLabel>
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-24"><h2 className="display-title">Disciplined research,<br/><em>clearer decisions</em></h2><p className="body-copy">Drawing on years of market experience, I use disciplined research and data-driven analysis to help clients make informed financial decisions while carefully considering risk.</p></div>
          <div className="mt-14"><InteractiveChart/></div>
        </div>
      </section>

      <section id="process" className="bg-panel px-6 py-24 sm:px-12 lg:py-32">
        <div className="mx-auto max-w-content">
          <Reveal className="mx-auto max-w-[620px] text-center"><div className="justify-center section-label before:hidden">How it works</div><h2 className="display-title mt-7">From first conversation<br/>to <em>full portfolio clarity</em></h2><p className="body-copy mt-6">Becoming a client is a deliberate process. I invest time upfront so your strategy is built exactly around your life, not a model portfolio.</p></Reveal>
          <div className="relative mx-auto mt-16 max-w-[760px] before:absolute before:bottom-10 before:left-[23px] before:top-6 before:w-px before:bg-gold/60">
            {steps.map(([title,copy],index) => <Reveal key={title} delay={index * 100}><article className="relative grid grid-cols-[48px_1fr] gap-8 pb-14"><span className="relative z-10 grid size-12 place-items-center border border-gold bg-panel font-display text-[11px] text-gold transition duration-300 hover:bg-gold hover:text-ink">{String(index+1).padStart(2,"0")}</span><div className="pt-2"><h3 className="font-display text-[18px] font-medium">{title}</h3><p className="body-copy mt-3">{copy}</p></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <section id="eligibility" className="bg-deep px-6 py-24 sm:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[980px] gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20">
          <Reveal><div><SectionLabel>Client eligibility</SectionLabel><h2 className="display-title mt-7">I work with a<br/><em>select few</em> clients</h2><div className="body-copy mt-6 space-y-4"><p>I deliberately limit the number of client relationships I take on. This is not a business constraint, it is a personal commitment. Every client I work with gets direct access to me, and I can only honor that promise with a finite number of relationships.</p><p>My ideal client is not defined by wealth alone, but by a shared conviction that patient, disciplined investing protects and compounds capital better than chasing the market.</p></div>
            <ul className="mt-7 space-y-3 text-[12px] leading-5 text-mist">{["Families with investable assets", "Business owners planning for exit, succession, or a liquidity event", "Executives with concentrated stock positions seeking thoughtful diversification", "Retirees who need reliable, tax-efficient income managed personally", "Investors who have outgrown generic model portfolio management at large institutions"].map(item => <li key={item} className="flex gap-3"><span className="mt-2 size-1 shrink-0 bg-gold"/>{item}</li>)}</ul>
          </div></Reveal>
          <Reveal delay={180}><aside className="border border-gold/20 p-10"><p className="text-[10px] italic leading-5 text-mist">I review my capacity quarterly and close intake when I cannot personally guarantee my standard of service.</p><div className="mt-8 border border-gold/20 p-6"><p className="text-[9px] uppercase tracking-[.16em] text-gold">Current intake status</p><p className="mt-4 font-display text-[16px] leading-6">I am accepting qualified introductions through Q2 2026. I strongly recommend booking early, conversations fill up quickly.</p></div></aside></Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 py-28 text-center">
        <div className="mx-auto max-w-[650px]"><div className="justify-center section-label before:hidden">Your next chapter</div><h2 className="display-title mt-7">The cost of waiting is<br/><em>compounding against you</em></h2><p className="body-copy mt-6">Strong financial outcomes begin with a clear plan. Start a private conversation about the future you want to build.</p><button className="gold-button mt-8" onClick={openConsultation}>Schedule a Consultation <FontAwesomeIcon icon={faArrowRight}/></button><p className="mt-4 text-[9px] text-mist/70">No pressure. No obligation. Just a thoughtful conversation.</p></div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-white/5 bg-ink px-6 py-8 text-[10px] text-mist sm:flex-row sm:items-center sm:justify-between lg:px-12"><span style={{ fontFamily: "var(--font-signature), cursive" }} className="text-[28px] leading-none"><span className="text-ivory">Mary E.</span> <span className="text-gold">Brown</span></span><span>Financial Advisor &amp; Broker</span><span>© {new Date().getFullYear()} Mary Eklund Brown</span></footer>

      {modalOpen ? <div className="modal-backdrop-enter fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#010810]/90 p-3 sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
        <section className={`modal-panel-enter relative border border-gold/30 bg-deep shadow-2xl ${goal ? "w-full max-w-[560px] p-7 sm:p-11" : "grid w-full max-w-[850px] lg:grid-cols-[1.04fr_.96fr]"}`} role="dialog" aria-modal="true" aria-label="Schedule a consultation">
          <button className="absolute right-4 top-4 z-10 text-2xl text-mist transition hover:text-gold" onClick={() => setModalOpen(false)} aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
          {!goal ? <><div className="p-7 sm:p-11"><SectionLabel>Quick question</SectionLabel><h2 className="mt-6 font-display text-[34px] leading-[1.08]">What’s your main<br/>financial goal?</h2><p className="body-copy mt-3">Select one to get tailored guidance.</p><div className="mt-8 grid gap-3">{goals.map(([label,icon]) => <button key={label} onClick={() => {setAutoPrompt(false);setGoal(label);}} className="flex min-h-[70px] items-center gap-4 border border-gold/25 bg-panel px-5 text-left text-sm transition hover:translate-x-1 hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"><span className="grid size-10 place-items-center border border-gold/40 text-gold"><FontAwesomeIcon icon={icon}/></span>{label}</button>)}</div></div><div className="hidden min-h-[610px] flex-col items-center justify-center gap-4 border-l border-gold/20 font-display text-xl text-mist lg:flex"><span className="grid size-14 place-items-center border border-gold/40 text-gold"><FontAwesomeIcon icon={faComments}/></span>Select a goal to get started</div></> : submitted ? <div className="status-enter py-12 text-center"><span className="mx-auto grid size-16 place-items-center rounded-full border-2 border-emerald-400 bg-emerald-400/10 text-2xl text-emerald-400"><FontAwesomeIcon icon={faCheck}/></span><p className="mt-6 text-[10px] uppercase tracking-label text-emerald-400">Success</p><h2 className="mt-4 font-display text-3xl">Message sent successfully</h2><p className="body-copy mx-auto mt-4 max-w-sm">Thank you for reaching out. We’ll review your message and get back to you within 24 hours.</p><button className="gold-button mt-7" onClick={() => setModalOpen(false)}>Close</button></div> : <form className="form-enter" onSubmit={async (event) => {event.preventDefault();setSubmitError("");setIsSubmitting(true);const formData = new FormData(event.currentTarget);const payload = {...Object.fromEntries(formData.entries()),goal};try {const response = await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const result = await response.json();if (!response.ok) throw new Error(result.error || "Unable to send request.");setSubmitted(true);} catch (error) {setSubmitError(error instanceof Error ? error.message : "Unable to send request.");} finally {setIsSubmitting(false);}}}><SectionLabel>Confidential consultation</SectionLabel><h2 className="mt-6 font-display text-[34px] leading-[1.08]">Take the first step<br/>toward financial clarity</h2><p className="body-copy mt-3">Share a few details below. Mary will contact you personally within one business day to arrange a focused 45-minute consultation.</p><div className="mt-6 flex items-center gap-3 border border-gold/20 bg-panel p-3"><FontAwesomeIcon icon={faChartLine} className="text-gold"/><span className="flex flex-1 flex-col text-xs"><small className="text-[8px] uppercase tracking-[.15em] text-mist">Your goal</small>{goal}</span><button type="button" onClick={() => setGoal("")} className="text-[9px] uppercase text-gold">Change</button></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{[["Full name","Full name","text","fullName"],["Email address","you@example.com","email","email"],["Phone number","Phone number","tel","phone"]].map(([label,placeholder,type,name]) => <label key={label} className={`text-[8px] uppercase tracking-[.15em] text-mist ${label === "Full name" ? "sm:col-span-2" : ""}`}>{label}<input required disabled={isSubmitting} name={name} type={type} placeholder={placeholder} className="mt-2 block w-full border border-gold/20 bg-panel p-3 text-xs normal-case tracking-normal text-ivory outline-none transition duration-300 focus:-translate-y-px focus:border-gold disabled:cursor-wait disabled:opacity-60"/></label>)}</div><label className="mt-4 block text-[8px] uppercase tracking-[.15em] text-mist">Location<input required disabled={isSubmitting} name="location" type="text" placeholder="City, state or country" className="mt-2 block w-full border border-gold/20 bg-panel p-3 text-xs normal-case tracking-normal text-ivory outline-none transition duration-300 focus:-translate-y-px focus:border-gold disabled:cursor-wait disabled:opacity-60"/></label><label className="mt-4 block text-[8px] uppercase tracking-[.15em] text-mist">Anything Mary should know?<textarea disabled={isSubmitting} name="message" placeholder="Tell us a little about your goals..." className="mt-2 block h-20 w-full resize-none border border-gold/20 bg-panel p-3 text-xs normal-case tracking-normal text-ivory outline-none transition duration-300 focus:-translate-y-px focus:border-gold disabled:cursor-wait disabled:opacity-60"/></label>{submitError ? <p role="alert" className="status-enter mt-3 border border-red-400/30 bg-red-400/10 px-3 py-2 text-center text-xs text-red-200">{submitError}</p> : null}<button disabled={isSubmitting} className="gold-button mt-4 w-full disabled:cursor-wait disabled:opacity-70" type="submit">{isSubmitting ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin"/> Sending message...</> : <>Submit Request <FontAwesomeIcon icon={faArrowRight}/></>}</button><p className="mt-3 text-center text-[8px] text-mist/70">Your information is private and will only be used to respond to your request.</p></form>}
        </section>
      </div> : null}
    </main>
  );
}
