## SECURITY CONCERNS

# initPassword

- Can be performed by any user
- Should check that the passwords are not empty or undefined
- Should check that the passwords given match
- Should check that the given token is linked to a user

# feedback

- Can be performed by any connected user

# contact

- Can be performed by any user

# updateUser

- Can be performed by any connected user
- Should check that the performer of this action is the user who tries to update his account otherwise unauthorized

# upsertUser

- Can be performed by * or BDE role only
- card has to be a *number*
- Should update sessions public data to reflect potential update in roles
- (Create) Should set a default random password and send an activation email for any new user created

# deleteManyUsers

- Can be performed by * or BDE role only