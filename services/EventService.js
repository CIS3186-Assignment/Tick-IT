import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { FIRESTORE, STORAGE } from "../FirebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

const fetchEventTickets = async (eventTicketsCollection) => {
  const eventTicketsCollectionDocs = await getDocs(eventTicketsCollection);

  return Promise.all(
    eventTicketsCollectionDocs.docs.map(async (eventTicketsDoc) => {
      const ticket = {
        id: eventTicketsDoc.id,
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

export const getEventById = async (eventId) => {
  try {
    const eventDocRef = doc(FIRESTORE, "Events", eventId);
    const eventDoc = await getDoc(eventDocRef);

    const event = {
      id: eventDoc.id,
      ...eventDoc.data(),
    };

    const eventTicketsCollection = collection(
      FIRESTORE,
      "Events",
      eventId,
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

    const imageRef = ref(STORAGE, `images/${event.image_id}.png`);
    const imageURL = await getDownloadURL(imageRef);

    event.imageURL = imageURL;

    return event;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};
