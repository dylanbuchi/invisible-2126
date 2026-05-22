"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

type TerminalEntry = {
  id: number;
  command: string;
  lines: string[];
};

const statuses = [
  ["ARCHIVE NODE", "7F-2126"],
  ["CLEARANCE", "PUBLIC"],
  ["OPERATOR STATUS", "ACTIVE"],
  ["IDENTITY", "REDACTED"],
];

const operatorFields = [
  ["Identity", "REDACTED"],
  ["Alias", "INVISIBLE"],
  ["Role", "Independent Builder"],
  ["Mode", "Human-in-the-loop"],
  ["Status", "Active"],
  ["Origin", "Withheld"],
  ["Focus", "Interfaces / SaaS / Automation / AI Workflows"],
];

const capabilities = [
  ["Web interfaces", "Responsive frontends with sharp interaction paths."],
  ["SaaS prototypes", "Core workflow surfaces built for fast proof."],
  ["AI-assisted workflows", "Human-reviewed systems with useful guardrails."],
  ["Automation systems", "Repeatable admin flows reduced to signal."],
  ["Client portals", "Secure-feeling intake, review, and status spaces."],
  ["Internal tools", "Operational dashboards that remove ambiguity."],
  ["Deployment-ready frontends", "Polished builds prepared for preview and launch."],
  ["Product experiments", "Small bets with enough fidelity to judge."],
];

const projects = [
  {
    name: "Ledger Ghost",
    category: "Bookkeeping context",
    problem: "Collects missing transaction context, notes, and receipts without turning the client workflow into email archaeology.",
    type: "SaaS workflow",
    status: "Prototype",
    risk: "Low",
    utility: "High",
    signal: 91,
    map: "ledger",
    evidence: [
      ["ROLE", "Builder"],
      ["STACK", "Next.js / intake UX / file capture"],
      ["OUTPUT", "Client context workflow"],
      ["CONSTRAINT", "Low-friction non-technical use"],
    ],
  },
  {
    name: "Reply Shield",
    category: "Communication guardrail",
    problem: "Structures guarded AI responses for local-business reviews and customer communication while keeping humans in control.",
    type: "Response system",
    status: "Prototype",
    risk: "Low",
    utility: "High",
    signal: 87,
    map: "reply",
    evidence: [
      ["ROLE", "Builder"],
      ["STACK", "React / guardrails / review states"],
      ["OUTPUT", "Human-approved reply flow"],
      ["CONSTRAINT", "Tone safety over speed"],
    ],
  },
  {
    name: "Signal Funnel",
    category: "Lead capture",
    problem: "Turns service-business quote requests into a clean intake path with enough context for fast follow-up.",
    type: "Conversion interface",
    status: "Active build",
    risk: "Medium",
    utility: "High",
    signal: 84,
    map: "signal",
    evidence: [
      ["ROLE", "Builder"],
      ["STACK", "Next.js / forms / routing"],
      ["OUTPUT", "Quote-request capture path"],
      ["CONSTRAINT", "Fast mobile completion"],
    ],
  },
  {
    name: "Ops Relay",
    category: "Admin automation",
    problem: "Creates a lightweight automation layer for repetitive reminders, admin tasks, and client follow-up workflows.",
    type: "Automation layer",
    status: "Prototype",
    risk: "Low",
    utility: "High",
    signal: 89,
    map: "ops",
    evidence: [
      ["ROLE", "Builder"],
      ["STACK", "Workflow logic / reminders / UI"],
      ["OUTPUT", "Admin follow-up relay"],
      ["CONSTRAINT", "Useful without bloat"],
    ],
  },
];

const timeline = [
  ["2026", "Self-directed builder era"],
  ["2034", "First autonomous client systems"],
  ["2058", "Human-in-the-loop software studios"],
  ["2091", "Interface minimalism collapse"],
  ["2126", "Operator archive recovered"],
];

