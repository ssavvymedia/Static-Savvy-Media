import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../data/navigation.js";
import { useActiveRoute } from "../../hooks/useActiveRoute.js";
import { cx } from "../../utils/helpers.js";
import ServicesMenu from "./ServicesMenu.jsx";
import LocationsMenu from "./LocationsMenu.jsx";
import IndustriesMenu from "./IndustriesMenu.jsx";

const MENU_COMPONENTS = {
  "/services/": ServicesMenu,
  "/locations/": LocationsMenu,
  "/industries/": IndustriesMenu,
};

export default function DesktopNav() {
  const { isActive, pathname } = useActiveRoute();
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);

  const close = useCallback(() => setOpenMenu(null), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (openMenu === null) return;

    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        close();
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenu, close]);

  return (
    <nav className="desktop-nav" ref={navRef} aria-label="Primary navigation">
      <ul className="desktop-nav__list">
        {NAV_LINKS.map((link) => {
          const MenuComponent = MENU_COMPONENTS[link.path];
          const active = isActive(link.path);
          const isOpen = openMenu === link.path;

          if (!MenuComponent) {
            return (
              <li
                key={link.path}
                className={cx("desktop-nav__item", active && "is-active")}
              >
                <Link
                  to={link.path}
                  className={cx("desktop-nav__link", active && "is-active")}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          }

          return (
            <li
              key={link.path}
              className={cx(
                "desktop-nav__item",
                active && "is-active",
                isOpen && "is-open",
              )}
            >
              <div className="desktop-nav__trigger">
                <Link
                  to={link.path}
                  className={cx("desktop-nav__link", active && "is-active")}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
                <button
                  type="button"
                  className={cx("desktop-nav__toggle", isOpen && "is-open")}
                  aria-label={`${link.label} submenu`}
                  aria-expanded={isOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenu(isOpen ? null : link.path);
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              <MenuComponent />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
