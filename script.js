document.addEventListener('DOMContentLoaded', function() {  //wait for DOM to be fully loaded
    const countryForm = document.getElementById('country-form');
    const countryName = document.getElementById('country-input');
    const countryInfo = document.getElementById('country-info');
    const borderingCountries = document.getElementById('bordering-countries');
    const countryInfoList = document.getElementById('country-info-list');

    countryForm.addEventListener('submit', async function (event){  //submit event listener
        event.preventDefault(); // Prevent the form from submitting normally

        const searchParams = countryName.value.trim(); 
        const json = await getCountryInfo(searchParams);
        
        const obj = json[0]; // The first object in the JSON response array

        //capital
        const objCapital = obj.capital ? obj.capital[0] : 'N/A';  
        const node1 = document.createElement("li");
        const textnode1 = document.createTextNode(`Capital: ${objCapital}`);
        node1.appendChild(textnode1);
        countryInfoList.appendChild(node1);

        //population
        const objPopulation = obj.population ? obj.population.toLocaleString() : 'N/A'; //formats with commas
        const node2 = document.createElement("li");
        const textnode2 = document.createTextNode(`Population: ${objPopulation}`);
        node2.appendChild(textnode2);
        countryInfoList.appendChild(node2);
        
        //region
        const objRegion = obj.region ? obj.region : 'N/A'; 
        const node3 = document.createElement("li");
        const textnode3 = document.createTextNode(`Region: ${objRegion}`);
        node3.appendChild(textnode3);
        countryInfoList.appendChild(node3);

        //flag
        const objFlag = obj.flags.png ? obj.flags.png: 'N/A'; 
        const flagNode = document.createElement("img");
        flagNode.src = objFlag;
        const node4 = document.createElement("li");
        node4.appendChild(flagNode);
        countryInfoList.appendChild(node4);
    });
});

async function getCountryInfo(searchParams) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchParams}?fullText=true`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error){
        console.error(error.message);
        return null;
    }
}