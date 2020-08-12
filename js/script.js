document.addEventListener('DOMContentLoaded', (event) => {
	search = () => {
		$('#app-body').html(
			`<div id="bg-gradient-search">
				<form class="form-group" id="form-search">
					<input
						id="input-search"
						class="form-control form-control-lg"
						type="search"
						placeholder="Enter the location..."
						aria-label="Search"
					/>
				</form>
			</div>`
		);

		$('#form-search').submit(function (e) {
			let value = document.getElementById('input-search').value;

			loadWeather(value);
			e.preventDefault();
		});
	};

	loadWeather = (valueSearched) => {
		$('#app-body').html(
			`<div id="bg-gradient" class="text-center" style="padding-top: 315px">
				<div class="spinner-grow text-light" style="width: 5rem; height: 5rem;" role="status">
					<span class="sr-only">Loading...</span>
				</div>
			</div>`
		);

		async function getWeather() {
			let response = await fetch(
				`http://api.weatherstack.com/current?access_key=c56333323665c5a12b6e856c675a4436&query=` +
					valueSearched
				//`/js/APITest/NewYorkSunny.json`
			);
			let data = await response.json();

			return data;
		}

		getWeather()
			.then((data) => {
				console.log(data);
				let weatherDescription = data.current.weather_descriptions[0];

				isDay = () => {
					if (data.current.is_day === 'yes') {
						return '045-sun.png';
					} else {
						return '099-night.png';
					}
				};

				let currentDate = new Date().toLocaleTimeString('en-US', {
					hour12: true,
					hour: 'numeric',
					minute: 'numeric',
				});

				$('#app-body').html(
					`<div id="bg-gradient">
					<div class="row text-white" id="topbar">
						<div class="col-11">
							<div id="wrapper-title">
								<img src="../img/icons/map-location.png" id="location-icon"/>
								<p class="lead py-3 px-5 d-none d-lg-inline" id="country-title" >${
									data.location.country
								} - 
								<p class="lead py-3 px-5 d-inline" id="city-title" >${data.location.name}</p>
								</p>	
							</div>						
						</div>
						<div class="col-1">
							<img src="../img/icons/search.png" id="search-icon" onClick="search();"/>
							</p>							
						</div>
					</div>
					<div class="row text-white">
						<div class="col-lg text-center" id="left-column">
							<img id="weather-icon" src="" />
							<p class="display-4" id="temperature">${data.current.temperature} ºC</p>
							<p class="display-4" id="description">${weatherDescription}</p>
						</div>
						<div class="col-lg" id="right-column">
							<div id="wrapper-right-column">
								<div id="weather-info">
									<div id="wrapper-time">									
										<img src="../img/icons/${isDay()}" id="time-icon" class="mx-3" />
										<p class="display-4 d-inline-block" id="time">${currentDate}</p>
									</div>
									<div id="wrapper-humidity">
										<img src="../img/icons/074-humidity.png" id="humidity-icon" class="mx-3" />
										<p class="display-4 d-inline-block" id="humidity">${data.current.humidity}%</p>
									</div>
									<div id="wrapper-wind">
										<img src="../img/icons/015-wind.png" id="wind-icon" class="mx-3" />
										<p class="display-4 d-inline-block" id="wind">${
											data.current.wind_speed
										} km/h</p>
									</div>
									<div id="wrapper-precip">
										<img src="../img/icons/063-rain-3.png" id="precip-icon" class="mx-3" />
										<p class="display-4 d-inline-block" id="precip">${data.current.precip} mm</p>
									</div>
								</div>
								<img src="../img/clouds.png" id="bg-img"/>
							</div>
						</div>
					</div>
				</div>`
				);

				switch (weatherDescription) {
					case 'Overcast':
					case 'Partly cloudy':
						$('#weather-icon').attr('src', '../img/icons/097-cloud-1.png');
						break;
					case 'Sunny':
					case 'Clear':
						$('#weather-icon').attr('src', '../img/icons/045-sun.png');
						break;
					case 'Patchy rain possible':
						$('#weather-icon').attr('src', '../img/icons/050-sprinkle-2.png');
						break;
					case 'Mist':
					case 'Hazer':
						$('#weather-icon').attr('src', '../img/icons/075-haze.png');
						break;
					case 'Light Rain With Thunderstorm':
					case 'Thunderstorm In Vicinity':
						$('#weather-icon').attr('src', '../img/icons/047-storm-5.png');
						break;
					default:
						if (data.current.is_day === 'yes') {
							$('#weather-icon').attr('src', '../img/icons/096-cloud-2.png');
						} else {
							$('#weather-icon').attr('src', '../img/icons/092-cloud-6.png');
						}
				}
			})
			.catch((e) => {
				$('#app-body').html(
					`<div id="bg-gradient" class="text-center" style="padding-top: 315px">
						<p class="lead text-light">Error! Please, try again later.</p>
					</div>`
				);
			});
	};

	search();
	//loadWeather();
});

// http://api.weatherstack.com/current?access_key=c56333323665c5a12b6e856c675a4436&query=New%20York
