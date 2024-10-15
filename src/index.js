import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
const firebaseConfig = {

    apiKey: "AIzaSyB5-4-23wj_HgQ8ixOCflKx8LNRp4w1pYw",
  
    authDomain: "fir-9-dojos-271af.firebaseapp.com",
  
    projectId: "fir-9-dojos-271af",
  
    storageBucket: "fir-9-dojos-271af.appspot.com",
  
    messagingSenderId: "473259734233",
  
    appId: "1:473259734233:web:1fcd4277bcc15630c33ac8"
  
  };

  initializeApp(firebaseConfig)
  const db = getFirestore()
  const colRef = collection(db, 'books')
  getDocs(colRef)
  .then((snapshot)=>{
    let books =[]
    snapshot.forEach((doc) => {
        books.push({...doc.data(), id:doc.id})
    });
    console.log(books)
  })
  .catch(err=>{
        console.log(err.messsage);
  })