## SECURITY CONCERNS

# createAdminTransaction

- Can be performed by * or BDE role only
- Should throw NotFoundError if no existing user is provided

# createArticleTransaction

- Can be performed by * or BDE role only
- Should throw NotFoundError if no existing user is provided
- Should throw NotFoundError if no existing article is provided

# createTransferTransaction

- Can be performed by any connected user
- Should throw an Error if the user requesting the transfer isn't the emitter
- Should throw an Error if the user tries to do a self transfer
- Should throw an Error if the user tries to do a negative transfer
- Should throw NotFoundError if no existing receiver is provided
- Should throw NotFoundError if no existing emitter is provided

# requestTopUp

- Can be performed by any connected user
- Should check that the performer of this action is the user who tries to top up
- The amount must be between 5€ and 1000€