export default function cv(){
    return(
        <section className="relative min-h-screen">

            <p className=" text-center mt-30 text-5xl font-bold opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                CV
            </p>

            <div className="flex justify-center text-center mt-10">

                <p className="mt-10 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                    If Your browser does not support PDFs.
                </p>
                <a href="/cv.pdf" download className="mt-10 font-bold underline decoration-dotted opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                    Download CV
                </a>     

            </div>

        <iframe
            src="/cv.pdf "
            className="w-3/4 h-screen mx-auto mt-10 mb-20 opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]"
        />            
        </section>
    );
}