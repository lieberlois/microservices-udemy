export enum OrderStatus {
  // Order is created but not yet reserved.
  Created = "created",
  // The ticket the order is trying to reserve has already been reserved or manually cancelled (or expired).
  Cancelled = "cancelled",
  // The order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",
  // Payment successful
  Complete = "complete",
}
