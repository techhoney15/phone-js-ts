export interface CountryPhoneData {
    countryCode: string;
    countryCode3: string;
    countryCallingCode: string | number;
    countryName: string;
    mobile_begin_with: string[];
    phone_number_lengths: number[];
}
export declare const countryPhoneData: CountryPhoneData[];
