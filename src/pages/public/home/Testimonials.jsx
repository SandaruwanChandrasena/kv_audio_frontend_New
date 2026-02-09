import { useMemo, useState } from "react";
import Button from "../../../components/common/Button.jsx";
import { Link } from "react-router-dom";

const DATA = [
  {
    name: "Chalana",
    title: "Batch Party",
    quote: "Saved our batch party! The bass was insane and pickup was super easy.",
    rating: 5,
    tag: "Parties",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Nimali",
    title: "Seminar / Lecture",
    quote: "Clear sound and the mic was perfect. Setup guide helped a lot.",
    rating: 5,
    tag: "Meetings",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Sahan",
    title: "Live Music Night",
    quote: "Mixer and stands were in great condition. Smooth renting experience.",
    rating: 4,
    tag: "Live Music",
    avatar: "https://i.pravatar.cc/120?img=33",
  },
];

function Stars({ value = 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${value} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < value ? "text-amber-500" : "text-slate-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Avatar({ name, src }) {
  const [imgOk, setImgOk] = useState(true);

  const initials = getInitials(name);

  return (
    <div className="relative h-11 w-11 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
      {src && imgOk ? (
        <img
          src={src}
          alt={`${name} profile`}
          className="h-full w-full object-cover"
          onError={() => setImgOk(false)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-emerald-50 text-sm font-semibold text-emerald-700">
          {initials}
        </div>
      )}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={t.name} src={t.avatar} />

          <div>
            <div className="text-sm font-semibold text-slate-900">{t.name}</div>
            <div className="text-xs text-slate-500">{t.title}</div>
          </div>
        </div>

        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
          {t.tag}
        </span>
      </div>

      <div className="mt-3">
        <Stars value={t.rating} />
      </div>

      <p className="mt-3 flex-1 text-sm text-slate-600">“{t.quote}”</p>

      <div className="mt-4 text-xs text-slate-500">Verified renter</div>
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const max = DATA.length;
  const current = useMemo(() => DATA[index], [index]);

  const prevDisabled = index === 0;
  const nextDisabled = index === max - 1;

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(max - 1, i + 1));

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">What people say</h2>
          <p className="rounded-full border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700 px-2 py-1">
            Real feedback builds trust — especially for rentals.
          </p>
        </div>

        {/* Desktop controls */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={goPrev}
            disabled={prevDisabled}
            className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            onClick={goNext}
            disabled={nextDisabled}
            className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>

      {/* Desktop: show 3 cards */}
      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {DATA.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>

      {/* Mobile: simple slider */}
      <div className="md:hidden">
        <TestimonialCard t={current} />

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={prevDisabled}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
          >
            Prev
          </button>

          <div className="text-xs text-slate-500">
            {index + 1} / {max}
          </div>

          <button
            onClick={goNext}
            disabled={nextDisabled}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* CTA strip */}
      <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Ready to book your gear?
            </h3>
            <p className="mt-1 text-sm text-emerald-800/80">
              Browse products and rent in minutes — pickup is fast and simple.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/products">
              <Button className="w-full px-6 sm:w-auto">Browse Products</Button>
            </Link>

            <a href="tel:+94771234567" className="w-full sm:w-auto">
              <Button variant="ghost" className="w-full px-6">
                Call Now
              </Button>
            </a>

            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="ghost" className="w-full px-6">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
