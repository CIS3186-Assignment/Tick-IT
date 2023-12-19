import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { FIRESTORE, STORAGE } from "../FirebaseConfig";

export const fetchImagesForEvents = async (events) => {
  try {
    const eventsWithImages = await Promise.all(
      events.map(async (event) => {
        try {
          if (!event.eventDetails || !event.eventDetails.image_id) {
            console.log("No image_id for event:", event.id);
            return { ...event, imageURL: null };
          }

          const imageRef = storageRef(
            STORAGE,
            `images/${event.eventDetails.image_id}.png`
          );
          const imageURL = await getDownloadURL(imageRef);

          console.log("Image URL retrieved for event:", event.id);
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
      console.log("Fetching details for booking:", bookingDoc.id);
      const booking = bookingDoc.data();
      const bookingEvents = await fetchBookingEventsDetails(booking);

      bookedEvents.push({
        id: bookingDoc.id,
        eventDetails: bookingEvents,
      });
    }

    console.log("Booked events retrieved:", bookedEvents);
    return bookedEvents;
  } catch (error) {
    console.error("Error fetching booked events:", error);
    throw error;
  }
};

const fetchBookingEventsDetails = async (booking) => {
  const bookingEvents = [];

  for (const eventDetails of booking.eventDetails || []) {
    console.log("Fetching details for event:", eventDetails.eventId);

    try {
      const eventRef = doc(FIRESTORE, "Events", eventDetails.eventId);
      const eventDoc = await getDoc(eventRef);

      if (eventDoc.exists()) {
        console.log("Event found for eventId:", eventDetails.eventId);
        const eventCreatorRef = eventDoc.data().EventCreator;
        const eventCreatorDoc = await getDoc(eventCreatorRef);
        const eventCreator = eventCreatorDoc.exists()
          ? eventCreatorDoc.data()
          : null;

        const eventWithImage = await fetchImagesForEvents([
          {
            id: booking.id,
            eventId: eventDetails.eventId,
            eventDetails: {
              ...eventDoc.data(),
              eventCreator,
            },
            ...eventDetails,
          },
        ]);

        bookingEvents.push(eventWithImage[0]);
      } else {
        console.error("Event not found for eventId:", eventDetails.eventId);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  }

  return bookingEvents;
};

export default { fetchImagesForEvents, getUserBookedEvents };
