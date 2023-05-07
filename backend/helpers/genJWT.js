import jwt from "jsonwebtoken";

const genJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

export default genJWT;
