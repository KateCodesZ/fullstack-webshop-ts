import { Link } from 'react-router-dom';
import MenuIcon from '../assets/icons/Menu.svg?react';
import HeartIcon from '../assets/icons/Heart.svg?react';
import UserIcon from '../assets/icons/User.svg?react';
import CartIcon from '../assets/icons/Cart.svg?react';
import Logo from '../assets/icons/Logo.svg?react';
import Logo2 from '../assets/icons/Logo2.svg?react';
import SearchIcon from '../assets/icons/Search.svg?react';

const Navbar = () => {
  return (
    <header className="max-w-screen xl:px-10 mx-auto sticky top-0 z-50 bg-white border-b border-gray-300" role="banner">
      <nav aria-label="Primary Navigation">
        {/* Mobile Navbar */}
        <div className="flex justify-between items-center px-3 py-2 lg:hidden">
          <div className="flex items-center space-x-2">
            <Link to="/menu" aria-label="Öppna Meny" className="flex items-center">
              <MenuIcon className="w-6 h-6 fill-current stroke-current" />
            </Link>
            <Link to="/search" aria-label="SÖK" className="flex items-center">
              <SearchIcon className="w-6 h-6" />
            </Link>
          </div>

          <div className="flex items-center">
            <Link to="/" aria-label="Hem">
              <Logo2 />
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/favorites" aria-label="Favoriter" className="flex items-center">
              <HeartIcon className="w-6 h-6" />
            </Link>
            <Link to="/login" aria-label="Logga in" className="flex items-center">
              <UserIcon className="w-6 h-6" />
            </Link>
            <Link to="/cart" aria-label="Varukorg" className="flex items-center">
              <CartIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-between container mx-auto h-[65px]">
          <div className="flex items-center space-x-6">
            <Link to="/menu" aria-label="Öppna Meny" className="flex items-center">
              <MenuIcon className="w-6 h-6 mr-2" />
              <span>MENY</span>
            </Link>

            <div className="relative">
              <input
                type="text"
                placeholder="SÖK"
                className="pl-10 pr-4 py-1 w-64 border rounded-full text-sm focus:outline-none focus:ring-[0.5px] focus:ring-[var(--color-mahogany)] focus:border-[var(--color-mahogany)] placeholder-gray-400 text-gray-600 transition-all duration-200"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>

          <div>
            <Link to="/" aria-label="Hem">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/favorites" aria-label="Favoriter" className="flex items-center">
              <HeartIcon className="w-6 h-6 mr-2" />
              <span>FAVORITER</span>
            </Link>
            <Link to="/login" aria-label="Logga in" className="flex items-center">
              <UserIcon className="w-6 h-6 mr-2" />
              <span>LOGGA IN</span>
            </Link>
            <Link to="/cart" aria-label="Varukorg" className="flex items-center">
              <CartIcon className="w-6 h-6 mr-2" />
              <span>VARUKORG</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
