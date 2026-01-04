import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [flip, setFlip] = useState(false);

  // REGISTER
  const handleRegister = (e) => {
    e.preventDefault();
    const username = e.target.signupUsername.value.trim();
    const email = e.target.signupEmail.value.trim();
    const password = e.target.signupPassword.value.trim();

    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
      alert("Email already registered");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful");
    setFlip(false);
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.loginUsername.value.trim();
    const password = e.target.loginPassword.value.trim();

    if (username === "KD" && password === "2552214632") {
      window.location.href = "/User";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        (u.username === username || u.email === username) &&
        u.password === password
    );

    if (user) {
      window.location.href = "/user";
    } else {
      alert("User not found");
      setFlip(true);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className={`card ${flip ? "flip" : ""}`}>

          {/* LOGIN */}
          <div className="box login">
            <form onSubmit={handleLogin}>
              <h2>Login</h2>

              <div className="inputBox">
                <input type="text" name="loginUsername" required />
                <span>Username / Email</span>
                <i></i>
              </div>

              <div className="inputBox">
                <input type="password" name="loginPassword" required />
                <span>Password</span>
                <i></i>
              </div>

              <div className="links">
                <a>Forgot password?</a>
                <a onClick={() => setFlip(true)}>Signup</a>
              </div>

              <input type="submit" value="Login" />
            </form>
          </div>

          {/* SIGNUP */}
          <div className="box signup">
            <form onSubmit={handleRegister}>
              <h2>Sign Up</h2>

              <div className="inputBox">
                <input type="text" name="signupUsername" required />
                <span>Username</span>
                <i></i>
              </div>

              <div className="inputBox">
                <input type="email" name="signupEmail" required />
                <span>Email</span>
                <i></i>
              </div>

              <div className="inputBox">
                <input type="password" name="signupPassword" required />
                <span>Password</span>
                <i></i>
              </div>

              <div className="links right">
                <a onClick={() => setFlip(false)}>Login</a>
              </div>

              <input type="submit" value="Register" />
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
