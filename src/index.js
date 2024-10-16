import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";

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

// Fetch documents from Firestore
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch(err => {
    console.log(err.message);
  });

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

// Deleting a book by document ID
const deleteBookForm = document.querySelector('.delete');  // Correct selector
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the document ID from the form input
  const docId = deleteBookForm.id.value;

  // Delete the document from Firestore
  const docRef = doc(db, 'books', docId);
  deleteDoc(docRef)
    .then(() => {
      console.log(`Book with ID ${docId} deleted successfully!`);
      deleteBookForm.reset();  // Reset the form after deletion
    })
    .catch(err => {
      console.log("Error deleting book:", err.message);
    });
});
