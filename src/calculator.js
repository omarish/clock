import qs from 'qs'
const request = require('superagent');

import moment from 'moment-timezone'

export const utcToLocal = (dt, tz) => {
  const local = moment.utc(dt).tz(tz)
  const unix = parseInt(local.format('X'), 10)
  return (unix + (local._offset * 60)) % 86400;
}


export const getSuntimes = (lat, lng, tz) => {
  const endpoint = "https://api.sunrise-sunset.org/json"
  const params = {
    lat: lat,
    lng: lng,
    date: 'today',
    formatted: 0
  }

  return request.get(endpoint)
    .query(params)
    .set('accept', 'json')
}
