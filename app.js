// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
fromCurr = document.querySelector(".from select");
toCurr = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const amount = document.querySelector(".amount input");
const exchangeRateTxt = document.querySelector(".msg");
let hidden = document.querySelector(".hide");



for (let i = 0; i < dropdowns.length; i++) {
    for (let currencyCode in countryCode) {
        let selected;
        if (i=== 0){
            selected = currencyCode === "USD" ? "selected" : "";
        }else if (i === 1) {
            selected = currencyCode === "NPR" ? "selected" : "";
        }

        let optionTag = `<option value="${currencyCode}"${selected}>${currencyCode} 
        </option>`;
        dropdowns[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropdowns[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for(code in countryCode){
        if(code === element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${countryCode[code]}/flat/64.png`;
        }
    }
}

getBtn.addEventListener("click", e => {
    e.preventDefault();
    hidden.classList.remove("hide");
    getConvert();
});


function getConvert(){
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0" || amountVal < "1"){
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateTxt.innerText = "Converting..."


    let url =` https://v6.exchangerate-api.com/v6/d94220ce77ace7d9a12a1f6b/latest/${fromCurr.value}`;
    fetch(url).then(response => (response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurr.value];
        let totalExchangeRate = (amountVal * exchangeRate);
        console.log(totalExchangeRate);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
    }));
}



