import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, MapPin, Menu, Phone, ShieldCheck, Sparkles, UsersRound, Footprints, X } from 'lucide-react';

const travelAsset = (name) => `${import.meta.env.BASE_URL}images/travel/${name}`;
const brandAsset = (name) => `${import.meta.env.BASE_URL}images/brand/${name}`;

const pillars = [
  {
    number: '01',
    title: 'Networking',
    description: 'Connect deeply with professionals, artists, creators, and entrepreneurs from completely different walks of life.',
    icon: UsersRound,
    detail: 'Different worlds. One table.',
    image: 'group-friends.jpg',
  },
  {
    number: '02',
    title: 'Solo-traveler friendly',
    description: 'Arrive completely alone, leave with a family. Every journey is designed to ease those first-day nerves.',
    icon: Sparkles,
    detail: 'Come solo. Belong together.',
    image: 'travel-community.jpg',
  },
  {
    number: '03',
    title: 'Hidden gems & offbeat routes',
    description: 'Ditch the over-crowded commercial traps. Walk secret trails and find places handpicked by locals.',
    icon: Footprints,
    detail: 'Take the road less repeated.',
    image: 'offbeat-landscape.jpg',
  },
  {
    number: '04',
    title: 'Safety-first architecture',
    description: 'Vetted co-travelers, verified stays, and empathetic local trip captains make care part of the journey.',
    icon: ShieldCheck,
    detail: 'Thoughtful, from the first hello.',
    image: 'scenic-route.jpg',
  },
  {
    number: '05',
    title: 'Stories over sightseeing',
    description: 'Make room for campfire jam sessions, long conversations, and the memories that outlast the checklist.',
    icon: Sparkles,
    detail: 'Stay for the story.',
    image: 'shared-moments.jpg',
  },
];

