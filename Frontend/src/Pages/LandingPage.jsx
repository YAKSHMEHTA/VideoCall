import React from 'react'
import { useEffect } from "react";
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap')`;
import './Landing.css'
import { Link } from 'react-router-dom';

function LandingPage() {

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
 
    const ctrlBtns = document.querySelectorAll(".cBtn");
    ctrlBtns.forEach((btn) => {
      const down = () => (btn.style.transform = "scale(0.93)");
      const up   = () => (btn.style.transform = "");
      btn.addEventListener("mousedown", down);
      btn.addEventListener("mouseup", up);
      btn.addEventListener("mouseleave", up);
    });
 
    return () => {
      document.head.removeChild(styleEl);
      observer.disconnect();
    };
  }, []);


  return (
    <div  style={{ width: '100%', minHeight: '100vh' }}>
       <nav className="navBar " style={{ width: '100%',}}>
        <div className="logoText">Ve<span>x</span></div>
        <div className="navMid">
          <a href="#">Product</a>
          <a href="#">Enterprise</a>
          <a href="#">Pricing</a>
          <a href="#">Changelog</a>
          <a href="#">Docs</a>
        </div>
        <div className="navRight">
          <button className="nBtn nGhost">Sign in</button>
          <Link to={"/home"} className="nBtn nSolid">Get started</Link >
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section className="heroSection">
        <div className="heroEyebrow">
          <span className="eyebrowLine"></span>
          Video conferencing for modern teams
          <span className="eyebrowLine"></span>
        </div>
 
        <h1 className="heroH1">
          Meet without<br />the <em>friction.</em>
        </h1>
 
        <p className="heroP">
          Vex strips video calling back to what matters — clarity, reliability,
          and conversations that actually flow.
        </p>
 
        <div className="heroActions">
          <button className="ctaMain">Start a meeting free</button>
          <button className="ctaSec">See how it works ↓</button>
        </div>
 
        {/* MOCKUP */}
        <div className="mockupWrap reveal">
          <div className="mockupFrame">
 
            <div className="mfBar">
              <div className="dotRow">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="mfTitle">DESIGN SYNC — Q4 SPRINT</div>
              <div style={{ width: 52 }}></div>
            </div>
 
            <div className="mfBody">
              {/* Main speaker tile */}
              <div className="vidTileMain">
                <div className="vtFace vtFaceMain">KM</div>
                <div className="vtName">
                  <span className="micDot micOn"></span>Krish M.
                </div>
                <div className="recPill">
                  <span className="recDot"></span>REC
                </div>
              </div>
 
              <div className="vidTile">
                <div className="vtFace vtFace1" style={{ fontSize: "1.5rem" }}>SR</div>
                <div className="vtName"><span className="micDot micOff"></span>Sara R.</div>
              </div>
 
              <div className="vidTile">
                <div className="vtFace vtFace2" style={{ fontSize: "1.5rem" }}>AK</div>
                <div className="vtName"><span className="micDot micOn"></span>Arjun K.</div>
              </div>
 
              <div className="vidTile">
                <div className="vtFace vtFace3" style={{ fontSize: "1.5rem" }}>PM</div>
                <div className="vtName"><span className="micDot micOff"></span>Priya M.</div>
              </div>
            </div>
 
            <div className="mfCtrl">
              <button className="cBtn" title="Mic">🎙</button>
              <button className="cBtn" title="Cam">📷</button>
              <button className="cBtn" title="Share">🖥</button>
              <button className="cBtn" title="Chat">💬</button>
              <button className="cBtn" title="People">👥</button>
              <button className="cBtn" title="More">•••</button>
              <button className="cBtnEnd">End call</button>
            </div>
 
          </div>
        </div>
      </section>
 
      <hr className="sectionDiv" />
 
      {/* ── STATS ── */}
      <div className="statsRow">
        {[
          { n: "4M+",    l: "Daily meetings" },
          { n: "99.98%", l: "Uptime, past 12 months" },
          { n: "<60ms",  l: "Global avg. latency" },
          { n: "180+",   l: "Countries served" },
        ].map((s, i) => (
          <div className={`statItem reveal ${i > 0 ? `d${i}` : ""}`} key={s.n}>
            <div className="statNum">{s.n}</div>
            <div className="statLabel">{s.l}</div>
          </div>
        ))}
      </div>
 
      <hr className="sectionDiv" />
 
      {/* ── FEATURES ── */}
      <section className="bentoSection">
        <div className="bentoHead reveal">
          <div className="secTag">Why Vex</div>
          <h2 className="secH">Everything you need. Nothing you don't.</h2>
        </div>
 
        <div className="bentoGrid">
          <div className="bc bc1 reveal">
            <div className="bcIco">🔒</div>
            <div className="bcTitle">End-to-end encrypted</div>
            <div className="bcDesc">AES-256 on every packet. Zero-knowledge architecture. We genuinely cannot see your meetings.</div>
            <div className="avatarRow" style={{ marginTop: 28 }}>
              <div className="av">KM</div>
              <div className="av">SR</div>
              <div className="av">AK</div>
              <div className="avCount">+12</div>
            </div>
          </div>
 
          <div className="bc bc2 reveal d1">
            <div className="bcIco">🤖</div>
            <div className="bcTitle">AI meeting notes</div>
            <div className="bcDesc">Summaries, decisions, and action items — written for you, waiting in your inbox when the call ends.</div>
            <div className="aiStream">
              <div style={{ color: "var(--accent)", fontSize: "0.68rem", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                Summary · 11:34 AM
              </div>
              <span>Team agreed to push the launch to Nov 14. Arjun owns the API integration. Sara to review designs by EOD Thursday.</span>
              <span className="aiCursor"></span>
            </div>
          </div>
 
          <div className="bc bc3 reveal">
            <div className="bcIco">⚡</div>
            <div className="bcTitle">Instant join</div>
            <div className="bcDesc">No downloads. No plugins. One link, any browser, inside in under 2 seconds.</div>
          </div>
 
          <div className="bc bc4 reveal d2">
            <div className="bcIco">📶</div>
            <div className="bcTitle">Adaptive quality</div>
            <div className="bcDesc">Degrades gracefully on weak connections so calls stay unbroken.</div>
            <div className="signalBars">
              <div className="sb sbOn"></div>
              <div className="sb sbOn"></div>
              <div className="sb sbOn"></div>
              <div className="sb sbOn"></div>
            </div>
          </div>
 
          <div className="bc bc5 reveal d3">
            <div className="bcIco">🖥</div>
            <div className="bcTitle">Screen &amp; window share</div>
            <div className="bcDesc">Share your full screen, one window, or a browser tab with a single click.</div>
          </div>
        </div>
      </section>
 
      {/* ── HOW IT WORKS ── */}
      <section className="howSection">
        <div className="bentoHead reveal">
          <div className="secTag">Process</div>
          <h2 className="secH">From zero to meeting in three steps.</h2>
        </div>
 
        <div className="stepsGrid">
          {[
            { n: "01 —", t: "Create a room",  d: "Sign up for free or jump in as a guest. No credit card. No enterprise form. Just a room, ready to go." },
            { n: "02 —", t: "Share a link",   d: "One URL. Anyone with it joins instantly in their browser — on Mac, Windows, iOS, or Android." },
            { n: "03 —", t: "Meet & recap",   d: "End the call and get an AI summary with action items dropped straight into your Slack or email." },
          ].map((s, i) => (
            <div className={`step reveal ${i > 0 ? `d${i}` : ""}`} key={s.n}>
              <div className="stepNum">{s.n}</div>
              <div className="stepTitle">{s.t}</div>
              <div className="stepDesc">{s.d}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── TESTIMONIALS ── */}
      <section className="testimonialsSection">
        <div className="bentoHead reveal">
          <div className="secTag">From users</div>
          <h2 className="secH">Teams that switched, stayed.</h2>
        </div>
 
        <div className="testGrid">
          {[
            { q: "We cut our average meeting length by 20% within the first week. The AI notes mean nobody has to be the designated note-taker anymore.", name: "Rohan Verma",  role: "Engineering Lead, Postman",       init: "RV" },
            { q: "The call quality on a hotel wifi in Bangalore was flawless. Other tools would have fallen apart. Vex just adapted and kept going.",   name: "Nadia Khan",   role: "Head of Product, Razorpay",       init: "NK" },
            { q: "I recommended it to our entire portfolio. No setup friction, no enterprise sales process, and it just looks right.",                   name: "Aryan Shah",   role: "Partner, Elevation Capital",      init: "AS" },
          ].map((t, i) => (
            <div className={`tc reveal ${i > 0 ? `d${i}` : ""}`} key={t.init}>
              <p className="tcQuote">"{t.q}"</p>
              <div className="tcAuth">
                <div className="tcAv">{t.init}</div>
                <div>
                  <div className="tcName">{t.name}</div>
                  <div className="tcRole">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── FINAL CTA ── */}
      <section className="finalCta">
        <h2 className="reveal">
          Stop scheduling.<br />Start <em>meeting.</em>
        </h2>
        <p className="reveal d1">Free for small teams. No credit card. Up and running in 60 seconds.</p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }} className="reveal d2">
          <div className="joinInline">
            <input className="joinInput" type="text" placeholder="Enter a meeting code or link…" />
            <button className="joinGo">Join →</button>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--sub)" }}>or</span>
          <button className="ctaMain" style={{ padding: "13px 32px" }}>Create a new meeting</button>
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer className="footerBar">
        <div className="fLogo">Ve<span>x</span></div>
        <div className="fLinks">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
          <a href="#">Status</a>
          <a href="#">GitHub</a>
          <a href="#">Twitter</a>
        </div>
        <div className="fRight">© 2026 Vex Technologies, Inc.</div>
      </footer>
    </div >
  )
}

export default LandingPage
