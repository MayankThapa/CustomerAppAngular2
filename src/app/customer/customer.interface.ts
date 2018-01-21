
export interface Customer {
    customerName: string;
    address: Address[];
    phone: string;
    dob: string;
    email: string;
  }
  
  export interface Address {
    flat: string;
    street: string;
    state: string;
    pincode: string;
  }