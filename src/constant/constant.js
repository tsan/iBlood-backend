import CH_CONSTANTS from "./ch";

const CONSTANTS = {
  'CH': CH_CONSTANTS
};

const getConstants = (countryCode) => CONSTANTS.hasOwnProperty(countryCode)?CONSTANTS[countryCode]: {};

export default getConstants;