import { getDocs, collection, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../FirebaseConfig";

export const getAllEvents = async () => {
  try {
    const eventsCollection = collection(FIRESTORE, "Events");
    const querySnapshot = await getDocs(eventsCollection);

    const events = [];
    for (const documentSnapshot of querySnapshot.docs) {
      const event = {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      };

      const eventCreatorRef = event.EventCreator;

      const creatorDoc = await getDoc(eventCreatorRef);
      
      if (creatorDoc.exists()) {
        const creatorData = creatorDoc.data();
        event.eventCreator = {
          name: creatorData.name,
          address: creatorData.address,
          email: creatorData.email,
          phone: creatorData.phone,
        };
      }

      events.push(event);
    }
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
