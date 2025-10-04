import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import React from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "About", target: "about" },
    { label: "Projects", target: "projects" },
    { label: "Connect", target: "connect" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-md z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold text-primary">
          Charan Kumar
        </div>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <ScrollLink
              key={item.target}
              to={item.target}
              smooth={true}
              duration={500}
              className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
            >
              {item.label}
            </ScrollLink>
          ))}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background/90 backdrop-blur-md">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            {navItems.map((item) => (
              <li key={item.target}>
                <ScrollLink
                  to={item.target}
                  smooth={true}
                  duration={500}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                >
                  {item.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
