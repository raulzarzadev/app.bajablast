import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { FirebaseCRUD } from './firebase.CRUD'
import { UserType } from '@/types/user'
import { app, db } from './main'
import { getUser } from './users'

const auth = getAuth(app)
const storage = getStorage(app)

// CREATE A MAIN INSTANCE FOR USERS
export const usersCRUD = new FirebaseCRUD('users', db, storage)

export const createUserFromGoogleProvider = async (newItem: any) => {
  const { uid, photoURL, emailVerified, email, displayName } = newItem
  const userFormatted: Partial<UserType> = {
    id: uid,
    image: photoURL,
    email,
    name: displayName,
    rol: 'CLIENT'
  }
  return await usersCRUD.setItem(uid, userFormatted)
}

export function authStateChanged(cb: CallableFunction) {
  onAuthStateChanged(auth, async (user) => {
    console.log(user)
    // FIXME: this function is called multiple times
    if (!user) {
      console.log(user)
      // console.log('not logged');
      return cb(null)
    } else {
      getUser(user.uid).then((res) => {
        cb(res)
      })
    }
  })
}

export async function googleLogin() {
  const provider = new GoogleAuthProvider()
  const user = await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result.user
      return user
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.error({ error })
      return null
      // ...
    })
}

export async function logout() {
  return await signOut(auth)
}
