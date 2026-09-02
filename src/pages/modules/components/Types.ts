export interface UnavailableDates {
    startDate: string;
    endDate: string;
    reason?: string;
    // "all" = blocks every room; a specific room id = blocks only that room.
    // Omitted on older records, which are treated as "all" for backward compatibility.
    roomId?: string;
  }

  export interface BookingModalProps {
    open: boolean;
    handleClose: () => void;
    selectedRoom: {
      id: string;
      title: string;
      price: number;
      price_extra: number;
      capacity: number;
    };
    pricing: {
      lunchPrice: number;
      dinnerPrice: number;
      discountRate: number;
    }
  }

  export interface Booking {
    checkInDate: string;
    checkOutDate: string;
  }

  export interface Room {
    id: string;
    title: string;
    description: string;
    price: number;
    price_extra: number;
    image: string;
    isActive: boolean;
    displayOrder: number;
    capacity: number;
    amenities: string[];
  }

  export interface PricingSettings {
    lunchPrice: number;
    dinnerPrice: number;
    discountRate: number;
    lastUpdated: number;
  }

  export interface MenuItem {
    name: string;
    path: string;
  }