const enjoymentPhotos = [
  { image: 'hero-valley.jpg', alt: 'A wide mountain valley under evening light', title: 'Where the road opens', mood: 'Mountain country' },
  { image: 'travel-community.jpg', alt: 'Travelers taking in an open landscape together', title: 'Find your faraway people', mood: 'Shared journeys' },
  { image: 'group-friends.jpg', alt: 'A group of new friends gathered outdoors', title: 'The beginning of us', mood: 'New friendships' },
  { image: 'mountain-walk.jpg', alt: 'A walking trail through the mountains', title: 'One step beyond', mood: 'Highland trails' },
  { image: 'offbeat-landscape.jpg', alt: 'A quiet green route away from the busy road', title: 'Take the quieter way', mood: 'Offbeat routes' },
  { image: 'purpose-landscape.jpg', alt: 'A distant horizon framed by a broad landscape', title: 'A little more horizon', mood: 'Open country' },
  { image: 'scenic-route.jpg', alt: 'A colorful hillside town along a winding route', title: 'Somewhere around the bend', mood: 'Local discoveries' },
  { image: 'shared-moments.jpg', alt: 'Travelers sharing a moment on the road', title: 'Keep this feeling', mood: 'Roadside moments' },
  { image: 'alpine-crossing.jpg', alt: 'A dramatic high alpine ridge', title: 'Above the ordinary', mood: 'Alpine crossing' },
  { image: 'coastline-walk.jpg', alt: 'Ocean waves reaching a quiet shore', title: 'Let the tide decide', mood: 'Coastal days' },
  { image: 'forest-canopy.jpg', alt: 'Sunlight filtering through a deep forest', title: 'Under a thousand greens', mood: 'Forest air' },
  { image: 'cloud-country.jpg', alt: 'A mountain path rising into cloud', title: 'Somewhere in the clouds', mood: 'Cloud country' },
  { image: 'open-road.jpg', alt: 'An open road running into the distance', title: 'No rush to arrive', mood: 'Open roads' },
  { image: 'coastal-evening.jpg', alt: 'Warm evening light over a coastal landscape', title: 'The last light stays', mood: 'Coastal evenings' },
  { image: 'highland-path.jpg', alt: 'A highland walking path through open country', title: 'Walk a little farther', mood: 'Highland paths' },
  { image: 'river-country.jpg', alt: 'A river winding through a wild valley', title: 'Follow the water home', mood: 'River country' },
  { image: 'quiet-shore.jpg', alt: 'A calm stretch of shoreline at dusk', title: 'A softer kind of blue', mood: 'Quiet shores' },
  { image: 'wild-morning.jpg', alt: 'Soft morning light settling on a green landscape', title: 'Before the world wakes', mood: 'Wild mornings' },
  { image: 'traveler-light.jpg', alt: 'A traveler looking across a distant landscape', title: 'Room to become', mood: 'Faraway feelings' },
  { image: 'star-mountain.jpg', alt: 'A snow-covered mountain beneath a clear night sky', title: 'Stay until the stars', mood: 'After dark' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    ['Home', '#home'],
    ['About', '#about'],
    ['Purpose', '#purpose'],
    ['Why Us', '#why-us'],
    ['Enjoyment', '#enjoyment'],
    ['Contact', '#contact'],
  ];

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const travelLogo = (event) => {
    const logo = event.currentTarget;
    const header = logo.closest('.site-header');
    const menuButton = header?.querySelector('.menu-button');
    const logoBounds = logo.getBoundingClientRect();
    const headerBounds = header?.getBoundingClientRect();
    if (!headerBounds) return;
    const menuVisible = menuButton && getComputedStyle(menuButton).display !== 'none';
    const targetCenter = menuVisible
      ? menuButton.getBoundingClientRect().left + menuButton.getBoundingClientRect().width / 2
      : headerBounds.right - parseFloat(getComputedStyle(header).paddingRight) - logoBounds.width / 2;
    logo.style.setProperty('--brand-travel-x', `${targetCenter - (logoBounds.left + logoBounds.width / 2)}px`);
    logo.classList.remove('is-travelling');
    void logo.offsetWidth;
    logo.classList.add('is-travelling');
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a
          className="brand-lockup"
          href="#home"
          aria-label="Strangers and Stories home"
          onPointerDown={travelLogo}
          onAnimationEnd={(event) => event.currentTarget.classList.remove('is-travelling')}
        >
          <img src={brandAsset('strangers-stories.png')} alt="" />
          <span className="brand-type"><b>STRANGERS <i>&</i> STORIES</b><small>COMMUNITY TRAVEL / INDIA</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={href} href={href}>{label}<span /></a>)}
        </nav>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>{menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>
      <motion.nav className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation" initial={false} animate={{ clipPath: menuOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }} transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}>
        <div className="mobile-nav-list">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}><span>{label}</span><ArrowUpRight /></a>
          ))}
        </div>
        <p>TAKE THE LONG WAY HOME.</p>
      </motion.nav>
    </>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="home" ref={heroRef}>
      <motion.div className="hero-photo" style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}>
        <img src={travelAsset('hero-valley.jpg')} alt="A wide mountain valley beneath soft evening light" fetchPriority="high" />
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-radial" />
      <div className="hero-topline"><span>STRANGERS & STORIES / INDIA</span></div>
      <motion.div className="hero-copy" style={reduceMotion ? undefined : { y: copyY }}>
        <span className="eyebrow"><i /> MADE FOR THE WAY WE MEET</span>
        <h1>Where strangers<br />become <em>stories.</em></h1>
        <p>Step into the wild with people you’ve never met. Come back with shared songs, new perspectives, and the kind of friends who feel like they’ve always been there.</p>
        <a href="#why-us" className="primary-link"><span>Meet the community</span><ArrowDown size={17} /></a>
      </motion.div>
    </section>
  );
}

