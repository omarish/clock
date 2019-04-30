/* Convert a JS timestamp into days. */
import moment from 'moment'

export const tsToDays = ts => ts / 86400 / 1000
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const hands = ['Minute', 'Day', 'Year', 'Life']

export class Storage {
  get(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue
  }

  set(key, val) {
    localStorage.setItem(key, val)
  }

  getDOB() {
    const val = this.get('dob', '1980-06-13')
    return moment(val)
  }

  getExp() {
    const val = this.get('exp', '100')
    return parseInt(val, 10);
  }
}
