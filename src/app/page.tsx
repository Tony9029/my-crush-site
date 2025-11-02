"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Heart,
  Flower2,
  CalendarDays,
  Clock,
  LockKeyhole,
  Sparkles,
  ArrowLeft,
  PartyPopper,
  Moon,
  SunMedium,
  BookOpenCheck,
  GraduationCap,
  NotebookPen,
} from "lucide-react";

/* ========= Types ========= */
type Topic = { label: string; emoji: string; letters: string[] };
type Topics = Record<string, Topic>;
type Events = Record<string, Record<number, string>>;
type Screen =
  | "lock"
  | "home"
  | "letter"
  | "love"
  | "event"
  | "study"
  | "uni"
  | "diary";

/* ========= Helpers ========= */
const cn = (...a: (string | false | null | undefined)[]) =>
  a.filter(Boolean).join(" ");
const START_DATE = new Date("2025-06-21T00:00:00"); // mốc đếm ngày yêu

function daysSinceStart(now = Date.now()) {
  return Math.floor((now - START_DATE.getTime()) / (1000 * 60 * 60 * 24));
}

/* ========= Theme ========= */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const saved =
      (localStorage.getItem("lovespace-theme") as "light" | "dark") ||
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(saved);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("lovespace-theme", theme);
  }, [theme, mounted]);
  return { theme, setTheme, mounted } as const;
}

/* ========= UI bits ========= */
const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "warning";
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}) => (
  <button
    aria-label={ariaLabel}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold shadow-sm transition focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300/60 disabled:opacity-60",
      variant === "primary" &&
        "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600",
      variant === "secondary" &&
        "bg-white/80 dark:bg-white/10 text-pink-700 dark:text-pink-100 border border-pink-200/60 dark:border-white/10 hover:bg-white",
      variant === "ghost" &&
        "bg-transparent text-pink-600 dark:text-pink-200 hover:bg-pink-50/60 dark:hover:bg-white/5",
      variant === "warning" && "bg-amber-400 text-white hover:bg-amber-500",
      className
    )}
  >
    {children}
  </button>
);

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ y: 12, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className={cn(
      "relative overflow-hidden rounded-3xl border border-pink-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-8",
      className
    )}
  >
    <div className="pointer-events-none absolute -inset-px rounded-[1.4rem] opacity-40 [background:conic-gradient(from_180deg_at_50%_50%,rgba(244,114,182,0.7),rgba(244,63,94,0.6),rgba(236,72,153,0.7),rgba(244,114,182,0.7))] blur-xl" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const BackgroundDecor = () => (
  <>
    <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_800px_at_50%_-10%,rgba(236,72,153,0.28),transparent_60%)] dark:[background:radial-gradient(1100px_700px_at_50%_-10%,rgba(244,114,182,0.18),transparent_60%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_40%,rgba(0,0,0,0.07))] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.25))]" />
    <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'110\\' height=\\'110\\' viewBox=\\'0 0 110 110\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.7\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\'/></svg>')]" />
  </>
);

