import { getDocs, collection, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../FirebaseConfig";

const fetchEventTickets = async (eventTicketsCollection) => {
  const eventTicketsCollectionDocs = await getDocs(eventTicketsCollection);

  return Promise.all(
    eventTicketsCollectionDocs.docs.map(async (eventTicketsDoc) => {
      const ticket = {
        ...eventTicketsDoc.data(),
      };

      ticket.name = (
        await getDoc(ticket.TicketType).then((doc) => doc.data())
      ).name;

      return ticket;
    })
  );
};

export const getAllEvents = async () => {
  try {
    const eventsCollection = collection(FIRESTORE, "Events");
    const querySnapshot = await getDocs(eventsCollection);

    const eventPromises = querySnapshot.docs.map(async (documentSnapshot) => {
      const event = {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      };

      console.log("loaded event");

      const eventTicketsCollection = collection(
        FIRESTORE,
        documentSnapshot.ref.path,
        "EventTickets"
      );

      const categoryPromise = getDoc(event.Category);
      const creatorPromise = getDoc(event.EventCreator);
      const ticketsPromise = fetchEventTickets(eventTicketsCollection);

      const [categoryDoc, creatorDoc, eventTickets] = await Promise.all([
        categoryPromise,
        creatorPromise,
        ticketsPromise,
      ]);

      if (categoryDoc.exists()) {
        const categoryData = categoryDoc.data();
        event.category = {
          id: categoryDoc.id,
          ...categoryData,
        };
      }

      if (creatorDoc.exists()) {
        const creatorData = creatorDoc.data();
        event.eventCreator = {
          name: creatorData.name,
          address: creatorData.address,
          email: creatorData.email,
          phone: creatorData.contact_number,
        };
      }

      event.tickets = eventTickets;

      return event;
    });

    const events = await Promise.all(eventPromises);

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
