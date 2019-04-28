// {
//    "dstOffset" : 3600,
//    "rawOffset" : -18000,
//    "status" : "OK",
//    "timeZoneId" : "America/New_York",
//    "timeZoneName" : "Eastern Daylight Time"
// }

const request = require('superagent');
import moment from 'moment'
import qs from 'qs'

export const getTimezone = (latlng) => {
  const endpoint = 'https://maps.googleapis.com/maps/api/timezone/json'
  const ts = new Date()
  const api_key = '<your api key here>'

  const params = {
    location: latlng.join(','),
    timestamp: moment().format('X'),
    key: api_key
  }
  return request.get(endpoint).query(qs.stringify(params)).set('accept', 'json')
}

// https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=YOUR_API_KEY
