import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { Container, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components for visual enhancement
const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: "bold",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
  textAlign: "center",
}));

const FAQContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const Question = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const Answer = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// Array to hold FAQs
const faqs = [
  {
    question:
      "What is the check-in/check-out time at the vintage-themed boutique hotel?",
    answer:
      "Check-in time is at 2:00 PM, and check-out time is at 11:00 AM. We do our best to accommodate early arrivals and late departures based on availability.",
  },
  {
    question: "Do you offer transportation to and from the hotel?",
    answer:
      "Unfortunately, we do not provide transportation services at this time.",
  },
  {
    question: "Can I request a room with a specific vintage theme or view?",
    answer:
      "Certainly! We offer a variety of room types and themes. While we cannot guarantee a specific room, we will do our best to accommodate your preferences based on availability.",
  },
  {
    question: "What dining options are available at the hotel?",
    answer:
      "Our vintage-themed hotel boasts a charming on-site restaurant, 'The Vintage Table,' offering a delectable menu featuring both local and international cuisine.",
  },
  {
    question:
      "Do you accommodate dietary restrictions or special requests for meals?",
    answer:
      "Yes, we take pride in accommodating dietary restrictions and special requests. Please inform us of your requirements in advance, and our culinary team will create a memorable dining experience for you.",
  },
  {
    question: "Is there Wi-Fi or 4G available throughout the hotel?",
    answer: "Not providing Wi-Fi, 4G signal avialable in the balcony.",
  },
  {
    question: "Are pets allowed at the vintage-themed hotel?",
    answer:
      "Unfortunately, we do not permit pets at our boutique hotel, as we strive to maintain a tranquil and allergy-free environment for all guests.",
  },
  {
    question:
      "Do you provide guided tours or activities in the surrounding area?",
    answer:
      "Yes, we offer a range of guided tours and activities that showcase the natural beauty and cultural heritage of our location in the Knuckles Mountain Range. Our staff will be happy to assist you in planning your excursions.",
  },
  {
    question: "Is there a dress code for the hotel's dining areas?",
    answer:
      "While we appreciate appropriate attire in our dining areas, we encourage our guests to feel comfortable and relaxed. Formal attire is not required.",
  },
  {
    question:
      "What measures are in place to ensure the safety and comfort of guests during their stay?",
    answer:
      "The safety and comfort of our guests are our top priorities. We have implemented enhanced cleaning protocols, provide hand sanitizing stations throughout the hotel, and follow all recommended health and safety guidelines. Our staff is dedicated to ensuring you have a worry-free and enjoyable stay at our vintage-themed boutique hotel.",
  },
  {
    question: "Is breakfast included with my stay?",
    answer:
      "Yes, a complimentary breakfast is included for all guests staying at our hotel. Enjoy a selection of local and international dishes to start your day.",
  },
  {
    question: "What activities can I enjoy in the surrounding area?",
    answer:
      "Guests can enjoy hiking, nature walks, bird watching, and exploring the unique flora and fauna of the Knuckles Mountain Range. Our team can help arrange local activities and excursions.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and cash payments. Payment is required at check-in or before departure.",
  },
  {
    question: "Can I modify or cancel my reservation?",
    answer:
      "Yes, modifications and cancellations can be made according to our cancellation policy. Please refer to your booking confirmation for specific details.",
  },
  {
    question: "Is there are parking near the villa?",
    answer:
      "Yes, there is a private parking free of charge and we are providing jeep to near villa, then ou have to walk 700m to villa (Thangappuwa Heel-Oya trail).",
  },
];

function FAQ() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <SectionTitle variant="h4">Frequently Asked Questions</SectionTitle>

        <FAQContainer>
          {faqs.map((faq, index) => (
            <div key={index}>
              <Question variant="h6">Q: {faq.question}</Question>
              <Answer>A: {faq.answer}</Answer>
            </div>
          ))}
        </FAQContainer>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(FAQ);
