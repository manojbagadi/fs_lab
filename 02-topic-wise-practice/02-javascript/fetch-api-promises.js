// Fetch API & Promises Practice
async function fetchUserData(userId) {
    try {
        console.log(`Fetching user data for ID: ${userId}...`);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("User Data Received:");
        console.log(`Name: ${data.name}, Email: ${data.email}, City: ${data.address.city}`);
        return data;
    } catch (error) {
        console.error("Fetch failed:", error.message);
    }
}

// Execute demo
fetchUserData(1);
