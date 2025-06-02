import InstagramIcon from '../assets/icons/Instagram.svg?react';
import FacebookIcon from '../assets/icons/Facebook.svg?react';
import PinterestIcon from '../assets/icons/Pinterest.svg?react';
import LogoIcon from '../assets/icons/Logo.svg?react';

const Footer = () => {
  // Social media links data
  const socialLinks = [
    { icon: <InstagramIcon className="w-6 h-6" />, alt: 'Instagram' },
    { icon: <FacebookIcon className="w-6 h-6" />, alt: 'Facebook' },
    { icon: <PinterestIcon className="w-6 h-6" />, alt: 'Pinterest' }
  ];

  // Footer sections data
  const sections = [
    {
      title: 'Hjälp',
      links: ['Hitta butik', 'Öppet köp', 'Retur & reklamation', 'Kundservice', 'Personuppgiftspolicy']
    },
    {
      title: 'Sortiment',
      links: ['Keramik', 'Vaser', 'Textil', 'Ljus', 'Lampor']
    },
    {
      title: 'Om Casa Mia',
      links: ['Press', 'Jobba hos oss', 'Våra butiker', 'Hållbarhet']
    }
  ];

  return (
    <footer className="bg-marianblue text-floralwhite">
      <div className="max-w-screen-xl mx-auto px-8 py-2 sm:py-12 lg:px-36">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-42">
          {/* Dynamic sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-extrabold text-floralwhite mb-6">{section.title}</h2>
              <div className="flex flex-col space-y-4">
                {section.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href="#"
                    className="text-floralwhite hover:text-white/80 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Follow Us section */}
          <div>
            <h2 className="text-xl font-extrabold text-floralwhite mb-6">Följ oss</h2>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-floralwhite hover:text-white/80 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Logo and copyright */}
        <div className="flex flex-col items-center justify-center pt-1 sm:pt-12">
          <LogoIcon className=" text-floralwhite fill-floralwhite h-[10vh] md:h-[25vh] w-auto" />
          <p className="text-sm text-floralwhite/80 mt-4">© 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