function JourneyRibbon() {
  const phrases = ['GO SOMEWHERE NEW', 'MEET SOMEONE REAL', 'TAKE THE LONG WAY HOME', 'MAKE ROOM FOR WONDER'];
  return (
    <div className="journey-ribbon" role="note" aria-label="Go somewhere new, meet someone real, take the long way home, make room for wonder">
      <div className="journey-ribbon-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="journey-ribbon-group" key={copy}>
            {phrases.map((phrase) => <span className="journey-ribbon-item" key={phrase}>{phrase}<i /></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const imageRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 18, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 18, mass: 0.8 });
  const reverseX = useTransform(smoothX, (value) => -value * 0.7);
  const reverseY = useTransform(smoothY, (value) => -value * 0.7);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  const scrollImageY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const scrollImageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06]);
  const mainImageY = useTransform([smoothY, scrollImageY], ([pointer, scroll]) => pointer + scroll);
  const mainImageScale = useSpring(scrollImageScale, { stiffness: 75, damping: 22 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const surface = imageRef.current;
    if (!surface || reduceMotion) return undefined;
    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      const rect = surface.getBoundingClientRect();
      pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
      pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 10);
    };
    const onPointerLeave = () => { pointerX.set(0); pointerY.set(0); };
    surface.addEventListener('pointermove', onPointerMove, { passive: true });
    surface.addEventListener('pointerleave', onPointerLeave);
    return () => {
      surface.removeEventListener('pointermove', onPointerMove);
      surface.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <section className="about-section section-wrap" id="about">
      <div className="about-grid">
        <motion.div className="about-copy-block" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="eyebrow"><i /> A SMALL IDEA WITH A LONG ROAD</span>
          <h2>Good miles<br />make <em>good people.</em></h2>
          <p className="about-lead">Not another itinerary. A reason to feel part of the place, and each other.</p>
          <p className="about-body">We bring people from across India together for thoughtful, community-led journeys. Less packaged tourism, more unhurried mornings, local perspectives, and the easy warmth of finding your people somewhere new.</p>
          <a href="#purpose" className="underlined-link">A little more about us <ArrowRight size={15} /></a>
        </motion.div>
        <div className="about-art" ref={imageRef}>
          <motion.div className="about-image-main" style={reduceMotion ? undefined : { x: smoothX, y: mainImageY, scale: mainImageScale }}>
            <img src={travelAsset('travel-community.jpg')} alt="Travelers sharing a quiet moment outdoors" loading="lazy" />
          </motion.div>
          <motion.div className="about-image-small" style={reduceMotion ? undefined : { x: reverseX, y: reverseY }}>
            <img src={travelAsset('group-friends.jpg')} alt="A group of new friends on the road" loading="lazy" />
          </motion.div>
          <div className="about-stamp"><span>GO FAR.</span><i>✳</i><span>FEEL CLOSE.</span></div>
        </div>
      </div>
    </section>
  );
}

function Purpose() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const atmosphereX = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const atmosphereScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1.08, 0.94]);
  const headingY = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const visionY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const missionY = useTransform(scrollYProgress, [0, 1], [-18, 38]);
  const reduceMotion = useReducedMotion();

  return (
    <section className="purpose-section" id="purpose" ref={sectionRef}>
      <motion.div className="purpose-atmosphere" aria-hidden="true" style={reduceMotion ? undefined : { x: atmosphereX, scale: atmosphereScale }} />
      <motion.div className="purpose-sticky" style={reduceMotion ? undefined : { y: headingY }}>
        <h2>OUR<br /><em>PURPOSE</em></h2>
        <span className="purpose-aside">A little intention<br />changes the whole road.</span>
      </motion.div>
      <div className="purpose-scroll">
        <motion.article className="purpose-card vision-card" style={reduceMotion ? undefined : { y: visionY }}>
          <img className="purpose-card-image" src={travelAsset('purpose-landscape.jpg')} alt="" aria-hidden="true" loading="lazy" />
          <div className="purpose-card-head"><span>OUR VISION</span></div>
          <div className="purpose-symbol">✳</div>
          <p>To become India’s most loved community travel brand — where no one ever has to travel alone, and every trip creates a story worth telling for a lifetime.</p>
        </motion.article>
        <motion.article className="purpose-card mission-card" style={reduceMotion ? undefined : { y: missionY }}>
          <img className="purpose-card-image" src={travelAsset('travel-community.jpg')} alt="" aria-hidden="true" loading="lazy" />
          <div className="purpose-card-head"><span>OUR MISSION</span></div>
          <div className="purpose-symbol">↗</div>
          <p>To create safe, fun, and soulful group trips where strangers from different cities, jobs, and lives meet, explore offbeat places together, and leave as friends — not just tourists.</p>
        </motion.article>
      </div>
    </section>
  );
}

