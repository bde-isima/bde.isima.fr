## SECURITY CONCERNS

# feedback

- Can be performed by any connected user

# contact

- Can be performed by any user

# updateUser

- Can be performed by any connected user
- Should check that the performer of this action is the user who tries to update his account otherwise unauthorized

# upsertUser

- Can be performed by \* or BDE role only
- card has to be a _number_
- Should update sessions public data to reflect potential update in roles
- (Create) Should send an activation email for any new user created

# deleteManyUsers

- Can be performed by \* or BDE role only
