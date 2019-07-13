window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locarionTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/473b60889a8102ee2fc10641608b2177/${lat},${long}`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon } = data.currently;
                //set dom elements from the api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locarionTimezone.textContent = data.timezone;
                //formula for celcius
                let celcius = (temperature - 32) * (5 / 9);
                //set icons
                setIcons(icon, document.querySelector(".icon"));

                //change temperature to celcius/farenheit.
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });

            });
        });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    }
});