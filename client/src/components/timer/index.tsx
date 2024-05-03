import { useState } from "react";
import { LuPlayCircle, LuStopCircle, LuTimerReset } from "react-icons/lu";
import { useTimer } from "react-timer-hook";

export default function Timer() {
  const time = new Date();
  const [active, setActive] = useState(0);
  const [timer, setTimer] = useState<number>(300);
  const { seconds, minutes, restart, pause, resume } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });
  const timerTime = [
    { name: `Tomato Time`, add: 1500, time: '25 minutes' },
    { name: `Short Break`, add: 300, time: '10 minutes' },
    { name: `Long Break`, add: 600, time: '5 minutes' },
  ];

  return (
    <div>
      <div className="flex sm:gap-5 gap-2 mb-2">
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
          ><div className="tooltip" data-tip={t.time}>{t.name}</div>
            
          </button>
        ))}
      </div>

      <div className="flex h-80 flex-col justify-center items-center bg-[url('/favicon.ico')] bg-contain bg-no-repeat bg-center ">
        <div className="h-20 flex items-center font-mono bg-opacity-60 text-neutral font-extrabold justify-center gap-1 text-5xl mt-16 border border-red-500 w-48 bg-base-300 rounded-2xl shadow-inner">
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
            <button onClick={resume}className="btn btn-sm btn-circle bg-opacity-50 border-0">
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
            <button onClick={pause} className="btn btn-sm btn-circle bg-opacity-50 border-0">
              <LuStopCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
