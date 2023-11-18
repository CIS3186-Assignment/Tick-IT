import { getDocs, collection } from "firebase/firestore";
import { FIRESTORE } from "../FirebaseConfig";

export const getAllEvents = async () => {
  try {
    const eventsCollection = collection(FIRESTORE, "Events");
    const querySnapshot = await getDocs(eventsCollection);

    const events = [];
    querySnapshot.forEach((documentSnapshot) => {
      const event = {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      };
      events.push(event);
    });

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
