import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();
  const products = [
    { id: 1, name: "Laptop", price: 50000, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Headphones", price: 3000, img: "https://via.placeholder.com/150" },
    { id: 3, name: "Smartphone", price: 25000, img: "https://via.placeholder.com/150" },
  ];

  const [likes, setLikes] = useState(() => {
    return JSON.parse(localStorage.getItem("likes")) || {};
  });

  const handleLike = (id) => {
    const newLikes = { ...likes, [id]: !likes[id] };
    setLikes(newLikes);
    localStorage.setItem("likes", JSON.stringify(newLikes));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <header className="flex justify-between items-center mb-6">
        <button onClick={() => navigate("/user")} className="bg-cyan-400 text-black px-4 py-2 rounded">Back</button>
        <h1 className="text-2xl font-bold">Products</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-800 rounded p-4 flex flex-col items-center gap-3">
            <img src={p.img} alt={p.name} className="w-32 h-32 object-cover rounded" />
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>₹{p.price}</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleLike(p.id)}
                className={`px-4 py-1 rounded ${likes[p.id] ? "bg-green-500" : "bg-gray-600"}`}
              >
                {likes[p.id] ? "Liked" : "Like"}
              </button>
              <button
                onClick={() => navigate("/feedback")}
                className="bg-cyan-400 text-black px-4 py-1 rounded"
              >
                Feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
