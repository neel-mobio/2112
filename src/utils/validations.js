import * as Constants from './constants';
import * as Patterns from './patterns.js';

const isEmailValid = (val, minVal, maxVal, isRequired) => {
  if (isRequired && (val === '' || !val)) {
    return Constants.FIELD_REQUIRED;
  }

  if (val !== '' && val !== null) {
    if (val.match(Patterns.EMAIL_PATTERN) === null) {
      return Constants.EMAIL_NOT_VALID;
    }
  }

  if (minVal && val.length < minVal) {
    return Constants.VALUE_TOO_SHORT;
  }

  if (maxVal && val.length > maxVal) {
    return Constants.VALUE_TOO_LONG;
  }

  return '';
};

const isNameValid = (val, isRequired) => {
  if (isRequired && (val === '' || !val)) {
    return Constants.FIELD_REQUIRED;
  }

  if (val !== '' && val.match(Patterns.NAME_PATTERN) === null) {
    return Constants.INVALID_VALUE;
  }

  return '';
};

const isPasswordValid = (val, minVal, maxVal, isRequired) => {
  if (isRequired && (val === '' || !val)) {
    return Constants.FIELD_REQUIRED;
  }

  if (minVal && val.length < minVal) {
    // return Constants.VALUE_TOO_SHORT;
  }

  if (maxVal && val.length > maxVal) {
    return Constants.VALUE_TOO_LONG;
  }

  return '';
};

const isConfirmValid = (val1, val2, minVal, maxVal, isRequired) => {
  if (isRequired && (val1 === '' || !val1)) {
    return Constants.FIELD_REQUIRED;
  }

  if (val1 !== val2) {
    return Constants.CONFRIM_MATCH;
  }

  return '';
};

export const Validator = {
  validate: (fieldType, fieldValue, minVal = null, maxVal = null, isRequired = true) => {
    switch (fieldType) {
      case 'email':
        return isEmailValid(fieldValue, minVal, maxVal, isRequired);
      case 'password':
        return isPasswordValid(fieldValue, minVal, maxVal, isRequired);
      case 'name':
        return isNameValid(fieldValue, isRequired);
      case 'confirm':
        return isConfirmValid(fieldValue, minVal, maxVal, isRequired);
      default:
        return '';
    }
  },
};
