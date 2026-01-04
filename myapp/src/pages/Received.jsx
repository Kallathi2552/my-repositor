import { useEffect, useState } from "react";

const Received = () => {
  const [replies, setReplies] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setReplies(JSON.parse(localStorage.getItem("adminReplies")) || []);
    setFeedbacks(JSON.parse(localStorage.getItem("feedbacks")) || []);
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  const userReplies = replies.filter((r) => {
    const feedback = feedbacks[r.feedbackIndex];
    return (
      feedback &&
      currentUser &&
      feedback.email === currentUser.email
    );
  });

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
        Admin Replies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {userReplies.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 mt-8">
            {currentUser ? "No replies from admin yet." : "No replies available."}
          </p>
        ) : (
          userReplies.map((r, i) => {
            const feedback = feedbacks[r.feedbackIndex];
            if (!feedback) return null;

            return (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={feedback.img || "placeholder.jpg"}
                  alt="Product"
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-blue-500 font-semibold text-lg">{feedback.name}</h3>
                <span className="text-gray-500 text-sm block mb-2">
                  Rating: {feedback.rating}
                </span>
                <p className="text-sm">User Message: {feedback.message}</p>
                <p className="text-sm font-semibold mt-2">Admin Reply: {r.reply}</p>
                <small className="block mt-2 text-gray-400">Replied on: {r.date}</small>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Received;
