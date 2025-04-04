export interface Airline {
    name: string;
    code: string;
  }
  
  export interface Price {
    amount: number;
    currency: string;
  }

  export interface Passenger {
    firstName: string;
    lastName: string;
    dateOfBirth: string; // ISO format "YYYY-MM-DD"
    passportNumber?: string;
    nationality: string;
  }

  
  export interface CabinClass {
    type: 'economy' | 'premiumEconomy' | 'business';
    name: string;
    price: Price;
    available: boolean;
    mixedCabin?: boolean;
  }
  
  export interface Stop {
    airport: string;
    duration: string;
  }
  
  export interface Flight {
    id: string;
    departureTime: string;
    departureAirport: {
      code: string;
      name: string;
      terminal: string;
    };
    arrivalTime: string;
    arrivalAirport: {
      code: string;
      name: string;
      terminal: string;
    };
    duration: string;
    stops: Stop[];
    airlines: Airline[];
    seatsLeft?: number;
    cabinClasses: CabinClass[];
    nextDayArrival?: boolean;
    aircraft?: string;
  }