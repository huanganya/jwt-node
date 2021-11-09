export const securityHeaderValidator = (req) => {
    if (req.method !== "GET" && !req.is("application/json")) {
        throw new Error("Content-Type should be application/json");
    }
};
