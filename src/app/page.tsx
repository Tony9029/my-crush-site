"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 💌 Kiểu dữ liệu
type Topic = {
  label: string;
  emoji: string;
  letters: string[];
};
type Topics = Record<string, Topic>;
type Events = Record<string, Record<number, string>>;

/* 🌷 Tulip rơi theo gió */
function FallingTulips() {
  const tulips = Array.from({ length: 18 });
  const [screenSize, setScreenSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenSize({ w: window.innerWidth, h: window.innerHeight });
    }
  }, []);

  if (!screenSize.w) return null;

  return (
    <>
      {tulips.map((_, i) => {
        const startX = Math.random() * screenSize.w;
        const duration = 10 + Math.random() * 8;
        const delay = Math.random() * 6;

        return (
          <motion.div
            key={i}
            initial={{ x: startX, y: -100, rotate: 0, opacity: 0 }}
            animate={{
              x: [
                startX,
                startX + (Math.random() > 0.5 ? 100 : -100),
                startX + (Math.random() > 0.5 ? 200 : -200),
              ],
              y: screenSize.h + 100,
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
            className="absolute text-pink-400 text-3xl pointer-events-none select-none"
          >
            🌷
          </motion.div>
        );
      })}
    </>
  );
}

/* 💡 Bokeh nền */
function FloatingBokeh() {
  const circles = Array.from({ length: 10 });
  const [screenSize, setScreenSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenSize({ w: window.innerWidth, h: window.innerHeight });
    }
  }, []);

  if (!screenSize.w) return null;

  return (
    <>
      {circles.map((_, i) => {
        const size = 100 + Math.random() * 120;
        const startX = Math.random() * screenSize.w;
        const startY = Math.random() * screenSize.h;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-200/30 blur-3xl"
            style={{ width: size, height: size }}
            initial={{ x: startX, y: startY, opacity: 0.3 }}
            animate={{
              x: startX + (Math.random() > 0.5 ? 150 : -150),
              y: startY + (Math.random() > 0.5 ? 200 : -200),
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
            }}
          />
        );
      })}
    </>
  );
}

/* 💌 Card kính mờ */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-200/60 p-8 relative overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

/* ⏳ Love Timer */
function LoveTimer() {
  const startDate = new Date("2025-06-21T00:00:00");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = now.getTime() - startDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-4xl text-pink-500"
      >
        💖
      </motion.div>
      <div className="text-center text-pink-700 font-semibold text-lg">
        Mình đã thương Bé được {days} ngày {pad(hours)}:{pad(minutes)}:
        {pad(seconds)}
      </div>
    </div>
  );
}

/* 🎉 Hiển thị sự kiện */
function EventWishes({ events }: { events: Events }) {
  const today = new Date();
  const d = today.getDate();
  const m = today.getMonth() + 1;
  const y = today.getFullYear();

  let msg = "";
  if (d === 1 && m === 1) msg = events.newYear?.[y];
  else if (d === 14 && m === 2) msg = events.valentine?.[y];
  else if (d === 8 && m === 3) msg = events.womenDay?.[y];
  else if (d === 20 && m === 10) msg = events.vnWomen?.[y];
  else if (d === 24 && m === 12) msg = events.noel?.[y];
  else if (d === 7 && m === 3) msg = events.birthday?.[y];

  if (!msg)
    msg =
      "📅 Hôm nay chưa có sự kiện đặc biệt, mong bé luôn bình yên và hạnh phúc nha thương bé nhiều";

  return (
    <div className="text-center text-yellow-700 font-semibold text-lg whitespace-pre-line">
      {msg}
    </div>
  );
}

