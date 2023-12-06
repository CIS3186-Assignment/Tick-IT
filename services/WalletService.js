import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { FIRESTORE, STORAGE } from "../FirebaseConfig";

export const fetchImagesForEvents = async (events) => {
  try {
    const eventsWithImages = await Promise.all(
      events.map(async (event) => {
        try {
          if (!event.eventDetails.image_id) {
            return { ...event, imageURL: null };
          }

          const imageRef = storageRef(
            STORAGE,
            `images/${event.eventDetails.image_id}.png`
          );
          const imageURL = await getDownloadURL(imageRef);

          console.log(`Fetched image for event ${event.id}: ${imageURL}`);

          event.imageURL = imageURL;

          return event;
        } catch (error) {
          console.error("Error fetching image URL for event:", event.id, error);
          return { ...event, imageURL: null };
        }
      })
    );

    return eventsWithImages;
  } catch (error) {
    console.error("Error fetching images for events:", error);
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

    const bookedEvents = [];

    for (const bookingDoc of bookingsSnapshot.docs) {
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
        continue;
      }

      const bookingTickets = [];

      for (const ticketDoc of bookingTicketSnapshot.docs) {
        const ticket = ticketDoc.data();

        if (
          !ticket ||
          !ticket.eventTicket ||
          !ticket.eventTicket._key ||
          !ticket.eventTicket._key.path
        ) {
          console.error("Incomplete or undefined ticket details:", ticket);
          continue;
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
            const eventDetails = {
              id: ticketDoc.id,
              eventId,
              eventDetails: eventDoc.data(),
              ...ticket,
            };

            console.log(`Fetched details for event ${eventId}:`, eventDetails);

            const eventWithImage = await fetchImagesForEvents([eventDetails]);
            bookingTickets.push(eventWithImage[0]);
          } else {
            console.error("Event not found for eventId:", eventId);
          }
        } else {
          console.error("EventId is undefined in ticket details:", ticket);
        }
      }

      bookedEvents.push({
        id: bookingDoc.id,
        eventDetails: bookingTickets,
      });
    }

    console.log("Booked events:", bookedEvents);
    return bookedEvents;
  } catch (error) {
    console.error("Error fetching booked events:", error);
    throw error;
  }
};

export default { fetchImagesForEvents, getUserBookedEvents };