function TiltCard({ pillar, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 170, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 170, damping: 22 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 0.5, 1], [34 + index * 7, 0, -24 - index * 5]);
  const scrollRotation = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 ? 1.8 : -1.8, 0, index % 2 ? -1.2 : 1.2]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.985]);
  const Icon = pillar.icon;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const card = ref.current;
    if (!card || reduceMotion) return undefined;
    const onMove = (event) => {
      if (event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      x.set((event.clientX - rect.left) / rect.width - 0.5);
      y.set((event.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    card.addEventListener('pointermove', onMove, { passive: true });
    card.addEventListener('pointerleave', onLeave);
    return () => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y, reduceMotion]);

  return (
    <motion.article ref={ref} className={`benefit-card benefit-card-${index + 1}`} style={{ backgroundImage: `linear-gradient(160deg, rgba(8,17,15,.28) 0%, rgba(8,17,15,.78) 45%, rgba(8,17,15,.97) 100%), url("${travelAsset(pillar.image)}")`, ...(reduceMotion ? {} : { y: scrollY, scale: scrollScale, rotateX, rotateY, rotateZ: scrollRotation, transformPerspective: 950 }) }}>
      <div className="benefit-card-top"><span>{pillar.number} / 05</span><Icon size={21} strokeWidth={1.4} /></div>
      <h3>{pillar.title}</h3>
      <p>{pillar.description}</p>
      <div className="benefit-card-foot"><span>{pillar.detail}</span><ArrowUpRight size={16} /></div>
    </motion.article>
  );
}

function WhyUs() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const headingY = useTransform(scrollYProgress, [0, 1], [38, -38]);
  const headingRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);
  const reduceMotion = useReducedMotion();

  return (
    <section className="why-section section-wrap" id="why-us" ref={sectionRef}>
      <motion.div className="why-heading" style={reduceMotion ? undefined : { y: headingY, rotate: headingRotate }}>
        <h2>Five things that<br />make the <em>difference.</em></h2>
        <p>The best part isn’t a place on a map. It’s who you meet along the way.</p>
      </div>
      <div className="benefit-grid">{pillars.map((pillar, index) => <TiltCard key={pillar.number} pillar={pillar} index={index} />)}</div>
    </section>
  );
}

