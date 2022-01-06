type FINALCIAL_STATUS = "PENDING" | "PAID" | "CANCELED";
type FULFILLMENT_STATUS = "PENDING" | "FULFILLED" | "CANCELED";

export default interface Order {
  id: string;
  orderNumber: number;
  currencyCode: string;
  currentTotalPrice: {
    amount: number;
    currencyCode: string;
  };
  financialStatus: FINALCIAL_STATUS;
  fulfillmentStatus: FULFILLMENT_STATUS;
  processedAt: string;
}
