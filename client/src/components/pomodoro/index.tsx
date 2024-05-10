import { Link } from "react-router-dom";

const Pomodoro = () => {
  return (
    <div className="text-balance font-serif">
      <h2 className=" font-extrabold text-error text-3xl m-4">
        Tomato Timer with a Rubber Duck
      </h2>
      <div className="divider-error divider"></div>
      <p className="mx-8 pb-4">
        This site is heavily inspired by{" "}
        <a
          href="https://pomofocus.io/"
          target="_blank"
          className="link pl-1 text-error no-underline tracking-wider"
        >
          Pomofocus.io
        </a>{" "}
        and is intended to assist in productivity. The tomato timer is an
        obvious reference to the pomodoro technique, and the duck is a reference
        to the term rubber-ducking{" "}
      </p>

      <div className="divider-error divider m-4">
        <h3 className="font-extrabold text-error text-2xl">
          What's the Pomodoro Technique?
        </h3>
      </div>
      <p className="mx-8 py-4">
        The Pomodoro Technique is a time management method developed by
        Francesco Cirillo in the late 1980s. It's designed to improve
        productivity by breaking work into intervals, traditionally 25 minutes
        in length, separated by short breaks. The technique is named after the
        Italian word for tomato, "pomodoro," because Cirillo initially used a
        tomato-shaped kitchen timer to track his work intervals.
      </p>
      <p className="mx-8 pb-4">
        The basic concept revolves around focusing on a single task for a set
        period, typically 25 minutes, known as a "Pomodoro." After completing a
        Pomodoro, you take a short break, usually around 5 minutes. After
        completing four Pomodoros, you take a longer break, typically 15-30
        minutes. The idea is to maintain focus and productivity during the work
        intervals and give your brain regular breaks to rest and recharge.
      </p>
      <p className="font-bold mx-8 pb-2">
        How to execute this tomato technique:
      </p>
      <ul className="mx-8 italic">
        <li className="pb-2">
          <span className="font-bold px-2">1.</span>
          <span className="underline">Select a specific task</span> you want to
          work on. It's essential to have a clear objective for each Tomato Time
          span.
        </li>
        <li className="pb-2">
          <span className="font-bold px-2">2.</span>
          <span className="underline">Set a timer</span> for 25 minutes,
          indicating the start of Tomato Time
        </li>
        <li className="pb-2">
          <span className="font-bold px-2">3.</span>
          <span className="underline">Focus</span> solely on the chosen task
          until the timer ends, avoiding any distractions or interruptions. If
          you think of something unrelated, jot it down quickly and return to
          the task at hand (we can ask these questions to our rubber duck
          later!)
        </li>
        <li className="pb-2">
          <span className="font-bold px-2">4.</span>
          <span className="underline">Break!</span> When the timer goes off,
          take a short break. Use this time to relax, stretch, or do something
          unrelated to work to recharge your energy. This would be a good time
          to ask our rubber duck any unrelated questions we had. When this timer
          ends, it's Tomato Time again!
        </li>
        <li className="pb-2">
          <span className="font-bold px-2">5.</span>
          <span className="underline">Repeat</span> - when the short break is,
          begin another tomato timer and continue to work on the task
        </li>
        <li className="pb-2">
          {" "}
          <span className="font-bold px-2">6.</span>
          <span className="underline">Longer breaks</span> After completing a
          task or four Pomodoros, take a more extended break, to rest and
          rejuvenate. This longer break helps prevent burnout and maintains
          productivity over longer periods.{" "}
        </li>
      </ul>
      <div className="divider-error divider m-4">
        <h3 className="font-extrabold text-error text-2xl">
          What's Rubber Ducking?
        </h3>
      </div>
      <p className="mx-8 py-4">
        Rubber ducking is a technique used in programming and problem-solving
        where a programmer explains their code or problem to an inanimate
        object, such as a rubber duck. However, in our context, we've taken it a
        step further by utilizing an advanced rubber duck chatbot configured
        with OpenAI, duckGPT if you will. This chatbot can understand and
        respond to your explanations, providing insights and suggestions as if
        you were conversing with a human. In the Pomodoro Technique, integrating
        this advanced rubber duck chatbot can be immensely beneficial during the
        short breaks between Pomodoros. Instead of simply taking a break, you
        can engage in a dialogue with the chatbot, explaining your task or
        problem to it. The chatbot can then offer feedbacks, or provide
        solutions based on its understanding of the problem. This interactive
        process not only helps in clarifying thoughts and overcoming mental
        blocks but also leverages the capacity of large language models (LLM) to
        enhance problem-solving and productivity.
      </p>
      <div className="divider divider-error"></div>
      <Link to="/">
        <button className="btn btn-error btn-lg my-4 block mx-auto">Back to homepage</button>
      </Link>
    </div>
  );
};

export default Pomodoro;
