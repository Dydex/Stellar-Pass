import { useState, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";

/* ================================================================
   Create Event — Figma Screen 2
   Features: TopNavBar, Form (3 sections), Live Preview Card
   ================================================================ */

export default function CreateEventPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    price: "",
    supply: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Format the date for the preview card
  const previewDate = useMemo(() => {
    if (!form.date) return "Oct 24, 2026 • 14:00 UTC";
    const d = new Date(form.date + "T" + (form.time || "00:00"));
    return (
      d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      " • " +
      (form.time || "00:00") +
      " UTC"
    );
  }, [form.date, form.time]);

  return (
    <>
      <Head>
        <title>Create Event - EventMesh Protocol</title>
      </Head>

      {/* ── TopNavBar ── */}
      <header className="bg-white/5 dark:bg-slate-950/50 backdrop-blur-lg fixed top-0 w-full border-b border-white/10 shadow-sm flex justify-between items-center px-6 py-3 z-50">
        <div className="flex items-center gap-[48px]">
          <Link
            href="/events"
            className="text-xl font-bold tracking-tight text-white"
          >
            EventMesh
          </Link>
          <nav className="hidden md:flex items-center gap-[24px]">
            <Link
              href="/events"
              className="text-slate-400 hover:text-indigo-500 text-body-sm hover:bg-white/10 transition-colors duration-200 px-[8px] py-[4px] rounded"
            >
              Explore
            </Link>
            <Link
              href="/create"
              className="text-indigo-400 border-b-2 border-indigo-500 pb-1 text-body-sm opacity-80 scale-95 transition-all"
            >
              Create
            </Link>
            <Link
              href="/vendors"
              className="text-slate-400 hover:text-indigo-500 text-body-sm hover:bg-white/10 transition-colors duration-200 px-[8px] py-[4px] rounded"
            >
              Vendors
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-400 hover:text-indigo-500 text-body-sm hover:bg-white/10 transition-colors duration-200 px-[8px] py-[4px] rounded"
            >
              Activity
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-[16px]">
          <button className="bg-surface-container-high border border-outline-variant text-on-surface text-body-sm px-[16px] py-[8px] rounded-full flex items-center gap-[8px] hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-[18px]">
              account_balance_wallet
            </span>
            Connect Wallet
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-secondary/40" />
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-grow mt-[72px] w-full max-w-[1280px] mx-auto px-[24px] py-[48px]">
        {/* Page header */}
        <div className="mb-[24px]">
          <h1 className="text-h1 text-on-background mb-[4px]">Create Event</h1>
          <p className="text-body-md text-on-surface-variant">
            Configure your institutional-grade event parameters and generate NFT
            ticketing infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px]">
          {/* ── Form Area (Left Column) ── */}
          <div className="lg:col-span-8 flex flex-col gap-[24px]">
            {/* Section: Event Details */}
            <section className="bg-surface-container border border-outline-variant rounded-xl p-[24px]">
              <h2 className="text-h2 text-on-surface mb-[16px] flex items-center gap-[8px]">
                <span className="material-symbols-outlined text-primary">
                  info
                </span>
                Event Details
              </h2>
              <div className="flex flex-col gap-[16px]">
                {/* Event Name */}
                <div>
                  <label className="block text-body-sm text-on-surface-variant mb-[4px]">
                    Event Name
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-[16px] py-[8px] text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="e.g., Global Web3 Summit 2026"
                    type="text"
                    id="event-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>
                {/* Description */}
                <div>
                  <label className="block text-body-sm text-on-surface-variant mb-[4px]">
                    Description
                  </label>
                  <textarea
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-[16px] py-[8px] text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Describe the core focus and audience of this event..."
                    rows={4}
                    id="event-description"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                  />
                </div>
                {/* Date / Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                  <div>
                    <label className="block text-body-sm text-on-surface-variant mb-[4px]">
                      Date
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-on-surface-variant">
                        calendar_today
                      </span>
                      <input
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-[44px] pr-[16px] py-[8px] text-body-md text-on-surface focus:outline-none focus:border-primary transition-all [color-scheme:dark]"
                        type="date"
                        id="event-date"
                        value={form.date}
                        onChange={(e) => update("date", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-body-sm text-on-surface-variant mb-[4px]">
                      Time (UTC)
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-on-surface-variant">
                        schedule
                      </span>
                      <input
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-[44px] pr-[16px] py-[8px] text-body-md text-on-surface focus:outline-none focus:border-primary transition-all [color-scheme:dark]"
                        type="time"
                        id="event-time"
                        value={form.time}
                        onChange={(e) => update("time", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Gate Fee */}
            <section className="bg-surface-container border border-outline-variant rounded-xl p-[24px]">
              <h2 className="text-h2 text-on-surface mb-[16px] flex items-center gap-[8px]">
                <span className="material-symbols-outlined text-primary">
                  payments
                </span>
                Gate Fee Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                {/* Currency */}
                <div>
                  <label className="block text-body-sm text-on-surface-variant mb-[4px]">
                    Settlement Currency
                  </label>
                  <div className="grid gap-[8px]">
                    <button className="bg-primary/10 border border-primary text-primary rounded-lg py-[8px] text-label-caps transition-colors w-full">
                      USDC
                    </button>
                  </div>
                </div>
                {/* Price */}
                <div>
                  <label className="block text-body-sm text-on-surface-variant mb-[4px]">
                    Ticket Price
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-[16px] text-mono text-on-surface-variant">
                      $
                    </span>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-[36px] pr-[60px] py-[8px] text-mono text-on-surface focus:outline-none focus:border-primary transition-all"
                      placeholder="50.00"
                      step="0.01"
                      type="number"
                      id="event-price"
                      value={form.price}
                      onChange={(e) => update("price", e.target.value)}
                    />
                    <span className="absolute right-[16px] text-label-caps text-on-surface-variant uppercase">
                      USDC
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: NFT Ticketing */}
            <section className="bg-surface-container border border-outline-variant rounded-xl p-[24px]">
              <div className="flex justify-between items-start mb-[16px]">
                <h2 className="text-h2 text-on-surface flex items-center gap-[8px]">
                  <span className="material-symbols-outlined text-primary">
                    token
                  </span>
                  NFT Ticketing Assets
                </h2>
                <div className="px-[8px] py-[4px] bg-secondary/10 border border-secondary/20 rounded text-secondary text-label-caps">
                  ERC-721 Standard
                </div>
              </div>
              <div className="flex flex-col gap-[24px]">
                {/* Upload */}
                <div>
                  <label className="block text-body-sm text-on-surface-variant mb-[4px]">
                    Artwork Upload
                  </label>
                  <div className="border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest hover:bg-surface-container-high hover:border-primary transition-all cursor-pointer p-[48px] flex flex-col items-center justify-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-[16px] group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-on-surface">
                        upload_file
                      </span>
                    </div>
                    <p className="text-body-md text-on-surface mb-[4px]">
                      Drag and drop your media
                    </p>
                    <p className="text-body-sm text-on-surface-variant">
                      Supports JPG, PNG, GIF, MP4 (Max 50MB)
                    </p>
                  </div>
                </div>
                {/* Supply */}
                <div>
                  <label className="block text-body-sm text-on-surface-variant mb-[4px]">
                    Total Supply (Max Attendees)
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-on-surface-variant">
                      group
                    </span>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-[44px] pr-[16px] py-[8px] text-mono text-on-surface focus:outline-none focus:border-primary transition-all"
                      placeholder="1000"
                      type="number"
                      id="event-supply"
                      value={form.supply}
                      onChange={(e) => update("supply", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex items-center justify-end gap-[16px] pt-[16px]">
              <button className="text-body-md text-primary hover:text-primary-fixed px-[24px] py-[8px] transition-colors">
                Discard
              </button>
              <button
                className="bg-primary text-on-primary text-body-md font-medium px-[48px] py-[8px] rounded-lg hover:bg-primary-fixed-dim transition-all flex items-center gap-[8px] shadow-[0_0_15px_rgba(192,193,255,0.2)]"
                id="create-event-submit"
              >
                <span className="material-symbols-outlined icon-fill text-[20px]">
                  rocket_launch
                </span>
                Create Event
              </button>
            </div>
          </div>

          {/* ── Preview Area (Right Column) ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-[104px]">
              <h3 className="text-label-caps text-on-surface-variant uppercase mb-[16px] tracking-widest">
                Live Preview
              </h3>
              {/* Glassmorphic Event Card */}
              <div className="bg-surface-container-highest/40 backdrop-blur-xl border border-outline-variant rounded-xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                {/* Image container */}
                <div className="relative h-48 w-full bg-surface-variant">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Event Cover Artwork"
                    className="w-full h-full object-cover opacity-80"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVaXY4bTr7VYNy73iLWC3jzdTgdl2Kj9LNjERkUtMyAitQfzQqNGyu25hslWnmUTmYJcVCxyTjxRVsapmSHeaf2hVtHMG10Ov45QsEW0R6VP69L7OFOMGgnJHrLLnSkqFoh-3qEzHyRcIV6OTnyC8GIFnlh5ygAGmJhrRsCl9EN8CJKi6BKP1Uc1CtF9BKiCynkfX_fRrzW81sqLeW64FdmGN3Yra4aXE93LytkY0oXCoic_yUGJdGSBeiL5znxD4uTWQfl-0Qp4Y"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest/90 to-transparent" />
                  {/* Badge */}
                  <div className="absolute top-[16px] left-[16px] flex gap-[8px]">
                    <span className="bg-surface-container/80 backdrop-blur-md border border-outline-variant text-on-surface text-label-caps px-[8px] py-[4px] rounded flex items-center gap-[4px]">
                      <span className="material-symbols-outlined text-[14px] text-secondary">
                        radio_button_checked
                      </span>
                      Upcoming
                    </span>
                  </div>
                </div>
                {/* Card content */}
                <div className="p-[24px]">
                  <h4 className="text-h2 text-on-surface mb-[4px] truncate">
                    {form.name || "Global Web3 Summit 2026"}
                  </h4>
                  <div className="flex items-center gap-[8px] mb-[24px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">
                      calendar_month
                    </span>
                    <span className="text-body-sm">{previewDate}</span>
                  </div>
                  <div className="flex justify-between items-end border-t border-outline-variant pt-[16px]">
                    <div>
                      <p className="text-label-caps text-on-surface-variant mb-[4px] uppercase">
                        Mint Price
                      </p>
                      <div className="flex items-baseline gap-[4px]">
                        <span className="text-mono text-on-surface">
                          {form.price || "0.05"}
                        </span>
                        <span className="text-label-caps text-primary">
                          USDC
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-label-caps text-on-surface-variant mb-[4px] uppercase">
                        Available
                      </p>
                      <p className="text-mono text-on-surface">
                        -- / {form.supply || "1000"}
                      </p>
                    </div>
                  </div>
                  <button className="w-full mt-[24px] bg-surface-variant border border-outline-variant text-on-surface-variant text-body-md py-[8px] rounded-lg cursor-not-allowed opacity-50 flex justify-center items-center gap-[8px]">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                    Preview Mode
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
