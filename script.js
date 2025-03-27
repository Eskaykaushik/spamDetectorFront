 
const API_URL = "https://backendserviceflask.onrender.com/"; // Replace with your actual backend URL

async function checkSpam() {
    const emailText = document.getElementById("emailText").value.trim();
    const errorBox = document.getElementById("error");
    const resultBox = document.getElementById("result");

    errorBox.textContent = "";
    resultBox.innerHTML = "";

    if (!emailText) {
        errorBox.textContent = "Please enter an email text.";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: emailText })
        });

        const data = await response.json();

        if (data.spam) {
            resultBox.innerHTML = `<div class="result-box spam">🚨 Spam! Confidence: ${(data.confidence * 100).toFixed(2)}%</div>`;
        } else {
            resultBox.innerHTML = `<div class="result-box not-spam">✅ Not Spam! Confidence: ${(data.confidence * 100).toFixed(2)}%</div>`;
        }
    } catch (error) {
        errorBox.textContent = "Error fetching prediction. Please try again.";
    }
}
