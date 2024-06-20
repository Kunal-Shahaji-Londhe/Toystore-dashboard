export const initiatePayment = async (orderAmount, productNames) => {
    const backendUrl = "http://localhost:3000/process_payment"; // Replace with your actual backend URL

    try {
        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: orderAmount,
                productNames: productNames,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to initiate payment. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.order_id) {
            throw new Error("Invalid response from the server. Missing order_id.");
        }

        // Use the order details directly from the response
        return data;

    } catch (error) {
        console.error("Error initiating payment:", error);
        throw error;
    }
};
