function convert() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("fromCountry").value;
    const to = document.getElementById("toCountry").value;
    const result = document.getElementById("result");

    if (isNaN(amount) || !from || !to) {
        alert("Please enter a valid amount and select both currencies.");
        return;
    }

    const apiKey = '760ff1868b350723f8d30c74'; //  API key
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

    console.log("Calling API:", url);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log("API Response:", data);
            if (data.result === "success") {
                const rate = data.conversion_rates[to];
                const converted = amount * rate;
                result.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
            } else {
                result.textContent = "Conversion failed. " + data["error-type"];
            }
        })
        .catch(err => {
            console.error("Error during conversion:", err);
            result.textContent = "Error fetching conversion.";
        });
}