/* ========= Effects ========= */
function FallingTulips({ enabled = true }: { enabled?: boolean }) {
  useReducedMotion(); // vẫn tương thích, không chặn
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const petals = useMemo(() => {
    if (!size.w) return [] as any[];
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      startX: Math.random() * size.w,
      drift1: (Math.random() > 0.5 ? 1 : -1) * (80 + Math.random() * 80),
      drift2: (Math.random() > 0.5 ? 1 : -1) * (140 + Math.random() * 120),
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 9,
      rotate: (Math.random() > 0.5 ? 1 : -1) * (240 + Math.random() * 240),
    }));
  }, [size.w]);

  if (!mounted || !enabled || !size.w) return null;

  return (
    <>
      {petals.map((p: any) => (
        <motion.div
          key={p.id}
          initial={{ x: p.startX, y: -120, rotate: 0, opacity: 0 }}
          animate={{
            x: [p.startX, p.startX + p.drift1, p.startX + p.drift2],
            y: size.h + 140,
            rotate: p.rotate,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-3xl md:text-4xl pointer-events-none select-none drop-shadow-sm"
        >
          🌷
        </motion.div>
      ))}
    </>
  );
}

function FloatingBokeh({ enabled = true }: { enabled?: boolean }) {
  useReducedMotion();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  if (!mounted || !enabled || !size.w) return null;
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        const s = 80 + Math.random() * 140;
        const x = Math.random() * size.w;
        const y = Math.random() * size.h;
        const dx = (Math.random() > 0.5 ? 1 : -1) * (120 + Math.random() * 120);
        const dy = (Math.random() > 0.5 ? 1 : -1) * (160 + Math.random() * 160);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-300/30 dark:bg-rose-300/20 blur-3xl"
            style={{ width: s, height: s }}
            initial={{ x, y, opacity: 0.35 }}
            animate={{ x: x + dx, y: y + dy, opacity: [0.25, 0.5, 0.25] }}
            transition={{
              duration: 22 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
}

/* ========= Tiny components ========= */
function TypewriterText({
  text,
  speed = 35,
}: {
  text: string;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const prefersReduced = useReducedMotion();
  useEffect(() => {
    const chars = Array.from(text || "");
    if (!chars.length) return setDisplayed("");
    if (prefersReduced) return setDisplayed(text);
    setDisplayed(chars[0]);
    let i = 1;
    const id = setInterval(() => {
      setDisplayed(chars.slice(0, i + 1).join(""));
      i++;
      if (i >= chars.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, prefersReduced]);
  return (
    <p className="text-gray-800 dark:text-gray-100 leading-relaxed mb-6 whitespace-pre-line italic">
      {displayed}
    </p>
  );
}

/* ========= Timer ========= */
function LoveTimer() {
  const [now, setNow] = useState<number>(0);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return null;
  const diff = now - START_DATE.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="text-5xl text-pink-500 drop-shadow-sm"
        aria-hidden
      >
        💖
      </motion.div>
      <div className="text-center text-pink-700 dark:text-pink-200 font-semibold text-lg md:text-xl">
        Mình đã thương Bé được {days} ngày {pad(hours)}:{pad(minutes)}:
        {pad(seconds)}
      </div>
    </div>
  );
}

/* ========= Study: Word of Day + Flashcards + Grammar ========= */
type Word = {
  word: string;
  phonetic?: string;
  meaningVi: string;
  example?: string;
};
type QuizQ = { q: string; choices: string[]; answer: number; explain?: string };

function useLocal<T>(key: string, init: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : init;
    } catch {
      return init;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState] as const;
}

function WordOfDay() {
  const [mounted, setMounted] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  useEffect(() => {
    setMounted(true);
    fetch("/words.json")
      .then((r) => r.json())
      .then(setWords);
  }, []);
  if (!mounted || words.length === 0) return null;
  const idx = daysSinceStart() % words.length;
  const w = words[idx];
  return (
    <div className="rounded-xl p-4 bg-white/80 dark:bg-white/10 border border-pink-200/60 dark:border-white/10">
      <div className="text-sm text-gray-500 mb-1">Word of the day</div>
      <div className="text-2xl font-bold text-pink-600 dark:text-pink-300">
        {w.word}{" "}
        <span className="text-base font-normal text-gray-500">
          {w.phonetic}
        </span>
      </div>
      <div className="text-gray-800 dark:text-gray-100">{w.meaningVi}</div>
      {w.example && (
        <div className="mt-1 text-gray-600 dark:text-gray-300 italic">
          “{w.example}”
        </div>
      )}
    </div>
  );
}

function Flashcards() {
  const [deck, setDeck] = useLocal<string[]>("deck-basic", []);
  const [words, setWords] = useState<Word[]>([]);
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    fetch("/words.json")
      .then((r) => r.json())
      .then((ws: Word[]) => {
        setWords(ws);
        if (deck.length === 0) setDeck(ws.slice(0, 50).map((w) => w.word)); // seed
      }); // eslint-disable-next-line
  }, []);
  if (words.length === 0 || deck.length === 0) return null;
  const cur = words.find((w) => w.word === deck[i % deck.length])!;
  return (
    <div className="rounded-xl p-4 bg-white/70 dark:bg-white/5 border border-pink-200/60 dark:border-white/10">
      <div className="text-sm mb-2 text-gray-500">Flashcards</div>
      <div
        onClick={() => setFlip((v) => !v)}
        className="cursor-pointer rounded-xl p-6 text-center bg-gradient-to-br from-pink-50 to-white dark:from-white/5 dark:to-white/10"
      >
        {!flip ? (
          <div className="text-2xl font-bold">{cur.word}</div>
        ) : (
          <div>
            <div className="font-semibold">{cur.meaningVi}</div>
            {cur.example && (
              <div className="text-sm italic mt-1 text-gray-600 dark:text-gray-300">
                “{cur.example}”
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <Button
          variant="secondary"
          onClick={() => {
            setFlip(false);
            setI((x) => (x - 1 + deck.length) % deck.length);
          }}
        >
          ← Trước
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setFlip(false);
            setI((x) => (x + 1) % deck.length);
          }}
        >
          Tiếp →
        </Button>
      </div>
    </div>
  );
}

function GrammarQuiz() {
  const [qs, setQs] = useState<QuizQ[]>([]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useLocal<number>("quiz-score", 0);
  useEffect(() => {
    fetch("/grammar.json")
      .then((r) => r.json())
      .then(setQs);
  }, []);
  if (qs.length === 0) return null;
  const q = qs[i];
  const next = () => {
    setPick(null);
    setI((x) => (x + 1) % qs.length);
  };
  const check = (idx: number) => {
    setPick(idx);
    if (idx === q.answer) setScore(score + 1);
  };
  return (
    <div className="rounded-xl p-4 bg-white/80 dark:bg-white/10 border border-pink-200/60 dark:border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500">Grammar quiz</div>
        <div className="text-sm">Điểm: {score}</div>
      </div>
      <div className="font-semibold mb-2">{q.q}</div>
      <div className="grid gap-2">
        {q.choices.map((c, idx) => (
          <button
            key={idx}
            onClick={() => check(idx)}
            className={cn(
              "text-left px-4 py-2 rounded-lg border transition",
              pick == null && "hover:bg-pink-50/70 dark:hover:bg-white/10",
              pick != null &&
                (idx === q.answer
                  ? "bg-green-500/20 border-green-500/40"
                  : idx === pick
                  ? "bg-red-500/20 border-red-500/40"
                  : "opacity-70"),
              "border-pink-200/60 dark:border-white/10"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      {pick != null && (
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {q.explain}
          </div>
          <Button variant="secondary" onClick={next}>
            Câu khác
          </Button>
        </div>
      )}
    </div>
  );
}

function StudyPanel({ onBack }: { onBack: () => void }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold">
          <BookOpenCheck className="size-5" /> Góc tiếng Anh
        </h2>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" /> Quay lại
        </Button>
      </div>
      <div className="grid gap-4">
        <WordOfDay />
        <Flashcards />
        <GrammarQuiz />
      </div>
    </Card>
  );
}

/* ========= University ========= */
type UniLink = { title: string; url: string; note?: string };
function UniversityPanel({ onBack }: { onBack: () => void }) {
  const [links, setLinks] = useState<{ essays: UniLink[]; tools: UniLink[] }>({
    essays: [],
    tools: [],
  });
  useEffect(() => {
    fetch("/resources.json")
      .then((r) => r.json())
      .then(setLinks);
  }, []);
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold">
          <GraduationCap className="size-5" /> Góc Đại học
        </h2>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" /> Quay lại
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl p-4 bg-white/80 dark:bg-white/10 border border-pink-200/60 dark:border-white/10">
          <div className="font-semibold mb-2">Bài luận mẫu / Outline</div>
          <ul className="space-y-2">
            {links.essays.map((l, i) => (
              <li key={i}>
                <a
                  href={l.url}
                  target="_blank"
                  className="text-pink-600 hover:underline"
                >
                  {l.title}
                </a>
                {l.note && (
                  <span className="text-sm text-gray-500"> — {l.note}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-4 bg-white/80 dark:bg-white/10 border border-pink-200/60 dark:border-white/10">
          <div className="font-semibold mb-2">Công cụ hỗ trợ</div>
          <ul className="space-y-2">
            {links.tools.map((l, i) => (
              <li key={i}>
                <a
                  href={l.url}
                  target="_blank"
                  className="text-pink-600 hover:underline"
                >
                  {l.title}
                </a>
                {l.note && (
                  <span className="text-sm text-gray-500"> — {l.note}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

/* ========= Diary ========= */
// ==== DiaryPanel (REPLACE) ====
type Entry = { day: number; text: string; ts: number };

// Nếu CHƯA có, thêm vào đầu file hoặc ngay trên component:
// const START_DATE = new Date("2025-06-21T00:00:00");
// const daysSinceStart = (now = Date.now()) => Math.floor((now - START_DATE.getTime()) / (1000*60*60*24));

function DiaryPanel({ onBack }: { onBack: () => void }) {
  const [now, setNow] = useState<number>(0);
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Mật khẩu: ưu tiên localStorage -> NEXT_PUBLIC_DIARY_PASS -> mặc định "7306"
  const [pass, setPass] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return (
      localStorage.getItem("diary-pass") ||
      (process.env.NEXT_PUBLIC_DIARY_PASS as string) ||
      "7306"
    );
  });
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("diary-pass", pass);
  }, [pass]);

  const day = daysSinceStart(now);

  const fetchEntries = async () => {
    const res = await fetch("/api/diary", { cache: "no-store" });
    const data: Entry[] = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    setNow(Date.now());
    (async () => {
      await fetchEntries();
      setLoading(false);
    })();

    // realtime SSE
    const es = new EventSource("/api/diary/stream");
    const onUpdate = () => fetchEntries();
    es.addEventListener("update", onUpdate);
    return () => {
      es.removeEventListener("update", onUpdate);
      es.close();
    };
  }, []);

  const save = async () => {
    const val = text.trim();
    if (!val) return;
    if (!pass) {
      alert("Nhập mật khẩu lưu trước đã nha!");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-pass": pass, // phải khớp DIARY_PASS=7306 ở server
        },
        body: JSON.stringify({ day, text: val }),
      });
      if (!res.ok) {
        alert("Sai mật khẩu hoặc lỗi máy chủ.");
        return;
      }
      setText("");
      // Không gọi fetchEntries(); SSE sẽ bắn 'update' tự động cho tất cả client
    } finally {
      setSaving(false);
    }
  };

  const todayEntry = entries.find((e) => e.day === day);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold">
          <NotebookPen className="size-5" /> Nhật ký 2000 ngày
        </h2>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" /> Quay lại
        </Button>
      </div>

      <div className="text-pink-700 dark:text-pink-200 font-semibold mb-3">
        Hôm nay là ngày thứ {day} anh yêu em 💘
      </div>

      {/* mật khẩu lưu (ẩn được nếu bạn set NEXT_PUBLIC_DIARY_PASS) */}
      <div className="mb-2 flex items-center gap-2">
        <label className="text-sm text-gray-500" htmlFor="diary-pass">
          Mật khẩu lưu:
        </label>
        <input
          id="diary-pass"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="7306"
          className="w-48 rounded-lg px-3 py-2 bg-white/90 dark:bg-white/5 border border-pink-200/60 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <div className="rounded-xl p-4 bg-white/80 dark:bg-white/10 border border-pink-200/60 dark:border-white/10">
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            todayEntry
              ? "Đã có nhật ký hôm nay, viết thêm ghi chú..."
              : "Viết gì đó cho Bé nè..."
          }
          className="w-full rounded-xl p-3 bg-white/90 dark:bg-white/5 border border-pink-200/60 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <div className="flex justify-end mt-2">
          <Button onClick={save} disabled={saving || !pass}>
            {saving ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <div className="font-semibold mb-2">Các ngày đã viết</div>
        {loading ? (
          <div className="text-sm text-gray-500">Đang tải...</div>
        ) : entries.length === 0 ? (
          <div className="text-sm text-gray-500">
            Chưa có dòng nào, bắt đầu hôm nay nhé!
          </div>
        ) : (
          <div className="grid gap-2">
            {entries.map((e, i) => (
              <div
                key={i}
                className="rounded-lg border border-pink-200/60 dark:border-white/10 p-3 bg-white/70 dark:bg-white/5"
              >
                <div className="text-sm text-gray-500">Ngày thứ {e.day}</div>
                <div className="whitespace-pre-wrap">{e.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

/* ========= Header ========= */
function Header({
  theme,
  setTheme,
  effectsEnabled,
  toggleEffects,
}: {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  effectsEnabled: boolean;
  toggleEffects: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 w-full max-w-3xl mx-auto px-4 pt-6">
      <div className="flex items-center gap-2 text-pink-600 dark:text-pink-300">
        <Flower2 className="size-6" />
        <span className="font-semibold">Góc nhỏ của Bé</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          ariaLabel="Bật tắt hiệu ứng"
          onClick={toggleEffects}
        >
          <Sparkles className="size-4" />
          <span className="hidden sm:inline">
            {effectsEnabled ? "Hiệu ứng: On" : "Hiệu ứng: Off"}
          </span>
        </Button>
        <Button
          variant="ghost"
          ariaLabel="Đổi giao diện"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <SunMedium className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
          <span className="hidden sm:inline">
            {theme === "dark" ? "Sáng" : "Tối"}
          </span>
        </Button>
      </div>
    </div>
  );
}

/* ========= Page ========= */
export default function Page() {
  const { theme, setTheme, mounted } = useTheme();

  const [effectsEnabled, setEffectsEnabled] = useState<boolean>(
    () => localStorage.getItem("lovespace-effects") !== "off"
  );
  useEffect(() => {
    localStorage.setItem("lovespace-effects", effectsEnabled ? "on" : "off");
  }, [effectsEnabled]);
  const toggleEffects = () => setEffectsEnabled((v) => !v);

  const [screen, setScreen] = useState<Screen>("lock");
  const [input, setInput] = useState("");
  const [topics, setTopics] = useState<Topics>({});
  const [events, setEvents] = useState<Events>({});
  const [topicKey, setTopicKey] = useState<string>("notgood");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    fetch("/letters.json")
      .then((r) => r.json())
      .then(setTopics);
    fetch("/events.json")
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  const topic = topics?.[topicKey];
  const unlock = () =>
    input === "7306" ? setScreen("home") : alert("Sai mật khẩu rồi Bé ơi 🌸");

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-[#0b0a0f] dark:via-[#111018] dark:to-[#0b0a10] text-gray-900 dark:text-white">
      <BackgroundDecor />
      {mounted && (
        <>
          <FloatingBokeh enabled={effectsEnabled} />
          <FallingTulips enabled={effectsEnabled} />
        </>
      )}

      <Header
        theme={theme}
        setTheme={setTheme}
        effectsEnabled={effectsEnabled}
        toggleEffects={toggleEffects}
      />

      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-10 md:py-16">
        <AnimatePresence mode="wait">
          {screen === "lock" && (
            <motion.div
              key="lock"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <div className="text-center space-y-3">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-pink-600 dark:text-pink-300">
                    Góc nhỏ anh giữ lại cho Bé
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    Những lời thương không kịp nói… giờ nằm ở đây.
                  </p>
                  <div className="mx-auto w-full max-w-md">
                    <div className="p-[2px] rounded-2xl bg-gradient-to-r from-pink-400 to-rose-500 shadow">
                      <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full text-center text-2xl px-5 py-4 rounded-[1rem] bg-white/95 dark:bg-white/10 text-gray-900 dark:text-white border-0 focus:outline-none focus:ring-4 focus:ring-pink-300 placeholder-pink-300"
                        placeholder="••••"
                        aria-label="Mật khẩu"
                      />
                    </div>
                  </div>
                  <Button onClick={unlock} className="mt-2" ariaLabel="Mở khóa">
                    <LockKeyhole className="size-4" /> Mở khóa
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {screen === "home" && topics && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <Card className="text-center">
                <h1 className="text-4xl md:text-5xl font-black text-pink-600 dark:text-pink-300 mb-4 flex items-center justify-center gap-3">
                  <Sparkles className="size-7" /> Gửi đến Bé{" "}
                  <Sparkles className="size-7" />
                </h1>

                <div className="mx-auto w-full max-w-md">
                  <select
                    className="w-full px-4 py-3 rounded-xl shadow bg-white/95 dark:bg-white/10 text-gray-800 dark:text-white font-medium border-2 border-pink-200/70 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
                    value={topicKey}
                    onChange={(e) => setTopicKey(e.target.value)}
                    aria-label="Chủ đề thư"
                  >
                    {Object.entries(topics).map(([k, t]) => (
                      <option
                        key={k}
                        value={k}
                        className="bg-white text-gray-900"
                      >
                        {t.emoji} {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    onClick={() => {
                      setIndex(0);
                      setScreen("letter");
                    }}
                  >
                    <Sparkles className="size-4" /> Đọc thư
                  </Button>
                  <Button variant="secondary" onClick={() => setScreen("love")}>
                    <Clock className="size-4" /> Đồng hồ yêu
                  </Button>
                  <Button variant="warning" onClick={() => setScreen("event")}>
                    <CalendarDays className="size-4" /> Sự kiện
                  </Button>
                  {/* 3 mục mới */}
                  <Button onClick={() => setScreen("study")}>
                    <BookOpenCheck className="size-4" /> Tiếng Anh
                  </Button>
                  <Button onClick={() => setScreen("uni")}>
                    <GraduationCap className="size-4" /> Đại học
                  </Button>
                  <Button onClick={() => setScreen("diary")}>
                    <NotebookPen className="size-4" /> Nhật ký
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {screen === "letter" && topics?.[topicKey] && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-100 flex items-center gap-2">
                    <span>{topics[topicKey].emoji}</span>{" "}
                    {topics[topicKey].label}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {index + 1}/{topics[topicKey].letters.length}
                  </span>
                </div>
                <TypewriterText text={topics[topicKey].letters[index]} />
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={() => setScreen("home")}>
                    <ArrowLeft className="size-4" /> Chủ đề khác
                  </Button>
                  <Button
                    onClick={() =>
                      setIndex((i) =>
                        Math.min(i + 1, topics[topicKey].letters.length - 1)
                      )
                    }
                    disabled={index >= topics[topicKey].letters.length - 1}
                  >
                    Lá thư kế tiếp →
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {screen === "love" && (
            <motion.div
              key="love"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
            >
              <Card>
                <LoveTimer />
                <div className="mt-6 text-center">
                  <Button variant="ghost" onClick={() => setScreen("home")}>
                    <ArrowLeft className="size-4" /> Quay lại
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {screen === "event" && (
            <motion.div
              key="event"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
            >
              <Card>
                <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-200 mb-3">
                  <CalendarDays className="size-5" />
                  <span className="font-semibold">Lời nhắn hôm nay</span>
                </div>
                {/* bạn giữ nguyên EventWishes cũ nếu muốn */}
                <div className="text-center">
                  Đang chờ dữ liệu từ <code>events.json</code> nè 💛
                </div>
                <div className="mt-6 text-center">
                  <Button variant="ghost" onClick={() => setScreen("home")}>
                    <ArrowLeft className="size-4" /> Quay lại
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {screen === "study" && (
            <StudyPanel onBack={() => setScreen("home")} />
          )}

          {screen === "uni" && (
            <UniversityPanel onBack={() => setScreen("home")} />
          )}

          {screen === "diary" && (
            <DiaryPanel onBack={() => setScreen("home")} />
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 px-4 pb-8 w-full max-w-3xl mx-auto text-center text-xs text-gray-500 dark:text-gray-400">
        <div className="inline-flex items-center gap-1">
          <Heart className="size-3 text-pink-500" />
          <span>Made with love for Bé</span>
          <PartyPopper className="size-3 text-amber-500" />
        </div>
      </footer>
    </div>
  );
}
