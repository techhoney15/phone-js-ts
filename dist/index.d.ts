interface PhoneNumberInput {
    callingCode?: string;
    countryCode?: string;
    phone?: string;
}
declare function validatePhoneNumber({ callingCode, countryCode, phone, }: PhoneNumberInput): any;
export declare function getCountryData(callingCode?: string, countryCode?: string): any;
export default validatePhoneNumber;
