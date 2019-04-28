import { getTimezone } from './timezone'


var x = document.getElementById("geo-result");

const savePosition = (position) => {
  const latlng = [
    position.coords.latitude,
    position.coords.longitude
  ]

  x.innerHTML = `Location Updated!`
  localStorage.setItem('clock:latlng', JSON.stringify(latlng))

  getTimezone(latlng).end((rrr, res) => {
    if(res.status === 200) {
      localStorage.setItem('clock:timezoneId', res.body.timeZoneId)
    }
  })
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(savePosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

document.getElementById('geography').addEventListener('submit', e => {
  e.preventDefault()
  getLocation()
})

export const getSetting = name => {
  return localStorage.getItem(name)
}
