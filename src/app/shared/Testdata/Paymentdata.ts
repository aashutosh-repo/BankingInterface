export function generateRandomUpiOrder() {
  // Random helpers
  const randomId = (prefix: string, length: number) =>
    prefix + Math.random().toString(36).substring(2, 2 + length).toUpperCase();

  const randomAmount = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    paymentMethod: "UPI",
    token: randomId("TKN", 12),
    merchantId: randomId("MERCHANT", 5),
    customerId: randomId("CUST", 4),
    amount: randomAmount(100, 5000), // random amount between 100–5000s
    currency: "INR",
    billingAddress: {
      payerName: "Aashutosh Kumar",
      city: "Aurangabad",
      fullAddress: "Jamhor Aurangabad, Bihar",
      country: "INDIA",
      pincode: "201306"
    },
    upiId: "aashutosh@upi",
    orderId: randomId("ORD", 8) // ✅ add a random orderId for tracking
  };
}
