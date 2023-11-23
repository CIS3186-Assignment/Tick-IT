import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { FIRESTORE } from "../FirebaseConfig";
import { getDocs, collection, getDoc } from "firebase/firestore";


// Function to get the list of categories
export const getCategories = async() =>{
  try {
    // Get the 'Categories' collection
    const categoriesRef = collection(FIRESTORE,'Categories');

    // Get all documents from the collection
    const snapshot = await getDocs(categoriesRef);
    // Initialize an empty array to store the categories
    const categories = [];

    // Loop through each document and add it to the categories array
    snapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data()});
    });

    // Return the list of categories
    console.log(categories);
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}
