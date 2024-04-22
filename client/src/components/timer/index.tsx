import { useState } from "react";
import { LuTimerReset } from "react-icons/lu";
import { useTimer } from "react-timer-hook";

export default function Timer() {
  const time = new Date();
  const [timer, setTimer] = useState<number>(300);
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });
  const timerTime = [
    { name: `Short Break`, add: 300 },
    { name: `Long Break`, add: 600 },
    { name: `Tomato Time`, add: 1500 },
  ];

  return (
    <div className="flex flex-col justify-center bg-base-200 rounded-3xl p-6 mt-4 items-center mx-4 mb-4 shadow-2xl">
      <div className="flex gap-5 mb-2">
        {timerTime.map((t, i) => (
          <button
          key={`btn${i}`}
            className="btn btn-sm btn-info text-base-200 tracking-wide"
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + t.add);
              restart(time);
              setTimer(t.add);
            }}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="h-20 flex items-center font-mono text-base-100 justify-center gap-1 text-5xl shadow-xl mt-4 inset-0 py-2  w-48 bg-red-700">
        {seconds !== 0 || minutes !== 0 ? (
          <>
            <span>{minutes}</span>
            <span className="mb-2">:</span>
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          </>
        ) : (
          <div className="text-center font-serif">
            <p className="text-sm italic">
              {timer === 1500
                ? "Time to rest"
                : timer === 600
                ? ` Long break over, it's tomato time`
                : `Short break over, it's tomato time`}
            </p>
          </div>
        )}
      </div>

      <span className="divider"></span>
      <div>
        <button
          className="btn btn-circle btn-info"
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + timer);
            restart(time);
          }}
        >
          <LuTimerReset size={24} />
        </button>
      </div>
    </div>
  );
}
