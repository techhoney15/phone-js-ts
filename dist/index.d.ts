interface PhoneNumberInput {
    callingCode?: string;
    countryCode?: string;
    phone?: string;
}
export declare function validatePhoneNumber({ callingCode, countryCode, phone, }: PhoneNumberInput): any;
export {};
