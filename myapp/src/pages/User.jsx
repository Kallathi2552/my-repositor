import { useState, useEffect } from "react";
import "./User.css";

const products = [
  { name: "One piece Keychain", price: "₹299", img: "img1.jpg" },
  { name: "One piece bracelet", price: "₹599", img: "img2.jpg" },
  { name: "One piece Action Figure", price: "₹299", img: "img3.jpg" },
  { name: "Naruto Action Figure", price: "₹299", img: "img4.jpg" },
  { name: "Naruto Keychain", price: "₹299", img: "img5.jpg" },
  { name: "Naruto Skin", price: "₹299", img: "img6.jpg" },
];

const leafEmojis = ["🍂", "🍁"];

export default function User() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [leaves, setLeaves] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  // Theme effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Leaves animation
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setLeaves((prev) => [
        ...prev,
        {
          id,
          emoji: leafEmojis[Math.floor(Math.random() * leafEmojis.length)],
          left: Math.random() * 100,
          size: 16 + Math.random() * 22,
          duration: 6 + Math.random() * 6,
        },
      ]);
      setTimeout(
        () => setLeaves((prev) => prev.filter((leaf) => leaf.id !== id)),
        12000
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="user-page">
      {/* Leaves */}
      <div className="leaves">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="leaf"
            style={{
              left: `${leaf.left}vw`,
              fontSize: `${leaf.size}px`,
              animationDuration: `${leaf.duration}s`,
            }}
          >
            {leaf.emoji}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="header">
        <span className="hamburger" onClick={() => setSidebarOpen(true)}>
          ☰
        </span>
        <h1>Products</h1>
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""} ${darkMode ? "dark" : ""}`}>
        <div className="user-info">
          {currentUser ? (
            <>
              <h3>{currentUser === "admin" ? "Admin" : currentUser.username}</h3>
              <p>{currentUser === "admin" ? "admin@example.com" : currentUser.email}</p>
            </>
          ) : (
            <h3>Guest</h3>
          )}
        </div>
        <a href="#">Inbox</a>
        <a href="#">Received</a>
        <a href="/login" className="logout">
          Logout
        </a>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Products Grid */}
      <div className="products">
        {products.map((product, idx) => (
          <div key={idx} className="card">
            <a
              href={`/product?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(
                product.price
              )}&img=${product.img}`}
            >
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <span>{product.price}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
