import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyCjaPlphm9hNkSNpLcOMre6HzRl__K0yB4",
    authDomain: "crwn-be52f.firebaseapp.com",
    databaseURL: "https://crwn-be52f.firebaseio.com",
    projectId: "crwn-be52f",
    storageBucket: "crwn-be52f.appspot.com",
    messagingSenderId: "716173314743",
    appId: "1:716173314743:web:ae87dcc21543390ece5b32"
  };

  export const createUSerProfileDocument=async (userAuth,additionalData) =>{

    if(!userAuth) return;

    const userRef=  firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get()

    if(!snapShot.exists){
        const {displayName,email} =userAuth;
        const createdAt = new Date();

        try {
            
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            
            console.log('error creating user ', error.message)
             
        }

        

    }

    return userRef; 


  }






  firebase.initializeApp(firebaseConfig)

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt:'select_account'})

  export const signInWithGoogle=()=> auth.signInWithPopup(provider)

export default firebase;
