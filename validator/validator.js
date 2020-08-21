const validator = require("validator");
const isEmpty = require("./isEmpty");
const isBdNumber = require("./isBdNumber");

module.exports = {
  validateRegisterInput: (data) => {
    let errors = {};

    for (let key in data) {
      data[key] = !isEmpty(data[key]) ? data[key].trim() : "";
    }

    if (isEmpty(data.firstName)) {
      errors.firstName = "First Name field is required";
    } else if (!validator.isLength(data.firstName, { min: 2, max: 20 })) {
      errors.firstName = "First Name must be between 2 and 20 characters.";
    }

    if (isEmpty(data.lastName)) {
      errors.lastName = "Last Name field is required";
    } else if (!validator.isLength(data.lastName, { min: 2, max: 20 })) {
      errors.lastName = "Last Name must be between 2 and 30 characters.";
    }

    if (isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (isEmpty(data.phone)) {
      errors.phone = "Phone Number field is required";
    } else if (!isBdNumber(data.phone)) {
      errors.phone = "Phone Number is invalid";
    }

    if (isEmpty(data.password)) {
      errors.password = "Password field is required";
    } else if (!validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }

    if (isEmpty(data.confirmPassword)) {
      errors.confirmPassword = "Confirm Password field is required";
    } else if (!validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = "Password must match.";
    }

    const validationData = {
      isValid: isEmpty(errors),
      errors,
    };

    validationData.data = validationData.isValid ? data : null;

    return validationData;
  },

  validateLoginInput: (data) => {
    let errors = {};

    for (let key in data) {
      data[key] = !isEmpty(data[key]) ? data[key].trim() : "";
    }

    if (isEmpty(data.emailOrPhone)) {
      errors.emailOrPhone = "Email or Phone Number must be required";
    } else if (
      !validator.isEmail(data.emailOrPhone) &&
      !isBdNumber(data.emailOrPhne)
    ) {
      errors.emailOrPhone = "Email or Phone Number is not valid";
    }

    if (isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    const validationData = {
      isValid: isEmpty(errors),
      errors,
    };

    validationData.data = validationData.isValid ? data : null;

    return validationData;
  },
};
