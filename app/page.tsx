"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  label: string;
  year: string;
  status: string;
  summary: string;
  challenge: string;
  outcome: string;
  stack: string[];
  link?: string;
  tone: string;
  cover?: string;
  screens: { name: string; note: string; image?: string }[];
  journey: { step: string; title: string; copy: string }[];
};

type ArchiveItem = {
  title: string;
  institution: string;
  category: string;
  image: string;
  pdf: string;
  summary: string;
  issuer?: string;
  year?: string;
  seal?: string;
  note?: string;
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const projects: Project[] = [
  {
    title: "rifKANDO",
    label: "Multi-service platform",
    year: "2026",
    status: "In development",
    summary: "One calm digital doorway to the services people need across Morocco.",
    challenge: "Turn a wide and complex service ecosystem into an experience that feels immediate, familiar and trustworthy.",
    outcome: "A modular platform architecture, a clear service-discovery journey and a visual language designed to grow without losing coherence.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://www.rifkando.com",
    tone: "coral",
    cover: asset("/images/projects/rifkando/rifKANDOHomePage.png"),
    screens: [
      { name: "Home page", note: "A focused entry point for every essential service.", image: asset("/images/projects/rifkando/rifKANDOHomePage.png") },
      { name: "Products", note: "Trust, clarity and next steps in one composed view.", image: asset("/images/projects/rifkando/rifKANDOproducts.png") },
      { name: "Request flow", note: "A frictionless path from intent to action." },
    ],
    journey: [
      { step: "01", title: "Map the ecosystem", copy: "Grouped services around real user intent rather than internal categories." },
      { step: "02", title: "Build for trust", copy: "Made status, expectations and provider context visible at each decision." },
      { step: "03", title: "Design to scale", copy: "Created reusable patterns so new services can join without fragmenting the experience." },
    ],
  },
  {
    title: "FlyIn",
    label: "Travel intelligence",
    year: "2026",
    status: "Prototype",
    summary: "A smarter way to reach Morocco’s airports, from wherever the journey begins.",
    challenge: "Airport travel is rarely one route. Travellers need to compare time, transfers and confidence—not just distance.",
    outcome: "A transport recommendation experience that translates a complicated journey into a few confident choices.",
    stack: ["Vue", "JavaScript", "CSS", "Travel data"],
    link: "https://github.com/Choukti01/FlyIn",
    tone: "azure",
    screens: [
      { name: "Trip brief", note: "Destination, departure and priorities—nothing more." },
      { name: "Route theatre", note: "A visual comparison of the strongest transport options." },
      { name: "Journey plan", note: "Every connection presented as a calm, readable sequence." },
    ],
    journey: [
      { step: "01", title: "Frame the decision", copy: "Studied the information travellers actually need before choosing a route." },
      { step: "02", title: "Model the options", copy: "Structured multi-stage transport choices around time, effort and reliability." },
      { step: "03", title: "Reduce uncertainty", copy: "Designed each recommendation to explain why it fits—not simply rank it." },
    ],
  },
  {
    title: "OAI",
    label: "Marine intelligence",
    year: "2026",
    status: "Research & development",
    summary: "A living intelligence layer for Morocco’s Atlantic and Mediterranean coastline.",
    challenge: "Ocean conditions are dense, dynamic and distributed. The interface must reveal signals without flattening their complexity.",
    outcome: "A robust data model and an observatory concept ready for monitoring, regional analysis and future prediction modules.",
    stack: ["Rust", "React", "Data modelling", "AI-ready"],
    link: "https://github.com/Choukti01/OAI",
    tone: "violet",
    screens: [
      { name: "Coast overview", note: "Regional conditions seen as one connected living system." },
      { name: "Signal explorer", note: "Layered readings reveal patterns without visual noise." },
      { name: "Station detail", note: "A precise story of place, time and changing conditions." },
    ],
    journey: [
      { step: "01", title: "Define the signals", copy: "Separated foundational measurements from interpreted and predictive insight." },
      { step: "02", title: "Shape the model", copy: "Designed a data foundation that can serve coastlines, regions and stations." },
      { step: "03", title: "Prepare for intelligence", copy: "Left deliberate space for anomaly detection and future prediction modules." },
    ],
  },
];

const legacyCertificates = [
  { issuer: "CS50", title: "Introduction to Computer Science", year: "2025", seal: "01", note: "Algorithms · Data structures · Computational thinking" },
  { issuer: "freeCodeCamp", title: "Responsive Web Design", year: "2025", seal: "02", note: "Semantic HTML · Modern CSS · Accessible interfaces" },
  { issuer: "Independent study", title: "Backend Engineering Path", year: "2026", seal: "03", note: "REST architecture · Databases · Production thinking" },
];

const certificates: ArchiveItem[] = [
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    institution: "Professional learning certificate",
    category: "Certificate",
    image: asset("/images/certificates/TheCompleteFullStackWebDevelopmentBootcampCertificate.jpg"),
    pdf: asset("/images/certificates/The Complete FullStack Web Development Certificate.pdf"),
    summary: "A documented milestone in full-stack web development.",
  },
];

