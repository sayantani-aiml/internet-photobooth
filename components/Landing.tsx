"use client";

import { Camera } from "lucide-react";
import { motion } from "framer-motion";

type LandingProps = {
  onEnter: () => void;
};

export default function Landing({ onEnter }: LandingProps) {
  return (
    <motion.section
      className="landing screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
      }}
    >
      
      {/* ================= NAVBAR ================= */}

      <nav className="site-navbar">
        <div className="site-logo">
          <span>internet</span>
          <strong>PHOTOBOOTH ♡</strong>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <button
          type="button"
          className="nav-booth-button"
          onClick={onEnter}
        >
          📷 <span>Open Booth</span>
        </button>
      </nav>

      {/* ================= HERO ================= */}

      <main className="landing-main" id="home">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="hero-doodle doodle-rays">
  <svg viewBox="0 0 80 70" aria-hidden="true">
    <path
      d="M18 48 L10 18 L24 25 L31 8 L39 27 L54 18 L49 51"
      fill="none"
      stroke="#6275C0"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>

<div className="hero-doodle doodle-title-bow">
  <svg viewBox="0 0 90 70" aria-hidden="true">
    <path
      d="M45 30 C28 4 12 8 15 25 C18 40 34 38 45 30 C56 38 72 40 75 25 C78 8 62 4 45 30 M45 30 L45 58"
      fill="none"
      stroke="#E274AC"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>

            <p className="hero-eyebrow">
              CAPTURE&nbsp; ✦ &nbsp;CUSTOMIZE&nbsp; ✦ &nbsp;CHERISH
            </p>

            <div className="hero-title">
              <h1 className="hero-internet">
                internet
              </h1>

              <h1 className="hero-photobooth">
                photobooth ♡
              </h1>

              <p className="hero-tagline">
                your moments, your aesthetic, always.
              </p>

              <div className="hero-underline" />

              <p className="hero-description">
                A customizable online photobooth to capture, edit,
                and keep your favorite moments — right from your browser.
              </p>

              <button
                type="button"
                className="hero-open-button"
                onClick={onEnter}
              >
                📷 &nbsp; Open Booth &nbsp; →
              </button>

            </div>
          </div>

          {/* ================= PHOTOBOOTH SCENE ================= */}

          <div className="photobooth-scene">
            <div className="scene-doodle scene-heart">
  ♡
</div>

<div className="scene-doodle scene-plane">
  ✈
</div>

<div className="scene-doodle scene-sparkles">
  ✦
  <br />
  ✦
</div>

            {/* Shadow */}
            <div className="camera-shadow" />

            {/* Film strip */}
            <div className="film-strip">
              <div className="film-frame frame-one" />
              <div className="film-frame frame-two" />
              <div className="film-frame frame-three" />

              <div className="film-holes top">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="film-holes bottom">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* Camera */}
            <img
             src="/internet-photobooth/textures/Camera.png"
              alt="Pink camera"
              className="hero-camera"
            />

            {/* Right sticky note */}
            <div className="sticky-note sticky-note-right">
              <div className="sticky-tape" />
              <p>
                same
                <br />
                people
                <br />
                new
                <br />
                memories ♡
              </p>
            </div>

            {/* Left handwritten note */}
            <div className="sticky-note-left">
              collect
              <br />
              moments
              <br />
              not things
              <br />
              ♡
            </div>

            {/* Bottom sticky note */}
            <div className="sticky-note sticky-note-bottom">
              <div className="sticky-tape" />
              <p>
                more than
                <br />
                just photos ♡
              </p>
            </div>

          </div>
        </section>
        
        <div className="bottom-doodle bottom-flower">
        ✿
      </div>

      <div className="bottom-doodle bottom-diamond">
        ◇
      </div>

        {/* ================= FEATURES ================= */}

        <section
          className="landing-features"
          id="features"
        >
          <div className="feature-item">
            <div className="feature-icon">
              ✦
            </div>

            <h3>Fun Filters</h3>

            <p>
              Make every photo
              <br />
              more you.
            </p>
          </div>

          <div className="feature-divider" />

          <div className="feature-item">
            <div className="feature-icon">
              ▣
            </div>

            <h3>Custom Layouts</h3>

            <p>
              Create your perfect
              <br />
              photo strip.
            </p>
          </div>

          <div className="feature-divider" />

          <div className="feature-item">
            <div className="feature-icon">
              ♡
            </div>

            <h3>Save &amp; Share</h3>

            <p>
              Keep your favorite
              <br />
              memories forever.
            </p>
          </div>
        </section>
      </main>

      {/* ================= FOOTER NOTE ================= */}

      <p className="tiny-note">
        ♡ made with love on the internet ♡
      </p>

    </motion.section>
  );
}