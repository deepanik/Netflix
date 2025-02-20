import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { DEFAULT_AVATAR } from '../utils/avatarUtils';

const PROFILE_NAMES = ['Deep'];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profiles] = useState(() => 
    PROFILE_NAMES.map(name => ({
      name,
      avatar: DEFAULT_AVATAR
    }))
  );
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAuthPage) return null;

  return (
    <>
      <div className="fixed top-0 z-[99] w-full h-[70px] bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <nav 
        className={`fixed top-0 z-[100] w-full h-[68px] flex items-center transition-colors duration-500 ${
          isScrolled ? 'bg-[#141414]' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between w-full px-4 md:px-[60px]">
          {/* Left Section */}
          <div className="flex items-center">
            <Link to="/" className="shrink-0 mr-[25px]">
              <svg
                viewBox="0 0 111 30"
                className="h-[32px] w-auto fill-[#e50914]"
                aria-hidden="true"
                focusable="false"
              >
                <g>
                  <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
                </g>
              </svg>
            </Link>
            
            {/* Main Navigation - Desktop */}
            <div className="hidden md:flex items-center">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/tv-shows" className="nav-link">TV Shows</Link>
              <Link to="/movies" className="nav-link">Movies</Link>
              <Link to="/new" className="nav-link">New & Popular</Link>
              <Link to="/my-list" className="nav-link">My List</Link>
              <Link to="/browse" className="nav-link">Browse by Languages</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            <button className="text-white hover:text-[#e5e5e5] transition-colors p-[10px]">
              <MagnifyingGlassIcon className="h-[20px] w-[20px]" />
            </button>
            
            <Link to="/kids" className="hidden md:block nav-link">
              Kids
            </Link>

            <button className="text-white hover:text-[#e5e5e5] transition-colors p-[10px] relative">
              <BellIcon className="h-[20px] w-[20px]" />
              <span className="absolute top-[2px] right-[2px] bg-[#e50914] text-white text-[11px] font-bold h-[18px] min-w-[18px] rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="group relative ml-[10px]">
              <div className="flex items-center gap-2 cursor-pointer py-[2px]">
                <img
                  src={profiles[0].avatar}
                  alt="Profile"
                  className="h-[32px] w-[32px] rounded"
                />
                <div className="border-t-[4px] border-t-white border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent transition-transform duration-200 group-hover:rotate-180 mt-[2px]" />
              </div>

              <div className="absolute right-0 top-full pt-[8px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-[rgba(0,0,0,0.9)] border-t border-t-white/20 min-w-[220px] py-[10px] shadow-xl">
                  {profiles.map((profile, index) => (
                    <Link 
                      key={index}
                      to="/profile" 
                      className="flex items-center px-[10px] py-[5px] text-[13px] text-white hover:underline"
                    >
                      <img src={profile.avatar} alt={profile.name} className="h-[32px] w-[32px] rounded mr-[10px]" />
                      <span>{profile.name}</span>
                    </Link>
                  ))}
                  <Link to="/manage-profiles" className="dropdown-link">
                    Manage Profiles
                  </Link>
                  <Link to="/account" className="dropdown-link">
                    Account
                  </Link>
                  <Link to="/help" className="dropdown-link">
                    Help Center
                  </Link>
                  <div className="h-[1px] bg-[#737373] my-[9px]" />
                  <Link to="/signout" className="dropdown-link">
                    Sign out of Netflix
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-[#141414] z-[90] transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-[80px] px-8">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-[16px] text-white">Home</Link>
            <Link to="/tv-shows" className="text-[16px] text-white">TV Shows</Link>
            <Link to="/movies" className="text-[16px] text-white">Movies</Link>
            <Link to="/new" className="text-[16px] text-white">New & Popular</Link>
            <Link to="/my-list" className="text-[16px] text-white">My List</Link>
            <Link to="/browse" className="text-[16px] text-white">Browse by Languages</Link>
            <Link to="/kids" className="text-[16px] text-white">Kids</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar; 