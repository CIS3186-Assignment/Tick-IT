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

      const bookingTickets = await fetchImagesForEvents(
        bookingTicketSnapshot.docs.map((ticketDoc) => ({
          id: ticketDoc.id,
          ...ticketDoc.data(),
        }))
      );

      bookedEvents.push({
        id: bookingDoc.id,
        eventDetails: bookingTickets,
      });
    }

    console.log("Booked events retrieved:", bookedEvents);
    return bookedEvents;
  } catch (error) {
    console.error("Error fetching booked events:", error);
    throw error;
  }
};

export default { fetchImagesForEvents, getUserBookedEvents };
