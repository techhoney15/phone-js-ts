interface PhoneNumberInput {
    callingCode?: string;
    countryCode?: string;
    phone: string;
}
export declare function validatePhoneNumber({ callingCode, countryCode, phone, }: PhoneNumberInput): {
    status: boolean;
    error: string;
    data: null;
    message?: undefined;
} | {
    status: boolean;
    error: null;
    message: string;
    data: {
        countryCode: any;
        countryCode3: any;
        countryCallingCode: any;
        countryName: any;
    };
};
export {};
