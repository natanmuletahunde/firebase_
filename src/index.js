import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc,onSnapshot , getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5-4-23wj_HgQ8ixOCflKx8LNRp4w1pYw",
  authDomain: "fir-9-dojos-271af.firebaseapp.com",
  projectId: "fir-9-dojos-271af",
  storageBucket: "fir-9-dojos-271af.appspot.com",
  messagingSenderId: "473259734233",
  appId: "1:473259734233:web:1fcd4277bcc15630c33ac8"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();
const colRef = collection(db, 'books');

// real time collection  data 

  onSnapshot(colRef,(snapshot)=>{
    let books = [];
    snapshot.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);  
  })

// Adding a new book
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Add a new document to Firestore
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    console.log("Book added successfully!");
    addBookForm.reset();  // Reset the form after successful addition
  })
  .catch(err => {
    console.log("Error adding book:", err.message);
  });
});

const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the document ID from the form input
  const docId = deleteBookForm.querySelector('[name="id"]').value;

  if (docId) {
    // Reference the document to delete
    const docRef = doc(db, 'books', docId);

    // Delete the document
    deleteDoc(docRef)
      .then(() => {
        console.log(`Book with ID ${docId} deleted successfully!`);
        deleteBookForm.reset();  // Reset the form after deletion
      })
      .catch(err => {
        console.error("Error deleting book:", err.message);  // Log the error
      });
  } else {
    console.error('Document ID is missing');
  }
});

