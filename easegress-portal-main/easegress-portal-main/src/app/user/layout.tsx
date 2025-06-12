"use client";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSun, FaMoon } from "react-icons/fa";
import Image from "next/image";
import logo from "../../asserts/easegress.svg";
import "./user.css";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";


export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div>
      <header className="header">
        <div className="logo">
          <Image src={logo} alt="logo" width={32} height={32} />
          <span style={{ marginLeft: 8 }}>AR Hotel</span>
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link
            href="/user/home"
            onClick={closeMenu}
            className={pathname === "/user/home" ? "active" : ""}
          >
            Trang chủ
          </Link>
          <Link
            href="/user/booking"
            onClick={closeMenu}
            className={pathname === "/user/booking" ? "active" : ""}
          >
            Đặt phòng
          </Link>
          <Link
            href="/user/rules"
            onClick={closeMenu}
            className={pathname === "/user/rules" ? "active" : ""}
          >
            Nội quy
          </Link>
          <Link
            href="/user/info"
            onClick={closeMenu}
            className={pathname === "/user/info" ? "active" : ""}
          >
            Thông tin
          </Link>

          {/* Đăng xuất (mobile) */}
          <div className="logout mobile-only" onClick={handleLogout}>
            <FiLogOut size={20} />
            <span style={{ marginLeft: 6 }}>Đăng xuất</span>
          </div>

          {/* Theme Toggle (mobile) */}
          <div className="theme-toggle mobile-only" style={{ marginTop: 12 }}>
            <input
              type="checkbox"
              id="toggle-mobile"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <label htmlFor="toggle-mobile" className="slider">
              <FaSun className="icon sun" />
              <FaMoon className="icon moon" />
              <span className="ball" />
            </label>
          </div>
        </nav>

        <div className="actions">
          <div className="theme-toggle">
            <input
              type="checkbox"
              id="toggle"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <label htmlFor="toggle" className="slider">
              <FaSun className="icon sun" />
              <FaMoon className="icon moon" />
              <span className="ball" />
            </label>
          </div>

          <div className="logout" onClick={handleLogout} title="Đăng xuất">
            <FiLogOut size={20} />
          </div>
        </div>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}

      <main style={{ padding: "2rem", marginTop: "70px" }}>{children}</main>
   

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3>AR Hotel</h3>
            <p>22/2 Đường Bình Thung, Bình An, Tp. Dĩ An, Đồng Nai</p>
            <p>📞 0987654321</p>
            <p style={{ marginTop: 12, fontStyle: "italic" }}>
              &ldquo;Trải nghiệm sang trọng, kết nối tâm hồn&rdquo;
            </p>
          </div>
          <div className="footer-right">
            <h4>Theo dõi chúng tôi</h4>
           <div className="social-icons">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebookF size={20} />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram size={20} />
  </a>
  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
    <FaYoutube size={20} />
  </a>
</div>

          </div>
        </div>
      </footer>
    </div>
  );
}
