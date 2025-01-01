"use client";
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [daysPassed, setDaysPassed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await fetch("/api/progress");
      const data = await res.json();

      setProgress(data.percentage);
      setDaysPassed(data.daysPassed);
      setEndDate(data.endDate);
      setCurrentDate(data.currentDate);
      setIsComplete(data.isComplete);
    };

    fetchProgress();

    const timer = setInterval(() => {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      const timeElapsedToday = now.getTime() - startOfDay.getTime();
      const secondsLeftToday = 86400000 - timeElapsedToday;

      const hours = Math.floor(secondsLeftToday / (1000 * 60 * 60));
      const minutes = Math.floor(
        (secondsLeftToday % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((secondsLeftToday % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours} Saat ${minutes} Dakika ${seconds} Saniye`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-600 text-white font-sans">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          365 Gün Sayacı
        </h1>
        <p className="text-gray-600 text-sm">
          Takvimsel bir yıl boyunca ilerlemeyi takip edin.
        </p>

        <div className="relative w-full bg-gray-200 h-6 rounded-full mt-6 overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full bg-blue-500`}
            style={{ width: `${progress}%` }}
          ></div>
          <span className="absolute inset-0 flex justify-center items-center text-sm font-bold z-10 text-white">
            {progress.toFixed(2)}%
          </span>
        </div>

        <div className="mt-6">
          <p className="text-gray-800">
            <strong>Bugün:</strong> {currentDate}
          </p>
          <p className="text-gray-800">
            <strong>Bitiş Tarihi:</strong> {endDate}
          </p>
          {isComplete ? (
            <h2 className="text-green-500 mt-4 text-lg font-semibold">
              365 Gün Tamamlandı!
            </h2>
          ) : (
            <div className="mt-4">
              <p className="text-gray-800">
                <strong>Geçen Gün:</strong> {daysPassed}
              </p>
              <p className="text-gray-800">
                <strong>Geriye Kalan Gün:</strong> {365 - daysPassed}
              </p>
              <div className="w-full items-center justify-center text-gray-800 mt-2">
                <p className="text-center">
                  <strong>Bugünün Bitmesine Kalan Süre</strong>
                </p>
                <div className="flex justify-center items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-arrow-big-down"
                  >
                    <path d="M15 6v6h4l-7 7-7-7h4V6h6z" />
                  </svg>
                </div>
                <div className="flex justify-center items-center mt-2">
                  <span className="px-2 font-medium underline">
                    {timeRemaining}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
