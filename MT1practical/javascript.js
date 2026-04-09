

function convertToFahrenheit() {
    let celsius = document.getElementById("celsius").value;
    if (celsius === "") {
        document.getElementById("result").innerHTML = "Please enter a temperature.";
        return;
    }


    //(C × 9/5) + 32
    let fahrenheit = (celsius * 9 / 5) + 32;

    document.getElementById("result").innerHTML =
        celsius + "°C = " + fahrenheit.toFixed(2) + "°F";
}   