import React, { useState, useRef } from "react";

function Timer() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds += 1;
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
        if (minutes === 60) {
          minutes = 0;
          hours += 1;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const restart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const format = num => String(num).padStart(2, "0");

  return (
    <div className="m-0 p-0">
    <div className="bg-black w-120 h-70 rounded-4xl ml-120">
    <div className="flex flex-col items-center justify-center mt-50 space-y-4 pt-20 ">
      <h1 className="text-4xl font-bold bg-blue-200 px-10 py-5 rounded-3xl">
        {format(time.hours)}:{format(time.minutes)}:{format(time.seconds)}
      </h1>
      <div className="flex gap-4">
        <button onClick={start} className="bg-amber-400 px-6 py-2 rounded-2xl hover:bg-amber-500 transition">Start</button>
        <button onClick={pause} className="bg-amber-400 px-6 py-2 rounded-2xl hover:bg-amber-500 transition">Pause</button>
        <button onClick={restart} className="bg-amber-400 px-6 py-2 rounded-2xl hover:bg-amber-500 transition">Restart</button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Timer;
