import { useEffect, useRef } from "react";
import styles from "../styles/Appointment.module.css";

// ─── DATA ───────────────────────────────────────────────────

const marqueeItems = [
  "Excise Licensing",
  "FSSAI Registration",
  "Import Permits",
  "Distribution Setup",
  "Brand Registration",
  "Label Approval",
  "State-by-State Compliance",
  "Retail Shelf Placement",
  "Pricing Strategy",
  "JV Structuring",
];

const whyCards = [
  {
    icon: "🥃",
    title: "Premium Surge",
    text: "Premiumisation is outpacing overall market growth, with imported Scotch, craft gin, and premium vodka categories expanding fastest.",
  },
  {
    icon: "📈",
    title: "Young Demographics",
    text: "65% of India's population is under 35 — a rapidly expanding, aspirationally-driven consumer base discovering international brands.",
  },
  {
    icon: "🏙️",
    title: "Metro Boom",
    text: "Mumbai, Delhi, Bengaluru, Hyderabad and Pune are maturing into world-class on-trade markets with growing cocktail culture.",
  },
  {
    icon: "🤝",
    title: "Policy Momentum",
    text: "Recent liberalisation in several key states and reforms to excise policy are creating the most open window in a decade.",
  },
];

const challenges = [
  {
    num: "01",
    icon: "📋",
    title: "Labelling & FSSAI",
    text: "Every SKU requires India-specific label registration with FSSAI and often additional state-level approvals before a single bottle can be sold. Non-compliance means seizure.",
  },
  {
    num: "02",
    icon: "🏛️",
    title: "State Excise Laws",
    text: "Alcohol is a state subject under the Constitution. Each state sets its own licensing, pricing, and channel rules — what works in Goa will fail in Haryana.",
  },
  {
    num: "03",
    icon: "📦",
    title: "Import & Customs",
    text: "India imposes tariffs of 150%+ on imported spirits. Structuring your entry — via wholly owned subsidiary, JV, or importer-on-record — has major cost implications.",
  },
  {
    num: "04",
    icon: "🚚",
    title: "Distribution Access",
    text: "In most states, distribution runs through government-mandated channels or a small set of licensed distributors who hold enormous gatekeeping power.",
  },
  {
    num: "05",
    icon: "💰",
    title: "Price Point Navigation",
    text: "MRP and pricing bands are regulated state-by-state. A premium brand can be undercut by tax structures that commoditise it before reaching the consumer.",
  },
  {
    num: "06",
    icon: "📢",
    title: "Advertising Restrictions",
    text: "Alcohol advertising is heavily restricted. A compliant, effective brand-building strategy in India requires creative navigating of surrogate marketing frameworks.",
  },
];

const processSteps = [
  {
    num: "I",
    title: "Discovery Call",
    text: "60-minute briefing on your brand, category, target states, and commercial objectives.",
  },
  {
    num: "II",
    title: "Market Assessment",
    text: "State-by-state regulatory and commercial feasibility report tailored to your product.",
  },
  {
    num: "III",
    title: "Entry Strategy",
    text: "Recommended entry structure, pricing architecture, and compliance roadmap.",
  },
  {
    num: "IV",
    title: "Execution",
    text: "Licensing, label approvals, importer setup, distributor onboarding and first shipment.",
  },
  {
    num: "V",
    title: "Growth",
    text: "Ongoing market management, reorders, new state expansion, and brand building.",
  },
];

// ─── FADE-UP HOOK ────────────────────────────────────────────

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.fadeUpVisible);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Wrapper component to apply fade-up per element
function FadeUp({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.fadeUpVisible);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`${styles.fadeUp} ${className}`}>
      {children}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────

