import { Link, NavLink, useNavigate } from 'react-router-dom';
import { memo, useMemo, useState } from 'react';
import MenuIcon from '../assets/icons/Menu.svg?react';
import HeartIcon from '../assets/icons/Heart.svg?react';
import UserIcon from '../assets/icons/User.svg?react';
import CartIcon from '../assets/icons/Cart.svg?react';
import Logo from '../assets/icons/Logo.svg?react';
import Logo2 from '../assets/icons/Logo2.svg?react';
import SearchIcon from '../assets/icons/Search.svg?react';
import Menu from './Menu';
import { useAuth } from '../context/useAuth';

// Using React 19+ compiler optimizations (when available)
const Navbar = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
      >
        <nav aria-label="Primary Navigation">
          {/* Mobile Navigation */}
          <div className="flex justify-between items-center px-3 py-2 lg:hidden">
            <div className="flex items-center gap-4">
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
                to="/search"
                aria-label="Sök"
                className={navLinkClass}
              >
                <SearchIcon className="w-7 h-7 p-1" />
              </NavLink>
            </div>

            <Link to="/" aria-label="Hem">
              <Logo2 className="h-10 w-auto" />
            </Link>

            <div className="flex items-center gap-4">
              <NavLink
                to="/favorites"
                aria-label="Favoriter"
                className={navLinkClass}
              >
                <HeartIcon className="w-7 h-7 p-1" />
              </NavLink>
              {user ? (
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className={navLinkClass({ isActive: false })}
                  aria-label="Logga ut"
                >
                  <UserIcon className="w-7 h-7 p-1" />
                  <span className="sr-only md:not-sr-only">Logga ut</span>
                </button>
              ) : (
                <NavLink
                  to="/auth"
                  aria-label="Logga in"
                  className={navLinkClass}
                >
                  <UserIcon className="w-7 h-7 p-1" />
                  <span className="sr-only md:not-sr-only">Logga in</span>
                </NavLink>
              )}
              <NavLink
                to="/cart"
                aria-label="Varukorg"
                className={navLinkClass}
              >
                <CartIcon className="w-7 h-7 p-1" />
              </NavLink>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between container mx-auto h-16">
            <div className="flex items-center gap-8">
              {/* Button menu */}
              <button
                aria-label="Öppna menu"
                className="flex items-center cursor-pointer"
                onClick={() => setMenuOpen(true)}
                type="button"
              >
                <MenuIcon className="w-6 h-6 mr-2" />
                <span className="cursor-pointer sr-only md:not-sr-only">Menu</span>
              </button>

              <form role="search" className="relative">
                <input
                  type="search"
                  placeholder="Sök..."
                  className="pl-10 pr-4 py-2 w-64 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-mahogany/50 focus:border-mahogany placeholder-gray-400 text-gray-900 bg-transparent"
                  aria-label="Search input"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </form>
            </div>

            <Link
              to="/"
              aria-label="Hem"
              className="text-2xl font-display"
            >
              <Logo className="h-12 w-auto" />
            </Link>

            <div className="flex items-center gap-8">
              <NavLink
                to="/favorites"
                className={navLinkClass}
              >
                <HeartIcon className="w-6 h-6 mr-2" />
                <span className="sr-only md:not-sr-only">Favoriter</span>
              </NavLink>
              {user ? (
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className={navLinkClass({ isActive: false })}
                  aria-label="Logga ut"
                >
                  <UserIcon className="w-6 h-6 mr-2" />
                  <span className="sr-only md:not-sr-only">Logga ut</span>
                </button>
              ) : (
                <NavLink
                  to="/auth"
                  className={navLinkClass}
                >
                  <UserIcon className="w-6 h-6 mr-2" />
                  <span className="sr-only md:not-sr-only">Logga in</span>
                </NavLink>
              )}
              <NavLink
                to="/cart"
                className={navLinkClass}
              >
                <CartIcon className="w-6 h-6 mr-2" />
                <span className="sr-only md:not-sr-only">Varukorg</span>
                {/* Cart counter would go here */}
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
});

export default Navbar;
