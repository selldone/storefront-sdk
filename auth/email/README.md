# Selldone Storefront SDK - Authentication > Email

This module provides functionality to authenticate users in a shop using email through the Selldone Storefront SDK. It
includes functions to request an OTP (One-Time Password) and verify the OTP.

## STEP 1. Request OTP

To request an OTP, use the `requestOTP` function. This function sends an OTP to the provided email address.

#### Parameters

- `email` (string): The email address to which the OTP should be sent.

#### Returns

- `Promise<IResponse>`: A promise that resolves to an IResponse object containing the success status and email.

#### Sample Usage

```typescript
function requestOTPSample() {
    this.busy = true;

    window.$storefront.auth.email
        .requestOtp(this.email)
        .then(({success}) => {

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
    email: string;
}
```

## STEP 2. Verify OTP

To verify an OTP, use the `verifyOTP` function. This function verifies the OTP sent to the email address and returns an
authentication token if successful.

#### Parameters

- `email` (string): The email address to verify with the OTP.
- `verification_code` (string): The OTP sent to the email address.
- `source` (Customer.Source): The source from which the verification is requested.


#### Returns

- `Promise<IResponse>`: A promise that resolves to an IResponse object containing the token and expiration time.

#### Sample Usage

```typescript
function verifyOTPSample() {
    this.busy = true;

    window.$storefront.auth.email
        .verifyOTP(this.email, this.otp, this.source)
        .then(({token, expires_in}) => {

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
    expires_in: string;
}
```


