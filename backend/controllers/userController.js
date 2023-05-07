import User from "../models/User.js";

export const register = async (req, res) => {
    const { email } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        const error = new Error("El usuario ya existe");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        const userDb = await user.save();
        res.send(userDb);
    } catch (error) {
        console.log(error);
    }
};
