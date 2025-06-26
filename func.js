
window.addEventListener('DOMContentLoaded', () => {
    const fromSelect = document.getElementById("fromCountry");
    const toSelect = document.getElementById("toCountry");

    fetch("https://restcountries.com/v3.1/all?fields=name,currencies")
        .then(res => res.json())
        .then(data => {
            const countries = data
                .filter(c => c.currencies)
                .map(c => {
                    const currencyCode = Object.keys(c.currencies)[0];
                    return {
                        name: c.name.common,
                        currency: currencyCode
                    };
                })
                .sort((a, b) => a.name.localeCompare(b.name));

            countries.forEach(({ name, currency }) => {
                const option1 = document.createElement("option");
                option1.value = currency;
                option1.textContent = `${name} (${currency})`;
                fromSelect.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = currency;
                option2.textContent = `${name} (${currency})`;
                toSelect.appendChild(option2);
            });
        })
        .catch(err => {
            alert("Failed to load country list.");
            console.error(err);
        });
});

