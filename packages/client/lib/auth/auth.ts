import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';

import app from '~/firebase';

const auth = getAuth(app);

export const authService = {
  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  async signOut() {
    return firebaseSignOut(auth);
  },

  getCurrentUser() {
    return auth.currentUser;
  },
};
