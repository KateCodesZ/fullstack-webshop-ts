interface HeroProps {
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ children }) => {
  return (
    <section className="dark:bg-gray-900 bg-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-stretch justify-between px-6 lg:px-0 pt-2 pb-8 lg:pt-4 lg:pb-20">
        {/* Left: Image */}
        <div className="relative lg:w-1/2 overflow-hidden">
          <div className="hidden lg:flex justify-end items-center bg-floralwhite dark:bg-gray-800 w-full h-full">
            <div className="w-full max-w-[90%]">
              <img
                src="src\assets\images\herodesktop.webp"
                alt="Modern chairs in stylish interior"
                className="w-full object-cover h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Mobile Image */}
          <div className="block lg:hidden">
            <img
              src="src\assets\images\herodesktop.webp"
              alt="Modern chairs in stylish interior"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="bg-floralwhite dark:bg-gray-800 lg:w-1/2 lg:ml-12 lg:p-14 p-8 flex items-center">
          <div className="w-full">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-semibold text-marianblue dark:text-white leading-tight">
              INREDNING
            </h1>
            <p className="text-[18px] sm:text-[20px] font-semibold text-marianblue dark:text-gray-400 uppercase">
              FÖR ATT SKAPA KOMFORT I DITT HEM
            </p>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              Små detaljer, stor skillnad – hitta din stil här. Hos Casa Mia hittar du noggrant
              utvalda produkter som gör ditt hem varmt och välkomnande.
            </p>

            {/* Button or children */}
            {children && <div className="mt-8 w-fit">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
