// const data = null;

// const xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener('readystatechange', function () {
// 	if (this.readyState === this.DONE) {
// 		console.log(this.responseText);
// 	}
// });

// xhr.open('GET', 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle');
// xhr.setRequestHeader('x-rapidapi-key', '100400459cmsha856455d2476eb7p13b74bjsn6d7961ecbd4e');
// xhr.setRequestHeader('x-rapidapi-host', 'weather-by-api-ninjas.p.rapidapi.com');

// xhr.send(data);


/*Above and Below API does not work */


// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-key': '100400459cmsha856455d2476eb7p13b74bjsn6d7961ecbd4e',
//     'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
//   }
// };

// fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle',options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error('Error:', err));

/* This below api works */
 
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		const myData = JSON.parse(this.responseText)
		console.log(myData);
	}
});

xhr.open('GET', 'https://ai-weather-by-meteosource.p.rapidapi.com/time_machine?lat=37.81021&lon=-122.42282&date=2021-08-24&units=auto');
xhr.setRequestHeader('x-rapidapi-key', '100400459cmsha856455d2476eb7p13b74bjsn6d7961ecbd4e');
xhr.setRequestHeader('x-rapidapi-host', 'ai-weather-by-meteosource.p.rapidapi.com');

xhr.send(data);

