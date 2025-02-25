import './index.css'

const classNamesList = [
  'first-color',
  'second-color',
  'third-color',
  'fourth-color',
]
const PasswordItem = props => {
  const {passwordDetails, showPasswords, deletePassword} = props
  const {websiteName, username, password, id} = passwordDetails
  const iconClassName = classNamesList[websiteName.length % 4]
  const passwordDisplay = showPasswords ? (
    password
  ) : (
    <img
      className="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )
  const onDelete = () => {
    deletePassword(id)
  }
  return (
    <li className="list-item">
      <p className={`${iconClassName} website-icon`}>
        {websiteName[0].toUpperCase()}
      </p>
      <div className="details-container">
        <p>{websiteName}</p>
        <p>{username}</p>
        <p>{passwordDisplay}</p>
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="delete-btn"
        data-testid="delete"
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
