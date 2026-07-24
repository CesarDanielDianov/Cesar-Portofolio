export default function contacts(){
    return(
        <section className="relative min-h-screen">
            <div className="text-center font-bond mt-30">
                
            <h1 className="text-5xl font-bold opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]"> Contact me </h1>  
            <p className="text-2xl mt-20 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">Reach out to me on LinkedIn / Github</p>  
            </div>

            <div className="mt-10 flex justify-center gap-8">
                <a className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl "href="https://www.linkedin.com/in/c%C3%A9sar-dianov-91b3993a0/" >
                    <img src="/linkedin-83.png" alt="LinkedIn" className="w-15 h-15 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]" />
                </a>

                <a className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl" href="https://github.com/CesarDanielDianov" >
                    <img src="/github.png" alt="github" className="w-15 h-15 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]" />
                </a>
            </div>
            
            <div className="text-center  mt-20">
                <p className="text-gray-500 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]" >───────────── &nbsp; OR &nbsp; ─────────────</p>
                <p className="mt-20 text-2xl opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">Use my contact form </p>
            </div>
            


            <form className="w-120 mx-auto space-y-6 mt-10">
                <div>
                    <label className="font-bold">Name</label>

                    <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border p-4"
                    />
                </div>

                <div>
                    <label className="font-bold">Email</label>

                    <input
                    type="email"
                    placeholder="your@mail.com"
                    className="w-full rounded-xl border p-4"
                    />
                </div>

                <div>
                    <label className="font-bold">Message</label>

                    <textarea
                    rows={7}
                    placeholder="How can I help you?"
                    className="w-full rounded-xl border p-4"
                    />
                </div>

                <button
                    className="w-full rounded-xl bg-orange-500 text-white py-4 font-bold text-xl hover:bg-orange-600 transition"
                >
                    SEND MESSAGE →
                </button>
            </form>


        </section>
    );
}