const BASE_URL = "http://127.0.0.1:8000/api/v1"; // backend base URL

// ------------------ REGISTER USER ------------------
async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById("reg_username").value;
    const email = document.getElementById("reg_email").value;
    const password = document.getElementById("reg_password").value;

    const response = await fetch(`${BASE_URL}/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert("✅ Registration successful! You can now log in.");
    } else {
        const data = await response.json();
        alert("❌ Error: " + JSON.stringify(data));
    }
}

// ------------------ LOGIN USER ------------------
async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("login_username").value;
    const password = document.getElementById("login_password").value;

    try {
        const response = await fetch(`${BASE_URL}/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log("Login Response:", data);

        if (response.ok) {
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            alert("✅ Login successful!");
            window.location.href = "dashboard.html"; // redirect
        } else {
            alert("❌ Login failed: " + JSON.stringify(data));
        }

    } catch (error) {
        console.error("Error during login:", error);
        alert("⚠️ Network or CORS error. Check console for details.");
    }
}

// ------------------ CREATE TASK ------------------
async function createTask() {
    const title = document.getElementById("task_title").value;
    const description = document.getElementById("task_description").value;
    const token = localStorage.getItem("access");

    if (!token) {
        alert("⚠️ Please login again.");
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/tasks/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
            alert("✅ Task added successfully!");
            document.getElementById("task_title").value = "";
            document.getElementById("task_description").value = "";
            fetchTasks(); // refresh list
        } else {
            const data = await response.json();
            alert("❌ Failed to add task: " + JSON.stringify(data));
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// ------------------ FETCH TASKS ------------------
async function fetchTasks() {
    const token = localStorage.getItem("access");
    if (!token) {
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/tasks/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const tasks = await response.json();
            const list = document.getElementById("taskList");
            list.innerHTML = "";

            if (tasks.length === 0) {
                list.innerHTML = "<li class='list-group-item bg-dark text-light mt-2'>No tasks found</li>";
                return;
            }

            // ✅ Clean single loop with delete button
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.className = "list-group-item bg-dark text-light border-light mt-2 d-flex justify-content-between align-items-center";
                li.innerHTML = `
                    <span>${task.title} - ${task.description}</span>
                    <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
                `;
                list.appendChild(li);
            });
        } else {
            console.error("Failed to fetch tasks:", await response.text());
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// ------------------ DELETE TASK ------------------
async function deleteTask(id) {
    const token = localStorage.getItem("access");
    const response = await fetch(`${BASE_URL}/tasks/${id}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
    });
    if (response.ok) {
        alert("🗑️ Task deleted!");
        fetchTasks(); // refresh list
    } else {
        alert("❌ Error deleting task!");
    }
}

// ------------------ LOGOUT FUNC ------------------
function logoutUser() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    alert("👋 Logged out successfully!");
    window.location.href = "index.html";
}

// ------------------ EVENT HANDLERS ------------------
document.addEventListener("DOMContentLoaded", () => {
    // On login/register page
    const regBtn = document.querySelector("#registerBtn");
    const loginBtn = document.querySelector("#loginBtn");
    if (regBtn) regBtn.addEventListener("click", registerUser);
    if (loginBtn) loginBtn.addEventListener("click", loginUser);

    // On dashboard page
    const addTaskBtn = document.querySelector("#addTaskBtn");
    if (addTaskBtn && window.location.href.includes("dashboard.html")) {
        addTaskBtn.addEventListener("click", createTask);
        fetchTasks(); // Load existing tasks
    }
});
