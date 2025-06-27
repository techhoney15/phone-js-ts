# validate-phone-number

Easily check if a phone number is valid for a specific country and calling code. Just provide the country code, calling code, and phone number to get a detailed validation result.

A simple utility to validate international phone numbers and retrieve structured information—including country name, country codes, and formatted phone numbers.

> **Guideline:** If you provide both the calling code and country code, do **not** append the calling code to the phone number itself. The phone number should only contain the local part.

## Platform Support

This package is designed to work seamlessly across all major JavaScript and TypeScript frameworks and environments, including but not limited to:

- **React Native**
- **React.js**
- **Node.js**
- **Next.js**
- **Angular**
- **Vue.js**
- **Svelte**
- **Express.js**
- **Nuxt.js**
- **Electron**
- **Gatsby**
- **Ionic**
- **Meteor**
- **Remix**
- **NestJS**
- **Vanilla JavaScript/TypeScript projects**
- **Browser and server-side (backend) applications**

No matter which JavaScript or TypeScript environment you're working in, this package integrates smoothly to provide reliable phone number validation.

## Installation

```bash
npm install validate-phone-number
```

## Usage

```js
import validatePhoneNumber from "validate-phone-number";

const result = validatePhoneNumber({
  callingCode: "+91",
  countryCode: "IN",
  phone: "9876543210",
});

console.log(result);
/*
{
  status: true,
  error: null,
  message: "Phone number is valid for India (IN)",
  data: {
    countryCode: "IN",
    countryCode3: "IND",
    countryCallingCode: "91",
    countryCallingCodeWithPlus: "+91",
    countryName: "India",
    phone: "9876543210",
    formalPhoneNumber: "91 9876543210",
    formalPhoneNumerWithPlus: "+91 9876543210",
  },
}
*/
```

### Parameters

- `callingCode` (string): The country calling code (e.g., "+91", "91", "1", "44").
- `countryCode` (string): The ISO country code (e.g., "IN", "US", "GB", "USA").
- `phone` (string): The phone number to validate (e.g., "9876543210", "4155552671", "15123456789").

#### Example Parameters

```js
// Example: India
{
  callingCode: "+91",
  countryCode: "IN",
  phone: "9876543210",
}

// Example: United States
{
  callingCode: "+1",
  countryCode: "US",
  phone: "4155552671",
}

// Example: Germany
{
  callingCode: "+49",
  countryCode: "DE",
  phone: "15123456789",
}
```

### Return Value

The function returns an object with the following properties:

- `status` (boolean): Indicates if the phone number is valid.
- `error` (string \| null): Error message if validation fails, otherwise `null`.
- `message` (string): A human-readable validation message.
- `data` (object): Contains detailed information:
  - `countryCode` (string): ISO country code (e.g., "IN").
  - `countryCode3` (string): ISO 3-letter country code (e.g., "IND").
  - `countryCallingCode` (string): Country calling code without plus (e.g., "91").
  - `countryCallingCodeWithPlus` (string): Country calling code with plus (e.g., "+91").
  - `countryName` (string): Country name (e.g., "India").
  - `phone` (string): The validated phone number.
  - `formalPhoneNumber` (string): Formatted as "countryCallingCode phone" (e.g., "91 9876543210").
  - `formalPhoneNumerWithPlus` (string): Formatted as "+countryCallingCode phone" (e.g., "+91 9876543210").

## License

MIT

## More Examples

```js
// Example: Validate a French mobile number
const resultFR = validatePhoneNumber({
  callingCode: "+33",
  countryCode: "FR",
  phone: "612345678",
});
console.log(resultFR);
/*
{
  status: true,
  error: null,
  message: "Phone number is valid for France (FR)",
  data: {
    countryCode: "FR",
    countryCode3: "FRA",
    countryCallingCode: "33",
    countryCallingCodeWithPlus: "+33",
    countryName: "France",
    phone: "612345678",
    formalPhoneNumber: "33 612345678",
    formalPhoneNumerWithPlus: "+33 612345678",
    standardizedPhoneNumber: "+33 612345678",
  },
}
*/

// Example: Validate a Brazilian number with formatting
const resultBR = validatePhoneNumber({
  callingCode: "+55",
  countryCode: "BR",
  phone: "(11) 91234-5678",
});
console.log(resultBR);
/*
{
  status: true,
  error: null,
  message: "Phone number is valid for Brazil (BR)",
  data: {
    countryCode: "BR",
    countryCode3: "BRA",
    countryCallingCode: "55",
    countryCallingCodeWithPlus: "+55",
    countryName: "Brazil",
    phone: "(11) 91234-5678",
    formalPhoneNumber: "55 (11) 91234-5678",
    formalPhoneNumerWithPlus: "+55 (11) 91234-5678",
    standardizedPhoneNumber: "+55 (11) 91234-5678",
  },
}
*/

// Example: Validate a Japanese number (auto-detect country)
const resultJP = validatePhoneNumber({
  phone: "+819012345678",
});
console.log(resultJP);
/*
{
  status: true,
  error: null,
  message: "Phone number is valid for Japan (JP)",
  data: {
    countryCode: "JP",
    countryCode3: "JPN",
    countryCallingCode: "81",
    countryCallingCodeWithPlus: "+81",
    countryName: "Japan",
    phone: "+819012345678",
    formalPhoneNumber: "81 +819012345678",
    formalPhoneNumerWithPlus: "+81 +819012345678",
    standardizedPhoneNumber: "+81 +819012345678",
  },
}
*/
```

