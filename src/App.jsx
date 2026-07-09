import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlay,
  FaTiktok,
} from "react-icons/fa";
import { FiArrowUpRight, FiChevronDown, FiMail } from "react-icons/fi";

// Client asset swap guide:
// Replace the remote hero video with /videos/hero-juice.mp4 after adding it to public/videos.
// Replace image URLs with /images/client-image.jpg after adding files to public/images.
const heroVideo =
  "https://cdn.coverr.co/videos/coverr-pouring-orange-juice-1182/1080p.mp4";

const menuItems = [
  {
    name: "Appetizer Soup",
    ingredients: "Strawberries, orange, mandarin, raw honey, Oat",
    price: "630 birr",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/48/ef/49/delicioso.jpg?w=1400&h=-1&s=1",
  },
  {
    name: "Club-Sandwich",
    ingredients: "blueberries, cheese, turmeric, Mayonnaise",
    price: "670 birr",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/17/a0/37/photo0jpg.jpg?w=1400&h=-1&s=1",
  },
  {
    name: "Special Salad",
    ingredients: "Carrot, Salad, , vanilla, Garlic, Olive oil, Lemon",
    price: "510 birr",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/25/ac/7c/caption.jpg?w=1100&h=-1&s=1",
  },
  {
    name: "Special Sandwich",
    ingredients: "Eggs, Cheese, Mayonnaise, Tomato, Lettuce",
    price: "640 birr",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/89/48/59/super-juice.jpg?w=1400&h=-1&s=1",
  },
];

const Menu = [
  {
    title: "",
    copy: "",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/15/6d/b5/photo3jpg.jpg?w=1400&h=-1&s=1",
  },
  {
    title: "",
    copy: "",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/ec/28/b8/img-20180730-200908-largejpg.jpg?w=700&h=-1&s=1",
  },
];

const faqs = [
  {
    question: "Do you use fresh fruits and vegetables?",
    answer:
      "Yes. Every juice, smoothie, and vegetable blend is prepared using fresh, high-quality ingredients to ensure the best flavor and nutrition.",
  },
  {
    question: "Do you offer vegan and vegetarian options?",
    answer:
      "Absolutely. Our menu includes a wide selection of vegan, vegetarian, and plant-based meals, snacks, and beverages.",
  },
  {
    question: "Can I customize my drink or meal?",
    answer:
      "Yes. You can choose your favorite fruits, vegetables, add-ons, and dietary preferences to create a drink or meal that's perfect for you.",
  },
  {
    question: "Do you have outdoor seating?",
    answer:
      "Yes. Enjoy your food and drinks on our relaxing outdoor patio, surrounded by fresh plants and a peaceful atmosphere.",
  },
  {
    question: "Is your juice made with added sugar?",
    answer:
      "No. Our juices are naturally sweetened by fresh fruits, with no added sugar unless requested by the customer.",
  },
  {
    question: "Can I work or study at the juice house?",
    answer:
      "Of course. Our calm atmosphere, comfortable seating, and free Wi-Fi make it an ideal place to work, study, or simply unwind.",
  },
  {
    question: "Do you offer takeaway and delivery?",
    answer:
      "Yes. You can enjoy your favorite drinks and meals in-store, take them to go, or have them delivered where available.",
  },
  {
    question: "Are your ingredients locally sourced?",
    answer:
      "Whenever possible, we source fresh fruits, vegetables, and herbs from trusted local farmers to support our community and ensure freshness.",
  },
  {
    question: "Can I reserve a table for a group?",
    answer:
      "Yes. We welcome group bookings for friends, families, and small events. Contact us in advance to reserve your preferred seating.",
  },
  {
    question: "What makes your juice house unique?",
    answer:
      "Our combination of fresh, healthy food, handcrafted juices, artistic interiors, lush greenery, exceptional customer service, and relaxing ambiance creates a space where guests love to return.",
  },
];

