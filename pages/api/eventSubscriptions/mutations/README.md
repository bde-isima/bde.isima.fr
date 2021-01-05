## SECURITY CONCERNS

# createEventSubscription

- Can be performed by \*, BDE or the club-name-for-which-trying-to-bound-a-subscription-to-an-event role only
- Should throw NotFoundError if no existing event is provided
- Should throw NotFoundError if no existing user is provided
- Should throw Error if the user is already subbed to this event

# updateEventSubscription

- Can be performed by \*, BDE or the club-who-created-this-event only
- Should throw NotFoundError if no existing subscription is already present

# upsertEventSubscription

- Can be performed by any connected user
- Should throw NotFoundError if no existing event is provided
- Should throw an Error if the event has products to sell and the cart is empty
- Should throw an Error if the event has a max number of subscribers and is full

# deleteEventSubscription

- Can be performed by any connected user
- Should check that the performer of this action is the user who tries to unsubscribe otherwise can be performed by \*, BDE or the club-who-created-this-event only
- If the subscription doesn't exist just skip without feedback
