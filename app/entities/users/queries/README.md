## SECURITY CONCERNS

# getCurrentUser

- Can be performed by any connected user who has an active session

# getUser

- Can be performed by any connected user
- Should throw NotFoundError if no existing user is provided

# getUsers

- Can be performed by * or BDE role only

# getUsersPublicData

- Can be performed by any connected user