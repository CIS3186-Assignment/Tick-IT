import { getDocs, collection, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../FirebaseConfig";


export const getAllEvents = async () => {
  try {

    const eventsCollection = collection(FIRESTORE, "Events");
    const querySnapshot = await getDocs(eventsCollection);

    const events = [];
    const creatorPromises = [];

    for (const documentSnapshot of querySnapshot.docs) {
      const event = {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      };

      let eventTicketsCollection = collection(FIRESTORE,documentSnapshot.ref.path,"EventTickets")

      let eventTickets = []

      let eventTicketsCollectionDocs = (await getDocs(eventTicketsCollection)).docs

      for (let eventTicketsDoc of eventTicketsCollectionDocs){

        ticket = {
          ...eventTicketsDoc.data()
        }

        ticket.name = await ((await getDoc(ticket.TicketType)).data()).name

        eventTickets.push(ticket)
      }

      event.tickets = eventTickets

      const eventCreatorRef = event.EventCreator;
      const creatorPromise = getDoc(eventCreatorRef);

      creatorPromises.push(creatorPromise);

      events.push(event);
    }

    const creatorDocs = await Promise.all(creatorPromises);

    for (let i = 0; i < creatorDocs.length; i++) {
      const creatorDoc = creatorDocs[i];
      const event = events[i];

      if (creatorDoc.exists()) {
        const creatorData = creatorDoc.data();
        event.eventCreator = {
          name: creatorData.name,
          address: creatorData.address,
          email: creatorData.email,
          phone: creatorData.phone,
        };
      }
    }

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
