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

export const getUserId = () => {
  const user = auth().currentUser;
  if (user) {
    return user.uid;
  } else {
    return null;
  }
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