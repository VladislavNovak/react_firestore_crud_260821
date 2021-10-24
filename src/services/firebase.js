// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: `AIzaSyBZm_g0MHRaWZYW5xtzjWw1-l0gTnHHRhk`,
  authDomain: `react-firestore-crud-260821.firebaseapp.com`,
  projectId: `react-firestore-crud-260821`,
  storageBucket: `react-firestore-crud-260821.appspot.com`,
  messagingSenderId: `95793793181`,
  appId: `1:95793793181:web:2ee1faf63fc0e4a9506c74`
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
