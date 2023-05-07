import User from "../models/User.js";
import genId from "../helpers/genId.js";

export const register = async (req, res) => {
    const { email } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        const error = new Error("El usuario ya existe");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = genId();
        const userDb = await user.save();
        res.send(userDb);
    } catch (error) {
        console.log(error);
    }
};

export const authAccount = async (req, res) => {
    const { email, password } = req.body;

    //? check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
    }

    //? check if user is confirmed
    if (!user.confirm) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
    }

    //? check password
    if (await user.verifyPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        const error = new Error("Contraseña incorrecta");
        return res.status(403).json({ msg: error.message });
    }
};
