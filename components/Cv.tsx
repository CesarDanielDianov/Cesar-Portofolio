export default function CV() {
    return (
        <section className="relative min-h-screen px-4">

            <h1 className="mt-24 md:mt-30 text-center text-4xl sm:text-5xl md:text-6xl font-bold opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">
                CV
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-10 text-center opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]">

                <p>
                    If your browser does not support PDFs,
                </p>

                <a
                    href="/CV-CésarDianov.pdf"
                    download
                    className="font-bold underline decoration-dotted"
                >
                    download my CV.
                </a>

            </div>

            <iframe
                src="/CV-CésarDianov.pdf"
                className="w-full md:w-4/5 lg:w-3/4 h-[75vh] md:h-screen mx-auto mt-10 mb-20 rounded-xl shadow-lg opacity-100 translate-y-2 animate-[fadeDown_0.8s_ease-out_forwards]"
            />

        </section>
    );
}