/* ✨ Typewriter */
function TypewriterText({
  text,
  speed = 40,
}: {
  text: string;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const chars = Array.from(text);
    if (chars.length === 0) {
      setDisplayed("");
      return;
    }
    setDisplayed(chars[0]);
    let i = 1;
    const id = setInterval(() => {
      setDisplayed(chars.slice(0, i + 1).join(""));
      i++;
      if (i >= chars.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <p className="text-gray-800 leading-relaxed mb-6 whitespace-pre-line italic">
      {displayed}
    </p>
  );
}

/* 🚀 Trang chính */
export default function Page() {
  const [screen, setScreen] = useState<
    "lock" | "home" | "letter" | "love" | "event"
  >("lock");
  const [input, setInput] = useState("");
  const [topics, setTopics] = useState<Topics>({});
  const [events, setEvents] = useState<Events>({});
  const [topicKey, setTopicKey] = useState<string>("notgood");
  const [index, setIndex] = useState<number>(0);

  // fetch JSON
  useEffect(() => {
    fetch("/letters.json")
      .then((res) => res.json())
      .then((data) => setTopics(data));
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const topic = topics[topicKey];
  const unlock = () => {
    if (input === "7306") setScreen("home");
    else alert("Sai mật khẩu rồi Bé ơi 🌸");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 relative overflow-hidden">
      <FloatingBokeh />
      <FallingTulips />

      <div className="w-full max-w-3xl relative z-10">
        <AnimatePresence mode="wait">
          {/* 🔒 Lock */}
          {screen === "lock" && (
            <motion.div
              key="lock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center"
            >
              <h1 className="text-3xl font-bold text-pink-600 mb-3">
                🌷 Góc nhỏ anh giữ lại cho Bé 🌷
              </h1>
              <p className="mb-6 text-gray-600 italic">
                Những lời thương không kịp nói… giờ nằm ở đây.
              </p>
              <div className="mx-auto w-full max-w-md">
                <div className="p-[2px] rounded-2xl bg-gradient-to-r from-pink-400 to-pink-600 shadow">
                  <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full text-center text-2xl px-5 py-4 rounded-[1rem] bg-white/95 border-0 focus:outline-none focus:ring-4 focus:ring-pink-300 placeholder-pink-300"
                    placeholder="••••"
                  />
                </div>
              </div>
              <button
                onClick={unlock}
                className="mt-5 px-8 py-3 bg-pink-500 text-white rounded-xl shadow hover:bg-pink-600 transition"
              >
                Mở khóa 🔑
              </button>
            </motion.div>
          )}

          {/* 🏡 Home */}
          {screen === "home" && topics && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
            >
              <h1 className="text-4xl md:text-5xl text-pink-600 mb-6">
                🌷 Gửi đến Bé 🌷
              </h1>
              <select
                className="w-full max-w-md px-4 py-3 rounded-xl shadow bg-white/95 text-gray-800 font-medium border-2 border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
                value={topicKey}
                onChange={(e) => setTopicKey(e.target.value)}
              >
                {Object.entries(topics).map(([k, t]) => (
                  <option key={k} value={k}>
                    {t.emoji} {t.label}
                  </option>
                ))}
              </select>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setIndex(0);
                    setScreen("letter");
                  }}
                  className="px-6 py-3 bg-pink-500 text-white rounded-xl shadow hover:shadow-md"
                >
                  ✨ Đọc thư
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => setScreen("love")}
                  className="px-6 py-3 bg-red-400 text-white rounded-xl shadow hover:shadow-md"
                >
                  ⏰ Đồng hồ yêu
                </button>
                <button
                  onClick={() => setScreen("event")}
                  className="px-6 py-3 bg-yellow-400 text-white rounded-xl shadow hover:shadow-md"
                >
                  📅 Sự kiện
                </button>
              </div>
            </motion.div>
          )}

          {/* 💌 Letter */}
          {screen === "letter" && topic && (
            <Card>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {topic.emoji} {topic.label}
              </h2>
              <TypewriterText text={topic.letters[index]} />
              <div className="flex justify-between">
                <button
                  onClick={() => setScreen("home")}
                  className="px-4 py-2 bg-pink-50 text-pink-600 font-semibold rounded-lg hover:bg-pink-100"
                >
                  ← Chủ đề khác
                </button>
                <button
                  disabled={index >= topic.letters.length - 1}
                  onClick={() => setIndex((i) => i + 1)}
                  className="px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold rounded-lg shadow hover:from-pink-500 hover:to-pink-700 disabled:opacity-50"
                >
                  Lá thư kế tiếp →
                </button>
              </div>
            </Card>
          )}

          {/* ⏳ Love Timer */}
          {screen === "love" && (
            <Card>
              <LoveTimer />
              <div className="mt-6">
                <button
                  onClick={() => setScreen("home")}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  ← Quay lại
                </button>
              </div>
            </Card>
          )}

          {/* 🎉 Event */}
          {screen === "event" && events && (
            <Card>
              <EventWishes events={events} />
              <div className="mt-6">
                <button
                  onClick={() => setScreen("home")}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  ← Quay lại
                </button>
              </div>
            </Card>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
