window.addEventListener('load', ()=> {

let long;
let lat;
let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span');



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
    
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/9c2c1246671c00736885c521dd6bfe1d/${lat},${long}`;
    
        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            
            const{temperature, summary, icon}  = data.currently;

            //set DOM elements from the api

            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            // formula for C

            let celsius = (temperature - 32) * (5 / 9);

                    //set icon
                    setIcons(icon, document.querySelector('.icon'));
        

        //change temp celsius/farenheit
        temperatureSection.addEventListener('click', ()=> {
            if (temperatureSpan.textContent === 'F'){
                temperatureSpan.textContent = 'C';
                temperatureDegree.textContent = Math.floor(celsius);
            }else {
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = temperature;
            }
        });
    });

    });

    function setIcons(icon, iconId){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

   
}

});