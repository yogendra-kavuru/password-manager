import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      passwordsList: [],
      searchInput: '',
      showPasswords: false,
    }
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    this.setState(prevState => {
      const newPassword = {
        id: uuidv4(),
        websiteName: prevState.websiteInput,
        username: prevState.usernameInput,
        password: prevState.passwordInput,
      }
      const updatedPasswordsList = [...prevState.passwordsList, newPassword]
      return {
        passwordsList: updatedPasswordsList,
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  togglePassword = () => {
    this.setState(prevState => ({
      ...prevState,
      showPasswords: !prevState.showPasswords,
    }))
  }

  deletePassword = id => {
    this.setState(prevState => {
      const updatedPasswordsList = prevState.passwordsList.filter(
        each => each.id !== id,
      )
      return {passwordsList: updatedPasswordsList}
    })
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      showPasswords,
      searchInput,
    } = this.state
    const filteredPasswordsList = passwordsList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const passwordsListItems = filteredPasswordsList.map(each => (
      <PasswordItem
        key={each.id}
        passwordDetails={each}
        showPasswords={showPasswords}
        deletePassword={this.deletePassword}
      />
    ))
    return (
      <div className="bg-container">
        <img
          className="logo-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="card">
          <form className="new-input-form" onSubmit={this.addPassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <div className="icon-container">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </div>
              <input
                className="input-element"
                type="text"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </div>
              <input
                className="input-element"
                type="text"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
              </div>
              <input
                className="input-element"
                type="password"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={this.onChangePassword}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <img
            className="app-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="card bottom-card">
          <div className="header">
            <div className="heading-container">
              <h1 className="heading">Your Passwords</h1>
              <p className="count">{filteredPasswordsList.length}</p>
            </div>
            <div className="input-container search">
              <div className="icon-container">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                className="input-element"
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <div className="show-password-container">
            <input
              id="mycheckbox"
              type="checkbox"
              className="checkbox"
              onClick={this.togglePassword}
            />
            <label htmlFor="mycheckbox">Show Passwords</label>
          </div>
          {filteredPasswordsList.length === 0 ? (
            <div className="no-passwords-container">
              <img
                className="no-passwords-img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="heading">No Passwords</p>
            </div>
          ) : (
            <ul>{passwordsListItems}</ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
