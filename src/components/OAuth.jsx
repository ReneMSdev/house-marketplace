import { useLocation, useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

const OAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnapshot = await getDoc(docRef)

      // if user doesn't exist, create user in firestore
      if (!docSnapshot.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log(`error: ${error}`)
      toast.error('Could not authorize with Google')
    }
  }

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
      <button
        className="socialIconDiv"
        onClick={onGoogleClick}
      >
        <img
          className="socialIconImg"
          src={googleIcon}
          alt="google"
        />
      </button>
    </div>
  )
}
export default OAuth
