"use client";

import { useEffect, useRef, useState } from "react";

const BARS = [
  { label: "2023", value: 3690, height: 0.54 },
  { label: "2024", value: 4890, height: 0.72 },
  { label: "2025", value: 5340, height: 0.86 },
  { label: "2026", value: 5780, height: 1.0 },
];

const SUBTITLE_WORDS = ["Marktdaten", "Wertermittlung", "Analyse"];

// Unique sway config per bar — two blended sine waves for organic motion
const SWAY = [
  { freq: 0.0010, amp: 0.018, phase: 0.0,  freq2: 0.0006, amp2: 0.009, phase2: 1.0 },
  { freq: 0.0008, amp: 0.015, phase: 2.1,  freq2: 0.0011, amp2: 0.007, phase2: 4.2 },
  { freq: 0.0012, amp: 0.016, phase: 4.4,  freq2: 0.0007, amp2: 0.010, phase2: 2.7 },
  { freq: 0.0009, amp: 0.019, phase: 6.8,  freq2: 0.0013, amp2: 0.008, phase2: 0.5 },
];

export default function BarChartWidget() {
  const [phase, setPhase] = useState<"idle" | "building" | "done">("idle");
  const [barProgress, setBarProgress] = useState([0, 0, 0, 0]);
  const [labelVisible, setLabelVisible] = useState([false, false, false, false]);
  const [dividerVisible, setDividerVisible] = useState(false);
  const [wordVisible, setWordVisible] = useState([false, false, false]);
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer — start when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setPhase("building"); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Build-up phase
  useEffect(() => {
    if (phase !== "building") return;

    const BAR_STAGGER = 120; // ms between bars starting
    const BAR_DURATION = 700; // ms for each bar to grow

    BARS.forEach((_, i) => {
      setTimeout(() => {
        const start = performance.now();
        const animate = (now: number) => {
          const t = Math.min((now - start) / BAR_DURATION, 1);
          // ease out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          setBarProgress((prev) => {
            const next = [...prev];
            next[i] = eased;
            return next;
          });
          if (t >= 0.4) setLabelVisible((prev) => { const n = [...prev]; n[i] = true; return n; });
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }, i * BAR_STAGGER);
    });

    // Subtitle sequence after bars done
    const totalBuildTime = BARS.length * BAR_STAGGER + BAR_DURATION;
    setTimeout(() => setDividerVisible(true), totalBuildTime + 100);
    SUBTITLE_WORDS.forEach((_, i) => {
      setTimeout(
        () => setWordVisible((prev) => { const n = [...prev]; n[i] = true; return n; }),
        totalBuildTime + 250 + i * 200
      );
    });
    setTimeout(() => setPhase("done"), totalBuildTime + 300);
  }, [phase]);

  // Sway loop
  useEffect(() => {
    if (phase !== "done") return;
    startRef.current = performance.now();
    const loop = (now: number) => {
      setTick(now - (startRef.current ?? now));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
        .barchart-word {
          display: inline-block;
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .barchart-divider-line {
          transform-origin: center;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          display: "inline-block",
          width: "100%",
          maxWidth: 680,
        }}
      >
        <div
          style={{
            background: "#f8f8f8",
            border: "2px solid #e5e6ea",
            borderRadius: 32,
            padding: "44px 56px 40px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.07)",
          }}
        >
          {/* Chart */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 24,
              height: 280,
              position: "relative",
              paddingTop: 44,
            }}
          >
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1.0].map((pct) => (
              <div
                key={pct}
                style={{
                  position: "absolute",
                  left: 0, right: 0,
                  bottom: pct * 236,
                  borderTop: "1px dashed rgba(180,80,130,0.13)",
                  zIndex: 0,
                }}
              />
            ))}

            {BARS.map((bar, i) => {
              const sway = SWAY[i];
              const swayFactor =
                phase === "done"
                  ? 1 + Math.sin(tick * sway.freq + sway.phase) * sway.amp
                      + Math.sin(tick * sway.freq2 + sway.phase2) * sway.amp2
                  : 1;

              const barHeight = bar.height * 236 * barProgress[i] * swayFactor;
              const isHighest = bar.height === 1.0;

              return (
                <div
                  key={bar.label}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                  }}
                >
                  {/* Value */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: barHeight + 8,
                      opacity: labelVisible[i] ? 1 : 0,
                      transform: labelVisible[i] ? "translateY(0)" : "translateY(8px)",
                      transition: "opacity 0.4s ease, transform 0.4s ease",
                      color: isHighest ? "#b01458" : "#a04070",
                      fontSize: 14,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      letterSpacing: "0.2px",
                    }}
                  >
                    {bar.value.toLocaleString("de-DE")} €
                  </div>

                  {/* Bar */}
                  <div
                    style={{
                      width: "100%",
                      height: barHeight,
                      borderRadius: "10px 10px 3px 3px",
                      background: isHighest
                        ? "linear-gradient(180deg, #f5a0c8 0%, #e0357a 55%, #c0185a 100%)"
                        : "linear-gradient(180deg, #f8b8d4 0%, #e060a0 55%, #cc3078 100%)",
                      boxShadow: isHighest
                        ? "0 6px 24px rgba(192,24,90,0.28)"
                        : "0 3px 14px rgba(204,48,120,0.16)",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: 0,
                      willChange: "height",
                      transition: "height 120ms ease-out",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        height: "38%",
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)",
                        borderRadius: "10px 10px 0 0",
                      }}
                    />
                  </div>

                  {/* Year */}
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#aaa",
                      letterSpacing: "0.4px",
                      opacity: labelVisible[i] ? 1 : 0,
                      transition: "opacity 0.4s ease 0.1s",
                    }}
                  >
                    {bar.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              margin: "24px 0 20px",
              position: "relative",
              opacity: dividerVisible ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              className="barchart-divider-line"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, transparent, rgba(180,80,130,0.3), transparent)",
                transform: dividerVisible ? "scaleX(1)" : "scaleX(0)",
              }}
            />
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            {SUBTITLE_WORDS.map((word, i) => (
              <div key={word} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span
                  className="barchart-word"
                  style={{
                    color: "#7a5068",
                    opacity: wordVisible[i] ? 1 : 0,
                    transform: wordVisible[i] ? "translateY(0)" : "translateY(12px)",
                  }}
                >
                  {word}
                </span>
                {i < SUBTITLE_WORDS.length - 1 && (
                  <span
                    style={{
                      color: "#c0185a",
                      fontSize: 18,
                      lineHeight: 1,
                      opacity: wordVisible[i] ? 1 : 0,
                      transition: "opacity 0.3s ease 0.15s",
                    }}
                  >
                    ·
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