### More Failed Validation Examples

```js
// Example 7: Invalid country code (not recognized)
const result7 = validatePhoneNumber({
  countryCode: "ZZ",
  phone: "1234567890",
});
console.log(result7);
/*
{
  status: false,
  error: "Invalid or unsupported country code: ZZ",
  data: null
}
*/

// Example 8: Missing phone number
const result8 = validatePhoneNumber({
  callingCode: "+1",
  countryCode: "US",
});
console.log(result8);
/*
{
  status: false,
  error: "Phone number is required",
  data: null
}
*/

// Example 9: Phone number too short for country
const result9 = validatePhoneNumber({
  callingCode: "+49",
  countryCode: "DE",
  phone: "12345",
});
console.log(result9);
/*
{
  status: false,
  error: "Phone number is too short for country Germany",
  data: null
}
*/

// Example 10: Phone number contains invalid characters
const result10 = validatePhoneNumber({
  callingCode: "+44",
  countryCode: "GB",
  phone: "77OO-900123", // Letter 'O' instead of zero
});
console.log(result10);
/*
{
  status: false,
  error: "Phone number contains invalid characters",
  data: null
}
*/
```

```js
// Example 1: All three parameters (callingCode, countryCode, phone)
const result1 = validatePhoneNumber({
  callingCode: "+91",
  countryCode: "IN",
  phone: "98765-43210",
});
/*
{
  status: true,
  error: null,
  message: "Phone number is valid for India (IN)",
  data: {
    countryCode: "IN",
    countryCode3: "IND",
    countryCallingCode: "91",
    countryCallingCodeWithPlus: "+91",
    countryName: "India",
    phone: "98765-43210",
    formalPhoneNumber: "91 98765-43210",
    formalPhoneNumerWithPlus: "+91 98765-43210",
    standardizedPhoneNumber: "+91 98765-43210",
  },
}
*/

// Example 2: Only callingCode and phone
const result2 = validatePhoneNumber({
  callingCode: "+44",
  phone: "7700 900123",
});
/*
{
  status: true,
  error: null,
  message: "Phone number is valid for United Kingdom (GB)",
  data: {
    countryCode: "GB",
    countryCode3: "GBR",
    countryCallingCode: "44",
    countryCallingCodeWithPlus: "+44",
    countryName: "United Kingdom",
    phone: "7700 900123",
    formalPhoneNumber: "44 7700 900123",
    formalPhoneNumerWithPlus: "+44 7700 900123",
    standardizedPhoneNumber: "+44 7700 900123",
  },
}
*/

// Example 3: Only countryCode and phone
const result3 = validatePhoneNumber({
  countryCode: "DE",
  phone: "1512 3456789",
});
/*
{
  status: true,
  error: null,
  message: "Phone number is valid for Germany (DE)",
  data: {
    countryCode: "DE",
    countryCode3: "DEU",
    countryCallingCode: "49",
    countryCallingCodeWithPlus: "+49",
    countryName: "Germany",
    phone: "1512 3456789",
    formalPhoneNumber: "49 1512 3456789",
    formalPhoneNumerWithPlus: "+49 1512 3456789",
    standardizedPhoneNumber: "+49 1512 3456789",
  },
}
*/

// Example 4: Only phone (auto-detects country if possible)
const result4 = validatePhoneNumber({
  phone: "+61412345678",
});
/*
{
  status: true,
  error: null,
  message: "Phone number is valid for Australia (AU)",
  data: {
    countryCode: "AU",
    countryCode3: "AUS",
    countryCallingCode: "61",
    countryCallingCodeWithPlus: "+61",
    countryName: "Australia",
    phone: "+61412345678",
    formalPhoneNumber: "61 +61412345678",
    formalPhoneNumerWithPlus: "+61 +61412345678",
    standardizedPhoneNumber: "+61 +61412345678",
  },
}
*/


## Failed Validation Example


// Example 5: Invalid phone number for India (does not start with 6, 7, 8, or 9)
const result5 = validatePhoneNumber({
  callingCode: "91",
  countryCode: "IN",
  phone: "5876543210",
});
/*
{
  status: false,
  error: "Phone number must start with one of: 6, 7, 8, 9 of country India",
  data: null
}
*/

// Example 6: Invalid calling code (not recognized)
const result6 = validatePhoneNumber({
  callingCode: "+999",
  phone: "1234567890",
});
console.log(result6);
/*
{
  status: false,
  error: "Invalid or unsupported calling code: +999",
  data: null
}
*/
```
