const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const finalmsg = document.querySelector(".msg");

for(let select of dropdowns){
      for(currcode in countryList){
      let newoption = document.createElement("option");
      newoption.innerText = currcode;
      newoption.value = currcode; 
      if(select.name ==="from" && currcode ==="USD") {
        newoption.selected = "selected";
      }else if (select.name ==="to" && currcode ==="INR") {
        newoption.selected = "selected";
      }
      select.append(newoption);
      
    } 
    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target);
    });
     
}
const updateFlag = (element)=>{
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;

}
btn.addEventListener("click", async (evt)=> {
     evt.preventDefault();
     let amount = document.querySelector(".amount input");
     let amtval = amount.value;
     if(amtval ==="" || amtval < 1){
       amtval = 1;
       amount.value = "1";
     }
     const URL = `${BaseURL}/currencies/${fromcurr.value.toLowerCase()}.json`;
     let response = await fetch(URL);
     let data = await response.json();
     let rate =  data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
     let finalrate = amtval*rate;
     finalmsg.innerText = `${amtval} ${fromcurr.value} = ${finalrate}${tocurr.value}`;

     

});

