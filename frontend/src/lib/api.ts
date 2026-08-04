const API_BASE_URL = "http://localhost:8000/api/v1";

export async function fetchSupplyData() {
    try {
        const response = await fetch(`${API_BASE_URL}/supply/`);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch supply data:", error);
        return [];
    }
}
