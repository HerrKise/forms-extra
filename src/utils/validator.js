export function validator(data, config) {
    const errors = {};
    if (localStorage.getItem("data")) {
        return errors;
    }
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isPortfolio": {
                const portfolioRegExp = /^(https)?:\/\/\S+\.\S+$/g;
                statusValidate = !portfolioRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            case "max": {
                statusValidate = data > config.value;
                break;
            }
            case "isDigit": {
                const digitRegExp = /^\d+$/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
