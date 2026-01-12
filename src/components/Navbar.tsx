
import { useState } from "react";
import { navItems } from "../lib/navItems";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleScroll = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-black/40 backdrop-blur">
        <h1 className="text-white text-lg font-semibold">CHARAN</h1>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="text-white text-2xl"
        >
          ☰
        </button>
      </header>

      {/* Sidebar overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-[#0b0f1a] z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-6">
          <span className="text-white text-sm uppercase">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Menu items */}
        <nav className="px-6 space-y-6">
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleScroll(item.href)}
                className="text-left w-full text-white text-2xl font-light hover:opacity-70"
              >
                {item.label}
              </button>

              {/* Sub menu (Projects → YouTube links) */}
              {item.children && (
                <div className="ml-4 mt-3 space-y-2">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleScroll(child.href)}
                      className="block text-sm text-gray-400 hover:text-white"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        
      </aside>
    </>
  );
};

export default Navbar;
