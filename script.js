const button = document.querySelector('button');
const ip = document.querySelector('input');
const ipValue = document.querySelector('.ipaddress');
const loc = document.querySelector('.location');
const timezone = document.querySelector('.timezone');
const isp = document.querySelector('.isp');

button.addEventListener('click', () => {
	findIp(ip.value);
});

const findIp = async (ipAddress) => {
	ip.value = '';
	await fetch(`https://geo.ipify.org/api/v1?apiKey='Your_API_Key'=${ipAddress}`)
		.then((res) => res.json())
		.then((data) => {
			ipValue.innerText = data.ip;
			loc.innerText =
				data.location.city +
				', ' +
				data.location.region +
				' ' +
				data.location.postalCode;
			timezone.innerText = 'UTC' + data.location.timezone;
			isp.innerText = data.isp;

			changeMap(data.location.lat, data.location.lng);
		});
};
//map

const changeMap = async (lat, lon) => {
	let mymap = L.map('mapid').setView([lat, lon], 13);

	await L.tileLayer(
		'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
		{
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
		}
	).addTo(mymap);

	L.marker([lat, lon]).addTo(mymap);
	mymap.invalidateSize();
};
