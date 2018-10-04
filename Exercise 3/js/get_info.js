/* jshint esversion: 6 */
/* jshint node: true */
'use strict';

async function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error))
}

async function populate(n) {
    let [numberData]= await Promise.all([
        getData(`http://numbersapi.com/${n-1}..${n+1}?json`)
    ]);
    let resultsDiv = document.querySelector('#results');
    resultsDiv.innerHTML=""
    resultsDiv.classList.remove("alert", "alert-danger")
    resultsDiv.classList.add('container');

    for (let number in numberData){
        let fact = numberData[number].text;

        let resultDiv = document.createElement('div');
        resultDiv.classList.add('container', 'row', 'mt-5');

        let numberDiv = document.createElement('div');
        numberDiv.classList.add('col-sm-auto', 'h3');
        numberDiv.innerHTML = number;
        resultDiv.appendChild(numberDiv);

        let factDiv = document.createElement('div');
        factDiv.classList.add('col-sm');
        
        let factTextDiv = document.createElement('div');
        factTextDiv.classList.add('alert', 'alert-success');
        factTextDiv.innerHTML = fact;
        factDiv.appendChild(factTextDiv);

        resultDiv.appendChild(factDiv);

        resultsDiv.appendChild(resultDiv);
    }
}
function clickedon(){

    let number = document.querySelector("#numinput").value;
    if (number != ""){
        number =  parseInt(number, 10);
        populate(number);
    }else{
        let resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML=""
        resultsDiv.classList.add("alert", "alert-danger")
        resultsDiv.innerHTML = "Please enter a number!"
    }
}   
