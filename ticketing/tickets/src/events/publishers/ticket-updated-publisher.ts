import { Publisher, Subjects, TicketUpdatedEvent } from "@llticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
