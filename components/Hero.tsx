import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <div
        className="
        mx-auto
        grid
        min-h-[80vh]
        max-w-6xl
        items-center
        gap-12
        px-6
        py-20
        lg:grid-cols-2
      "
      >

        {/* LEFT SIDE */}
        <div className="contents lg:block">

          {/* NAME */}
          <h1
            className="
            order-1
            text-center lg:text-left
            text-5xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            font-bold
            mb-6
            opacity-100
            translate-y-4
            animate-[fadeDown_1.6s_ease-out_forwards]
            lg:order-none
          "
          >
            César Dianov
          </h1>

          {/* SOFTWARE ENGINEER */}
          <p
            className="
            order-2
            mx-auto lg:mx-0
            mb-6
            inline-flex items-center gap-3
            rounded-3xl
            border-2 border-cyan-500
            px-5 py-2
            text-sm sm:text-base md:text-lg
            font-bold
            text-gray-600
            dark:text-white
            opacity-0
            translate-y-4
            animate-[fadeIn_0.8s_ease-out_forwards]
            lg:order-none
          "
          >
            Computer Science and Engineering Student @ IST

            <span className="relative flex h-3 w-3">
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative h-3 w-3 rounded-full bg-green-500" />
            </span>
          </p>

          {/* PHOTO - MOBILE ONLY POSITION */}
          <div
            className="
            order-3
            flex
            justify-center
            mb-8
            lg:order-none
            lg:hidden
            opacity-100
            translate-y-4
            animate-[fadeIn_1s_ease-out_forwards]
          "
          >
            <Image
              src="/cesar1.png"
              alt="César Dianov"
              width={400}
              height={400}
              className="
              w-60 h-60
              sm:w-72 sm:h-72
              md:w-80 md:h-80
              rounded-full
              shadow-2xl
              shadow-gray-500
              dark:shadow-gray-900
              transition-all
              duration-300
              hover:-translate-y-1
              hover:scale-[1.02]
            "
            />
          </div>

          {/* DESCRIPTION */}
          <p
            className="
            order-4
            mx-auto lg:mx-0
            mt-8
            max-w-2xl
            text-left
            text-base sm:text-lg md:text-xl
            leading-relaxed
            text-gray-600
            dark:text-gray-300
            lg:order-none
          "
          >
            I am a Computer Science and Engineering student at Instituto
            Superior Técnico, preparing to begin the final year of my degree.
            I am passionate about software development, artificial
            intelligence, databases, and problem-solving.
          </p>

          {/* BUTTONS */}
          <div
            className="
            order-5
            mt-8
            flex
            flex-col
            sm:flex-row
            justify-center
            lg:justify-start
            gap-4
            lg:order-none
          "
          >
            <Link
              href="/work"
              className="
              flex
              h-14
              items-center
              justify-center
              rounded-2xl
              px-7
              font-bold
              text-white
              bg-cyan-500
              transition-all
              duration-300
              hover:bg-cyan-700
              hover:-translate-y-1
            "
            >
              EXPLORE MY WORK 🛠️
            </Link>

            <Link
              href="/contacts"
              className="
              flex
              h-14
              items-center
              justify-center
              rounded-2xl
              px-7
              font-bold
              text-cyan-600
              dark:text-cyan-400
              border-2
              border-cyan-500
              transition-all
              duration-300
              hover:bg-cyan-500
              hover:text-white
              hover:-translate-y-1
            "
            >
              GET IN TOUCH 📩
            </Link>
          </div>

        </div>

        {/* RIGHT SIDE - DESKTOP ONLY */}
        <div
          className="
          hidden
          lg:flex
          justify-center
          lg:justify-end
          opacity-100
          translate-y-4
          animate-[fadeIn_1s_ease-out_forwards]
        "
        >
          <Image
            src="/cesar1.png"
            alt="César Dianov"
            width={400}
            height={400}
            className="
            w-60 h-60
            sm:w-72 sm:h-72
            md:w-80 md:h-80
            lg:w-96 lg:h-96
            rounded-full
            shadow-2xl
            shadow-gray-500
            dark:shadow-gray-900
            transition-all
            duration-300
            hover:-translate-y-1
            hover:scale-[1.02]
          "
          />
        </div>

      </div>
    </section>
  );
}

