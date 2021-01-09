const ENUMS = Object.freeze({
    ALLOW_ALPHABETS_ONLY: /^[a-zA-Z \s]+$/,
    NUMBERS_ONLY: /^[0-9\b]+$/,
    BGS_PHONE: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
});

export default ENUMS;
