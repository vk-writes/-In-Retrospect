document.addEventListener("DOMContentLoaded", () => {
  const sidebarHTML = `
    <div class="sidebar" id="sidebar" aria-hidden="true">
      <button class="close-btn" id="closeSidebar" aria-label="Close menu">&times;</button>
      <nav>
        <a href="index.html" class="nav-link">Home</a>
        <a href="articles.html" class="nav-link">Articles</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="contact.html" class="nav-link">Contact</a>
        <a href="stats.html" class="nav-link">📊 Fun Stats</a>
      </nav>
    </div>
    <div id="overlay"></div>
    <button class="hamburger" id="openSidebar" aria-label="Open menu">&#9776;</button>
    <button id="darkModeToggle" class="dark-toggle" aria-label="Toggle dark mode">🌓 Dark Mode</button>
  `;

  document.body.insertAdjacentHTML("afterbegin", sidebarHTML);

  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");
  const overlay = document.getElementById("overlay");
  const darkToggleBtn = document.getElementById("darkModeToggle");
  const navLinks = document.querySelectorAll(".nav-link");

  function openSidebar() {
    sidebar.setAttribute("aria-hidden", "false");
    sidebar.classList.add("open");
    overlay.style.display = "block";
  }

  function closeSidebar() {
    sidebar.setAttribute("aria-hidden", "true");
    sidebar.classList.remove("open");
    overlay.style.display = "none";
  }

  openBtn.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Highlight active nav link
  const currentPath = window.location.pathname.split("/").pop();
  navLinks.forEach(link => {
    if (
      link.getAttribute("href") === currentPath ||
      (link.getAttribute("href") === "index.html" && currentPath === "")
    ) {
      link.classList.add("active");
    }
  });

  // Theme setup
  function toggleDarkMode() {
    if (document.body.classList.contains("theme-dark")) {
      document.body.classList.replace("theme-dark", "theme-light");
      localStorage.setItem("theme", "light");
      darkToggleBtn.textContent = "🌓 Dark Mode";
    } else {
      document.body.classList.replace("theme-light", "theme-dark");
      localStorage.setItem("theme", "dark");
      darkToggleBtn.textContent = "🌞 Light Mode";
    }
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme === "dark" ? "theme-dark" : "theme-light");
  darkToggleBtn.textContent = savedTheme === "dark" ? "🌞 Light Mode" : "🌓 Dark Mode";
  darkToggleBtn.addEventListener("click", toggleDarkMode);

  // Responsive sidebar
  function checkScreenSize() {
    if (window.innerWidth >= 768) {
      openBtn.style.display = "none";
      sidebar.classList.remove("open");
      sidebar.setAttribute("aria-hidden", "true");
      overlay.style.display = "none";
    } else {
      openBtn.style.display = "block";
    }
  }

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  // Load footer.html + insert year
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      const footer = document.createElement("div");
      footer.innerHTML = data;
      document.body.appendChild(footer);

      const yearSpan = footer.querySelector("#year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    });
});
