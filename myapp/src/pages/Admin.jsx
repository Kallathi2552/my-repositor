import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fbs = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(fbs);
  }, []);

  const deleteFeedback = (id) => {
    const updated = feedbacks.filter(f => f.id !== id);
    setFeedbacks(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
  };

  const replyFeedback = (id) => {
    const reply = prompt("Enter your reply:");
    if(!reply) return;
    alert(`Reply sent for feedback id ${id}: ${reply}`);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </header>
      <div>
        <h2 className="text-xl mb-4">User Feedbacks</h2>
        {feedbacks.length === 0 ? (
          <p>No feedbacks yet.</p>
        ) : (
          feedbacks.map(fb => (
            <div key={fb.id} className="bg-gray-800 p-4 rounded mb-2 flex justify-between items-center">
              <div>
                <strong>{fb.user}:</strong> {fb.message}
              </div>
              <div className="flex gap-2">
                <button onClick={() => replyFeedback(fb.id)} className="bg-green-500 px-3 py-1 rounded">Reply</button>
                <button onClick={() => deleteFeedback(fb.id)} className="bg-red-500 px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