function EnjoymentFrame({ photo, index, replica, viewportRef }) {
  const frameRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(useTransform(pointerX, [-1, 1], [-9, 9]), { stiffness: 180, damping: 24, mass: 0.35 });
  const imagePointerY = useSpring(useTransform(pointerY, [-1, 1], [-8, 8]), { stiffness: 180, damping: 24, mass: 0.35 });
  const lightX = useSpring(useTransform(pointerX, [-1, 1], [-18, 18]), { stiffness: 140, damping: 22, mass: 0.45 });
  const lightY = useSpring(useTransform(pointerY, [-1, 1], [-14, 14]), { stiffness: 140, damping: 22, mass: 0.45 });
  const { scrollXProgress } = useScroll({ target: frameRef, container: viewportRef, offset: ['start end', 'end start'] });
  const imageScale = useTransform(scrollXProgress, [0, 0.5, 1], [1.12, 1, 1.12]);
  const imageY = useTransform(scrollXProgress, [0, 1], ['2.5%', '-2.5%']);
  const combinedImageY = useTransform([imageY, imagePointerY], ([scroll, pointer]) => `calc(${scroll} + ${pointer}px)`);
  const frameY = useTransform(scrollXProgress, [0, 0.5, 1], [8, -3, 8]);
  const reduceMotion = useReducedMotion();
  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.figure ref={frameRef} className="enjoyment-frame" style={reduceMotion ? undefined : { y: frameY }} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} aria-hidden={replica !== 1}>
      <motion.img src={travelAsset(photo.image)} alt={photo.alt} loading={index < 3 ? 'eager' : 'lazy'} draggable="false" style={reduceMotion ? undefined : { x: imageX, scale: imageScale, y: combinedImageY }} />
      {!reduceMotion && <motion.span className="enjoyment-glare" aria-hidden="true" style={{ x: lightX, y: lightY }} />}
      <span className="enjoyment-frame-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} <i>/ 20</i></span>
      <figcaption className="enjoyment-caption">
        <span>{photo.mood}</span>
        <strong>{photo.title}</strong>
      </figcaption>
    </motion.figure>
  );
}

