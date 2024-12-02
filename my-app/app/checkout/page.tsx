import React from "react";
import DeliveryDetails from "./DeliveryDetails";
import PayPalBtn from "./PayPalBtn";
import AddressDetails from "./AddressDetails";

export default function Checkout() {
  return (
    <div className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 h-screen">
      <DeliveryDetails />
    
      <PayPalBtn />
    </div>
  );
}
