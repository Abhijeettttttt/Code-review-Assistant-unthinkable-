// Sample JavaScript code for testing
function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            return data;
        });
}

function updateUserProfile(userId, profileData) {
    const userData = fetchUserData(userId);
    
    // This is problematic - mixing async and sync code
    const updatedData = {
        ...userData,
        ...profileData,
        lastUpdated: new Date()
    };
    
    return fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
}