import Image from "next/image";

import Link from "next/link";

export default function Hero() {
  return (
  <section className="relative min-h-screen">

    <div  className="text-center">

      <h1 className="mt-30 text-7xl font-bold opacity-100 translate-y-4 animate-[fadeDown_1.6s_ease-out_forwards]">
          César Dianov
      </h1>

    <p className="flex items-center pl-9 font-bold h-10 rounded-3xl border border-blue-300 gap-3 w-120 mx-auto mt-6 mb-10 text-gray-600
        opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_forwards]">
      Computer Science and Engineering Student @ IST
      
      <span className="relative flex h-3 w-3">
        <span className="absolute flex h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative flex h-3 w-3 rounded-full bg-green-500"></span>
      </span>
    </p>

      <Image  className="mx-auto mt-10 rounded-full shadow-2xl shadow-gray-600
      opacity-100 translate-y-4 animate-[fadeIn_1.0s_ease-out_forwards]
      transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
        src="/cesar1.png"
        alt="nome do cesar"
        width={240}
        height={240}
      />

      <p className="mx-auto mt-12 max-w-3xl px-10 text-left text-xl leading-relaxed"> 
        I am a Computer Science and Engineering student at Instituto Superior Técnico, preparing to begin the final year of my degree. I am passionate about software development, artificial intelligence, databases, and problem-solving.
        Through academic and personal projects, I have gained experience with various programming languages and technologies while strengthening my technical and teamwork skills.
      </p>

      <p className="mx-auto mt-3 mb-10 max-w-3xl px-10 text-left text-xl leading-relaxed">
        I am currently seeking opportunities to apply my knowledge, gain professional experience, and continue growing as a software engineer.
      </p>

    </div> 

    <div className="grid grid-cols-2 max-w-xl mx-auto mb-20 text-xl ">
        <Link href="/work "  className="flex items-center pl-10 font-bold h-15 rounded-2xl border gap-3 w-70 mx-auto  mb-10 text-white bg-orange-400 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">EXPLORE MY WORK</Link>
    
        <Link href="/contacts "  className="flex items-center pl-16 font-bold h-15 rounded-2xl border gap-3 w-70 mx-auto  mb-10 text-white bg-orange-400 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">GET IN TOUCH</Link>
    </div>


  </section>
  );
}