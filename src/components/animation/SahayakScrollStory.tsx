import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Users,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Banknote,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';
import './SahayakScrollStory.css';
import { useLanguage } from '../../i18n/LanguageContext';

// Register GSAP ScrollTrigger plugin safely
gsap.registerPlugin(ScrollTrigger);

export interface SahayakScrollStoryProps {
  showHud?: boolean;
}

export const SahayakScrollStory: React.FC<SahayakScrollStoryProps> = ({ showHud = false }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const orbitalRef = useRef<SVGSVGElement | null>(null);
  const ring1Ref = useRef<SVGCircleElement | null>(null);
  const ring2Ref = useRef<SVGCircleElement | null>(null);
  const ring3Ref = useRef<SVGCircleElement | null>(null);
  const ringOuterRef = useRef<SVGCircleElement | null>(null);
  const connectionLineRef = useRef<SVGPathElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const headline1Ref = useRef<HTMLHeadingElement | null>(null);
  const headline2Ref = useRef<HTMLHeadingElement | null>(null);
  const scene2LabelRef = useRef<HTMLDivElement | null>(null);
  const networkWrapRef = useRef<HTMLDivElement | null>(null);
  const workerNodeRef = useRef<HTMLDivElement | null>(null);
  const jobNodeRef = useRef<HTMLDivElement | null>(null);
  const connectionPillRef = useRef<HTMLDivElement | null>(null);
  const jobCardWrapRef = useRef<HTMLDivElement | null>(null);
  const finalWrapRef = useRef<HTMLDivElement | null>(null);
  const hudProgressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mm = gsap.matchMedia();

    // DESKTOP / TABLET: Pinned Cinematic ScrollTrigger Timeline
    mm.add('(min-width: 768px)', () => {
      if (!containerRef.current || !viewportRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=380%',
          pin: viewportRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (hudProgressRef.current) {
              const pct = Math.round(self.progress * 100);
              let sceneText = 'SCENE 1: INITIAL COMPOSITION';
              if (pct >= 18 && pct < 35) sceneText = 'SCENE 2: TYPOGRAPHIC TRANSFORMATION';
              else if (pct >= 35 && pct < 56) sceneText = 'SCENE 3: SKILLS MEET OPPORTUNITY';
              else if (pct >= 56 && pct < 78) sceneText = 'SCENE 4: DEMONSTRATION OPPORTUNITY';
              else if (pct >= 78) sceneText = 'SCENE 5: RESOLUTION & ACTION';
              hudProgressRef.current.textContent = `${pct}% • ${sceneText}`;
            }
          },
        },
      });

      // Explicit Initial Visual States using autoAlpha for robust visibility management
      gsap.set(containerRef.current, { backgroundColor: '#F8FAFC', color: '#111827' });
      gsap.set(orbitalRef.current, { scale: 1, rotate: 0, autoAlpha: 0.85 });
      gsap.set(headlineRef.current, { y: 0, scale: 1, autoAlpha: 1 });
      gsap.set(headline1Ref.current, { color: '#111827' });
      gsap.set(headline2Ref.current, { color: '#0F766E' });
      gsap.set(scene2LabelRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(networkWrapRef.current, { autoAlpha: 0, scale: 0.95 });
      gsap.set(workerNodeRef.current, { x: -80, autoAlpha: 0 });
      gsap.set(jobNodeRef.current, { x: 80, autoAlpha: 0 });
      gsap.set(connectionPillRef.current, { scale: 0, autoAlpha: 0 });
      gsap.set(jobCardWrapRef.current, { autoAlpha: 0, scale: 0.92, y: 35, pointerEvents: 'none' });
      gsap.set(finalWrapRef.current, { autoAlpha: 0, scale: 0.92, y: 30, pointerEvents: 'none' });

      /* -------------------------------------------------------------
         SCENE 1 -> 2: TYPOGRAPHIC TRANSFORMATION & RADAR EXPANSION
         (0 - 22% of timeline)
         ------------------------------------------------------------- */
      tl.addLabel('scene1_to_2', 0)
        .to(
          headlineRef.current,
          {
            y: -115,
            scale: 0.74,
            opacity: 0.45,
            ease: 'power2.inOut',
            duration: 2.2,
          },
          'scene1_to_2'
        )
        .to(
          orbitalRef.current,
          {
            scale: 1.35,
            rotate: 45,
            opacity: 0.95,
            ease: 'power2.inOut',
            duration: 2.2,
          },
          'scene1_to_2'
        )
        .to(
          [ring1Ref.current, ring2Ref.current, ring3Ref.current],
          {
            stroke: '#0F766E',
            strokeWidth: 2,
            stagger: 0.1,
            ease: 'power2.inOut',
            duration: 2.2,
          },
          'scene1_to_2'
        )
        .to(
          scene2LabelRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          'scene1_to_2+=1.0'
        );

      /* -------------------------------------------------------------
         SCENE 2 -> 3: DEEP INK SHIFT & SKILLS MEET OPPORTUNITY
         (22 - 50% of timeline)
         ------------------------------------------------------------- */
      // 1. Scene 2 exits cleanly
      tl.addLabel('scene2_exit', 2.8)
        .to(
          containerRef.current,
          {
            backgroundColor: '#111827',
            color: '#F8FAFC',
            ease: 'power2.inOut',
            duration: 2.0,
          },
          'scene2_exit'
        )
        .to(
          [headlineRef.current, scene2LabelRef.current],
          {
            autoAlpha: 0,
            y: -160,
            duration: 1.2,
            ease: 'power2.in',
          },
          'scene2_exit'
        )
        .to(
          orbitalRef.current,
          {
            scale: 1.55,
            rotate: 90,
            opacity: 0.35,
            duration: 2.0,
            ease: 'power2.inOut',
          },
          'scene2_exit'
        );

      // 2. Scene 3 nodes enter smoothly
      tl.addLabel('scene3_enter', 4.0)
        .to(
          networkWrapRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
          },
          'scene3_enter'
        )
        .to(
          workerNodeRef.current,
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'back.out(1.2)',
          },
          'scene3_enter+=0.2'
        )
        .to(
          jobNodeRef.current,
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'back.out(1.2)',
          },
          'scene3_enter+=0.4'
        )
        .to(
          connectionLineRef.current,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power2.inOut',
          },
          'scene3_enter+=0.4'
        )
        .to(
          connectionPillRef.current,
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.0,
            ease: 'back.out(1.5)',
          },
          'scene3_enter+=0.8'
        );

      /* -------------------------------------------------------------
         SCENE 3 -> 4: FEATURED OPPORTUNITY CARD REVEALED
         (50 - 75% of timeline)
         ------------------------------------------------------------- */
      // 1. Scene 3 nodes exit completely BEFORE job card enters
      tl.addLabel('scene3_exit', 6.8)
        .to(
          networkWrapRef.current,
          {
            autoAlpha: 0,
            scale: 0.92,
            y: -40,
            duration: 1.1,
            ease: 'power2.in',
          },
          'scene3_exit'
        )
        .to(
          connectionLineRef.current,
          {
            opacity: 0.1,
            duration: 0.9,
          },
          'scene3_exit'
        );

      // 2. Scene 4 job card enters into a clear, uncluttered viewport
      tl.addLabel('scene4_enter', 8.0)
        .to(
          jobCardWrapRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 1.5,
            ease: 'power3.out',
          },
          'scene4_enter'
        )
        .to(
          orbitalRef.current,
          {
            scale: 1.2,
            rotate: 135,
            opacity: 0.25,
            duration: 1.5,
            ease: 'power2.out',
          },
          'scene4_enter'
        );

      /* -------------------------------------------------------------
         SCENE 4 -> 5: RESOLUTION & FINAL CTA
         (75 - 100% of timeline)
         ------------------------------------------------------------- */
      // 1. CRITICAL REPAIR: Job card exits completely to autoAlpha: 0
      // BEFORE Scene 5 headline enters, eliminating text/card overlap!
      tl.addLabel('scene4_exit', 10.8)
        .to(
          jobCardWrapRef.current,
          {
            autoAlpha: 0,
            scale: 0.9,
            y: -35,
            pointerEvents: 'none',
            duration: 1.1,
            ease: 'power2.in',
          },
          'scene4_exit'
        );

      // 2. Scene 5 concluding statement and actions enter into a clean viewport
      tl.addLabel('scene5_enter', 12.0)
        .to(
          finalWrapRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 1.6,
            ease: 'power3.out',
          },
          'scene5_enter'
        )
        .to(
          orbitalRef.current,
          {
            scale: 0.9,
            rotate: 180,
            opacity: 0.5,
            duration: 1.6,
            ease: 'power2.out',
          },
          'scene5_enter'
        )
        .to(
          [ringOuterRef.current, ring3Ref.current],
          {
            stroke: '#14B8A6',
            duration: 1.4,
          },
          'scene5_enter+=0.2'
        );
    });

    // MOBILE / ACCESSIBILITY (< 768px): Stacked, fluid layout without sticky lock
    mm.add('(max-width: 767px)', () => {
      gsap.set(containerRef.current, { backgroundColor: '#111827', color: '#F8FAFC' });
      gsap.set(
        [headlineRef.current, networkWrapRef.current, jobCardWrapRef.current, finalWrapRef.current],
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          pointerEvents: 'auto',
          position: 'relative',
        }
      );
      gsap.set([workerNodeRef.current, jobNodeRef.current, connectionPillRef.current, scene2LabelRef.current], {
        autoAlpha: 1,
        x: 0,
        scale: 1,
      });
      gsap.set(headline1Ref.current, { color: '#FFFFFF' });
      gsap.set(headline2Ref.current, { color: '#14B8A6' });
    });

    // Refresh ScrollTrigger to sync measurements
    ScrollTrigger.refresh();

    // Cleanup when component unmounts
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="sss-container">
      {/* Optional HUD Progress Indicator for Testing / QA */}
      {showHud && (
        <div className="sss-hud-bar" aria-hidden="true">
          <span className="sss-hud-indicator" />
          <span ref={hudProgressRef}>0% • SCENE 1: INITIAL COMPOSITION</span>
        </div>
      )}

      {/* Main Viewport Container */}
      <div ref={viewportRef} className="sss-viewport">
        {/* GEOMETRIC ORBITAL / RADAR SVG GRAPHIC */}
        <div className="sss-orbital-wrapper" aria-hidden="true">
          <svg
            ref={orbitalRef}
            className="sss-orbital-svg"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric Rings */}
            <circle
              ref={ringOuterRef}
              cx="400"
              cy="400"
              r="360"
              stroke="#0F766E"
              strokeWidth="1.2"
              className="sss-ring-outer opacity-40"
            />
            <circle
              ref={ring3Ref}
              cx="400"
              cy="400"
              r="270"
              stroke="#334155"
              strokeWidth="1"
              className="sss-ring-dash opacity-50"
            />
            <circle
              ref={ring2Ref}
              cx="400"
              cy="400"
              r="180"
              stroke="#334155"
              strokeWidth="1"
              className="opacity-60"
            />
            <circle
              ref={ring1Ref}
              cx="400"
              cy="400"
              r="90"
              stroke="#0F766E"
              strokeWidth="1.5"
              className="opacity-70"
            />
            <circle cx="400" cy="400" r="16" fill="#0F766E" fillOpacity="0.15" />
            <circle cx="400" cy="400" r="5" fill="#14B8A6" />

            {/* Radial Directional Rays (8 Compass Crosshairs) */}
            <line x1="400" y1="30" x2="400" y2="770" stroke="#334155" strokeWidth="0.8" strokeDasharray="4 4" className="opacity-40" />
            <line x1="30" y1="400" x2="770" y2="400" stroke="#334155" strokeWidth="0.8" strokeDasharray="4 4" className="opacity-40" />
            <line x1="138" y1="138" x2="662" y2="662" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 6" className="opacity-30" />
            <line x1="138" y1="662" x2="662" y2="138" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 6" className="opacity-30" />

            {/* Directional Angular Calibration Ticks */}
            <circle cx="400" cy="40" r="3" fill="#14B8A6" />
            <circle cx="760" cy="400" r="3" fill="#14B8A6" />
            <circle cx="400" cy="760" r="3" fill="#14B8A6" />
            <circle cx="40" cy="400" r="3" fill="#14B8A6" />

            {/* Satellite Orbital Nodes */}
            <g transform="translate(590, 260)">
              <circle cx="0" cy="0" r="8" fill="#111827" stroke="#14B8A6" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#14B8A6" />
            </g>
            <g transform="translate(210, 540)">
              <circle cx="0" cy="0" r="8" fill="#111827" stroke="#8B5CF6" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#8B5CF6" />
            </g>

            {/* Dynamic Connection Path between nodes (Scene 3) */}
            <path
              ref={connectionLineRef}
              d="M 210 540 Q 380 440 590 260"
              stroke="#14B8A6"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              fill="none"
              className="opacity-0"
            />
          </svg>
        </div>

        {/* CONTENT LAYER */}
        <div className="sss-content-layer">
          {/* =========================================================
              SCENE 1 & 2: INITIAL HEADLINE & TRANSFORMATION
              ========================================================= */}
          <div ref={headlineRef} className="sss-headline-wrap">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 bg-[#E2E8F0]/70 text-[#0F766E] border border-[#CBD5E1]">
              {t('home.hero.badge')}
            </span>

            <h1 ref={headline1Ref} className="sss-headline-1">
              {t('home.hero.title1')}
            </h1>
            <h2 ref={headline2Ref} className="sss-headline-2">
              {t('home.hero.title2')}
            </h2>

            <div
              ref={scene2LabelRef}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-[#0F766E]"
            >
              <Sparkles className="w-4 h-4 text-[#14B8A6]" />
              <span>{t('home.hero.sub')}</span>
            </div>
          </div>

          {/* =========================================================
              SCENE 3: THE DIRECT CONNECTION (Where Skills Meet Opportunity)
              ========================================================= */}
          <div ref={networkWrapRef} className="sss-network-wrap">
            <div className="text-center mb-8">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#14B8A6] block mb-2">
                {t('home.hero.scene3.badge')}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t('home.hero.scene3.title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left Node: Worker Profile */}
              <div ref={workerNodeRef} className="sss-card-node text-left border-l-4 border-l-[#14B8A6]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#14B8A6] font-semibold uppercase tracking-wider">
                    {t('home.hero.scene3.artisanBadge')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30">
                    {t('home.hero.scene3.demoBadge')}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold text-white mb-1">
                  Rameshwar Jadhav
                </h4>
                <p className="text-xs text-[#DBEAFE]/80 mb-3">
                  {t('home.hero.scene3.artisanTrade')}
                </p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-700/80">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#14B8A6]" /> Kothrud, Pune
                  </span>
                  <span className="text-white font-mono font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> 4.9 ({t('home.hero.scene3.demoBadge')})
                  </span>
                </div>
              </div>

              {/* Right Node: Opportunity */}
              <div ref={jobNodeRef} className="sss-card-node text-left border-l-4 border-l-[#8B5CF6]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#8B5CF6] font-semibold uppercase tracking-wider">
                    {t('home.hero.scene3.directBadge')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                    {t('home.hero.scene3.payoutBadge')}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold text-white mb-1">
                  {t('home.hero.scene3.jobTitle')}
                </h4>
                <p className="text-xs text-[#DBEAFE]/80 mb-3">
                  {t('home.hero.scene3.jobDesc')}
                </p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-700/80">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" /> Kothrud (8.2 km)
                  </span>
                  <span className="text-[#14B8A6] font-mono font-bold flex items-center gap-1">
                    <Banknote className="w-3.5 h-3.5" /> {t('home.hero.scene3.rateOffered')}
                  </span>
                </div>
              </div>
            </div>

            {/* Connection Status Pill */}
            <div ref={connectionPillRef} className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F766E]/40 border border-[#14B8A6]/60 text-white text-xs font-bold font-mono tracking-wider shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                <span>{t('home.hero.scene3.pill')}</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              SCENE 4: DEMONSTRATION OPPORTUNITY REVEALED
              ========================================================= */}
          <div ref={jobCardWrapRef} className="sss-job-card-wrap">
            <div className="sss-job-card">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-[#E2E8F0]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold tracking-wide uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                  {t('home.hero.scene4.badge')}
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {t('home.hero.scene4.sampleTag')}
                </span>
              </div>

              {/* Job Title & Trade */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] leading-snug mb-2">
                {t('home.hero.scene4.title')}
              </h3>
              <p className="text-sm text-[#334155] leading-relaxed mb-6">
                {t('home.hero.scene4.desc')}
              </p>

              {/* Key Opportunity Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                    {t('home.hero.scene4.rateLabel')}
                  </div>
                  <div className="text-lg font-bold font-serif text-[#0F766E]">
                    ₹950 / {t('common.day')}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                    {t('home.hero.scene4.durationLabel')}
                  </div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-600" /> {t('home.hero.scene4.durationVal')}
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                    {t('home.hero.scene4.locLabel')}
                  </div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0F766E]" /> {t('home.hero.scene4.locVal')}
                  </div>
                </div>
              </div>

              {/* Trust Safeguards */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
                  {t('home.hero.scene4.trust')}
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  ID: SHY-DEMO-PUN-084 • {t('home.hero.scene4.sampleTag')}
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================
              SCENE 5: RESOLUTION & CALL TO ACTION
              ========================================================= */}
          <div ref={finalWrapRef} className="sss-final-wrap">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#14B8A6] mb-3">
              {t('home.hero.scene5.badge')}
            </span>

            <h2 className="sss-final-headline">
              <span>{t('home.hero.scene5.title1')}</span>
              <span className="text-[#14B8A6] block sm:inline">{t('home.hero.scene5.title2')}</span>
            </h2>

            <p className="text-base sm:text-lg text-[#DBEAFE]/80 max-w-xl mx-auto mb-8 leading-relaxed">
              {t('home.hero.scene5.desc')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <Link
                to="/work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0F766E] text-white text-base font-semibold shadow-lg hover:bg-[#115E59] active:scale-[0.98] transition-all group"
              >
                <span>{t('home.hero.scene5.btnFind')}</span>
                <ArrowRight className="w-5 h-5 text-[#14B8A6] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/hire"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1E293B] text-white border border-slate-700 text-base font-semibold hover:bg-slate-800 active:scale-[0.98] transition-all group"
              >
                <span>{t('home.hero.scene5.btnHire')}</span>
                <Users className="w-5 h-5 text-[#8B5CF6] group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SahayakScrollStory;
