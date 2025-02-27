const fetchCustomerDetails = async (customerID) => {
    const token = localStorage.getItem("token");
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const rm_number = tokenPayload.rm_number;
    
    const response = await fetch(
        `http://localhost:5000/api/customer-details/customer-details?rm_number=${rm_number}&customerID=${customerID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json(); // this should return an array of customer objects
};

export default fetchCustomerDetails;