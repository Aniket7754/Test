
module.exports = () => (req, res, next) => {
    // success response
    res.success = (message, data) => {
        return res.status(200).send({ statusCode: 200, message, data: data || {} });
    };

    // No data success response
    res.no_data_success = (message, data) => {
        return res.status(201).send({ statusCode: 201, message, data: data || {} });
    };

    // error resposne
    res.error = (code, message, data) => {
        res.status(code).send({ statusCode: code, message, data: data || {} });
    };

    // error resposne
    res.custom = (code, message, data) => {
    };

    // proceed forward
    next();
};