import { useEffect, useState } from "react";
import leaf from "../assets/b-leaf.png";
import rings from "../assets/rings.png";
import fetchWeddingDate from "../services/fetchWeddingDate";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Timer() {
  const [date, setDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWeddingDate();

      const date = response.results.map((event: any) => {
        const { date } = event.properties;
        return {
          date: date.date.start,
        };
      });

      if (!date) return;
      const formattedDate = new Date(date[0].date);
      setDate(formattedDate);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (!date) return;

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft(): TimeLeft {
    if (!date) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const targetDate = new Date(date);
    const difference = +targetDate - +new Date();

    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <section id="timer" className="bg-secondary py-10 px-5 lg:py-20">
      <div className="lg:hidden flex items-baseline justify-center gap-4 mb-8">
        <img className="w-16 -scale-y-100" src={leaf} alt="Decoration leaf" />
        <img className="w-14" src={rings} alt="Decoration rings" />
        <img className="w-16 rotate-180" src={leaf} alt="Decoration leaf" />
      </div>
      {timeLeft && (
        <div className="relative grid grid-cols-4 items-center justify-center max-w-2xl my-0 mx-auto">
          <div className="text-center">
            <span className="text-primary mb-4 inline-block lg:text-xl">
              Days
            </span>
            <p className="text-4xl lg:text-5xl">{timeLeft.days}</p>
          </div>
          <div className="text-center">
            <span className="text-primary mb-4 inline-block lg:text-xl">
              Hours
            </span>
            <p className="text-4xl lg:text-5xl">{timeLeft.hours}</p>
          </div>
          <div className="text-center">
            <span className="text-primary mb-4 inline-block lg:text-xl">
              Minutes
            </span>
            <p className="text-4xl lg:text-5xl">{timeLeft.minutes}</p>
          </div>
          <div className="text-center">
            <span className="text-primary mb-4 inline-block lg:text-xl">
              Seconds
            </span>
            <p className="text-4xl lg:text-5xl">{timeLeft.seconds}</p>
          </div>
          <img
            className="absolute hidden lg:block w-16 -top-6 -left-14 -scale-y-100"
            src={leaf}
            alt="Decoration leaf"
          />
          <img
            className="absolute hidden lg:block w-16 -top-6 -right-14 rotate-180"
            src={leaf}
            alt="Decoration leaf"
          />
        </div>
      )}
    </section>
  );
}

export default Timer;
