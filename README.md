# validate-phone-number

Easily check if a phone number is valid for a specific country and calling code. Just provide the country code, calling code, and phone number to get a true or false result.

A simple utility to validate international phone numbers.

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

console.log(result); // true or false
```

### Parameters

- `callingCode` (string): The country calling code (e.g., "+91").
- `countryCode` (string): The ISO country code (e.g., "IN").
- `phone` (string): The phone number to validate.

## License

MIT
