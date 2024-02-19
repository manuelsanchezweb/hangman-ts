import { useEffect, useState } from 'react'
import coin from '../../assets/coin.png'

interface UserProps {
  guessedWordsCount: () => number
}

const User = ({ guessedWordsCount }: UserProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<number>(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar')
    return storedAvatar ? parseInt(storedAvatar) : 0
  })
  const [avatarImage, setAvatarImage] = useState<string>('')
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('userName') || 'Default'
  })
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    localStorage.setItem('userName', userName)
  }, [userName])

  /**
   * Dynamically imports the avatar image based on the selectedAvatar state.
   * Also stores the selected avatar in local storage.
   *
   * Optimization: Consider caching the images if there are only a few,
   * to avoid re-importing them every time the avatar changes.
   */
  useEffect(() => {
    import(`../../assets/character-${selectedAvatar}.png`)
      .then((image) => setAvatarImage(image.default))
      .catch(() => setAvatarImage('')) // Set a default or error image if needed

    localStorage.setItem('selectedAvatar', selectedAvatar.toString())
  }, [selectedAvatar])

  /**
   * Toggles between different avatar states.
   *
   * Optimization: If there are more avatars, consider using a modulo operation
   * for cycling through them.
   */
  const changeBetweenAvatars = () => {
    setSelectedAvatar((prevAvatar) => (prevAvatar === 0 ? 1 : 0))
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
          }}
        >
          <figure
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              padding: '10px',
              margin: '0',
            }}
          >
            {/* Displays the dynamically imported avatar image */}
            {avatarImage && (
              <img
                style={{
                  imageRendering: 'pixelated',
                  width: '80px',
                }}
                src={avatarImage}
                alt="Avatar"
              />
            )}
          </figure>
          <button
            style={{
              position: 'absolute',
              width: '30px',
              height: '30px',
              border: '1px solid black',
              borderRadius: '50%',
              display: 'flex',
              padding: '0',
              top: '-7px',
              right: '-7px',
              cursor: 'pointer',
            }}
            onClick={() => changeBetweenAvatars()}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 17.5C16.722 18.188 16.1226 18.8 15.2878 19.2483C14.453 19.6966 13.4256 19.9581 12.3529 19.9954C11.2801 20.0327 10.2172 19.8438 9.31626 19.4558C8.41537 19.0679 7.38496 18.165 7 17.5M7 17.5V19.1667M7 17.5H8.66667M7 7.5C7.27802 6.81196 7.87739 6.19996 8.7122 5.75169C9.54701 5.30342 10.5744 5.0419 11.6471 5.00462C12.7199 4.96735 13.7828 5.15622 14.6837 5.54417C15.5846 5.93212 16.615 6.835 17 7.5M17 7.5V5.83333M17 7.5H15.3333M10.5098 13.3333H13.4902C13.7583 13.3333 13.8923 13.3333 14.0122 13.3525C14.4271 13.419 14.7859 13.6526 14.987 13.9871C15.045 14.0837 15.0874 14.1986 15.1722 14.4282C15.2741 14.7042 15.325 14.8422 15.3319 14.9535C15.3562 15.3461 15.0732 15.7007 14.6531 15.804C14.534 15.8333 14.373 15.8333 14.0509 15.8333H9.94913C9.62702 15.8333 9.46597 15.8333 9.3469 15.804C8.92677 15.7007 8.64382 15.3461 8.66812 14.9535C8.675 14.8422 8.72593 14.7042 8.82779 14.4282C8.91256 14.1986 8.95495 14.0837 9.01303 13.9871C9.21405 13.6526 9.57287 13.419 9.98781 13.3525C10.1077 13.3333 10.2417 13.3333 10.5098 13.3333ZM13.6667 10C13.6667 10.9205 12.9205 11.6667 12 11.6667C11.0795 11.6667 10.3333 10.9205 10.3333 10C10.3333 9.07953 11.0795 8.33333 12 8.33333C12.9205 8.33333 13.6667 9.07953 13.6667 10Z"
                stroke="#464455"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
          }}
        >
          <img width={20} height={20} src={coin} alt="coin icon" />
          <span>{guessedWordsCount() * 50}</span>
        </div>
      </div>
      {/* User name input and edit toggle */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <label
          style={{
            fontWeight: 'bold',
          }}
          htmlFor="name"
        >
          Username
        </label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="name"
            name="name"
            type="text"
            value={userName}
            onChange={(event) => handleNameChange(event)}
            disabled={!isEditable}
            style={{
              border: '1px solid black',
              cursor: isEditable ? 'text' : 'not-allowed',
              padding: '5px',
            }}
          />
          <button
            style={{
              padding: '2.5px 5px 5px',
              height: '27.5px',
              marginLeft: '-2px',
            }}
            onClick={() => setIsEditable(!isEditable)}
          >
            {isEditable ? '🔒' : '✏️'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default User
