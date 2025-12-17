import { createContext, ReactNode, useContext, useState } from "react";
import { Address, Carrier } from "../types";

// Checkout state interface
interface CheckoutState {
  selectedAddress: Address | null;
  selectedCarrier: Carrier | null;
  orderId: number | null;
}

// Context intrface
interface CheckoutContextType {
    state: CheckoutState;
    setSelectedAddress: (address: Address) => void;
    setSelectedCarrier: (carrier: Carrier) => void;
    setOrderId: (id: number) => void;
    resetCheckout: () => void;
}

// initial state
const initialState: CheckoutState = {
    selectedAddress: null,
    selectedCarrier: null,
    orderId: null,
};
// Create context
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

// Provider component
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckoutState>(initialState);

  const setSelectedAddress = (address: Address) => {
    setState(prev => ({ ...prev, selectedAddress: address }));
  };

  const setSelectedCarrier = (carrier: Carrier) => {
    setState(prev => ({ ...prev, selectedCarrier: carrier }));
  };

  const setOrderId = (id: number) => {
    setState(prev => ({ ...prev, orderId: id }));
  };

  const resetCheckout = () => {
    setState(initialState);
  };

  return (
    <CheckoutContext.Provider
      value={{
        state,
        setSelectedAddress,
        setSelectedCarrier,
        setOrderId,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

// Custom hook
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}