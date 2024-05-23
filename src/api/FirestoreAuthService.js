import auth from '@react-native-firebase/auth';

export const login = async (email, password) => {
  try {
    const { user } = await auth().signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signup = async (email, password) => {
  try {
    const { user } = await auth().createUserWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserId = () => {
  const user = auth().currentUser;
  return user ? user.uid : null;
};

export const isUserLoggedIn = () => {
  const user = auth().currentUser;
  return user ? true : false;
};

export const onAuthStateChange = (callback) => {
  return auth().onAuthStateChanged(callback);
};

export const logout = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};