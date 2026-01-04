    import React, { useState } from "react";

    export default function Feedback() {
    const user = JSON.parse(localStorage.getItem("currentUser")) || { username: "Guest" };
    const [feedbacks, setFeedbacks] = useState(() => JSON.parse(localStorage.getItem("feedbacks")) || []);
    const [text, setText] = useState("");

    const submitFeedback = (e) => {
        e.preventDefault();
        if(!text.trim()) return;

        const newFeedback = { id: Date.now(), user: user.username, message: text };
        const updated = [...feedbacks, newFeedback];
        setFeedbacks(updated);
        localStorage.setItem("feedbacks", JSON.stringify(updated));
        setText("");
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
        <form className="flex flex-col gap-3 mb-6" onSubmit={submitFeedback}>
            <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-3 rounded bg-gray-700 text-white"
            placeholder="Write your feedback..."
            ></textarea>
            <button type="submit" className="bg-cyan-400 text-black px-4 py-2 rounded">Submit</button>
        </form>
        <div>
            <h2 className="text-xl mb-2">Your Feedbacks:</h2>
            {feedbacks.map(fb => (
            <div key={fb.id} className="bg-gray-800 rounded p-3 mb-2">
                <strong>{fb.user}:</strong> {fb.message}
            </div>
            ))}
        </div>
        </div>
    );
    }
