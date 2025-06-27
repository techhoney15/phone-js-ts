interface PhoneNumberInput {
    callingCode?: string;
    countryCode?: string;
    phone?: string;
}
declare function validatePhoneNumber({ callingCode, countryCode, phone, }: PhoneNumberInput): any;
export default validatePhoneNumber;
