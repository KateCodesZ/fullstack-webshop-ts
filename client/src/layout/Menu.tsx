import { useEffect } from 'react';

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Menu = ({ isOpen, setIsOpen }: MenuProps) => {
  useEffect(() => {
    let originalOverflow = '';
    let originalPaddingRight = '';
    if (isOpen) {
      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  return (
    <>
      {/* Background dimming */}
      <div
        className={`fixed inset-0 z-[998] bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu */}
      <aside
        className={`fixed top-0 left-0 z-[999] h-screen w-[85%] bg-floralwhite shadow-lg transition-transform duration-400 p-5 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:w-[350px]`}
      >
        <div className="border-b border-gray-200 pb-4 mb-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-2 md:text-3xl text-marianblue">Menu</h1>
          <button
            className="border border-marianblue text-gray-700 px-4 py-2 text-base transition-colors hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Stäng
          </button>
        </div>

        <nav>
          <ul className="space-y-0">
            {['Sortiment', 'Nyheter', 'Sänkt pris', 'Villkor', 'Hitta butik'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block py-4 text-lg border-b border-gray-100 transition-colors hover:bg-gray-50 md:text-xl"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Menu;
