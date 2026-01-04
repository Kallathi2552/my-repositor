import { useEffect, useState } from "react";

const Inbox = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Load feedbacks and user
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    setFeedbacks(JSON.parse(localStorage.getItem("feedbacks")) || []);
  }, []);

  // Leaf animation
  useEffect(() => {
    const leavesContainer = document.getElementById("leaves");
    const leafEmojis = ["🍂", "🍁"];
    const interval = setInterval(() => {
      const leaf = document.createElement("div");
      leaf.className =
        "absolute top-0 opacity-80 animate-fall pointer-events-none";
      leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
      leaf.style.left = Math.random() * 100 + "vw";
      leaf.style.fontSize = 16 + Math.random() * 24 + "px";
      leaf.style.animationDuration = 10 + Math.random() * 6 + "s";
      leavesContainer.appendChild(leaf);
      setTimeout(() => leaf.remove(), 16000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const userFeedbacks = feedbacks.filter(
    (f) => f.email === (currentUser && currentUser.email)
  );

  return (
    <div className="relative min-h-screen p-6 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <div id="leaves" className="fixed inset-0 z-0 pointer-events-none"></div>

      <div
        className="cursor-pointer text-blue-500 font-medium mb-5 flex items-center gap-2"
        onClick={() => (window.location.href = "/user")}
      >
        ← Back to Products
      </div>

      <h1 className="text-center mb-6 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-sky-400 to-blue-600 shadow-lg inline-block">
        User Feedback Inbox
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {userFeedbacks.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 mt-8">
            {currentUser
              ? "You have not sent any feedback yet."
              : "Please log in to view your feedbacks."}
          </p>
        ) : (
          userFeedbacks.map((f, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-2xl"
              onClick={() => setModalData(f)}
            >
              <img
                src={f.img || "placeholder.jpg"}
                alt="Product"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-blue-500 font-semibold text-lg">{f.name}</h3>
              <span className="text-gray-500 text-sm block mb-2">
                Rating: {f.rating}
              </span>
              <p className="text-sm">{f.message.substring(0, 50)}{f.message.length > 50 ? "..." : ""}</p>
              <small className="block mt-2 text-gray-400">Email: {f.email}</small>
              <small className="block text-gray-400">Date: {f.date}</small>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setModalData(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg"
              onClick={() => setModalData(null)}
            >
              Close
            </button>
            <img
              src={modalData.img || "placeholder.jpg"}
              alt="Product"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="text-blue-500 font-semibold text-lg mb-2">{modalData.name}</h3>
            <span className="text-green-600 font-bold block mb-2">Rating: {modalData.rating}</span>
            <p className="mb-2">{modalData.message}</p>
            <small className="block text-gray-500">Email: {modalData.email}</small>
            <small className="block text-gray-500">Date: {modalData.date}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
