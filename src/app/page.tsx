"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flower2,
  CalendarDays,
  Clock,
  LockKeyhole,
  Sparkles,
  ArrowLeft,
  BookOpenCheck,
  GraduationCap,
  Headphones,
  BookA,
  School,
  Heart,
  Sun,
  Moon,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

/* ========= Types ========= */
type Topic = { label: string; emoji: string; letters: string[] };
type Topics = Record<string, Topic>;
type Events = Record<string, Record<string, Record<string, string>>>;
// 👇 Đã thêm "test" vào danh sách màn hình
type Screen =
  | "lock"
  | "home"
  | "letter"
  | "love"
  | "event"
  | "study"
  | "uni"
  | "test";
type Theme = "light" | "dark";

/* ========= Helpers ========= */
const cn = (...a: (string | false | null | undefined)[]) =>
  a.filter(Boolean).join(" ");
const START_DATE = new Date("2025-06-21T00:00:00");

/* ========= UI Components ========= */
const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
  disabled,
}: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold shadow-sm transition-all active:scale-95",
      variant === "primary" &&
        "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-pink-500/30 hover:-translate-y-0.5 dark:from-pink-600 dark:to-rose-600",
      variant === "secondary" &&
        "bg-white/80 dark:bg-white/10 text-rose-600 dark:text-pink-300 border border-rose-100 dark:border-white/10 hover:bg-white dark:hover:bg-white/20",
      variant === "ghost" &&
        "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-rose-500 dark:hover:text-pink-300",
      variant === "outline" &&
        "bg-white dark:bg-transparent border-2 border-pink-100 dark:border-pink-800 text-pink-600 dark:text-pink-400 hover:border-pink-300 dark:hover:border-pink-600",
      variant === "warning" && "bg-amber-400 text-white hover:bg-amber-500",
      className
    )}
  >
    {children}
  </button>
);

const Card = ({ children, className }: any) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ opacity: 0 }}
    className={cn(
      "relative overflow-hidden rounded-3xl backdrop-blur-xl p-6 md:p-8 transition-colors duration-500",
      "bg-white/70 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
      "dark:bg-gray-900/60 dark:border-white/10 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]",
      className
    )}
  >
    <div className="relative z-10">{children}</div>
  </motion.div>
);

/* ========= STUDY COMPONENTS ========= */
type Word = {
  word: string;
  phonetic?: string;
  meaningVi: string;
  example?: string;
  category?: string;
};

