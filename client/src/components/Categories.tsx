import { Link } from 'react-router-dom';
import keramik from '../assets/images/keramik.png';
import lampor from '../assets/images/lampor.png';
import ljus from '../assets/images/ljus.png';
import vaser from '../assets/images/vaser.png';
import textil from '../assets/images/textil.png';

const Categories: React.FC = () => {
  const categories = [
    { name: 'KERAMIK', image: keramik },
    { name: 'LAMPOR', image: lampor },
    { name: 'LJUS', image: ljus },
    { name: 'VASER', image: vaser },
    { name: 'TEXTIL', image: textil }
  ];

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center my-6 md:m-6 px-8 lg:px-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat-alt text-marianblue font-semibold">
          Produkter
        </h2>
        <Link
          to="/shop"
          className="text-gray-600 font-medium underline hover:text-gray-800"
        >
          VISA ALLA
        </Link>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="grid grid-cols-5 gap-4 min-w-max px-8 my-6 mb-10">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center text-center cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="sm:h-20 w-20 md:h-30 md:w-30 object-contain"
              />
              <span className="mt-2 text-xs text-gray-600 md:text-base font-medium">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
