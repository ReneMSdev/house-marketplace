import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.config'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setLoggedIn(true)

      setCheckingStatus(false)
    })
  })

  return { loggedIn, checkingStatus }
}

// Protected routes in v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase
