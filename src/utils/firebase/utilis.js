import { initializeApp } from "firebase/app";
import { 
    signOut,
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBvWC8JeFCWqulgfk0F0uzVVGBxdzG8PQo",
  authDomain: "zenithshop-db.firebaseapp.com",
  projectId: "zenithshop-db",
  storageBucket: "zenithshop-db.appspot.com",
  messagingSenderId: "635171970226",
  appId: "1:635171970226:web:e202da6e2b1538b9b77dab"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInwithGooglePopup = () => 
    signInWithPopup(auth, googleProvider);
export const signInwithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
        
    });
    await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapShot = await getDocs(q);
    const categoriesArray = querySnapShot.docs.map((docSnapShot) => {
        const { title, items } = docSnapShot.data();
        return { title, items };
    });

    return categoriesArray;
};

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation={}
    ) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);
    if(!userSnapShot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                additionalInformation
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    };
    return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);