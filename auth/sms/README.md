# Selldone Storefront SDK - Authentication > SMS

This module provides functionality to authenticate users in a shop using SMS through the Selldone Storefront SDK. It includes functions to request an OTP (One-Time Password), verify the OTP, register a new user, and select a user when multiple users are associated with the same phone number.

## STEP 1. Request OTP

To request an OTP, use the `requestOTP` function. This function sends an OTP to the provided phone number.

#### Parameters

- `phone` (string): The phone number to which the OTP should be sent.

#### Returns

- `Promise<IResponse>`: A promise that resolves to an IResponse object containing the success status.

#### Sample Usage

```typescript
function requestOTPSample() {
    this.busy = true;

    window.$storefront.auth.sms
        .requestOTP(this.phone)
        .then(({ success }) => {

        })
        .catch((error) => {

        })
        .finally(() => {
            this.busy = false;
        });
}
```

#### requestOTP.IResponse

```typescript
export interface IResponse {
    success: boolean;
}
```

## STEP 2. Verify OTP

To verify an OTP, use the `verifyOTP` function. This function verifies the OTP sent to the phone number and returns an authentication token if successful.

#### Parameters

- `phone` (string): The phone number to verify with the OTP.
- `verification_code` (string | number): The OTP sent to the phone number.

#### Returns

- `Promise<IResponse>`: A promise that resolves to an IResponse object containing the token and expiration time.

#### Sample Usage

```typescript
function verifyOTPSample() {
    this.busy = true;

    window.$storefront.auth.sms
        .verifyOTP(this.phone, this.verification_code)
        .then(({ token, expires_in }) => {

        })
        .catch((error) => {

        })
        .finally(() => {
            this.busy = false;
        });
}
```

#### verifyOTP.IResponse

```typescript
export interface IResponse {
    token: string;
    expires_in: number;
}
```

## STEP 3. Register User

To register a new user, use the `registerUser` function. This function registers a new user with the provided details.

#### Parameters

- `code` (string | number): The verification code received by the user.
- `name` (string): The name of the user.
- `email` (string | null): The email of the user (optional).
- `password` (string | null): The password for the user's account (optional).
- `no_email_mode` (boolean): A flag indicating whether to operate in no-email mode.
- `source` (Customer.Source | null): The source of the user (e.g., CUSTOMER or VENDOR).

#### Returns

- `Promise<ISMSVerifyOTPServerResponse_Login>`: A promise that resolves to an ISMSVerifyOTPServerResponse_Login object.

#### Sample Usage

```typescript
function registerUserSample() {
    this.busy = true;

    window.$storefront.auth.sms
        .registerUser(this.code, this.name, this.email, this.password, this.no_email_mode, this.source)
        .then(({ token, expires_in }) => {

        })
        .catch((error) => {

        })
        .finally(() => {
            this.busy = false;
        });
}
```

#### ISMSVerifyOTPServerResponse_Login

```typescript
export interface ISMSVerifyOTPServerResponse_Login {
    method: 'login';
    token: string;
    expires_in: number;
}
```

## STEP 4. Select User

To select a user when multiple users are associated with the same phone number, use the `selectUser` function.

#### Parameters

- `userId` (string): The ID of the user to select.

#### Returns

- `Promise<any>`: A promise that resolves to an object containing the selection status.

#### Sample Usage

```typescript
function selectUserSample() {
    this.busy = true;

    window.$storefront.auth.sms
        .selectUser(this.userId)
        .then((response) => {

        })
        .catch((error) => {

        })
        .finally(() => {
            this.busy = false;
        });
}
```
```