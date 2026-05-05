import Link from "next/link";

/* ================================================================
   Explore Events — Figma Screen 1
   Features: TopNavBar, SideNavBar, Hero, Filter Bar, Event Grid, Footer
   ================================================================ */

const EVENTS = [
  {
    title: "Neon Nights Festival",
    location: "San Francisco",
    description: "Experience the pulse of electronic music under the stars with world-class DJs and immersive light shows.",
    attending: 142,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGaSYXnnhcZv-Y2BxFFautJVcUNdJSy4laQsqLg2dGeSckuk9rFEt__1MQOWFQburNHkuquu_e2TzTQjEGgqU-26t89kX-M46MjJ2Jq4Zl2SQcSCjpi6FfHbhRnVrBpP13jYpBnbNngM6tYtG1umPo9dgMUtoaSWY_nQ6ogSlMLGCJH1B8-v9Kqliy6Cyxh3hBX6H6M-7CHK5VnuLf5Jtug6Q3IooEQM871_64SlOFnfA7EIyDwmY47eTdHLX183iqdZp0oMeGZFI",
  },
  {
    title: "DeFi Innovators Summit",
    location: "Lagos",
    description: "Join industry leaders for deep dives into decentralized finance, protocol security, and liquidity mining strategies.",
    attending: 87,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUrTkLhiG71MnZBeTXNpubu9Ht4OGMy_X4FU7DlmlX6TShElBJ8z0i-tASWuaLoe79MrZWxD4lFMtBhPVAYa7lQz1QszmXpdwZIrymCcQEuhaPEO4xd84FHWz5lXMWyNQqWX4mvaeQlwAa2JqnNivclhQVIr-EX_m8NQ1lL_QRRmQOcwvvcmgR742GJgD0Wd1xZpHSZLdnI7GA_MJwwA-q-TFStHq1Ef_K8sZVRYxrgIZgu5iHgjTitFGKDe_7L_Wt8Yzs1pn6tH8",
  },
  {
    title: "Digital Renaissance Gallery",
    location: "Berlin",
    description: "Exploring the intersection of classical art techniques and generative AI in the heart of Europe's creative hub.",
    attending: 534,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9VAQ0tlpxndubROib8yLPSiejDNYbSMTV5uLjb539m99dAC_F3Ik34ZB93Iyid067b32pkvdqO0oW_1Hh4-d8moYPYLq3-dwK-_wRfE5qh5-SoxR6RUoBVt8DE54uQXoaBbz97bQapnnOieFJjzxl7oVLRFvxuxRjpP6e6IXq86leAweMWUX3z8_6QCLnlguD81i_eKK7lm7nnGuAJfIaMaI50y6whVJugRCuLI_SsCCUIlBvAJoslGoxGZAbh9loALHX3L02WFw",
  },
];

const FILTERS = ["All Events", "Music", "Tech", "Art", "Food"];

const SIDE_NAV = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "confirmation_number", label: "My Tickets", href: "/dashboard" },
  { icon: "account_balance_wallet", label: "Wallet", href: "/dashboard" },
  { icon: "settings", label: "Settings", href: "#" },
];

