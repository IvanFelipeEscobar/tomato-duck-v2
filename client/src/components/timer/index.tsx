import { useState } from "react";
import { LuPlayCircle, LuStopCircle, LuTimerReset } from "react-icons/lu";
import { useTimer } from "react-timer-hook";

export default function Timer() {
  const time = new Date();
  const [active, setActive] = useState(0);
  const [timer, setTimer] = useState<number>(300);
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });
  const timerTime = [
    { name: `Tomato Time`, add: 1500 },
    { name: `Short Break`, add: 300 },
    { name: `Long Break`, add: 600 },
  ];

  return (
    <div>
      <div className="flex gap-5 mb-2">
        {timerTime.map((t, i) => (
          <button
            key={`btn${i}`}
            className={
              active === i
                ? "btn btn-xs sm:btn-sm active:btn-success btn-info text-base-200 tracking-wide rounded-full"
                : "btn btn-xs sm:btn-sm active:btn-success btn-info bg-opacity-55 text-base-200 tracking-wide rounded-full"
            }
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + t.add);
              restart(time);
              setTimer(t.add);
              setActive(i);
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="h-20 flex items-center font-mono bg-opacity-30 text-neutral font-extrabold justify-center gap-1 text-5xl shadow-2xl mt-4 inset-0 w-48 bg-base-300 rounded-2xl">
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
        <div className="flex gap-3 my-2">
          <div className="tooltip" data-tip="Start timer">
          <button className="btn btn-sm btn-circle bg-opacity-50 border-0">
            <LuPlayCircle size={24} />
          </button>
          </div>
          <div className="tooltip" data-tip="Restart timer">
          <button
            className="btn btn-sm btn-circle bg-opacity-50 border-0"
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + timer);
              restart(time);
            }}
          >
            <LuTimerReset size={24} color="red" />
          </button>
          </div>
          <div className="tooltip" data-tip="Stop timer">
          <button className="btn btn-sm btn-circle bg-opacity-50 border-0">
            <LuStopCircle size={24} />
          </button></div>
        </div>
      </div>
    </div>
  );
}
