import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen">

      <div className="text-center">

        <h1
          className="mt-20 md:mt-26
          text-5xl sm:text-6xl md:text-7xl lg:text-8xl
          font-bold
          opacity-100 translate-y-4
          animate-[fadeDown_1.6s_ease-out_forwards]"
        >
          César Dianov
        </h1>

        <p
          className="
          mx-auto mt-4 mb-10
          inline-flex flex-wrap items-center justify-center gap-3
          px-5 py-2
          max-w-[90%]
          rounded-3xl border-2 border-cyan-500
          text-sm sm:text-base md:text-xl font-bold
          text-gray-600
          bg-gradient-to-br from-cyan-100 to-white
          dark:from-gray-700 dark:to-gray-900 dark:text-white
          opacity-0 translate-y-4
          animate-[fadeIn_0.8s_ease-out_forwards]"
        >
          Computer Science and Engineering Student @ IST

          <span className="relative flex h-3 w-3">
            <span className="absolute flex h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
        </p>

        <Image
          src="/cesar1.png"
          alt="César Dianov"
          width={240}
          height={240}
          className="
          mx-auto mt-12
          w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60
          rounded-full
          shadow-2xl shadow-gray-500
          dark:shadow-gray-900
          opacity-100 translate-y-4
          animate-[fadeIn_1.0s_ease-out_forwards]
          transition-all duration-300
          hover:-translate-y-1
          hover:scale-[1.02]
          hover:shadow-2xl"
        />

        <p
          className="
          mx-auto mt-14 mb-10
          max-w-3xl
          px-6 sm:px-10 md:px-16
          text-left
          text-base sm:text-lg md:text-xl
          leading-relaxed"
        >
          I am a Computer Science and Engineering student at Instituto Superior
          Técnico, preparing to begin the final year of my degree. I am
          passionate about software development, artificial intelligence,
          databases, and problem-solving. Through academic and personal
          projects, I have gained experience with various programming languages
          and technologies while strengthening my technical and teamwork skills.
        </p>

      </div>

      <div
        className="text-2xl
        grid grid-cols-1 md:grid-cols-2
        gap-4
        max-w-3xl
        mx-auto
        px-6
        mb-16"
      >
        <Link
          href="/work"
          className="
          flex items-center justify-center
          w-full h-14
          rounded-2xl
          font-bold
          text-white
          bg-cyan-500
          transition-all duration-300
          hover:bg-cyan-700
          hover:-translate-y-1
          hover:scale-[1.02]
          hover:shadow-2xl"
        >
          EXPLORE MY WORK 🛠️
        </Link>

        <Link
          href="/contacts"
          className=" text-2xl
          flex items-center justify-center
          w-full h-14
          rounded-2xl
          font-bold
          text-white
          bg-cyan-500
          transition-all duration-300
          hover:bg-cyan-700
          hover:-translate-y-1
          hover:scale-[1.02]
          hover:shadow-2xl"
        >
          GET IN TOUCH 📩
        </Link>
      </div>

    </section>
  );
}