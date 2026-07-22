"use client";

import { useEffect, useState } from "react";
// import "./coming-soon.css";

export default function ComingSoon() {
  const targetDate = new Date("2026-01-01T00:00:00");

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();

    if (difference <= 0)
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      hours: String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0"),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="coming-page">
      {/* Floating Balls */}

      <div className="ball ball1"></div>
      <div className="ball ball2"></div>
      <div className="ball ball3"></div>
      <div className="ball ball4"></div>
      <div className="ball ball5"></div>

      {/* Header */}

      <header className="top-bar">
        <h3>PMX</h3>

        <a href="#">Say Hello</a>
      </header>

      {/* Content */}

      <section className="content">
        <p>Something great is on the way</p>

        <h1>COMING SOON</h1>

        <div className="timer">
          <div>
            <span>{timeLeft.days}</span>
            <small>Days</small>
          </div>

          <div>
            <span>{timeLeft.hours}</span>
            <small>Hours</small>
          </div>

          <div>
            <span>{timeLeft.minutes}</span>
            <small>Minutes</small>
          </div>

          <div>
            <span>{timeLeft.seconds}</span>
            <small>Seconds</small>
          </div>
        </div>

        <div className="scroll">
          Scroll Down
          <span>↓</span>
        </div>
      </section>

      <div className="wave"></div>
    </main>
    
  );
}