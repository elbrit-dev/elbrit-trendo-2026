"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface CylinderPanel {
  image: string;
  alt: string;
  title: string;
  description: string;
  /** Small icon component rendered in the card's badge. */
  Icon: React.ComponentType;
}

interface CylinderGalleryProps {
  panels: CylinderPanel[];
  /** Auto-rotation speed in degrees per second. */
  speed?: number;
}

/** Wrap an angle into the (-180, 180] range — the basis for shortest-path math. */
const normalize = (deg: number) => (((deg % 360) + 540) % 360) - 180;

/**
 * A reusable 3D "cylinder" image gallery.
 *
 * The cards are laid out evenly around a ring in 3D space. A single
 * requestAnimationFrame loop writes the ring rotation and per-card opacity
 * straight to the DOM via refs — React state is only touched when the
 * front-facing card changes (and for the lightbox). This keeps the animation
 * smooth and frame-rate independent without re-rendering every frame.
 */
export default function CylinderGallery({ panels, speed = 16 }: CylinderGalleryProps) {
  const count = panels.length;
  const slice = 360 / count; // angle between two adjacent cards

  // ── Imperative state (refs — never trigger a re-render) ──
  const rotationRef = useRef(0); // current ring rotation, in degrees
  const lastTimeRef = useRef<number | null>(null);
  const interactingRef = useRef(false); // pointer is currently down
  const lastInteractRef = useRef(0); // timestamp (ms) of the last interaction
  const movedRef = useRef(0); // total pointer travel (px) since pointerdown
  const snapRef = useRef<{ active: boolean; goal: number }>({ active: false, goal: 0 });
  const reducedRef = useRef(false); // prefers-reduced-motion
  const lightboxOpenRef = useRef(false);

  // ── DOM refs ──
  const viewportRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── React state (changes rarely) ──
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // pointer-drag bookkeeping
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const pressStartRef = useRef(0); // pointerdown time → distinguishes a tap from a long-press
  const lastXRef = useRef(0); // last pointer X, for incremental travel
  const lastYRef = useRef(0);

  // Detect (and track) the reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const onChange = () => (reducedRef.current = mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Keep a ref of the lightbox open-state so the rAF loop can read it cheaply.
  useEffect(() => {
    lightboxOpenRef.current = lightboxIndex !== null;
  }, [lightboxIndex]);

  // ── The single rAF loop: rotation + opacity written straight to the DOM ──
  useEffect(() => {
    let raf = 0;

    const apply = () => {
      const rot = rotationRef.current;

      // Spin the whole ring (pushed back by the radius so the front card sits
      // on the screen plane).
      if (ringRef.current) {
        ringRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateY(${rot}deg)`;
      }

      // Fade each card by how far it faces away from the camera.
      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const net = normalize(rot + i * slice); // 0deg = facing the camera
        const facing = (Math.cos((net * Math.PI) / 180) + 1) / 2; // 1 front → 0 back
        el.style.opacity = String(0.2 + 0.8 * facing);
      }

      // The front-facing card is the one whose pre-rotation cancels `rot`.
      // (card net angle = rot + i*slice ≈ 0  ⇒  i ≈ -rot / slice)
      let front = Math.round(-rot / slice) % count;
      front = ((front % count) + count) % count;
      if (front !== activeIndexRef.current) {
        activeIndexRef.current = front;
        setActiveIndex(front); // the ONLY per-frame-ish React update
      }
    };

    const tick = (now: number) => {
      const last = lastTimeRef.current ?? now;
      const dt = Math.min(0.05, (now - last) / 1000); // clamp big tab-switch gaps
      lastTimeRef.current = now;

      if (snapRef.current.active) {
        // Ease toward a "go to index" goal (time-based so it's smooth & stable).
        const goal = snapRef.current.goal;
        rotationRef.current += (goal - rotationRef.current) * Math.min(1, dt * 8);
        if (Math.abs(goal - rotationRef.current) < 0.05) {
          rotationRef.current = goal;
          snapRef.current.active = false;
        }
      } else {
        const idleLongEnough = now - lastInteractRef.current > 3000; // resume 3s after
        const canAuto =
          !reducedRef.current &&
          !interactingRef.current &&
          !lightboxOpenRef.current &&
          idleLongEnough;
        if (canAuto) rotationRef.current += speed * dt; // ~16 deg/sec
      }

      apply();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, slice, speed]);

  // ── Pointer drag / swipe to rotate ──
  const onPointerDown = (e: React.PointerEvent) => {
    interactingRef.current = true;
    movedRef.current = 0;
    pressStartRef.current = performance.now();
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
    dragStartRotRef.current = rotationRef.current;
    snapRef.current.active = false; // cancel any in-flight snap
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    // Accumulate total travel (x + y) since pointerdown for click-vs-drag detection.
    movedRef.current += Math.abs(e.clientX - lastXRef.current) + Math.abs(e.clientY - lastYRef.current);
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
    rotationRef.current = dragStartRotRef.current + dx * 0.3; // drag sensitivity
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!interactingRef.current) return;
    interactingRef.current = false;
    lastInteractRef.current = performance.now();

    // Was this a real click? Tiny movement (< 8px) AND a quick press (< 300ms).
    // A drag/swipe or a long-press fails this and never opens the lightbox.
    const isClick = movedRef.current < 8 && performance.now() - pressStartRef.current < 300;

    try {
      viewportRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }

    // We resolve the tap here (not via card onClick) because the viewport holds
    // the pointer capture, which would otherwise swallow the card's click event.
    if (isClick) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const card = el?.closest<HTMLElement>("[data-cyl-index]");
      if (card?.dataset.cylIndex != null) {
        const idx = Number(card.dataset.cylIndex);
        if (!Number.isNaN(idx)) setLightboxIndex(idx);
      }
    }
  };

  // ── Rotate a given card to the front along the SHORTEST path ──
  const goToIndex = useCallback(
    (i: number) => {
      const base = -i * slice; // rotation that puts card i at the front
      const delta = normalize(base - rotationRef.current); // shortest signed step
      snapRef.current = { active: true, goal: rotationRef.current + delta };
      lastInteractRef.current = performance.now();
    },
    [slice]
  );

  const step = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((p) => (p === null ? p : (p + dir + count) % count)),
    [count]
  );

  // ── Lightbox: body-scroll lock + keyboard support ──
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, step]);

  return (
    <>
      <div
        ref={viewportRef}
        className="cyl-viewport"
        role="group"
        aria-label="Calbrit 60K product gallery — drag to rotate, click a card to enlarge"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={ringRef} className="cyl-ring">
          {panels.map((p, i) => {
            const Icon = p.Icon;
            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`cyl-card${i === activeIndex ? " active" : ""}`}
                style={{ transform: `rotateY(${i * slice}deg) translateZ(var(--radius))` }}
                data-cyl-index={i}
                role="button"
                tabIndex={0}
                aria-label={`${p.title} — open image`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxIndex(i);
                  }
                }}
              >
                <img
                  className="cyl-img"
                  src={p.image}
                  alt={p.alt}
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="cyl-overlay">
                  <span className="cyl-badge" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="cyl-text">
                    <h3 className="cyl-title">{p.title}</h3>
                    <p className="cyl-desc">{p.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="cyl-hint">Drag to rotate · click to enlarge</p>

      <div className="cyl-dots" role="tablist" aria-label="Gallery navigation">
        {panels.map((p, i) => (
          <button
            key={i}
            type="button"
            className={`cyl-dot${i === activeIndex ? " active" : ""}`}
            aria-label={`Go to ${p.title}`}
            aria-current={i === activeIndex}
            onClick={() => goToIndex(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="cyl-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={panels[lightboxIndex].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              className="cyl-lb-close"
              aria-label="Close"
              onClick={() => setLightboxIndex(null)}
            >
              ✕
            </button>

            <button
              type="button"
              className="cyl-lb-nav prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              ‹
            </button>

            <div className="cyl-lb-content">
              <motion.img
                key={lightboxIndex}
                className="cyl-lb-img"
                src={panels[lightboxIndex].image}
                alt={panels[lightboxIndex].alt}
                draggable={false}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) step(1);
                  else if (info.offset.x > 80) step(-1);
                }}
                initial={{ opacity: 0, scale: 0.82, rotateX: -18, rotateY: 22 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              />
              <div className="cyl-lb-caption">
                <h3 className="cyl-lb-title">{panels[lightboxIndex].title}</h3>
                <p className="cyl-lb-desc">{panels[lightboxIndex].description}</p>
                <span className="cyl-lb-count">
                  {lightboxIndex + 1} / {count}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="cyl-lb-nav next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
