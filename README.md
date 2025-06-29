# phone-number-validation-js

Check phone number validation with js and ts and get calling details by calling or country code

A simple, lightweight, and easy-to-implement utility to validate international phone numbers and retrieve structured information—including country name, country codes, and formatted phone numbers.

Easily check if a phone number is valid for a specific country and calling code. Just provide the country code, calling code, and phone number to get a detailed validation result.

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
npm install phone-number-validation-js

// or

yarn add phone-number-validation-js
```

## Usage

```js
import validatePhoneNumber from "phone-number-validation-js";

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


## Get Country Data Example

You can also retrieve country information using the `getCountryData` function:

import { getCountryData } from "phone-number-validation-js";

// Example: Get country data by calling code
const countryByCallingCode = getCountryData("+91");
console.log(countryByCallingCode);
/*
{
  countryCode: "IN",
  countryCode3: "IND",
  countryCallingCode: "91",
  countryCallingCodeWithPlus: "+91",
  countryName: "India"
}
*/

// Example: Get country data by country code
const countryByCountryCode = getCountryData(undefined, "US");
console.log(countryByCountryCode);
/*
{
  countryCode: "US",
  countryCode3: "USA",
  countryCallingCode: "1",
  countryCallingCodeWithPlus: "+1",
  countryName: "United States"
}
*/

// Example: Neither calling code nor country code provided
const missingParams = getCountryData();
console.log(missingParams);
/*
{
  status: false,
  error: "Please provide either calling code or country code",
  data: null
}
*/
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

// Example: All three parameters (callingCode, countryCode, phone)
const resultIN = validatePhoneNumber({
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

// Example: Only callingCode and phone
const resultGB = validatePhoneNumber({
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

// Example: Only countryCode and phone
const resultDE = validatePhoneNumber({
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

// Example: Only phone (auto-detects country if possible)
const resultPhone = validatePhoneNumber({
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
```

### More Failed Validation Examples

```js
// Example: Invalid country code (not recognized)
const resultZZ = validatePhoneNumber({
  countryCode: "ZZ",
  phone: "1234567890",
});
/*
{
  status: false,
  error: "Invalid or unsupported country code: ZZ",
  data: null
}
*/

// Example: Missing phone number
const resultUS = validatePhoneNumber({
  callingCode: "+1",
  countryCode: "US",
});
/*
{
  status: false,
  error: "Phone number is required",
  data: null
}
*/

// Example: Phone number too short for country
const resultDE = validatePhoneNumber({
  callingCode: "+49",
  countryCode: "DE",
  phone: "12345",
});
/*
{
  status: false,
  error: "Phone number is too short for country Germany",
  data: null
}
*/


## Failed Validation Example


// Example: Invalid phone number for India (does not start with 6, 7, 8, or 9)
const resultIN = validatePhoneNumber({
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

// Example: Invalid calling code (not recognized)
const result = validatePhoneNumber({
  callingCode: "+999",
  phone: "1234567890",
});
/*
{
  status: false,
  error: "Invalid or unsupported calling code: +999",
  data: null
}
*/
```

---

## 📚 Keywords

phone number validation, phone validation, phone number js, phone number typescript, phone number validator, validate phone number, international phone number validation, mobile number validation, validate mobile number, phone number check, phone number verification, phone number parsing, phone number formatting, phone number formatter, phone number checker, phone validator js, phone validation npm package, phone number typescript library, phone number react validation, phone number nodejs validation, javascript phone validation, typescript phone validation, react phone validation, nodejs phone validation, nextjs phone validation, vue phone validation, svelte phone validation, angular phone validation, country code validation, calling code validation, libphonenumber alternative, lightweight phone validator, zero dependency phone validation, phone number utility library, phone input validation, form phone validation, validate user phone number, frontend phone number validation, backend phone number validation, phone number validation open source, phone number api alternative, npm phone validation package, validate international phone number, validate phone number with country code
