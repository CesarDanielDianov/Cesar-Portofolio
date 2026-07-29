export default function Footer() {
  return (
    <footer className=" px-8 py-6 text-black dark:text-white ">
      
      <div className="flex justify-between">

        <p className="text-1xl">
          © {new Date().getFullYear()} César Dianov — All rights reserved.
        </p>

        <div className="flex gap-10 ">
          <a href="https://github.com/CesarDanielDianov" className="hover:text-cyan-500 transition-colors duration-300" >
            GitHub
          </a>

          <a href="https://www.linkedin.com/in/c%C3%A9sar-dianov-91b3993a0/" className="hover:text-cyan-500 transition-colors duration-300">
            LinkedIn
          </a>

        </div>

      </div>
    </footer>
  );
}