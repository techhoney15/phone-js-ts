import { countryPhoneData } from "./data/countryData.js";
function _removeSpacesAndSpecialChars(input) {
    return input.replace(/[\s\-()]/g, "").replace(/^\+/, "");
}
function _testOnlyNumbers(input) {
    return /^[0-9]+$/.test(input);
}
function _testOnlyAlphabets(input) {
    return /^[A-Z]{2}$/.test(input);
}
function _checkValidations(_input, _type) {
    if (_type === "COUNTRY_CODE") {
        if (_input.length != 2) {
            return false;
        }
        else if (!_testOnlyAlphabets(_input)) {
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
        else if (!_testOnlyNumbers(_input)) {
            return false;
        }
        else {
            return String(_input);
        }
    }
    else if (_type === "PHONE") {
        if (_input.length < 5 || _input.length > 15) {
            return false;
        }
        else if (!_testOnlyNumbers(_input)) {
            return false;
        }
        //  else if (_checkOnlyPhoneNumber(_input)) {
        //   const ONE_MORE_CHECK: any = _checkOnlyPhoneNumber(_input);
        //   if (!ONE_MORE_CHECK.status) {
        //     return String(_input);
        //   } else {
        //     return ONE_MORE_CHECK;
        //   }
        // }
        else {
            return String(_input);
        }
    }
}
const _checkOnlyPhoneNumber = (_input) => {
    _input = _input.replace(/\s+/g, "");
    console.log(_input, "_input_input");
    if (_input.length < 5 || _input.length > 15) {
        return {
            status: false,
            error: "Invalid phone number length",
            data: null,
        };
    }
    else {
        const sanitizedPhone = _input;
        for (let i = 1; i <= 4; i++) {
            const prefix = sanitizedPhone.substring(0, i);
            const country = countryPhoneData.find((c) => c.countryCallingCode === prefix);
            if (country) {
                const restPhone = sanitizedPhone.substring(i);
                if (country.phone_number_lengths.includes(restPhone.length) &&
                    (!country.mobile_begin_with ||
                        country.mobile_begin_with.some((p) => restPhone.startsWith(p)))) {
                    return {
                        status: true,
                        error: null,
                        message: `Phone number is valid for ${country.countryName} (${country.countryCode})`,
                        data: {
                            countryCode: country.countryCode,
                            countryCode3: country.countryCode3,
                            countryCallingCode: country.countryCallingCode,
                            countryCallingCodeWithPlus: "+" + country.countryCallingCode,
                            countryName: country.countryName,
                            phone: restPhone,
                            formalPhoneNumber: `${country.countryCallingCode} ${restPhone}`,
                            formalPhoneNumerWithPlus: `+${country.countryCallingCode} ${restPhone}`,
                            standardizedPhoneNumber: `+${country.countryCallingCode} ${restPhone}`,
                        },
                    };
                }
            }
        }
        return {
            status: false,
            error: "Could not determine country from phone number, please provide calling code or country code",
            data: null,
        };
    }
};
function validatePhoneNumber({ callingCode = "", countryCode = "", phone = "", }) {
    let CALLING_CODE;
    let COUNTRY_CODE;
    let PHONE;
    callingCode = callingCode.toString();
    countryCode = countryCode.toString();
    phone = phone.toString();
    callingCode = _removeSpacesAndSpecialChars(callingCode);
    countryCode = _removeSpacesAndSpecialChars(countryCode);
    phone = _removeSpacesAndSpecialChars(phone);
    console.log(phone, "phonephone API");
    if (!callingCode && !countryCode) {
        const RESULT = _checkOnlyPhoneNumber(phone);
        return RESULT;
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
        console.log(PHONE, "PHONEPHONEPHONEPHONE");
        if (!PHONE) {
            return { status: false, error: "Invalid phone number", data: null };
        }
        else if ((PHONE === null || PHONE === void 0 ? void 0 : PHONE.status) === true) {
            return PHONE;
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
                error: "The provided calling code and country code do not match the same country",
                data: null,
            };
        }
    }
    if (!(COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.phone_number_lengths.includes(PHONE.length))) {
        return {
            status: false,
            error: "Invalid phone number length, It should be of " +
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
            countryCallingCodeWithPlus: "+" + (COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCallingCode),
            countryName: COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryName,
            phone: PHONE,
            formalPhoneNumber: `${COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCallingCode} ${PHONE}`,
            formalPhoneNumerWithPlus: `+${COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCallingCode} ${PHONE}`,
            standardizedPhoneNumber: `+${COUNTRY_DATA === null || COUNTRY_DATA === void 0 ? void 0 : COUNTRY_DATA.countryCallingCode} ${phone}`,
        },
    };
}
export default validatePhoneNumber;
