import { countryPhoneData } from "./data/countryData.js";
function _checkValidations(_input, _type) {
    if (_type === "COUNTRY_CODE") {
        if (_input.length != 2) {
            return false;
        }
        else if (!/^[A-Z]{2}$/.test(_input)) {
            return false;
        }
        else {
            return String(_input.toUpperCase());
        }
    }
    else if (_type === "CALLING_CODE") {
        if (_input.length < 1 || _input.length > 4) {
            return false;
        }
        else if (!/^\+?[0-9]+$/.test(_input)) {
            return false;
        }
        else {
            return String(_input.replace("+", ""));
        }
    }
    else if (_type === "PHONE") {
        if (_input.length < 5 || _input.length > 15) {
            return false;
        }
        else if (!/^[0-9]+$/.test(_input)) {
            return false;
        }
        else {
            return String(_input.replace(/[\s\-]/g, ""));
        }
    }
}
export function validatePhoneNumber({ callingCode = "", countryCode = "", phone, }) {
    let CALLING_CODE;
    let COUNTRY_CODE;
    let PHONE;
    if (!callingCode && !countryCode) {
        return {
            status: false,
            error: "Either country code or calling code is required",
            data: null,
        };
    }
    if (callingCode) {
        CALLING_CODE = _checkValidations(String(callingCode), "CALLING_CODE");
        if (!CALLING_CODE) {
            return { status: false, error: "Invalid calling code", data: null };
        }
    }
    if (countryCode) {
        COUNTRY_CODE = _checkValidations(String(countryCode), "COUNTRY_CODE");
        if (!COUNTRY_CODE) {
            return { status: false, error: "Invalid country code", data: null };
        }
    }
    if (phone) {
        PHONE = _checkValidations(String(phone), "PHONE");
        if (!PHONE) {
            return { status: false, error: "Invalid phone number", data: null };
        }
    }
    else {
        return { status: false, error: "Phone number is required", data: null };
    }
    // console.log("COUNTRY_CODE =>", COUNTRY_CODE);
    // console.log("CALLING_CODE =>", CALLING_CODE);
    // console.log("PHONE =>", PHONE);
    const COUNTRY_DATA = countryPhoneData.find((country) => country.countryCode === COUNTRY_CODE ||
        country.countryCallingCode === CALLING_CODE);
    if (!COUNTRY_DATA) {
        return {
            status: false,
            error: "Country data not found for the provided codes",
            data: null,
        };
    }
    if (COUNTRY_CODE && CALLING_CODE) {
        if ((COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCode) !== COUNTRY_CODE ||
            (COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCallingCode) !== CALLING_CODE) {
            return {
                status: false,
                error: "Calling code should match with country code",
                data: null,
            };
        }
    }
    if (!(COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.phone_number_lengths.includes(PHONE.length))) {
        return {
            status: false,
            error: "Invalid phone number length " +
                (COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.phone_number_lengths.join(" or ")),
            data: null,
        };
    }
    if ((COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.mobile_begin_with) &&
        Array.isArray(COUNTRY_DATA.mobile_begin_with)) {
        const validPrefixes = COUNTRY_DATA.mobile_begin_with;
        const phoneStartsWithValidPrefix = validPrefixes.some((prefix) => PHONE.startsWith(prefix));
        if (!phoneStartsWithValidPrefix) {
            return {
                status: false,
                error: `Phone number must start with one of: ${validPrefixes.join(", ")} of country ${COUNTRY_DATA.countryName}`,
                data: null,
            };
        }
    }
    return {
        status: true,
        error: null,
        message: `Phone number is valid for ${COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryName} (${COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCode})`,
        data: {
            countryCode: COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCode,
            countryCode3: COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCode3,
            countryCallingCode: COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCallingCode,
            countryName: COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryName,
        },
    };
}
