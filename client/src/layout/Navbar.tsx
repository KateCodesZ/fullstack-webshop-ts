import { Link, NavLink } from 'react-router-dom';
import { memo, useMemo, useState } from 'react';
import MenuIcon from '../assets/icons/Menu.svg?react';
import HeartIcon from '../assets/icons/Heart.svg?react';
import UserIcon from '../assets/icons/User.svg?react';
import CartIcon from '../assets/icons/Cart.svg?react';
import Logo from '../assets/icons/Logo.svg?react';
import Logo2 from '../assets/icons/Logo2.svg?react';
import Menu from './Menu';
import { useAuth } from '../context/useAuth';
import { useCart } from '../hooks/useCart';
import SearchBar from '../components/SearchBar';

// Using React 19+ compiler optimizations (when available)
const Navbar = memo(({ onCartClick }: { onCartClick: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Using React 19+ cache() for memoization when available
  const navLinkClass = useMemo(
    () =>
      ({ isActive }: { isActive: boolean }) =>
        `flex items-center group ${isActive ? 'text-mahogany' : 'text-gray-900'} transition-colors`,
    []
  );

  return (
    <>
      {/* The menu is always in the DOM, controlled via menuOpen */}
      <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />
      <header
        className="max-w-screen xl:px-10 mx-auto sticky top-0 z-50 bg-white border-b border-gray-300 supports-[backdrop-filter]:backdrop-blur-lg"
        role="banner"
      >        <nav aria-label="Primary Navigation">
          {/* Mobile Navigation */}
          <div className="flex justify-between items-center px-4 py-2 lg:hidden"><div className="flex items-center gap-4">
              {/* Button to open the menu */}
              <button
                aria-label="Öppna menu"
                className="flex items-center"
                onClick={() => setMenuOpen(true)}
                type="button"
              >
                <MenuIcon className="w-7 h-7 p-1" />
              </button>
              <NavLink
                to="/favorites"
                aria-label="Favoriter"
                className={navLinkClass}
              >
                <HeartIcon className="w-7 h-7 p-1" />
              </NavLink>
            </div>
            <Link to="/" aria-label="Hem">
              <Logo2 className="h-10 w-auto text-marianblue fill-marianblue" />
            </Link>
            <div className="flex items-center gap-2">
              {user ? (
                <NavLink
                  to="/minasidor"
                  aria-label="Mina sidor"
                  className={navLinkClass}
                >
                  <UserIcon className="w-7 h-7 p-1" />
                </NavLink>
              ) : (
                <NavLink
                  to="/auth"
                  aria-label="Logga in"
                  className={navLinkClass}
                >
                  <UserIcon className="w-7 h-7 p-1" />
                </NavLink>
              )}
              <button
                aria-label="Varukorg"
                className={navLinkClass({ isActive: false }) + ' relative'}
                onClick={onCartClick}
                type="button"
              >
                <CartIcon className="w-7 h-7 p-1" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-marianblue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between container mx-auto h-16 px-4">
            <div className="flex items-center gap-8">
              {/* Button menu */}
              <button
                aria-label="Öppna menu"
                className="flex items-center cursor-pointer"
                onClick={() => setMenuOpen(true)}
                type="button"
              >
                <MenuIcon className="w-7 h-7 mr-2" />
                <span className="cursor-pointer sr-only md:not-sr-only">Menu</span>
              </button>
              {/* Use DRY SearchBar component */}
              <div className="relative">
                <SearchBar />
              </div>
            </div>
            <Link
              to="/"
              aria-label="Hem"
              className="text-2xl font-display"
            >
              <Logo className="h-12 w-auto text-marianblue fill-marianblue" />
            </Link>
            <div className="flex items-center gap-8">
              <NavLink
                to="/favorites"
                className={navLinkClass}
              >
                <HeartIcon className="w-7 h-7 mr-2" />
                <span className="sr-only md:not-sr-only">Favoriter</span>
              </NavLink>
              {user ? (
                <NavLink
                  to="/minasidor"
                  className={navLinkClass}
                  aria-label="Mina sidor"
                >
                  <UserIcon className="w-7 h-7 mr-2" />
                  <span className="sr-only md:not-sr-only">Mina sidor</span>
                </NavLink>
              ) : (
                <NavLink
                  to="/auth"
                  className={navLinkClass}
                  aria-label="Logga in"
                >
                  <UserIcon className="w-7 h-7 mr-2" />
                  <span className="sr-only md:not-sr-only">Logga in</span>
                </NavLink>
              )}
              <button
                className={navLinkClass({ isActive: false }) + ' relative'}
                aria-label="Varukorg"
                onClick={onCartClick}
                type="button"
              >
                <span className="relative">
                  <CartIcon className="w-7 h-7 mr-2" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-0.5 bg-marianblue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span className="sr-only md:not-sr-only">Varukorg</span>
              </button>
            </div>
          </div>
        </nav>
      </header>
      {/* Mobile Search Bar - always visible below navbar */}
      <div className="lg:hidden">
        <div className="px-4 pt-2">
          <SearchBar fullWidth={true} />
        </div>
      </div>
    </>
  );
});

export default Navbar;