export default function Appointment() {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.submit();
  };
  // Duplicate marquee items for seamless loop
  const allMarqueeItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className={styles.body}>
      {/* Noise overlay */}
      <div className={styles.noiseOverlay} />

      {/* ─── NAV ─── */}
      {/* <nav className={styles.nav}>
        <a href="#" className={styles.navLogo}>Alcopop Spirits</a>
        <ul className={styles.navLinks}>
          <li><a href="#why-india">India Market</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#who">Who We Serve</a></li>
        </ul>
        <a href="#contact" className={styles.navCta}>Book a Consultation</a>
      </nav> */}

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroEyebrow}>
            India Market Entry Specialists
          </div>
          <h1 className={styles.heroTitle}>
            Your Spirit.
            <br />
            <em>India's</em> Billion-
            <br />
            Consumer Market.
          </h1>
          <p className={styles.heroSubtitle}>
            Alcopop Spirits guides international alcohol brands through every
            layer of India's complex regulatory, distribution, and retail
            landscape — turning ambition into compliant, profitable market
            presence.
          </p>
          <div className={styles.heroActions}>
            <a href="#contact" className={styles.btnPrimary}>
              Start Your Entry
            </a>
            <a href="#services" className={styles.btnGhost}>
              Explore Services
            </a>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroBgVisual}>
            <svg
              className={styles.heroOrnament}
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="200"
                cy="200"
                r="190"
                stroke="#C9A84C"
                strokeWidth="0.5"
                strokeDasharray="4 8"
              />
              <circle
                cx="200"
                cy="200"
                r="155"
                stroke="#C9A84C"
                strokeWidth="0.3"
                strokeDasharray="2 6"
              />
              <circle
                cx="200"
                cy="200"
                r="120"
                stroke="#C9A84C"
                strokeWidth="0.5"
              />
              <polygon
                points="200,30 370,295 30,295"
                stroke="#C9A84C"
                strokeWidth="0.5"
                fill="none"
                strokeOpacity="0.5"
              />
              <polygon
                points="200,370 30,105 370,105"
                stroke="#C9A84C"
                strokeWidth="0.5"
                fill="none"
                strokeOpacity="0.5"
              />
              <circle
                cx="200"
                cy="200"
                r="6"
                fill="#C9A84C"
                fillOpacity="0.6"
              />
              <circle
                cx="200"
                cy="200"
                r="18"
                stroke="#C9A84C"
                strokeWidth="0.5"
                fill="none"
              />
              <line
                x1="200"
                y1="10"
                x2="200"
                y2="390"
                stroke="#C9A84C"
                strokeWidth="0.3"
                strokeOpacity="0.2"
              />
              <line
                x1="10"
                y1="200"
                x2="390"
                y2="200"
                stroke="#C9A84C"
                strokeWidth="0.3"
                strokeOpacity="0.2"
              />
              <text
                x="200"
                y="208"
                textAnchor="middle"
                fontFamily="Cormorant Garamond, serif"
                fontSize="13"
                fill="#C9A84C"
                fillOpacity="0.7"
                letterSpacing="3"
              >
                INDIA
              </text>
            </svg>
          </div>
        </div>

        {/* Stat Strip */}
        <div className={styles.heroStatStrip}>
          {[
            { num: "$52B", label: "India Spirits Market 2024" },
            { num: "8.3%", label: "Projected Annual Growth" },
            { num: "28+", label: "State Regulatory Regimes" },
          ].map((stat) => (
            <div className={styles.heroStat} key={stat.label}>
              <span className={styles.statNumber}>{stat.num}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className={styles.marqueeStrip}>
        <div className={styles.marqueeInner}>
          {allMarqueeItems.map((item, i) => (
            <div className={styles.marqueeItem} key={i}>
              <span>◆</span> {item}
            </div>
          ))}
        </div>
      </div>

      {/* ─── WHY INDIA ─── */}
      <section className={styles.section} id="why-india">
        <div className={styles.whyIndia}>
          <FadeUp className={styles.whyText}>
            <div className={styles.sectionLabel}>The Opportunity</div>
            <h2 className={styles.sectionTitle}>
              Why India <em>Now</em>
            </h2>
            <p>
              India has surpassed France and Germany to become the world's{" "}
              <strong>second-largest spirits market by volume</strong>. With a
              burgeoning middle class of 300 million consumers, rising
              premiumisation trends, and an increasingly cosmopolitan palate,
              the demand for international spirits brands has never been
              stronger.
            </p>
            <p>
              Yet India's market is not one market — it is{" "}
              <strong>28 distinct regulatory environments</strong>, each with
              its own excise laws, pricing bands, distribution mandates, and
              licensing requirements. This complexity is precisely where most
              foreign brands stall or fail.
            </p>
            <p>
              Alcopop Spirits exists to eliminate that friction. We are
              India-based operators, not advisors reading from a desk abroad. We
              navigate this landscape every day.
            </p>
          </FadeUp>

          <FadeUp>
            <div className={styles.whyCards}>
              {whyCards.map((card) => (
                <div className={styles.whyCard} key={card.title}>
                  <span className={styles.whyCardIcon}>{card.icon}</span>
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── CHALLENGES ─── */}
      <section className={styles.challengesSection}>
        <FadeUp>
          <div className={styles.sectionLabel}>The Landscape</div>
          <h2 className={styles.sectionTitle}>
            What Makes India <em>Complex</em>
          </h2>
          <p className={styles.challengesIntro}>
            Without local expertise, these aren't just bureaucratic hurdles —
            they're brand-ending traps. Here is what international spirits
            companies face entering India.
          </p>
        </FadeUp>
        <div className={styles.challengesGrid}>
          {challenges.map((c, i) => (
            <FadeUp key={c.num} delay={(i % 3) * 0.1}>
              <div className={styles.challengeItem}>
                <span className={styles.challengeItemNum}>{c.num}</span>
                <div className={styles.challengeIcon}>{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className={styles.section} id="services">
        <FadeUp>
          <div className={styles.servicesHeader}>
            <div>
              <div className={styles.sectionLabel}>What We Do</div>
              <h2 className={styles.sectionTitle}>
                Our <em>Consultancy</em>
                <br />
                Services
              </h2>
            </div>
            <div className={styles.servicesIntro}>
              <p>
                Alcopop Spirits provides end-to-end advisory and execution
                support — from initial feasibility through to your first
                commercial sale on Indian soil. We do not just advise; we
                operate alongside you as a dedicated India partner.
              </p>
            </div>
          </div>
        </FadeUp>

        <div className={styles.servicesList}>
          {/* Service 01 */}
          <FadeUp>
            <div className={styles.serviceCard}>
              <div>
                <div className={styles.serviceNum}>01</div>
                <h3>India Market Consultancy</h3>
                <p>
                  You retain us as your dedicated India consultant. We guide you
                  through the full landscape of the Indian alcobev market — how
                  it is structured, how it is regulated, and exactly what it
                  takes to establish your brand and achieve consistent sales on
                  the ground.
                </p>
                <p>
                  This is expert knowledge distilled from years of operating
                  inside the Indian market, available to you as an international
                  brand that wants to move with clarity and confidence rather
                  than costly trial and error.
                </p>
              </div>
              <div>
                <p className={styles.serviceCardSubtitle}>What You Get</p>
                <ul className={styles.serviceCardList}>
                  {[
                    "In-depth briefing on India's state-by-state regulatory landscape",
                    "Step-by-step guidance on brand establishment, licensing & compliance",
                    "Strategic advice on distribution channels, pricing & market positioning",
                    "Roadmap to first sale — tailored to your brand, category & target states",
                    "Ongoing advisory access throughout your market entry journey",
                  ].map((item) => (
                    <li className={styles.serviceCardListItem} key={item}>
                      <span className={styles.serviceCardListIcon}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={styles.serviceTags}>
                  {[
                    "Market Intelligence",
                    "Regulatory Guidance",
                    "Sales Strategy",
                    "Brand Establishment",
                  ].map((t) => (
                    <span className={styles.tag} key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Service 02 */}
          <FadeUp>
            <div className={`${styles.serviceCard} ${styles.serviceCardAlt}`}>
              <span className={styles.serviceCardBadge}>Full-Service</span>
              <div>
                <div className={styles.serviceNum}>02</div>
                <h3>Brand Partnership</h3>
                <p>
                  For brands that want to be in India without the operational
                  burden of running an India office, we become your full brand
                  partner on the ground. We take on complete operational
                  ownership of your brand's India presence — so you focus on
                  making a great product and we focus on everything else.
                </p>
                <p>
                  This is not a distribution arrangement. This is a true
                  partnership: Alcopop Spirits owns the complexity so your brand
                  can own the market.
                </p>
              </div>
              <div>
                <p className={styles.serviceCardSubtitle}>
                  We Handle Everything
                </p>
                <ul className={styles.serviceCardList}>
                  {[
                    {
                      label: "Import",
                      desc: "End-to-end customs clearance, duties, and importer-of-record management",
                    },
                    {
                      label: "Labelling",
                      desc: "FSSAI registration, state-level label approvals, and India-compliant packaging",
                    },
                    {
                      label: "Warehousing",
                      desc: "Bonded and excise-compliant storage across key markets",
                    },
                    {
                      label: "Distribution",
                      desc: "Relationships with licensed state distributors, HORECA, modern trade & duty-free",
                    },
                    {
                      label: "Sales & Marketing",
                      desc: "On-ground activation, trade marketing, brand building & consumer events",
                    },
                  ].map((item) => (
                    <li className={styles.serviceCardListItem} key={item.label}>
                      <span className={styles.serviceCardListIconArrow}>→</span>
                      <span>
                        <strong>{item.label}</strong> — {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className={styles.serviceTags}>
                  {[
                    "Import",
                    "Labelling",
                    "Warehousing",
                    "Distribution",
                    "Sales & Marketing",
                  ].map((t) => (
                    <span className={styles.tag} key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      {/* <section className={styles.processSection} id="process">
        <FadeUp>
          <div className={styles.sectionLabel}>How We Work</div>
          <h2 className={styles.sectionTitle}>Our <em>Process</em></h2>
        </FadeUp>
        <div className={styles.processTimeline}>
          <div className={styles.processSteps}>
            {processSteps.map((step) => (
              <div className={styles.processStep} key={step.num}>
                <div className={styles.stepDot}>{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ─── TRUST ─── */}
      <section className={styles.trustSection}>
        <div className={`${styles.sectionLabel} ${styles.sectionLabelCenter}`}>
          Why Alcopop
        </div>
        <blockquote className={styles.trustQuote}>
          India is the world's most complex and most rewarding spirits market.
          The difference between success and costly failure is almost always the
          quality of your local partner.
        </blockquote>
        <div className={styles.trustAuthor}>
          — Alcopop Spirits, Market Entry Philosophy
        </div>

      </section>

      {/* ─── CTA ─── */}
      <section className={styles.ctaSection} id="contact">
        <div className={styles.ctaText}>
          <h2>Ready to Enter India's Spirits Market?</h2>
          <p>
            Book a complimentary 60-minute discovery call with our team. We will
            assess your brand's India potential and outline a realistic, costed
            path to market — no obligation, no generic decks.
          </p>
        </div>
       
          <form
            onSubmit={handleSubmit}
            action="https://formsubmit.co/alcopop@alcopop.in"
            method="POST"
            className={styles.ctaForm}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_subject"
              value="New Discovery Call Request!"
            />
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="text"
              name="brand"
              placeholder="Company / Brand Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Business Email"
              required
            />
            <select name="category" defaultValue="" required>
              <option value="" disabled>
                Category of Interest
              </option>
              <option>Whisky / Scotch</option>
              <option>Gin</option>
              <option>Vodka</option>
              <option>Rum</option>
              <option>Wine</option>
              <option>Other / Mixed Portfolio</option>
            </select>
            <select name="helpType" defaultValue="" required>
              <option value="" disabled>
                How Can We Help?
              </option>
              <option>Full Market Entry</option>
              <option>Regulatory &amp; Licensing Only</option>
              <option>Distribution Setup</option>
              <option>Investment / Due Diligence</option>
              <option>Ongoing Management</option>
            </select>
            <button type="submit" className={styles.btnDark}>
              Request Discovery Call →
            </button>
          </form>
        
      </section>

      {/* ─── FOOTER ─── */}
      {/* <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.navLogo} style={{ fontSize: "1.1rem" }}>Alcopop Spirits</div>
            <p>India's specialist market entry consultancy for international spirits brands. Turning regulatory complexity into competitive advantage.</p>
          </div>
          <div className={styles.footerCol}>
            <h5>Services</h5>
            <ul>
              <li>India Market Consultancy</li>
              <li>Brand Partnership</li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h5>Markets</h5>
            <ul>
              {["Maharashtra", "Delhi NCR", "Karnataka", "Telangana", "Rajasthan", "Goa"].map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h5>Contact</h5>
            <ul>
              <li>Gurugram, Haryana</li>
              <li>India</li>
              <li style={{ marginTop: "0.8rem" }}>
                <a href="https://alcopopspirits.com" style={{ color: "var(--gold)", textDecoration: "none" }}>
                  alcopopspirits.com
                </a>
              </li>
              <li>consultancy@alcopop.com</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2025 Alcopop Spirits. All rights reserved.</span>
          <span>
            Gurugram · India ·{" "}
            <a href="https://alcopopspirits.com">alcopopspirits.com</a>
          </span>
        </div>
      </footer> */}
    </div>
  );
}
