import React from 'react';
import PropTypes from 'prop-types'


export const Settings = (props) => {
  const [dob, setDob] = React.useState(props.storage.get('dob', '1980-06-13'));
  const [exp, setExp] = React.useState(props.storage.getExp());

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
                  placeholder={"1988-12-15"}
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