function Enjoyment() {
  const viewportRef = useRef(null);
  const cycleWidthRef = useRef(0);
  const interactionRef = useRef({ pointerId: null, previousX: 0, previousTime: 0, velocity: 0, frame: 0 });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const interaction = interactionRef.current;
    const firstSet = viewport.querySelector('.enjoyment-set');
    if (!firstSet) return undefined;

    const measureCycle = () => {
      const width = firstSet.getBoundingClientRect().width;
      if (width <= 0) return;
      const changed = Math.abs(width - cycleWidthRef.current) > 1;
      cycleWidthRef.current = width;
      if (changed) viewport.scrollLeft = width;
    };

    const wrapScrollPosition = (position) => {
      const cycleWidth = cycleWidthRef.current;
      if (!cycleWidth) return position;
      return cycleWidth + ((position - cycleWidth) % cycleWidth + cycleWidth) % cycleWidth;
    };

    const stopMomentum = () => {
      if (interaction.frame) window.cancelAnimationFrame(interaction.frame);
      interaction.frame = 0;
    };

    const continueMomentum = () => {
      interaction.velocity *= 0.94;
      if (Math.abs(interaction.velocity) < 0.35) {
        interaction.frame = 0;
        return;
      }
      viewport.scrollLeft = wrapScrollPosition(viewport.scrollLeft - interaction.velocity);
      interaction.frame = window.requestAnimationFrame(continueMomentum);
    };

    const onScroll = () => {
      const normalized = wrapScrollPosition(viewport.scrollLeft);
      if (Math.abs(normalized - viewport.scrollLeft) > 0.5) viewport.scrollLeft = normalized;
    };

    const onWheel = (event) => {
      if (event.shiftKey && !event.deltaX) {
        event.preventDefault();
        stopMomentum();
        viewport.scrollLeft = wrapScrollPosition(viewport.scrollLeft + event.deltaY);
        return;
      }
      if (!event.deltaX || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      stopMomentum();
      viewport.scrollLeft = wrapScrollPosition(viewport.scrollLeft + event.deltaX);
    };

    const onPointerDown = (event) => {
      if (event.pointerType === 'touch' || event.button !== 0) return;
      stopMomentum();
      interaction.pointerId = event.pointerId;
      interaction.previousX = event.clientX;
      interaction.previousTime = performance.now();
      interaction.velocity = 0;
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add('is-dragging');
    };

    const onPointerMove = (event) => {
      if (interaction.pointerId !== event.pointerId) return;
      const now = performance.now();
      const elapsed = Math.max(now - interaction.previousTime, 1);
      const delta = event.clientX - interaction.previousX;
      interaction.velocity = delta / elapsed * 16;
      viewport.scrollLeft = wrapScrollPosition(viewport.scrollLeft - delta);
      interaction.previousX = event.clientX;
      interaction.previousTime = now;
    };

    const finishPointer = (event) => {
      if (interaction.pointerId !== event.pointerId) return;
      interaction.pointerId = null;
      viewport.classList.remove('is-dragging');
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      if (Math.abs(interaction.velocity) > 0.5) interaction.frame = window.requestAnimationFrame(continueMomentum);
    };

    measureCycle();
    const resizeObserver = new ResizeObserver(measureCycle);
    resizeObserver.observe(firstSet);
    viewport.addEventListener('scroll', onScroll, { passive: true });
    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove, { passive: true });
    viewport.addEventListener('pointerup', finishPointer);
    viewport.addEventListener('pointercancel', finishPointer);
    return () => {
      stopMomentum();
      resizeObserver.disconnect();
      viewport.removeEventListener('scroll', onScroll);
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', finishPointer);
      viewport.removeEventListener('pointercancel', finishPointer);
    };
  }, []);

  return (
    <section className="enjoyment-section" id="enjoyment">
      <div className="enjoyment-heading">
        <div className="enjoyment-heading-copy">
          <span className="eyebrow"><i /> LITTLE MOMENTS, LONG AFTER</span>
          <h2>A life lived <em>outside.</em></h2>
          <p>Twenty glimpses of the places, people, and in-between moments that make the journey.</p>
        </div>
        <div className="enjoyment-heading-aside">
          <span className="enjoyment-count"><b>20</b><i> MOMENTS</i></span>
          <span className="enjoyment-drag-hint"><ArrowRight size={15} /> DRAG TO WANDER</span>
        </div>
      </div>
      <div className="enjoyment-viewport" ref={viewportRef} role="region" aria-label="Horizontal travel photo gallery" tabIndex={0}>
        <div className="enjoyment-track">
          {[0, 1, 2].map((replica) => (
            <div className="enjoyment-set" key={replica} aria-hidden={replica !== 1}>
              {enjoymentPhotos.map((photo, index) => <EnjoymentFrame key={photo.image} photo={photo} index={index} replica={replica} viewportRef={viewportRef} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const contacts = [
    { label: 'Instagram', detail: 'Follow along', href: 'https://www.instagram.com/strangers_.stories?stkn=Zm5tNzhqZGkwNnVo', icon: Instagram },
    { label: 'Phone', detail: '+91 9739379808', href: 'tel:+919739379808', icon: Phone },
    { label: 'Location', detail: 'View location', href: 'https://share.google/GuWXURf0n9lSsV57m', icon: MapPin },
  ];
  return (
    <footer className="footer" id="contact">
      <div className="footer-top"><div><span className="eyebrow"><i /> UNTIL WE MEET OUT THERE</span><h2>Bring a little<br /><em>more outside in.</em></h2></div><a href="#home" className="back-top" aria-label="Back to top"><ArrowUpRight size={21} /></a></div>
      <h3 className="contact-heading">Get in touch</h3>
      <div className="contact-grid">
        {contacts.map(({ label, detail, href, icon: Icon }) => (
          <a className="contact-card" href={href} key={label} aria-label={`${label}: ${detail}`} title={label} target={href.startsWith('https://') ? '_blank' : undefined} rel={href.startsWith('https://') ? 'noreferrer' : undefined}>
            <span className="contact-icon"><Icon size={23} strokeWidth={1.5} /></span>
            <span className="contact-copy"><strong>{label}</strong><small>{detail}</small></span>
          </a>
        ))}
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} STRANGERS & STORIES</span><span>MADE OF MANY MILES & MEETINGS</span><a href="#home">BACK TO THE BEGINNING ↑</a></div>
    </footer>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="travel-site">
      <Header />
      <main>
        <Hero />
        <JourneyRibbon />
        <About />
        <Purpose />
        <WhyUs />
        <Enjoyment />
      </main>
      <Footer />
      {!reduceMotion && <div className="ambient-glow" aria-hidden="true" />}
    </div>
  );
}
