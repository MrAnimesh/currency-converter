const dropList = document.querySelectorAll(".converter-box select")
const buttons = document.querySelectorAll(".work-button");
let inputFrom = document.getElementById("input-from")
const url = `https://v6.exchangerate-api.com/v6/cf750cb4fbdcf68391b39cee/latest/USD`
let buffer = ""

function settingUp(){
    for (i=0; i<dropList.length;i+=1){ //going through no of droplist
        let selected = 0
        for (countryCode in country_list){
            if (i == 0) selected = countryCode == "USD" ? "selected": "" //setting up default value
            if (i == 1) selected = countryCode == "INR" ? "selected": ""

            let options = `<option value="${countryCode}" ${selected}>${countryCode}</option>` //generating options html from javascript for droplist
            dropList[i].insertAdjacentHTML("beforeend",options) //adding generated item in the end of the droplist
        }
        
        dropList[i].addEventListener("change", e=>{
            loadFlag(e.target)
            getData()
        })
    }
}

function loadFlag(e){
    for (code in country_list){
        if (e.value == code){
            let imgs = e.parentElement.querySelector("#imgs")
            imgs.src = `https://flagsapi.com/${country_list[code]}/shiny/32.png`    //using flag api to change the flag
        }
    }   
}
function getData(){
    let url = `https://v6.exchangerate-api.com/v6/cf750cb4fbdcf68391b39cee/latest/USD`

    let inputTo = document.getElementById("input-to")

    let inputValue = inputFrom.value
    let excheangedValue = 0

    let code_from = dropList[0].value
    let code_to = dropList[1].value

    fetch(url)      //fetching the data from API and converting the value and showing the output
        .then(response => response.json())
        .then(data =>{
            excheangedValue = (inputValue/data.conversion_rates[code_from]) * data.conversion_rates[code_to]
            inputTo.value = excheangedValue.toFixed(2)
        })    
}

function getNumbers(){
    buttons.forEach(function(button){   //giong through each button
        button.addEventListener("click",function(e){    //setting up the click listener to each button
            if (e.target.innerText == "←"){
                buffer = inputFrom.value.toString().slice(0, -1)
                inputFrom.value = buffer

            }else if (e.target.innerText == "C"){
                inputFrom.value = 0
                buffer = ""
            }else{
                buffer+=e.target.innerText
                inputFrom.value = parseInt(buffer)
            }
            getData()
        })
    })  
}

document.getElementById("btn-convert").addEventListener("click", ()=>{
    getData()
})

window.addEventListener("load",()=>{    //loading the functions on window loadup
    settingUp()
    getData()
    getNumbers()
})








// document.querySelector(".btn-cancel").addEventListener("click", function(){
//     if (inputFrom.value != "")
//     buffer = inputFrom.value.toString().slice(0, -1)
//     inputFrom.value = parseInt(buffer)
//     console.log("clicked")
// })











// getNumbers()

    // const response = await fetch(url)
    // const data = await response.json()
    // rate = data.rates.x
    // console.log(data)
    // console.log(data.rates.x)


