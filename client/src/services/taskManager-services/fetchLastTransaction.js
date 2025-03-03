const fetchLastTransaction = async () => {
    const token = localStorage.getItem("token");
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const rm_number = tokenPayload.rm_number;

    const response = await fetch(
        `http://localhost:5000/api/task-manager/last-transaction?rm_number=${rm_number}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );
    
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    
    return response.json();
}

export default fetchLastTransaction;