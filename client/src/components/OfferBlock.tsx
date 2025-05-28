interface Props {
  imageSrc: string;
  imageAlt: string;
  subtitle?: string;
  title: string;
  description?: string;
  note?: string;
  buttonText?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

const OfferBlock: React.FC<Props> = ({
  imageSrc,
  imageAlt,
  subtitle,
  title,
  description,
  note,
  reverse = false,
  children,
}) => {
  return (
    <section className="bg-marianblue py-12">
      <div className={`
        container mx-auto px-6 lg:px-8 xl:px-4 max-w-5xl
        grid grid-cols-1 md:grid-cols-2 gap-8 items-center
        ${reverse ? 'md:flex-row-reverse' : ''}
      `}>
        {/* Text Section */}
        <div className={`
          bg-floralwhite h-full p-6 xl:p-4 flex flex-col items-center justify-center text-center
          ${reverse ? 'md:order-1' : 'md:order-2'}
        `}>
          {subtitle && (
            <h3 className="text-marianblue font-semibold text-xl lg:mt-4 lg:text-3xl">
              {subtitle}
            </h3>
          )}

          <h2 className="text-mahogany font-bold text-4xl md:text-5xl lg:mt-6">
            {title}
          </h2>

          <div className="mt-4 lg:mt-6">
            <p className="text-gray-700 lg:text-2xl">
              {description}
            </p>
          </div>

          {note && (
            <p className="text-sm text-gray-500 mt-4 lg:mt-6">
              {note}
            </p>
          )}

          {/* Button or children */}
          {children && (
            <div className="mt-6 lg:mt-8">
              {children}
            </div>
          )}
        </div>

        {/* Image Section */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`
            mx-auto block object-contain max-w-full h-auto
            ${reverse ? 'md:order-2' : 'md:order-1'}
          `}
        />
      </div>
    </section>
  );
};

export default OfferBlock;
