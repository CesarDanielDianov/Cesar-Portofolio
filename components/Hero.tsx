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

          <p className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-2xl border-2 border-gray-500 px-5 py-2 text-sm font-bold text-gray-600 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] dark:text-white sm:text-base md:text-lg lg:mx-0">
            Computer Science and Engineering Student @ IST
            <span className="relative flex h-3 w-3">
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative h-3 w-3 rounded-full bg-green-500" />
            </span>
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-left text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:mx-0">
            I am a Computer Science and Engineering student at Instituto
            Superior Técnico, preparing to begin the final year of my degree.
            I am passionate about software development, artificial
            intelligence, databases, and problem-solving.
          </p>

        </div>

        {/* RIGHT SIDE - DESKTOP ONLY */}
        <div className="hidden justify-end opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards] lg:flex">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-gray-500">
            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-gray-500/30 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-gray-500 dark:text-gray-400">cesar.ts</span>
            </div>

            {/* Code */}
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-gray-700 dark:text-gray-300">
              <code>
                <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
                <span className="text-cyan-600 dark:text-cyan-400">cesar</span> = {"{"}
                {"\n"}
                {"  "}role: <span className="text-green-600 dark:text-green-400">"Software Engineer"</span>,
                {"\n"}
                {"  "}school: <span className="text-green-600 dark:text-green-400">"IST"</span>,
                {"\n"}
                {"  "}interests: [
                {"\n"}
                {"    "}<span className="text-green-600 dark:text-green-400">"AI"</span>,
                {"\n"}
                {"    "}<span className="text-green-600 dark:text-green-400">"Databases"</span>,
                {"\n"}
                {"    "}<span className="text-green-600 dark:text-green-400">"Problem-solving"</span>,
                {"\n"}
                {"  "}],
                {"\n"}
                {"  "}openToWork: <span className="text-orange-600 dark:text-orange-400">true</span>,
                {"\n"}
                {"}"};
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}