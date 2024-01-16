import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { FIRESTORE, STORAGE } from "../FirebaseConfig";

export const fetchImagesForEvents = async (bookingTickets) => {
  try {
    const bookingTicketsWithImages = await Promise.all(
      bookingTickets.map(async (ticket) => {
        try {
          if (!ticket.eventTicket || !ticket.eventTicket.image_id) {
            return { ...ticket, imageURL: null };
          }

          const imageRef = storageRef(
            STORAGE,
            `images/${ticket.eventTicket.image_id}.png`
          );
          const imageURL = await getDownloadURL(imageRef);

          console.log("Image URL retrieved for ticket:", ticket.id);
          ticket.imageURL = imageURL;

          return ticket;
        } catch (error) {
          console.error(
            "Error fetching image URL for ticket:",
            ticket.id,
            error
          );
          return { ...ticket, imageURL: null };
        }
      })
    );

    return bookingTicketsWithImages;
  } catch (error) {
    console.error("Error fetching images for booking tickets:", error);
    throw error;
  }
};

export const getUserBookedEvents = async (userId) => {
  try {
    const userDocRef = doc(FIRESTORE, "Users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error("User not found");
      return [];
    }

    const bookingsCollectionRef = collection(
      FIRESTORE,
      "Users",
      userId,
      "Bookings"
    );
    const bookingsSnapshot = await getDocs(bookingsCollectionRef);

    const bookedEventsPromises = bookingsSnapshot.docs.map(async (bookingDoc) => {
      const booking = bookingDoc.data();

      const bookingTicketCollectionRef = collection(
        FIRESTORE,
        "Users",
        userId,
        "Bookings",
        bookingDoc.id,
        "BookingTicket"
      );
      const bookingTicketSnapshot = await getDocs(bookingTicketCollectionRef);

      if (bookingTicketSnapshot.empty) {
        console.error("BookingTicket not found for bookingId:", bookingDoc.id);
        return null;
      }

      const bookingTicketsPromises = bookingTicketSnapshot.docs.map(async (ticketDoc) => {
        const ticket = ticketDoc.data();

        if (
          !ticket ||
          !ticket.eventTicket ||
          !ticket.eventTicket._key ||
          !ticket.eventTicket._key.path
        ) {
          console.error("Incomplete or undefined ticket details:", ticket);
          return null;
        }

        const eventSegmentsIndex =
          ticket.eventTicket._key.path.segments.indexOf("Events");
        if (
          eventSegmentsIndex !== -1 &&
          eventSegmentsIndex + 2 < ticket.eventTicket._key.path.segments.length
        ) {
          const eventId =
            ticket.eventTicket._key.path.segments[eventSegmentsIndex + 1];

          const eventRef = doc(FIRESTORE, "Events", eventId);
          const eventDoc = await getDoc(eventRef);

          if (eventDoc.exists()) {
            const eventCreatorRef = eventDoc.data().EventCreator;
            const eventCreatorDoc = await getDoc(eventCreatorRef);
            const eventCreator = eventCreatorDoc.exists()
              ? eventCreatorDoc.data()
              : null;

            const eventDetails = {
              id: ticketDoc.id,
              eventId,
              eventDetails: {
                ...eventDoc.data(),
                eventCreator,
              },
              ...ticket,
            };

            const eventWithImage = await fetchImagesForEvents([eventDetails]);
            return eventWithImage[0];
          } else {
            console.error("Event not found for eventId:", eventId);
            return null;
          }
        } else {
          console.error("EventId is undefined in ticket details:", ticket);
          return null;
        }
      });

      const bookingTickets = await Promise.all(bookingTicketsPromises);
      return {
        id: bookingDoc.id,
        eventDetails: bookingTickets.filter(Boolean),
      };
    });

    const bookedEvents = await Promise.all(bookedEventsPromises);
    return bookedEvents.filter(Boolean);
  } catch (error) {
    console.error("Error fetching booked events:", error);
    throw error;
  }
};


export default { fetchImagesForEvents, getUserBookedEvents };