const navItems = ["About", "Bestsellers", "Menu", "Location", "FAQ"];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.2,
  });

  const heroScale = useTransform(smoothProgress, [0, 1], [1.06, 1]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.78, 1], [1, 1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.58], [0, -74]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.48, 0.68], [1, 1, 0]);
  const chapterY = useTransform(smoothProgress, [0.12, 0.92], [84, -6]);
  const chapterOpacity = useTransform(
    smoothProgress,
    [0.08, 0.22, 0.92, 1],
    [0, 1, 1, 0],
  );
  const glowY = useTransform(smoothProgress, [0, 1], [0, 160]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const video = videoRef.current;
      if (!video || Number.isNaN(video.duration)) return;
      video.currentTime = latest * Math.max(video.duration - 0.15, 0);
    });

    return unsubscribe;
  }, [smoothProgress]);

  return (
    <main className="min-h-screen overflow-hidden bg-midnight text-crema">
      <nav className="fixed left-1/2 top-4 z-50 w-[min(1120px,calc(100%-24px))] -translate-x-1/2 rounded-full border border-white/10 bg-black/25 px-4 py-3 shadow-glass backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#top"
            className="font-display text-2xl font-bold tracking-wide"
          >
            Super Juice
          </a>
          <div className="hidden items-center gap-7 text-sm text-crema/75 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition hover:text-saffron"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#menu"
            className="rounded-full bg-crema px-5 py-2 text-sm font-semibold text-midnight transition hover:bg-saffron"
          >
            Brawse
          </a>
        </div>
      </nav>

      {/* Hero: video scrubs with scroll and text chapters fade between scenes. */}
      <section id="top" ref={heroRef} className="relative h-[112vh]">
        <motion.div
          style={{ opacity: heroOpacity }}
          className="sticky top-0 h-screen overflow-hidden"
        >
          <motion.video
            ref={videoRef}
            style={{ scale: heroScale }}
            className="absolute inset-0 h-full w-full object-cover"
            src={heroVideo}
            muted
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1800&q=80"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,11,7,0.92),rgba(16,11,7,0.36),rgba(16,11,7,0.9))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,209,102,0.18),transparent_34%),linear-gradient(180deg,transparent_58%,#100b07_100%)]" />
          <motion.div
            style={{ y: glowY }}
            className="absolute bottom-[-18rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-ember/25 blur-[120px]"
          />

          <div className="relative z-10 flex h-full items-center px-5 pt-24 sm:px-8 lg:px-14">
            <motion.div
              style={{ y: titleY, opacity: titleOpacity }}
              className="max-w-5xl"
            >
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.34em] text-saffron">
                Fresh Juice. Excusite Cake. Healthy Veggies.
              </p>
              <h1 className="max-w-5xl font-display text-6xl font-bold leading-[0.9] md:text-8xl lg:text-[9.5rem]">
                Super Juice
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-crema/78 md:text-xl">
                Whether you're catching up with friends, getting work done, or
                simply taking a break, it's the perfect place to relax,
                recharge, and enjoy every sip in an inviting atmosphere.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#menu" className="luxury-button">
                  Explore Menu <FiArrowUpRight />
                </a>
                <a href="#about" className="ghost-button">
                  <FaPlay className="text-saffron" /> Our Story
                </a>
              </div>
            </motion.div>

            <motion.div
              style={{ y: chapterY, opacity: chapterOpacity }}
              className="absolute bottom-24 right-5 max-w-md border-l border-saffron/40 pl-6 sm:right-10 lg:right-16"
            >
              <p className="font-display text-4xl leading-tight md:text-6xl">
                Enjoy The Experiance
              </p>
              <p className="mt-5 text-crema/70">
                A peaceful juice house where fresh flavors, nourishing vegetable
                blends, and wholesome meals come together in a beautifully
                designed space that inspires calm, comfort, and healthy living.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 bg-midnight">
        <div className="section-divider" />

        <section id="about" className="flex flex-col pb-5">
          <div className="section-shell  grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="eyebrow">About</p>
              <h2 className="section-title">Super Juice</h2>
            </Reveal>
            <Reveal
              delay={0.12}
              className="space-y-6 text-lg leading-8 text-crema/72"
            >
              <p>
                A peaceful juice house where fresh juices, nourishing vegetable
                blends, and wholesome meals are served in a beautifully designed
                space filled with vibrant artwork, lush decorative plants, and
                warm natural aesthetics that create a relaxing escape.
              </p>
              <p>
                Exceptional customer service, a calm atmosphere, and
                thoughtfully crafted interiors make it the perfect place to
                unwind, connect with friends, work in comfort, or simply enjoy
                healthy food and refreshing drinks.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="flex flex-col w-full items-center  gap-4 justify-center md:flex-row xl:flex-row  ">
              <div className=" menu-card h-10">
                <div>
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/11/76/d8/caption.jpg?w=1400&h=-1&s=1"
                    alt="interior"
                    style={{
                      width: "350px",
                      height: "350px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="flex justify-center items-center pt-10">
                  <h1 className="text-2xl">Interior</h1>
                </div>
              </div>

              <div className=" menu-card h-10">
                <div>
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/b4/34/ce/super-juice-store.jpg?w=1000&h=600&s=1"
                    alt="Exterior"
                    style={{
                      width: "350px",
                      height: "350px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="flex justify-center items-center pt-10">
                  <h1 className="text-2xl">Exterior</h1>
                </div>
              </div>

              <div className=" menu-card h-10">
                <img
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/97/e6/9a/fb-img-1497643508798.jpg?w=800&h=-1&s=1"
                  alt="Patio"
                  style={{
                    width: "350px",
                    height: "350px",
                    objectFit: "cover",
                  }}
                />

                <div className="flex justify-center items-center pt-10">
                  <h1 className="text-2xl">Patio</h1>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="bestsellers" className="section-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">BestSellers</p>
            <h2 className="section-title">Pick Your Delicacy.</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {menuItems.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.06}>
                <motion.article whileHover={{ y: -10 }} className="menu-card">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-3xl font-bold">
                        {item.name}
                      </h3>
                      <span className="price-pill">{item.price}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-crema/68">
                      {item.ingredients}
                    </p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="menu" className="section-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Menu</p>
            <h2 className="section-title">Pick From Variaty Of Dishes</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {Menu.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <motion.article
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="feature-card"
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="feature-overlay">
                    <p className="eyebrow">Menu</p>
                    <h3 className="font-display text-4xl font-bold md:text-6xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-crema/72">{item.copy}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="location"
          className="section-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <Reveal className="map-panel">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,209,102,0.15),transparent),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_80px),repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0_1px,transparent_1px_80px)]" />
            <div className="relative z-10 rounded-full border border-saffron/30 bg-black/35 p-5 backdrop-blur-xl">
              <FaMapMarkerAlt className="text-4xl text-saffron" />
            </div>
          </Reveal>
          <Reveal delay={0.12} className="glass-panel p-7 md:p-10">
            <p className="eyebrow">Visit Us</p>
            <h2 className="font-display text-5xl font-bold">Lideta</h2>
            <div className="mt-8 space-y-5 text-crema/72">
              <p>Addis Abeba, In Front of Lideta Holy Water </p>
              <p>Monday-Friday: 7:00 AM-8:00 PM</p>
              <p>Saturday-Sunday: 8:00 AM-9:00 PM</p>
              <p>
                pickup, private tasting tables, and event delivery service
                available.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="contact-chip" href="tel:+251911117746">
                <FaPhoneAlt /> +251 91 111 7746
              </a>
              <a className="contact-chip" href="mailto:SuperJuice@gmail.com">
                <FiMail /> SuperJuice@gmail.com
              </a>
            </div>
          </Reveal>
        </section>

        <section className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Social Ritual</p>
            <h2 className="section-title">Follow the journey</h2>
          </Reveal>
          <Reveal delay={0.12} className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: FaInstagram, label: "Instagram", value: "@SuperJuice" },
              { icon: FaTiktok, label: "TikTok", value: "@SuperJuice" },
              { icon: FaFacebookF, label: "Facebook", value: "SuperJuice" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href="#top"
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="social-card"
                >
                  <Icon className="text-3xl text-saffron" />
                  <span className="mt-8 text-sm uppercase tracking-[0.24em] text-crema/45">
                    {social.label}
                  </span>
                  <strong className="mt-2 text-xl">{social.value}</strong>
                </motion.a>
              );
            })}
          </Reveal>
        </section>

        <section id="faq" className="section-shell max-w-5xl">
          <Reveal className="text-center">
            <p className="eyebrow justify-center">FAQ</p>
            <h2 className="section-title">Most Asked Questions</h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.04}>
                <button
                  className="faq-item"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="flex items-center justify-between gap-4 text-left">
                    <span className="font-display text-2xl font-bold">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                    >
                      <FiChevronDown />
                    </motion.span>
                  </span>
                  <AnimatePresence initial={false}>
                    {openFaq === index && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="block overflow-hidden"
                      >
                        <span className="block pt-4 text-left text-crema/68">
                          {faq.answer}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <footer className="px-5 pb-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 pt-8 text-sm text-crema/55 md:flex-row md:items-center md:justify-between">
            <p>SuperJuice. Premium juice landing page </p>
            <p>Made with ❤️ by Mickeyas Andualem</p>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default App;
