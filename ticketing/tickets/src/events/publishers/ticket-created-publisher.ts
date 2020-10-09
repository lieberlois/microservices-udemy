import { Publisher, Subjects, TicketCreatedEvent } from "@llticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
