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
    <div className="flex flex-col justify-center items-center mx-4 mb-4">
      <div className="flex gap-2 mb-2">
        {timerTime.map((t, i) => (
          <button
          key={`btn${i}`}
            className="btn btn-sm btn-info rounded-full last:btn-primary"
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
      <div className="h-20 flex items-center text-info justify-center gap-1 text-5xl border-2 border-error shadow-lg mt-4 rounded-lg py-2  w-40 bg-base-200">
        {seconds !== 0 || minutes !== 0 ? (
          <>
            <span>{minutes}</span>
            <span className="mb-2">:</span>
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          </>
        ) : (
          <div className="text-center font-mono">
            <p className="text-sm italic">
              {timer === 1500
                ? "Time to rest"
                : timer === 600
                ? ` long break over, it's tomato time`
                : `short break over, it's tomato time`}
            </p>
          </div>
        )}
      </div>

      <span className="divider"></span>
      <div>
        <button
          className="btn btn-circle btn-warning "
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