const commandResponses: Record<string, string[]> = {
  "/whoami": [
    "Identity unavailable.",
    "Output verified: independent builder, software operator, human decision layer.",
  ],
  "/systems": ["Ledger Ghost", "Reply Shield", "Signal Funnel", "Ops Relay"],
  "/skills": [
    "Frontend, product thinking, automation, AI workflows, deployment, UX polish.",
  ],
  "/contact": ["Signal channel available: contact@invisible.com"],
  "/timeline": [
    "2026: self-directed builder era.",
    "2034: first autonomous client systems.",
    "2058: human-in-the-loop software studios.",
    "2091: interface minimalism collapse.",
    "2126: operator archive recovered.",
  ],
  "/archive": [
    "Node 7F-2126 is public. Identity remains sealed. Systems remain inspectable.",
  ],
  "/clearance": ["Public archive access granted."],
  "/signal": ["Signal detected. Transmission panel exposed."],
};

const commandList = [
  "/whoami",
  "/systems",
  "/skills",
  "/contact",
  "/timeline",
  "/archive",
  "/clearance",
  "/signal",
];

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

export default function Home() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([
    {
      id: 0,
      command: "/clearance",
      lines: ["Public archive access granted."],
    },
  ]);
  const [latestEntryId, setLatestEntryId] = useState(0);
  const [signalActive, setSignalActive] = useState(false);
  const [signalSent, setSignalSent] = useState(false);
  const [gateResolved, setGateResolved] = useState(false);
  const [archiveUnlocked, setArchiveUnlocked] = useState(false);
  const [unlockBurst, setUnlockBurst] = useState(false);
  const entryIdRef = useRef(1);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setGateResolved(true), reducedMotion ? 0 : 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    if (command === "/clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      setLatestEntryId(-1);
      return;
    }

    const lines =
      commandResponses[command] ?? [
        "Command not archived.",
        "Available: /whoami /systems /skills /contact /timeline /archive /clearance /signal",
      ];

    const entryId = entryIdRef.current;
    entryIdRef.current += 1;

    setTerminalHistory((history) => [...history, { id: entryId, command, lines }].slice(-8));
    setLatestEntryId(entryId);
    setTerminalInput("");

    if (command === "/signal") {
      setSignalActive(true);
      setSignalSent(true);
      window.setTimeout(() => scrollToSection("contact"), 180);
      window.setTimeout(() => setSignalActive(false), 1400);
    }
  }

  function handleTerminalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(terminalInput);
  }

  function unlockArchive() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setArchiveUnlocked(true);
    setUnlockBurst(true);
    window.setTimeout(() => scrollToSection("operator"), reducedMotion ? 0 : 420);
    window.setTimeout(() => setUnlockBurst(false), 1200);
  }

  const heroScanTiles = archiveUnlocked
    ? ["ACCESS: GRANTED", "SOURCE: HUMAN", "RECORD: PRESERVED"]
    : ["SCAN: CLEAN", "SOURCE: HUMAN", "RECORD: PRESERVED"];

  return (
    <main
      className={`archive-shell min-h-screen overflow-hidden ${signalActive ? "signal-active" : ""} ${
        unlockBurst ? "unlock-burst" : ""
      } ${archiveUnlocked ? "archive-unlocked" : ""}`}
    >
      <div className={`intro-lock ${gateResolved ? "intro-lock--done" : ""}`} aria-hidden="true">
        <div className="intro-lock__frame">
          <span>ACCESS REQUEST // PUBLIC ARCHIVE NODE 7F-2126</span>
          <strong className="micro-glitch">INVISIBLE // 2126</strong>
          <em>IDENTITY REDACTED. WORK PRESERVED.</em>
          <i />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <div className="grid-field" />
        <div className="noise-field" />
        <div className="scan-field" />
      </div>
      <div className="unlock-sweep" aria-hidden="true" />

      <section id="top" className="relative z-10 px-5 py-5 sm:px-7 lg:min-h-screen lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col border border-[oklch(0.72_0.18_174_/_0.22)] bg-[oklch(0.11_0.018_185_/_0.68)] shadow-[0_0_80px_oklch(0.68_0.22_166_/_0.12)] backdrop-blur-sm lg:min-h-[calc(100vh-2.5rem)]">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[oklch(0.72_0.18_174_/_0.18)] px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[oklch(0.73_0.06_185)] sm:px-6">
            <a href="#top" className="text-[oklch(0.83_0.18_172)] transition hover:text-[oklch(0.92_0.18_162)]">
              {"INVISIBLE // 2126"}
            </a>
            <nav className="flex gap-3 sm:gap-5" aria-label="Archive navigation">
              <a href="#operator" className="transition hover:text-[oklch(0.9_0.18_162)]">
                File
              </a>
              <a href="#systems" className="transition hover:text-[oklch(0.9_0.18_162)]">
                Systems
              </a>
              <a href="#terminal" className="transition hover:text-[oklch(0.9_0.18_162)]">
                Console
              </a>
              <a href="#contact" className="transition hover:text-[oklch(0.9_0.18_162)]">
                Signal
              </a>
            </nav>
          </header>

          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.03fr_0.97fr]">
            <div className="relative flex flex-col justify-center gap-8 border-b border-[oklch(0.72_0.18_174_/_0.16)] px-5 py-10 sm:px-8 sm:py-14 lg:border-b-0 lg:border-r lg:px-10 xl:px-12">
              <div className="absolute left-5 top-5 h-20 w-px bg-[oklch(0.77_0.18_174_/_0.45)]" />
              <div className="absolute right-7 top-16 hidden h-28 w-28 border-r border-t border-[oklch(0.77_0.18_174_/_0.28)] lg:block" />

              <div data-reveal className="max-w-4xl">
                <div className="mb-8 grid max-w-2xl grid-cols-2 gap-px border border-[oklch(0.72_0.18_174_/_0.18)] bg-[oklch(0.72_0.18_174_/_0.16)] font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[oklch(0.72_0.06_185)] sm:grid-cols-4">
                  {statuses.map(([label, value]) => (
                    <div key={label} className="bg-[oklch(0.105_0.02_185_/_0.94)] p-3">
                      <span className="block text-[oklch(0.52_0.045_190)]">{label}</span>
                      <strong className="mt-2 block font-medium text-[oklch(0.86_0.17_164)]">
                        {archiveUnlocked && label === "CLEARANCE" ? "GRANTED" : value}
                      </strong>
                    </div>
                  ))}
                </div>

                <h1
                  className="glitch-title max-w-5xl text-balance text-[clamp(3.2rem,10vw,9.4rem)] font-semibold leading-[0.82] tracking-normal text-[oklch(0.91_0.035_176)]"
                >
                  INVISIBLE <span className="text-[oklch(0.78_0.19_166)]">{"//"}</span> 2126
                </h1>
                <p className="mt-6 font-mono text-[clamp(1rem,2.2vw,1.55rem)] uppercase tracking-[0.12em] text-[oklch(0.82_0.17_166)]">
                  Identity redacted. Work preserved.
                </p>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-[oklch(0.74_0.035_190)] sm:text-xl">
                  An anonymous builder creating interfaces, automations, and software systems for a future where humans still ship.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={unlockArchive}
                    className="group relative min-h-12 overflow-hidden border border-[oklch(0.82_0.2_164_/_0.72)] bg-[oklch(0.78_0.2_162)] px-6 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[oklch(0.13_0.03_175)] shadow-[0_0_34px_oklch(0.78_0.2_162_/_0.24)] transition hover:bg-[oklch(0.88_0.18_158)]"
                  >
                    <span className="relative z-10">{archiveUnlocked ? "Archive Open" : "Enter Archive"}</span>
                    <span className="button-sweep" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection("systems")}
                    className="min-h-12 border border-[oklch(0.72_0.18_174_/_0.35)] bg-[oklch(0.13_0.024_185_/_0.82)] px-6 font-mono text-sm uppercase tracking-[0.18em] text-[oklch(0.82_0.16_166)] transition hover:border-[oklch(0.82_0.2_164_/_0.72)] hover:bg-[oklch(0.18_0.04_180_/_0.9)]"
                  >
                    View Systems
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-visual relative overflow-hidden bg-[oklch(0.075_0.018_190_/_0.88)]">
              <div className="hero-orbit absolute inset-0" />
              <div className="absolute inset-x-8 top-8 z-10 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[oklch(0.66_0.08_185)]">
                <span>ACCESS SCAN</span>
                <span>{archiveUnlocked ? "ACCESS GRANTED" : gateResolved ? "VERIFIED" : "VERIFYING"}</span>
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
                <div className="identity-frame relative w-full max-w-[520px]">
                  <Image
                    src="/assets/archive-mask.webp"
                    alt="Abstract encrypted avatar glyph for the redacted operator"
                    width={900}
                    height={900}
                    priority
                    unoptimized
                    className="archive-mask"
                  />
                  <div className="identity-frame__plate">
                    <span>IDENTITY HASH</span>
                    <strong className="micro-glitch">{"██-██-██ // REDACTED"}</strong>
                  </div>
                </div>
              </div>
              <div className="hero-scan absolute inset-0 z-20" aria-hidden="true" />
              <div className="absolute bottom-8 left-8 right-8 z-30 grid gap-px border border-[oklch(0.72_0.18_174_/_0.22)] bg-[oklch(0.72_0.18_174_/_0.18)] font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[oklch(0.72_0.06_185)] sm:grid-cols-3">
                {heroScanTiles.map((item) => (
                  <div key={item} className="bg-[oklch(0.09_0.018_188_/_0.88)] p-3">
                    <span className="status-dot" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="operator" className="relative z-10 px-5 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div data-reveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="section-index">
            <span>01</span>
            <h2>Operator File</h2>
          </div>
          <div className="operator-grid">
            <div className="operator-avatar">
              <div className="operator-avatar__glyph" />
              <p>Not a brand. Not an influencer. A builder record.</p>
            </div>
            <dl className="operator-fields">
              {operatorFields.map(([label, value]) => (
                <div key={label} className={label === "Identity" || label === "Origin" ? "operator-field--redacted" : ""}>
                  <dt>{label}</dt>
                  <dd className={label === "Identity" || label === "Origin" ? "redacted-reveal" : ""}>
                    {label === "Identity" || label === "Origin" ? (
                      <>
                        <span className="redacted-mask" aria-hidden="true">
                          ████████
                        </span>
                        <span className="redacted-value">{value}</span>
                      </>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div data-reveal className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 border-y border-[oklch(0.72_0.18_174_/_0.18)] py-6 lg:flex-row lg:items-end">
            <div className="section-index">
              <span>02</span>
              <h2>Capabilities Matrix</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[oklch(0.68_0.035_190)]">
              Human-built systems. Interfaces for operational clarity. Proof of work, without identity.
            </p>
          </div>
          <div className="capability-matrix">
            {capabilities.map(([label, description]) => (
              <article key={label} className="capability-module">
                <div className="module-status">
                  <span />
                  ONLINE
                </div>
                <h3>{label}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="systems" className="relative z-10 px-5 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div data-reveal className="mx-auto max-w-7xl">
          <div className="archive-heading">
            <div className="section-index">
              <span>03</span>
              <h2>Project Archive</h2>
            </div>
            <p>The operator remains unknown. The systems show role, stack, output, and constraint without exposing identity.</p>
          </div>

          <div className="project-archive">
            {projects.map((project) => (
              <article key={project.name} className={`project-record project-record--${project.map}`}>
                <div className="record-topline">
                  <span>ARCHIVED: 2126</span>
                  <span>RATING: {project.signal}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="record-category">{project.category}</p>
                <div className="record-dossier">
                  <div className="record-map" aria-hidden="true">
                    <span />
                  </div>
                  <dl className="record-evidence">
                    {project.evidence.map(([label, value]) => (
                      <div key={`${project.name}-${label}`}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <p className="record-problem">{project.problem}</p>
                <div className="record-meta">
                  <span>SYSTEM TYPE: {project.type}</span>
                  <span>STATUS: {project.status}</span>
                  <span>RISK: {project.risk}</span>
                  <span>UTILITY: {project.utility}</span>
                </div>
                <div className="signal-meter" aria-label={`${project.name} signal strength ${project.signal} percent`}>
                  <span style={{ width: `${project.signal}%` }} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="terminal" className="relative z-10 px-5 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div data-reveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="section-index">
            <span>04</span>
            <h2>Interactive Terminal</h2>
            <p>Click a command or type one into the console. The terminal is decorative, local, and reliable.</p>
          </div>

          <div className="terminal-panel" onClick={() => terminalInputRef.current?.focus()}>
            <div className="terminal-topbar">
              <span>invisible.archive</span>
              <span>PUBLIC SESSION</span>
            </div>
            <div className="terminal-output" aria-live="polite">
              {terminalHistory.map((entry) => (
                <div key={entry.id} className="terminal-entry">
                  <p>
                    <span>&gt;</span> {entry.command}
                  </p>
                  {entry.lines.map((line) => (
                    <p key={line} className="terminal-line">
                      <TypingLine text={line} active={entry.id === latestEntryId} />
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div className="command-row">
              {commandList.map((command) => (
                <button key={command} type="button" onClick={() => runCommand(command)}>
                  {command}
                </button>
              ))}
            </div>
            <form className="terminal-input-row" onSubmit={handleTerminalSubmit}>
              <span>&gt;</span>
              <input
                ref={terminalInputRef}
                value={terminalInput}
                onChange={(event) => setTerminalInput(event.target.value)}
                placeholder="/whoami"
                aria-label="Terminal command"
                autoComplete="off"
              />
              <button type="submit">Run</button>
            </form>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div data-reveal className="mx-auto max-w-7xl">
          <div className="archive-heading">
            <div className="section-index">
              <span>05</span>
              <h2>Future Timeline</h2>
            </div>
            <p>A compact record recovered from the automation age.</p>
          </div>
          <ol className="timeline">
            {timeline.map(([year, event]) => (
              <li key={year}>
                <span>{year}</span>
                <p>{event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-5 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div data-reveal className="mx-auto max-w-7xl">
          <div className="final-transmission">
            <div>
              <span className="transmission-label">FINAL TRANSMISSION</span>
              <h2>Send Signal</h2>
              <p>For collaborations, systems, prototypes, or encrypted opportunities.</p>
            </div>
            <div className="signal-card">
              <span className="signal-wave" />
              <p>Signal channel</p>
              <strong>contact@invisible.com</strong>
              <button
                type="button"
                onClick={() => {
                  setSignalSent(true);
                  runCommand("/signal");
                }}
              >
                {signalSent ? "Signal Sent" : "Open Channel"}
              </button>
              <small>{signalSent ? "Transmission logged. Public archive channel remains open." : "Awaiting outbound signal."}</small>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TypingLine({ text, active }: { text: string; active: boolean }) {
  const [visibleText, setVisibleText] = useState(active ? "" : text);

  useEffect(() => {
    const timers: number[] = [];

    if (!active) {
      timers.push(window.setTimeout(() => setVisibleText(text), 0));
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      timers.push(window.setTimeout(() => setVisibleText(text), 0));
      return;
    }

    timers.push(
      window.setTimeout(() => {
        setVisibleText("");
        let index = 0;
        const timer = window.setInterval(() => {
          index += 2;
          setVisibleText(text.slice(0, index));
          if (index >= text.length) window.clearInterval(timer);
        }, 18);
        timers.push(timer);
      }, 0),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [active, text]);

  return (
    <>
      {visibleText}
      {active && visibleText.length < text.length ? <span className="typing-caret" aria-hidden="true" /> : null}
    </>
  );
}
