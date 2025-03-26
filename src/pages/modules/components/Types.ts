export interface UnavailableDates {
    startDate: string;
    endDate: string;
    reason?: string;
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