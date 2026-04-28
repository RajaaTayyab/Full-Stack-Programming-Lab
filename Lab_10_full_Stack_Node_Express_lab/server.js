const express = require("express");
const app = express();
const PORT = 3000;

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@400;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #fdf8f8;
    color: #2d1515;
    min-height: 100vh;
  }

  nav {
    background: #fff;
    border-bottom: 1px solid #f5e0e0;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
  }

  nav .brand {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #2d1515;
    text-decoration: none;
  }

  nav .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  nav .nav-links a {
    text-decoration: none;
    color: #7a4040;
    font-size: 0.88rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  nav .nav-links a:hover { color: #b5434a; }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }

  .badge {
    display: inline-block;
    background: #fde8e8;
    color: #9b2c2c;
    font-size: 0.72rem;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 1rem;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.4rem;
    font-weight: 700;
    color: #2d1515;
    letter-spacing: -0.5px;
    line-height: 1.15;
    margin-bottom: 0.75rem;
  }

  p {
    color: #7a5050;
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .card {
    background: #fff;
    border: 1px solid #f5e0e0;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .card h2 {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #2d1515;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
  }

  ul li {
    padding: 0.65rem 0;
    border-bottom: 1px solid #fde8e8;
    color: #4a2020;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  ul li:last-child { border-bottom: none; }

  ul li::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #b5434a;
    border-radius: 50%;
    flex-shrink: 0;
  }

  ul li a {
    color: #b5434a;
    text-decoration: none;
    font-weight: 500;
  }

  ul li a:hover { text-decoration: underline; }

  .btn {
    display: inline-block;
    background: #b5434a;
    color: #fff;
    padding: 10px 22px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 500;
    transition: background 0.2s;
  }

  .btn:hover { background: #9b2c2c; }

  .btn-ghost {
    display: inline-block;
    background: transparent;
    color: #7a4040;
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 500;
    border: 1px solid #f0c0c0;
    margin-left: 0.5rem;
    transition: background 0.2s;
  }

  .btn-ghost:hover { background: #fde8e8; }

  .message-box {
    background: #fff5f5;
    border-left: 3px solid #b5434a;
    border-radius: 0 8px 8px 0;
    padding: 1rem 1.25rem;
    color: #4a2020;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .hero-name {
    font-family: 'Syne', sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: #b5434a;
    letter-spacing: -1.5px;
    line-height: 1;
    margin: 0.5rem 0 1.25rem;
  }

  footer {
    text-align: center;
    padding: 2rem;
    color: #b08080;
    font-size: 0.78rem;
    border-top: 1px solid #f5e0e0;
    margin-top: 3rem;
  }
`;

const layout = (badge, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Express Lab</title>
  <style>${css}</style>
</head>
<body>
  <nav>
    <a class="brand" href="/">Lab 10 by Tayyab Janjua</a>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/students">Students</a></li>
      <li><a href="/home">Routes</a></li>
      <li><a href="/user/Tayyab">User</a></li>
    </ul>
  </nav>
  <div class="container">
    <span class="badge">${badge}</span>
    ${content}
  </div>
  <footer>Node.js + Express Lab &mdash; Petal Theme</footer>
</body>
</html>`;

// ─────────────────────────────────────────────
// TASK 1: Student List Display
// ─────────────────────────────────────────────
const students = [
  "Tayyab Janjua",
  "Ahmed Bilal",
  "Omer Farooq",
  "Musab Ejaz",
  "Hassan Raza",
  "Armaghan Mehmood",
];

app.get("/students", (req, res) => {
  const items = students.map(name => `<li>${name}</li>`).join("");
  res.send(layout("Task 1 — Student List", `
    <h1>Student List</h1>
    <p>All enrolled students stored in a server-side array.</p>
    <div class="card">
      <h2>Enrolled students</h2>
      <ul>${items}</ul>
    </div>
    <a href="/" class="btn-ghost">Back to home</a>
  `));
});

// ─────────────────────────────────────────────
// TASK 2: Simple Message Routes
// ─────────────────────────────────────────────
app.get("/home", (req, res) => {
  res.send(layout("Task 2 — /home route", `
    <h1>Welcome Home</h1>
    <p>You are on the <strong>/home</strong> route.</p>
    <div class="card">
      <div class="message-box">Welcome Home — this message is served by the /home route.</div>
    </div>
    <a href="/" class="btn-ghost">Back to home</a>
  `));
});

app.get("/about", (req, res) => {
  res.send(layout("Task 2 — /about route", `
    <h1>About Page</h1>
    <p>You are on the <strong>/about</strong> route.</p>
    <div class="card">
      <div class="message-box">This is the About page — built with Node.js and Express.</div>
    </div>
    <a href="/" class="btn-ghost">Back to home</a>
  `));
});

app.get("/contact", (req, res) => {
  res.send(layout("Task 2 — /contact route", `
    <h1>Contact Page</h1>
    <p>You are on the <strong>/contact</strong> route.</p>
    <div class="card">
      <div class="message-box">Contact us at lab@express.dev — we will get back to you soon.</div>
    </div>
    <a href="/" class="btn-ghost">Back to home</a>
  `));
});

// ─────────────────────────────────────────────
// TASK 3: Dynamic User Page
// ─────────────────────────────────────────────
app.get("/user/:name", (req, res) => {
  const name = req.params.name;
  res.send(layout("Task 3 — Dynamic route", `
    <h1>Hello,</h1>
    <div class="hero-name">${name}</div>
    <p>Route: <strong>/user/:name</strong> &mdash; the name is captured from the URL parameter.</p>
    <div class="card">
      <h2>Try other names</h2>
      <ul>
        <li><a href="/user/Sara">/user/Tayyab</a></li>
        <li><a href="/user/Usman">/user/Hassan</a></li>
        <li><a href="/user/Ayesha">/user/Musab</a></li>
      </ul>
    </div>
    <a href="/" class="btn-ghost">Back to home</a>
  `));
});

// ─────────────────────────────────────────────
// TASK 4: Full HTML Home Page
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send(layout("Node.js Express Lab", `
    <h1>Lab Task 10 <br>by Tayyab Janjua 231736</h1>
    <p>All four lab tasks running on a single Express server .</p>
    <a href="/students" class="btn">View students</a>
    <a href="/home" class="btn-ghost">Explore routes</a>
    <div class="card" style="margin-top: 2rem;">
      <h2>All routes</h2>
      <ul>
        <li><a href="/students">Task 1 &mdash; Student list</a></li>
        <li><a href="/home">Task 2 &mdash; Home route</a></li>
        <li><a href="/about">Task 2 &mdash; About route</a></li>
        <li><a href="/contact">Task 2 &mdash; Contact route</a></li>
        <li><a href="/user/Tayyab">Task 3 &mdash; Dynamic user page</a></li>
      </ul>
    </div>
  `));
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});