import React from 'react';
import PropTypes from 'prop-types'


export const Settings = (props) => {
  const [dob, setDob] = React.useState(localStorage.getItem('dob'));
  const [exp, setExp] = React.useState(localStorage.getItem('exp'));

  const setters = {
    dob: setDob,
    exp: setExp
  }

  const onChange = (key) => event => {
    props.storage.set(key, event.target.value)
    setters[key](event.target.value);
  };

  return (
    <div id="container">
      <h2>Settings</h2>
      <form onSubmit={props.onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Birthday</td>
              <td>
                <input
                  type="text"
                  value={dob}
                  onChange={onChange('dob')}
                />
              </td>
            </tr>
            <tr>
              <td>Life Expectancy</td>
              <td>
                <input
                  type="text"
                  value={exp}
                  onChange={onChange('exp')}
                  placeholder={100} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

Settings.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Settings
