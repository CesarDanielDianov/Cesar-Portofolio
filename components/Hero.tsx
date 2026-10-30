
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div>
          <h1 className="mb-6 text-center text-5xl font-bold sm:text-6xl md:text-7xl lg:text-left lg:text-8xl animate-[fadeDown_1.6s_ease-out_forwards]">
            César Dianov
          </h1>

          <p className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-3xl border-2 border-gray-500 px-5 py-2 text-sm font-bold text-gray-600 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] dark:text-white sm:text-base md:text-lg lg:mx-0">
            Computer Science and Engineering Student @ IST
            <span className="relative flex h-3 w-3">
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative h-3 w-3 rounded-full bg-green-500" />
            </span>
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-left text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:mx-0 animate-[fadeIn_1.6s_ease-out_forwards]">
            I am a Computer Science and Engineering student at Instituto
            Superior Técnico, preparing to begin the final year of my degree.
            I am passionate about software development, artificial
            intelligence, databases, and problem-solving.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards] lg:justify-end">
          <div className="w-full max-w-md overflow-hidden rounded-xl border-2 border-gray-600 ">

            {/* Linux/Tilix style Window bar */}
            <div className="flex items-center justify-between border-b border-gray-300/50  px-4 py-2.5 ">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>

                <span className="font-mono text-xs font-medium text-gray-600 dark:text-gray-400">
                  c.dianov@pop-os:~
                </span>
              </div>

              {/* Window controls */}
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400 transition-colors hover:bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-400" />
              </div>
            </div>

            {/* Code / Terminal Output */}
            <div className="relative p-5 font-mono text-xs leading-relaxed sm:p-6 sm:text-sm lg:p-8">

              {/* Subtle ambient glows */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-teal-500/10 blur-3xl" />

              <div className="relative z-10 flex flex-col gap-3">

                {/* Command input */}
                <div>
                  <span className="text-green-700 dark:text-green-400">
                    c.dianov@pop-os
                  </span>
                  <span className="text-gray-800 dark:text-white">:</span>
                  <span className="text-blue-700 dark:text-blue-400">
                    ~/workspace
                  </span>
                  <span className="text-gray-800 dark:text-white">$ </span>
                  <span className="text-amber-700 dark:text-yellow-300">
                    cat developer.ts
                  </span>
                </div>

                {/* The Code Object */}
                <pre className="overflow-x-auto text-gray-700 dark:text-gray-300">
                  <code className="block">
                    <span className="text-purple-700 dark:text-purple-400">const</span>{" "}
                    <span className="text-blue-700 dark:text-blue-300">developer</span> = {"{"}
                    {"\n"}
                    {"  "}location: <span className="text-orange-700 dark:text-orange-300">"Oeiras, Portugal"</span>,
                    {"\n"}
                    {"  "}roles: [{"\n"}
                    {"    "}
                    <span className="text-teal-700 dark:text-teal-300">"LEIC Senior @ IST"</span>,
                    {"\n"}
                    {"    "}
                    <span className="text-teal-700 dark:text-teal-300">"IT Exec @ Five Thousand Miles"</span>,
                    {"\n"}
                    {"    "}
                    <span className="text-teal-700 dark:text-teal-300">"Dev & HR @ NEIIST"</span>
                    {"\n"}
                    {"  "}]
                    {"\n"}
                    {"  "}focus: <span className="text-teal-700 dark:text-teal-300">"Software Architecture & AI"</span>
                    {"\n"}
                    {"}"};
                  </code>
                </pre>

                {/* Blinking cursor state */}
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-green-700 dark:text-green-400">
                    c.dianov@pop-os
                  </span>
                  <span className="text-gray-800 dark:text-white">:</span>
                  <span className="text-blue-700 dark:text-blue-400">
                    ~/workspace
                  </span>
                  <span className="text-gray-800 dark:text-white">$ </span>
                  <span className="h-4 w-2 animate-pulse bg-gray-500 dark:bg-gray-400/80" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
