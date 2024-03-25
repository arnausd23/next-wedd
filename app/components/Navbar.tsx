import { useEffect, useState } from "react";
import CloseIcon from "./Icons/CloseIcon";
import OpenIcon from "./Icons/OpenIcon";
import Image from "next/image";

interface Navlinks {
  href: string;
  label: string;
}

function Navbar({ logo, items }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<Navlinks[]>([]);

  const preventAnchorAdd = (e) => {
    e.preventDefault();
    document.getElementsByTagName("body")[0].scrollIntoView();
  };

  useEffect(() => {
    if (navLinks.length === 0) return;

    document.addEventListener(".menu-link", preventAnchorAdd);

    return () => {
      document.removeEventListener(".menu-link", preventAnchorAdd);
    };
  }, [navLinks]);

  useEffect(() => {
    const navLinks: Navlinks[] = [];
    items.forEach((item) => {
      navLinks.push({
        href: item.link,
        label: item.title,
      });
    });

    setNavLinks(navLinks);
  }, [items]);

  return (
    <>
      <header className="sm:px-8 px-4 py-2 z-10 w-full lg:fixed lg:bg-white lg:z-30 lg:top-0 lg:drop-shadow-md">
        <nav className="max-lg:flex justify-between items-center max-container">
          <ul className="flex lg:grid grid-cols-7 justify-center items-center gap-16 text-center">
            <a
              href="/"
              className="text-3xl font-bold "
              style={{ gridArea: "1/4" }}
            >
              <img
                className="w-20 my-0 mx-auto"
                src={logo}
                alt="Website logo"
              />
            </a>
            {navLinks.map((item) => (
              <li key={item.label} className="max-lg:hidden">
                <a
                  href={item.href}
                  className="menu-link font-montserrat leading-normal text-lg hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <OpenIcon />
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div>
          <nav className="fixed z-50 top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100">
            <div
              className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <CloseIcon />
            </div>
            <a
              href="/"
              className="text-3xl font-bold absolute top-3 left-1/2 -translate-x-1/2 lg:hidden"
            >
              <img className="w-28" src={logo} alt="Website logo" />
            </a>
            <ul className="bg-slate-100 pt-24 lg:hidden flex flex-col items-center justify-center h-full ">
              {navLinks.map((item) => (
                <li key={item.label} className="my-3">
                  <a
                    href={item.href}
                    className="menu-link font-montserrat leading-normal text-3xl"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