function VocabularyView() {
  const [words, setWords] = useState<Word[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    fetch("/words.json")
      .then((r) => r.json())
      .then(setWords)
      .catch((e) => console.error("Lỗi tải từ vựng:", e));
  }, []);

  const filteredWords = useMemo(() => {
    if (filter === "all") return words;
    if (filter === "toeic")
      return words.filter((w) => w.category?.startsWith("toeic"));
    if (filter === "phrasal")
      return words.filter((w) => w.category === "phrasal-verbs");
    return words;
  }, [words, filter]);

  const currentCard = filteredWords[index % filteredWords.length];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 pb-2 overflow-x-auto justify-center">
        {[
          { id: "all", label: "Tất cả" },
          { id: "toeic", label: "TOEIC" },
          { id: "phrasal", label: "Cụm động từ" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setFilter(f.id);
              setIndex(0);
              setFlip(false);
            }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
              filter === f.id
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {currentCard ? (
        <div className="relative h-72 w-full [perspective:1000px] group mx-auto max-w-md">
          <div
            onClick={() => setFlip(!flip)}
            className={cn(
              "w-full h-full relative [transform-style:preserve-3d] transition-all duration-500 cursor-pointer shadow-xl rounded-3xl",
              flip ? "[transform:rotateY(180deg)]" : ""
            )}
          >
            <div className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-gray-800 border-2 border-pink-50 dark:border-gray-700 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
              <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                {currentCard.category
                  ?.replace("toeic-", "TOEIC ")
                  .replace("-", " ") || "Từ vựng"}
              </span>
              <div className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
                {currentCard.word}
              </div>
              <div className="text-gray-400 dark:text-gray-500 font-mono text-lg">
                {currentCard.phonetic}
              </div>
              <div className="absolute bottom-4 text-xs text-gray-300 dark:text-gray-600 font-medium animate-pulse">
                Chạm để lật thẻ
              </div>
            </div>
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-rose-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 border-2 border-pink-200 dark:border-pink-900 rounded-3xl flex flex-col items-center justify-center text-center p-6">
              <div className="text-2xl font-bold text-rose-600 dark:text-pink-400 mb-3">
                {currentCard.meaningVi}
              </div>
              {currentCard.example && (
                <div className="text-gray-600 dark:text-gray-300 italic font-medium leading-relaxed">
                  "{currentCard.example}"
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          Đang tải dữ liệu...
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Button
          variant="secondary"
          onClick={() => {
            setFlip(false);
            setIndex(
              (i) => (i - 1 + filteredWords.length) % filteredWords.length
            );
          }}
        >
          ← Trước
        </Button>
        <Button
          onClick={() => {
            setFlip(false);
            setIndex((i) => (i + 1) % filteredWords.length);
          }}
        >
          Tiếp theo →
        </Button>
      </div>
      <div className="text-center text-xs text-gray-400 mt-2">
        {filteredWords.length > 0
          ? `${(index % filteredWords.length) + 1} / ${filteredWords.length}`
          : ""}
      </div>
    </div>
  );
}

// GRAMMAR VIEW
type GrammarLesson = { id: string; title: string; theory: string; quiz: any[] };
function GrammarView() {
  const [lessons, setLessons] = useState<GrammarLesson[]>([]);
  const [sel, setSel] = useState<GrammarLesson | null>(null);
  const [qIdx, setQIdx] = useState(0);

  useEffect(() => {
    fetch("/grammar.json")
      .then((r) => r.json())
      .then(setLessons)
      .catch(() => {});
  }, []);

  if (!sel)
    return (
      <div className="space-y-3">
        <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">
          Danh sách bài học
        </h3>
        <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-200 dark:scrollbar-thumb-pink-900">
          {lessons.map((l) => (
            <button
              key={l.id}
              onClick={() => setSel(l)}
              className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-md transition text-left group"
            >
              <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition">
                {l.title}
              </span>
              <ArrowLeft className="rotate-180 size-4 text-gray-300 group-hover:text-pink-400" />
            </button>
          ))}
        </div>
      </div>
    );

  const q = sel.quiz[qIdx];
  return (
    <div className="animate-in fade-in slide-in-from-right-8">
      <button
        onClick={() => {
          setSel(null);
          setQIdx(0);
        }}
        className="mb-4 text-sm text-gray-500 hover:text-pink-600 flex items-center gap-1 font-medium"
      >
        ← Quay lại danh sách
      </button>
      <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-3xl border border-amber-100 dark:border-amber-800/30 mb-6 shadow-sm">
        <h3 className="font-bold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
          <BookA size={18} /> Lý thuyết
        </h3>
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed font-medium">
          {sel.theory}
        </div>
      </div>
      <div className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
        <h3 className="font-bold text-pink-500 mb-4">
          ✍️ Câu hỏi ({qIdx + 1}/{sel.quiz.length})
        </h3>
        <div className="font-semibold text-gray-800 dark:text-white mb-4 text-lg">
          {q.q}
        </div>
        <div className="grid gap-2">
          {q.choices.map((c: string, i: number) => (
            <button
              key={i}
              onClick={() => {
                if (i === q.answer) {
                  alert("Chính xác! 🎉\n" + (q.explain || ""));
                  if (qIdx < sel.quiz.length - 1) setQIdx((n) => n + 1);
                  else alert("Hoàn thành bài học! ❤️");
                } else alert("Sai rồi bé ơi 😢\n" + (q.explain || ""));
              }}
              className="p-3 rounded-xl border-2 border-gray-50 dark:border-white/5 hover:border-pink-200 dark:hover:border-pink-700 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-left text-gray-600 dark:text-gray-300 hover:text-pink-700 dark:hover:text-pink-300 font-medium transition"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// LISTENING VIEW
function ListeningView() {
  const [sources, setSources] = useState<any[]>([]);
  useEffect(() => {
    fetch("/listening.json")
      .then((r) => r.json())
      .then(setSources)
      .catch(() => {});
  }, []);
  return (
    <div className="grid gap-3">
      {sources.map((s, i) => (
        <a
          key={i}
          href={s.url}
          target="_blank"
          className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-lg transition group"
        >
          <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-full text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition">
            <Headphones size={20} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition">
              {s.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ========= PANELS ========= */

// 👇 TEST PANEL (MỚI THÊM VÀO)
function TestPanel({ onBack }: any) {
  const [tests, setTests] = useState<any[]>([]);
  const [currentTest, setCurrentTest] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [advice, setAdvice] = useState<string[]>([]);

  useEffect(() => {
    fetch("/tests.json")
      .then((r) => r.json())
      .then(setTests)
      .catch(() => {});
  }, []);

  const handleSubmit = () => {
    let correctCount = 0;
    let mistakes = { grammar: 0, vocab: 0, reading: 0 };

    currentTest.questions.forEach((q: any, index: number) => {
      if (answers[index] === q.correct) {
        correctCount++;
      } else {
        if (q.type === "grammar") mistakes.grammar++;
        if (q.type === "vocab") mistakes.vocab++;
        if (q.type === "reading") mistakes.reading++;
      }
    });

    const finalScore = Math.round(
      (correctCount / currentTest.questions.length) * 100
    );
    setScore(finalScore);

    const newAdvice = [];
    if (finalScore === 100) {
      newAdvice.push("Wow! Bé giỏi quá! 100 điểm tuyệt đối! 💖");
    } else {
      if (mistakes.grammar > 0)
        newAdvice.push(
          `⚠️ Bé sai ${mistakes.grammar} câu Ngữ pháp: Cần ôn lại các thì và cấu trúc câu nha.`
        );
      if (mistakes.vocab > 0)
        newAdvice.push(
          `⚠️ Bé sai ${mistakes.vocab} câu Từ vựng: Chăm chỉ lật Flashcard hơn nhé.`
        );
      if (finalScore < 50)
        newAdvice.push(
          "😭 Điểm hơi thấp xíu, nhưng không sao, anh sẽ kèm bé học thêm!"
        );
      else
        newAdvice.push(
          "🎉 Kết quả khá tốt, cố gắng thêm xíu nữa là điểm 10 nha!"
        );
    }
    setAdvice(newAdvice);
    setSubmitted(true);
  };

  if (!currentTest)
    return (
      <Card className="min-h-[600px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <span className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg text-pink-500">
              <BookOpenCheck />
            </span>{" "}
            Thi thử TOEIC
          </h2>
          <Button variant="ghost" onClick={onBack}>
            Thoát
          </Button>
        </div>
        <div className="grid gap-4">
          {tests.map((t) => (
            <button
              key={t.id}
              onClick={() => setCurrentTest(t)}
              className="p-6 rounded-2xl bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 hover:border-pink-400 hover:shadow-lg transition text-left group"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-pink-500 mb-2">
                {t.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                ⏳ Thời gian: {t.duration} phút • 📝 {t.questions?.length || 0}{" "}
                câu hỏi
              </p>
            </button>
          ))}
        </div>
      </Card>
    );

  return (
    <Card className="min-h-[600px] max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-4 border-b border-gray-100 dark:border-gray-800 mb-6 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 dark:text-white truncate max-w-[200px]">
          {currentTest.title}
        </h3>
        {submitted ? (
          <div className="px-4 py-1 bg-pink-500 text-white rounded-full font-bold">
            Điểm: {score}/100
          </div>
        ) : (
          <Button onClick={handleSubmit} className="py-1 px-6 text-sm">
            Nộp bài
          </Button>
        )}
      </div>

      {submitted && (
        <div className="mb-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800 animate-in slide-in-from-top-4">
          <h4 className="font-bold text-indigo-600 dark:text-indigo-300 mb-3 text-lg">
            💡 Trợ lý học tập nhận xét:
          </h4>
          <ul className="space-y-2">
            {advice.map((line, i) => (
              <li
                key={i}
                className="text-gray-700 dark:text-gray-300 font-medium text-sm"
              >
                • {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-8 pb-10">
        {currentTest.questions.map((q: any, idx: number) => (
          <div
            key={idx}
            className={cn(
              "p-4 rounded-2xl border-2 transition",
              submitted
                ? answers[idx] === q.correct
                  ? "border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800"
                  : "border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800"
                : "border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
            )}
          >
            <div className="flex gap-3 mb-3">
              <span
                className={cn(
                  "flex-shrink-0 size-8 flex items-center justify-center rounded-full font-bold text-sm",
                  submitted
                    ? answers[idx] === q.correct
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                )}
              >
                {idx + 1}
              </span>
              <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                {q.text}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-11">
              {q.choices.map((c: string, cIdx: number) => (
                <button
                  key={cIdx}
                  disabled={submitted}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [idx]: cIdx }))
                  }
                  className={cn(
                    "p-3 rounded-xl text-left border-2 transition font-medium text-sm",
                    answers[idx] === cIdx
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300"
                      : "border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-pink-200",
                    submitted &&
                      cIdx === q.correct &&
                      "border-green-500 !bg-green-100 dark:!bg-green-900/30 text-green-700"
                  )}
                >
                  {String.fromCharCode(65 + cIdx)}. {c}
                </button>
              ))}
            </div>

            {submitted && answers[idx] !== q.correct && (
              <div className="mt-4 ml-11 text-sm text-red-600 dark:text-red-300 bg-red-100/50 dark:bg-red-900/20 p-3 rounded-xl">
                <strong>Giải thích:</strong> {q.explain}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center pt-6 border-t border-gray-100 dark:border-gray-800">
        <Button
          variant="ghost"
          onClick={() => {
            setSubmitted(false);
            setAnswers({});
            setCurrentTest(null);
          }}
        >
          ← Quay lại danh sách
        </Button>
      </div>
    </Card>
  );
}

function StudyPanel({ onBack }: any) {
  const [tab, setTab] = useState("vocab");
  return (
    <Card className="min-h-[600px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg text-pink-600 dark:text-pink-400">
            <BookOpenCheck />
          </span>
          Góc học tập
        </h2>
        <Button variant="ghost" onClick={onBack}>
          Thoát
        </Button>
      </div>
      <div className="flex p-1.5 rounded-2xl bg-gray-100 dark:bg-white/5 mb-8">
        {[
          { id: "vocab", label: "Từ vựng", icon: BookA },
          { id: "grammar", label: "Ngữ pháp", icon: School },
          { id: "listen", label: "Luyện nghe", icon: Headphones },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 py-2.5 text-sm font-bold rounded-xl transition flex items-center justify-center gap-2",
              tab === t.id
                ? "bg-white dark:bg-gray-700 text-pink-600 dark:text-pink-300 shadow-sm"
                : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            <t.icon size={18} />{" "}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>
      <div className="bg-white/50 dark:bg-white/5 rounded-3xl p-1 min-h-[400px]">
        {tab === "vocab" && <VocabularyView />}{" "}
        {tab === "grammar" && <GrammarView />}{" "}
        {tab === "listen" && <ListeningView />}
      </div>
    </Card>
  );
}

function EventPanel({ onBack }: any) {
  const [events, setEvents] = useState<Events>({});
  useEffect(() => {
    fetch("/events.json")
      .then((r) => r.json())
      .then(setEvents);
  }, []);
  const today = new Date();
  const y = today.getFullYear().toString();
  const m = (today.getMonth() + 1).toString();
  const d = today.getDate().toString();
  const content = events[m]?.[d]?.[y];

  return (
    <Card>
      <div className="text-center py-10">
        <div className="inline-block p-4 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-500 mb-4">
          <CalendarDays className="size-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Lời nhắn hôm nay
        </h2>
        <p className="text-gray-400 dark:text-gray-500 font-medium mb-8 uppercase tracking-widest text-sm">
          {d} tháng {m}, {y}
        </p>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-8 rounded-3xl border border-amber-100 dark:border-amber-800/30 mb-8 shadow-inner">
          <div className="text-lg text-amber-800 dark:text-amber-200 font-medium italic whitespace-pre-line leading-relaxed">
            {content ||
              "Lại bắt đầu ngày mới ❤️\nChúc bé một ngày thật vui vẻ nhé!"}
          </div>
        </div>
        <Button variant="ghost" onClick={onBack}>
          ← Quay lại
        </Button>
      </div>
    </Card>
  );
}

function UniversityPanel({ onBack }: any) {
  const [data, setData] = useState<{ essays: any[]; tools: any[] }>({
    essays: [],
    tools: [],
  });
  useEffect(() => {
    fetch("/resources.json")
      .then((r) => r.json())
      .then(setData);
  }, []);
  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex gap-2 items-center">
          <span className="text-pink-500 bg-pink-100 dark:bg-pink-900/20 p-2 rounded-lg">
            <GraduationCap />
          </span>{" "}
          Đại học
        </h2>
        <Button variant="ghost" onClick={onBack}>
          Thoát
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">
            Tài liệu tham khảo
          </h3>
          {data.essays.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              className="block p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-pink-50 dark:hover:bg-pink-900/20 mb-2 border border-transparent hover:border-pink-100 dark:hover:border-pink-800 transition group"
            >
              <div className="text-pink-600 dark:text-pink-400 font-bold group-hover:underline">
                {l.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {l.note}
              </div>
            </a>
          ))}
        </div>
        <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">
            Công cụ hỗ trợ
          </h3>
          {data.tools.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              className="block p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 mb-2 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800 transition group"
            >
              <div className="text-indigo-600 dark:text-indigo-400 font-bold group-hover:underline">
                {l.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {l.note}
              </div>
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ========= MAIN PAGE ========= */
export default function Page() {
  const [screen, setScreen] = useState<Screen>("lock");
  const [input, setInput] = useState("");
  const [topics, setTopics] = useState<Topics>({});
  const [key, setKey] = useState("notgood");
  const [idx, setIdx] = useState(0);
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // FIX LỖI HYDRATION: Chỉ render giao diện sau khi đã mount xong trên client
  useEffect(() => {
    setMounted(true);
    fetch("/letters.json")
      .then((r) => r.json())
      .then(setTopics);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const Typewriter = ({ text }: { text: string }) => {
    const [d, setD] = useState("");
    useEffect(() => {
      if (!text) return;
      setD(text[0]);
      let i = 1;
      const t = setInterval(() => {
        setD(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(t);
      }, 30);
      return () => clearInterval(t);
    }, [text]);
    return (
      <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line italic font-medium text-lg">
        {d}
      </p>
    );
  };

  // FIX LỖI TIME LỆCH: Component này giờ chỉ hiển thị khi mounted=true
  const LoveTimer = () => {
    const [t, setT] = useState(0);
    useEffect(() => {
      setT(Date.now());
      const interval = setInterval(() => setT(Date.now()), 1000);
      return () => clearInterval(interval);
    }, []);

    if (!t) return null; // Không render gì khi chưa có thời gian

    const diff = t - START_DATE.getTime();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((diff / 60000) % 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor((diff / 1000) % 60)
      .toString()
      .padStart(2, "0");
    return (
      <div className="text-center py-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-7xl mb-6 drop-shadow-sm"
        >
          💖
        </motion.div>
        <div className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-600 dark:from-pink-300 dark:to-rose-400 mb-2">
          anh đã thương bé được
        </div>
        <div className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white tracking-tight">
          {d} ngày
        </div>
        <div className="text-gray-400 dark:text-gray-500 font-mono mt-2 text-lg">
          {h} : {m} : {s}
        </div>
      </div>
    );
  };

  // NẾU CHƯA MOUNT THÌ KHÔNG RENDER GÌ (Tránh lệch HTML)
  if (!mounted) return null;

  return (
    <div className={theme}>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-gray-950 dark:via-black dark:to-gray-900 text-gray-800 dark:text-white overflow-y-scroll selection:bg-pink-200 selection:text-pink-900 font-sans transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="flex justify-between items-center px-6 py-6 max-w-3xl mx-auto relative z-10">
          <div className="flex text-pink-500 font-bold items-center gap-2">
            <Flower2 size={24} />{" "}
            <span className="text-xl tracking-tight">Góc nhỏ của Bé</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-yellow-400 hover:scale-110 transition-all active:scale-95"
          >
            {theme === "light" ? (
              <Moon size={20} className="fill-current text-indigo-500" />
            ) : (
              <Sun size={20} className="fill-current" />
            )}
          </button>
        </div>

        <main className="max-w-3xl mx-auto px-4 pb-16 relative z-10">
          <AnimatePresence mode="wait">
            {screen === "lock" && (
              <motion.div
                key="lock"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="text-center py-20">
                  <div className="mb-6 inline-block p-4 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-500">
                    <Heart className="fill-current size-8" />
                  </div>
                  <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2">
                    Chào Bé nha
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mb-10 font-medium">
                    Mời bé nhập mật khẩu nha
                  </p>
                  <input
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-gray-50 dark:bg-white/5 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-center text-3xl w-48 py-3 text-gray-800 dark:text-white focus:outline-none focus:border-pink-400 focus:bg-white dark:focus:bg-black transition-all mb-8 tracking-[0.5em] placeholder:text-gray-300 dark:placeholder:text-gray-600 placeholder:tracking-normal placeholder:text-sm"
                    placeholder="Mật khẩu"
                  />
                  <br />
                  <Button
                    onClick={() =>
                      input === "7306"
                        ? setScreen("home")
                        : alert("Sai mật khẩu rùi!")
                    }
                    className="w-48"
                  >
                    <LockKeyhole size={18} /> Mở Khóa
                  </Button>
                </Card>
              </motion.div>
            )}

            {screen === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="text-center">
                  <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8 leading-tight">
                    Chào mừng bé đến với góc nhỏ này
                    <br />
                    <span className="text-pink-500 text-lg font-medium">
                      Nơi anh gửi gắm yêu thương dành cho bé
                    </span>
                  </h1>
                  <div className="relative max-w-sm mx-auto mb-10">
                    <select
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border-2 border-pink-100 dark:border-pink-900 rounded-2xl py-4 pl-6 pr-10 text-gray-700 dark:text-gray-200 font-bold outline-none focus:border-pink-400 focus:shadow-lg transition-all cursor-pointer"
                    >
                      {Object.entries(topics).map(([k, t]) => (
                        <option key={k} value={k}>
                          {t.emoji} {t.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none">
                      ▼
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      className="col-span-2 py-5 text-lg shadow-pink-200 dark:shadow-none shadow-xl"
                      onClick={() => {
                        setIdx(0);
                        setScreen("letter");
                      }}
                    >
                      <Sparkles className="size-5" /> Đọc thư anh viết
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setScreen("love")}
                    >
                      <Clock size={18} /> Thời gian yêu
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => setScreen("event")}
                    >
                      <CalendarDays size={18} /> Sự kiện
                    </Button>
                    <Button
                      variant="outline"
                      className="col-span-2 border-2"
                      onClick={() => setScreen("study")}
                    >
                      <BookOpenCheck /> Góc học tập
                    </Button>

                    {/* 👇 NÚT THI THỬ TOEIC MỚI 👇 */}
                    <Button
                      variant="primary"
                      className="col-span-2 bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-200"
                      onClick={() => setScreen("test")}
                    >
                      <BookOpenCheck size={18} /> Thi thử TOEIC
                    </Button>

                    <Button
                      variant="ghost"
                      className="col-span-2 text-xs text-gray-400 dark:text-gray-500"
                      onClick={() => setScreen("uni")}
                    >
                      <GraduationCap size={14} /> Tài liệu đại học
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {screen === "letter" && topics[key] && (
              <motion.div
                key="letter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3 border-b border-gray-100 dark:border-white/10 pb-4">
                    <span className="text-4xl">{topics[key].emoji}</span>{" "}
                    {topics[key].label}
                  </h2>
                  <div className="min-h-[200px] bg-white/50 dark:bg-white/5 p-6 rounded-2xl border border-pink-50/50 dark:border-white/5 mb-8">
                    <Typewriter text={topics[key].letters[idx]} />
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="ghost" onClick={() => setScreen("home")}>
                      ← Quay lại
                    </Button>
                    <Button
                      onClick={() =>
                        setIdx((i) =>
                          Math.min(i + 1, topics[key].letters.length - 1)
                        )
                      }
                      disabled={idx >= topics[key].letters.length - 1}
                    >
                      Lá thư sau →
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {screen === "love" && (
              <motion.div
                key="love"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card>
                  <LoveTimer />
                  <div className="text-center">
                    <Button variant="ghost" onClick={() => setScreen("home")}>
                      ← Quay lại
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
            {screen === "event" && (
              <motion.div
                key="event"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EventPanel onBack={() => setScreen("home")} />
              </motion.div>
            )}
            {screen === "study" && (
              <motion.div
                key="study"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <StudyPanel onBack={() => setScreen("home")} />
              </motion.div>
            )}
            {/* 👇 MÀN HÌNH THI THỬ MỚI 👇 */}
            {screen === "test" && (
              <motion.div
                key="test"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TestPanel onBack={() => setScreen("home")} />
              </motion.div>
            )}
            {screen === "uni" && (
              <motion.div
                key="uni"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UniversityPanel onBack={() => setScreen("home")} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