const education: ArchiveItem[] = [
  {
    title: "DEUG - Etudes Anglaises",
    institution: "Higher education record",
    category: "Education",
    image: asset("/images/education/DEUGEtudesAnglaises.png"),
    pdf: asset("/images/education/DEUG_Etudes_Anglaises.pdf"),
    summary: "Academic studies in English, presented with the original certificate and document.",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  return (
    <div className={`project-visual ${project.tone}`} aria-hidden="true">
      {project.cover && <img className="project-art" src={project.cover} alt="" />}
      <div className="visual-top"><span>AC / 0{index + 1}</span><span>{project.label}</span></div>
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-core"><small>Selected work</small><strong>{project.title}</strong><span>{project.year}</span></div>
      <div className="visual-panel panel-a"><i /><i /><i /><b>{project.screens[0].name}</b></div>
      <div className="visual-panel panel-b"><span>◆</span><b>{project.stack[0]}</b></div>
      <div className="visual-grid" />
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<any>(null);
  const [activeArchiveItem, setActiveArchiveItem] = useState<ArchiveItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => reveal.observe(node));
    return () => reveal.disconnect();
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && (setActiveProject(null), setActiveCertificate(null), setActiveArchiveItem(null));
    window.addEventListener("keydown", close);
    document.body.style.overflow = activeProject || activeCertificate || activeArchiveItem ? "hidden" : "";
    return () => { window.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [activeProject, activeCertificate, activeArchiveItem]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Abdelouahed Choukti, home"><span>AC</span><small>Software engineer<br />Morocco · Worldwide</small></a>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#certificates" onClick={closeMenu}>Certificates</a><a href="#education" onClick={closeMenu}>Education</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="availability" href="#contact"><i /> Available for meaningful work</a>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow reveal">Software engineering · Digital craft</p>
        <h1 className="reveal">I turn complex<br />ideas into <em>clear,</em><br /><span>living products.</span></h1>
        <div className="hero-bottom reveal">
          <p>I’m Abdelouahed Choukti—an engineer crafting thoughtful interfaces, scalable systems and digital experiences with a reason to exist.</p>
          <a className="round-link" href="#work" aria-label="Explore selected work"><span>Explore<br />the work</span><Arrow /></a>
        </div>
        <div className="hero-line"><span>Scroll to enter</span><i /></div>
      </section>

      <section className="marquee" aria-label="Core disciplines"><div>Product thinking <i>✦</i> Frontend craft <i>✦</i> Backend systems <i>✦</i> Data design <i>✦</i> Product thinking <i>✦</i> Frontend craft</div></section>

      <section className="work section-pad" id="work">
        <div className="section-intro reveal"><div><span className="section-number">01</span><p>Selected work</p></div><h2>Projects told as<br /><em>complete stories.</em></h2><p>Not just a screenshot. Each case study reveals the thinking, the system and the journey behind the result.</p></div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row reveal" key={project.title}>
              <button className="project-open" onClick={() => setActiveProject(project)} aria-label={`Open ${project.title} case study`}>
                <div className="project-meta"><span>0{index + 1}</span><span>{project.year}</span></div>
                <ProjectVisual project={project} index={index} />
                <div className="project-copy"><p>{project.label}</p><h3>{project.title}</h3><strong>{project.summary}</strong><div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="view-story">View the story <Arrow /></div></div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-pad" id="about">
        <div className="about-grid reveal">
          <div className="portrait-card"><img className="portrait-image" src={asset("/images/profile1.png")} alt="Abdelouahed Choukti" /><span className="portrait-label">Builder · thinker · learner</span></div>
          <div className="about-copy"><span className="section-number">02 — About</span><h2>Engineering with<br /><em>taste and intention.</em></h2><p className="about-lead">The best software disappears into the confidence it gives people.</p><p>I work across interface, backend and data—connecting the details into one coherent product. I care about what a system does, how it feels, and whether it will still make sense as it grows.</p><div className="principles"><div><span>01</span><strong>Clarity over noise</strong></div><div><span>02</span><strong>Systems over patches</strong></div><div><span>03</span><strong>Meaning over decoration</strong></div></div></div>
        </div>
        <div className="capabilities reveal"><p>What I bring</p><div className="cap-grid"><article><span>01</span><h3>Product-minded development</h3><p>I connect technical decisions to user needs and business value.</p></article><article><span>02</span><h3>Frontend with feeling</h3><p>Responsive interfaces with polish, pace and purposeful interaction.</p></article><article><span>03</span><h3>Backends built to grow</h3><p>Clear APIs, durable data models and maintainable architecture.</p></article><article><span>04</span><h3>Relentless learning</h3><p>Curiosity that turns new tools into better ways to solve real problems.</p></article></div></div>
      </section>

      <section className="certificates section-pad" id="certificates-legacy">
        <div className="section-intro reveal"><div><span className="section-number">03</span><p>Learning archive</p></div><h2>Proof of practice.<br /><em>A journey in progress.</em></h2><p>Each certificate marks a capability earned—and a new layer added to the craft.</p></div>
        <div className="certificate-list reveal">
          {certificates.map((certificate) => <button key={certificate.title} onClick={() => setActiveCertificate(certificate)}><span className="cert-seal">{certificate.seal}</span><span><small>{certificate.issuer} · {certificate.year}</small><strong>{certificate.title}</strong></span><span className="cert-note">{certificate.note}</span><Arrow /></button>)}
        </div>
      </section>

      <section className="learning-archive section-pad" id="education">
        <div className="section-intro reveal"><div><span className="section-number">03</span><p>Credentials archive</p></div><h2>Evidence of learning.<br /><em>Presented with care.</em></h2><p>Professional certificates and academic study, collected as original records you can explore in full.</p></div>
        <div className="archive-columns reveal">
          <div className="archive-column" id="certificates">
            <div className="archive-heading"><span>01</span><div><p>Certificates</p><small>Professional learning</small></div></div>
            {certificates.map((item) => <button className="archive-card" key={item.title} onClick={() => setActiveArchiveItem(item)}><img src={item.image} alt={`${item.title} preview`} /><span className="archive-card-copy"><small>{item.category}</small><strong>{item.title}</strong><p>{item.summary}</p><em>View certificate <Arrow /></em></span></button>)}
          </div>
          <div className="archive-column education-column">
            <div className="archive-heading"><span>02</span><div><p>Education</p><small>Academic record</small></div></div>
            {education.map((item) => <button className="archive-card" key={item.title} onClick={() => setActiveArchiveItem(item)}><img src={item.image} alt={`${item.title} preview`} /><span className="archive-card-copy"><small>{item.category}</small><strong>{item.title}</strong><p>{item.summary}</p><em>View document <Arrow /></em></span></button>)}
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-heading reveal"><span className="section-number">04 — Start a conversation</span><h2>Have an idea with<br /><em>real potential?</em></h2><p>Tell me what you’re building, what is getting in the way, or simply where you want to go next.</p></div>
        <div className="contact-grid reveal">
          <form onSubmit={submitForm}>
            <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="How should I call you?" /></div>
            <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required placeholder="you@company.com" /></div>
            <div className="field"><label htmlFor="project">What are we creating?</label><select id="project" name="project" defaultValue=""><option value="" disabled>Select a direction</option><option>New digital product</option><option>Portfolio or web experience</option><option>Frontend engineering</option><option>Backend or API system</option><option>Something else</option></select></div>
            <div className="field"><label htmlFor="message">The heart of the idea</label><textarea id="message" name="message" required rows={4} placeholder="A little context, the ambition, and where you need help…" /></div>
            <button className="submit-button" type="submit"><span>{sent ? "Message prepared" : "Send the brief"}</span><Arrow /></button>
            {sent && <p className="form-success" role="status">Thank you. This demo is ready to connect to your preferred email or form service.</p>}
          </form>
          <aside><p>Prefer a direct note?</p><a href="mailto:hello@choukti.dev">hello@choukti.dev <Arrow diagonal /></a><div className="contact-facts"><div><small>Based in</small><strong>Morocco</strong></div><div><small>Working with</small><strong>People worldwide</strong></div><div><small>Response</small><strong>Usually within 48h</strong></div></div><blockquote>“Good work begins with a clear conversation.”</blockquote></aside>
        </div>
      </section>

      <footer><a className="brand footer-brand" href="#top"><span>AC</span><small>Building what<br />deserves to exist.</small></a><p>© {new Date().getFullYear()} Abdelouahed Choukti</p><div><a href="https://github.com/Choukti01" target="_blank" rel="noreferrer">GitHub ↗</a><a href="#top">Back to top ↑</a></div></footer>

      {activeProject && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setActiveProject(null)}><div className="case-modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title} case study`} ref={dialogRef}><button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close case study">Close <span>×</span></button><div className="case-hero"><div><span>{activeProject.label} · {activeProject.year}</span><h2>{activeProject.title}</h2><p>{activeProject.summary}</p></div><span className="status-pill"><i />{activeProject.status}</span></div><div className="case-show"><div className={`case-stage ${activeProject.tone}`}><ProjectVisual project={activeProject} index={projects.indexOf(activeProject)} /></div>{activeProject.screens.map((screen, index) => <div className={`mini-screen ${activeProject.tone}`} key={screen.name}><span>0{index + 1}</span>{screen.image ? <img className="screen-shot" src={screen.image} alt={`${activeProject.title} ${screen.name}`} /> : <div><i /><i /><i /></div>}<strong>{screen.name}</strong><p>{screen.note}</p></div>)}</div><div className="case-summary"><article><small>The challenge</small><p>{activeProject.challenge}</p></article><article><small>The outcome</small><p>{activeProject.outcome}</p></article></div><div className="case-journey"><small>The making of {activeProject.title}</small><h3>From first question<br />to working system.</h3>{activeProject.journey.map((item) => <article key={item.step}><span>{item.step}</span><strong>{item.title}</strong><p>{item.copy}</p></article>)}</div><div className="case-footer"><div className="tag-row">{activeProject.stack.map((item) => <span key={item}>{item}</span>)}</div>{activeProject.link && <a href={activeProject.link} target="_blank" rel="noreferrer">Visit project <Arrow diagonal /></a>}</div></div></div>}

      {activeCertificate && <div className="modal-backdrop certificate-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setActiveCertificate(null)}><div className="certificate-modal" role="dialog" aria-modal="true" aria-label={activeCertificate.title}><button className="modal-close" onClick={() => setActiveCertificate(null)} aria-label="Close certificate">Close <span>×</span></button><div className="certificate-paper"><div className="paper-corners" /><p>Certificate of completion</p><span className="large-seal">AC<small>{activeCertificate.seal}</small></span><small>This distinction recognises the successful study of</small><h2>{activeCertificate.title}</h2><strong>{activeCertificate.issuer} · {activeCertificate.year}</strong><div className="certificate-rule" /><p>{activeCertificate.note}</p><footer><span>Abdelouahed Choukti</span><span>Continual learning archive</span></footer></div></div></div>}
      {activeArchiveItem && <div className="modal-backdrop archive-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setActiveArchiveItem(null)}><div className="archive-modal" role="dialog" aria-modal="true" aria-label={activeArchiveItem.title}><button className="modal-close" onClick={() => setActiveArchiveItem(null)} aria-label="Close document">Close <span>×</span></button><div className="archive-modal-heading"><small>{activeArchiveItem.category}</small><h2>{activeArchiveItem.title}</h2><p>{activeArchiveItem.institution}</p></div><div className="document-frame"><img src={activeArchiveItem.image} alt={`${activeArchiveItem.title} certificate`} /></div><div className="archive-actions"><a href={activeArchiveItem.pdf} target="_blank" rel="noreferrer">Open original PDF <Arrow diagonal /></a><a href={activeArchiveItem.image} target="_blank" rel="noreferrer">Open image <Arrow diagonal /></a></div></div></div>}
    </main>
  );
}
