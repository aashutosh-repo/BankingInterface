import { Flight, Price } from "./flight.interface";

export interface Order {
    orderId: string;
    passenger: Passenger;
    flights: Flight[];
    totalPrice: Price;
    paymentStatus: 'pending' | 'paid' | 'failed';
    bookingDate: string; // ISO Date format (e.g., "2025-04-01T10:00:00Z")
  }


  