## SECURITY CONCERNS

# checkoutEvent

- Can be performed by \* or BDE role only
- Should throw NotFoundError if no existing event is provided
- Should only bill event subscriptions with _BDE_ payment method
- Should only bill event subscriptions with a total amount _positive_

# updateEvent

- Can be performed by \* or BDE role only

# upsertEvent

- (Create) Can be performed by \*, BDE or the club-trying-to-create-an-event role only
- (Update) Can be performed by \*, BDE or the club-trying-to-update-an-event role only

# deleteManyEvents

- Can be performed by \* or BDE role only
