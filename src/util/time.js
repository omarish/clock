import moment from 'moment'
import { DOB } from './constants'

const tsToDays = ts => ts / 86400 / 1000

export const getTime = () => {
  const now = moment()
  const age = tsToDays(moment() - DOB) / 365
  const year = tsToDays(moment() - moment().startOf('year'))

  return {
    'second': now.seconds(),
    'day': now.seconds() + (60 * now.minutes()) + (3600 * now.hours()),
    'life': age,
    'year': year
  }
}
