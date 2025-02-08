import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react'
import { auth } from '../firebase.config'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Could not send password reset link')
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link
            className="forgotPasswordLink"
            to="/sign-in"
          >
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Reset Password</div>
            <button className="signInButton">
              <ArrowRightIcon
                fill="#ffffff"
                width="34px"
                height="34px"
              />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
export default ForgotPassword
