import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDQPSVCe0YVGLWIoC9g0rnKod-65p_XEpw',
  authDomain: 'pos365-jasonbell.firebaseapp.com',
  projectId: 'pos365-jasonbell',
  storageBucket: 'pos365-jasonbell.appspot.com',
  messagingSenderId: '320460209268',
  appId: '1:320460209268:web:753350f10a99511884e521',
  measurementId: 'G-9HRFD14KFJ',
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