export default function ExplorePage() {
  return (
    <>
      {/* ── TopNavBar ── */}
      <header className="fixed top-0 w-full border-b border-white/10 bg-white/5 dark:bg-slate-950/50 backdrop-blur-lg shadow-sm z-50 flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-white text-h2">
            EventMesh
          </Link>
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-body-sm" style={{ fontSize: "18px" }}>
              search
            </span>
            <input
              className="bg-surface-container-highest border border-white/10 rounded-full py-2 pl-10 pr-4 text-on-surface text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-colors"
              placeholder="Search events..."
              type="text"
              id="explore-search"
            />
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/events" className="text-indigo-400 border-b-2 border-indigo-500 pb-1 text-body-md transition-all">Explore</Link>
          <Link href="/create" className="text-slate-400 hover:text-indigo-500 text-body-md hover:bg-white/10 transition-colors duration-200 px-2 py-1 rounded">Create</Link>
          <Link href="/vendors" className="text-slate-400 hover:text-indigo-500 text-body-md hover:bg-white/10 transition-colors duration-200 px-2 py-1 rounded">Vendors</Link>
          <Link href="/dashboard" className="text-slate-400 hover:text-indigo-500 text-body-md hover:bg-white/10 transition-colors duration-200 px-2 py-1 rounded">Activity</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-on-primary text-body-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 border border-primary/50">
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>account_balance_wallet</span>
            Connect Wallet
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-variant border border-white/10 hidden md:block overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-secondary/40" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* ── SideNavBar ── */}
        <aside className="hidden lg:flex flex-col h-screen w-64 border-r border-white/5 bg-slate-900/80 backdrop-blur-md sticky left-0 top-0 pt-20 px-4">
          <div className="mb-8 px-4">
            <div className="text-lg font-bold text-indigo-500 text-h2 mb-1">Event Manager</div>
            <div className="text-slate-500 text-xs text-body-sm">Institutional Grade</div>
          </div>
          <nav className="flex-1 space-y-2">
            {SIDE_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-slate-400 px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-body-md"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto mb-6 px-4">
            <Link
              href="/dashboard/organizer"
              className="w-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 py-2 rounded-lg text-body-sm font-medium hover:bg-indigo-500/20 transition-colors flex justify-center items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              New Event
            </Link>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          {/* Hero Section */}
          <section className="mb-12 relative rounded-2xl overflow-hidden border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Featured Event"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBl-vxP370UuJUy7JZwhtapqBwehyc4UCZpycyCHHG-1Skryqq6TWLpdhamFWzpYre_nWoV_ITq3eT_D5RC3XnmeYa-erQ7mHRVarxCJlMcSPbMaFt_5iWwtdMuSBws5DOxGVOeV8hd9JtUcqAIJAguTuoZs0bBQwPXkmdYyOOU2ng6KQvqGGhmFXleXdEbS4QqX_JOt_1S9TqlthOy0oIEGTBkfbmWdS0VHEHqoZr7Deq5ze48w7eyloM5MaOBJghCdiMnLexgL0"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 bg-primary-container/20 text-primary border border-primary/30 rounded-full text-label-caps mb-4 backdrop-blur-md">
                  FEATURED EVENT
                </span>
                <h1 className="text-display text-white mb-2">Web3 Builders Conference</h1>
                <p className="text-body-lg text-on-surface-variant max-w-2xl">
                  The premier gathering of developers, founders, and investors shaping the decentralized future. Join us for 3 days of intensive workshops and networking.
                </p>
              </div>
              <button className="bg-primary text-on-primary text-body-md px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity whitespace-nowrap border border-primary/50 shadow-[0_0_15px_rgba(192,193,255,0.3)]">
                Get Tickets Now
              </button>
            </div>
          </section>

          {/* Filter Bar */}
          <section className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  className={`px-4 py-2 rounded-full text-body-sm whitespace-nowrap transition-colors ${
                    i === 0
                      ? "bg-surface-container-highest border border-white/10 text-on-surface"
                      : "bg-surface border border-white/5 text-on-surface-variant hover:bg-surface-bright"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-white/10 rounded-lg text-on-surface-variant text-body-sm hover:bg-surface-bright transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>sort</span>
                Sort by Date
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-white/10 rounded-lg text-on-surface-variant text-body-sm hover:bg-surface-bright transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>filter_list</span>
                Filters
              </button>
            </div>
          </section>

          {/* Event Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {EVENTS.map((event) => (
              <Link
                key={event.title}
                href={`/events/${EVENTS.indexOf(event)}`}
                className="bg-surface-container border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 group flex flex-col h-full no-underline text-inherit"
              >
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={event.image}
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white text-body-sm text-[12px]">
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>location_on</span>
                    {event.location}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-h2 text-on-surface mb-3">{event.title}</h3>
                  <p className="text-on-surface-variant text-body-sm line-clamp-3 mb-6">
                    {event.description}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 text-on-surface-variant text-[12px]">
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>group</span>
                      {event.attending} attending
                    </div>
                    <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-primary text-label-caps text-[10px] tracking-wider">
                      NFT PASS
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-white/5 bg-slate-950 py-8 px-6 flex flex-col md:flex-row justify-between items-center mt-auto">
        <div className="font-bold text-white text-body-md mb-4 md:mb-0">EventMesh Protocol</div>
        <div className="text-xs font-light text-slate-500 text-body-sm mb-4 md:mb-0">© 2026 EventMesh Protocol. Built for the Decentralized Web.</div>
        <div className="flex gap-4">
          {["Terms", "Privacy", "Docs", "Support"].map((link) => (
            <a key={link} className="text-slate-500 hover:text-slate-300 text-body-sm hover:underline" href="#">
              {link}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
