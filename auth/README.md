# Selldone Storefront SDK > Authentication

The Selldone Storefront SDK provides seamless authentication methods for customers. Users do not need to register beforehand. If a user tries to log in using any method, a customer account will be created automatically if it's their first time.

## Authentication Methods

### [Email](./email)

Authenticate customers using their email address. This method involves two steps:

1. **Send OTP**: The customer provides their email address, and an OTP (One-Time Password) is sent to that email.
2. **Verify OTP**: The customer enters the OTP they received to verify their email address.

### [SMS](./sms)

Authenticate customers using their phone number. This method also involves two steps:

1. **Send OTP**: The customer provides their phone number, and an OTP is sent to that number.
2. **Verify OTP**: The customer enters the OTP they received to verify their phone number.

If a user has more than one account associated with the verified phone number, they will be presented with a list of accounts to choose from for login.

#### Additional Information for SMS Authentication

- If the user logs in for the first time as a new user, their name and email will be requested.
- Providing an email is optional, but the email cannot be one that is already registered with Selldone for security and privacy reasons.


