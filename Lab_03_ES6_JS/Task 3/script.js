// script.js

// Function to simulate fetching users from server
function fetchUsers() {
    return new Promise((resolve, reject) => {
        const shouldFail = false; // toggle to true to test error handling
        setTimeout(() => {
            if (!shouldFail) {
                resolve([
                    { id: 1, name: "Ali Khan", email: "ali@example.com" },
                    { id: 2, name: "Sara Ahmed", email: "sara@example.com" },
                    { id: 3, name: "Hassan Raza", email: "hassan@example.com" }
                ]);
            } else {
                reject("Failed to fetch users!");
            }
        }, 3000); // 3-second delay
    });
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const statusMessage = document.getElementById("status-message");
    const userContainer = document.getElementById("user-container");

    // Call fetchUsers and handle Promise
    fetchUsers()
        .then(users => {
            // Hide spinner
            statusMessage.style.display = "none";

            // Show grid
            userContainer.style.display = "grid";

            // Populate user cards
            userContainer.innerHTML = users.map(user => `
                <div class="user-card">
                    <h3>${user.name}</h3>
                    <p><strong>ID:</strong> ${user.id}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            // Hide spinner
            statusMessage.style.display = "none";

            // Show error message
            userContainer.style.display = "block";
            userContainer.innerHTML = `<div class="error-message">${error}</div>`;
        });
});