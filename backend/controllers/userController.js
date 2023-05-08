import User from "../models/User.js";
import genId from "../helpers/genId.js";
import genJWT from "../helpers/genJWT.js";

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
            token: genJWT(user._id),
        });
    } else {
        const error = new Error("Contraseña incorrecta");
        return res.status(403).json({ msg: error.message });
    }
};

export const confirmEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const userConfirm = await User.findOne({ token });

        //? If not token exist
        if (!userConfirm) {
            const error = new Error("Oops no hay cuenta que confirmar");

            return res.status(403).json({ msg: error.message });
        }

        userConfirm.confirm = true;
        userConfirm.token = "";
        userConfirm.save();

        res.status(200).json({ msg: "Cuenta confirmada con exito" });
    } catch (error) {
        console.log("Error:", error);
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        //? check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("El usuario no existe");
            return res.status(400).json({ msg: error.message });
        }

        user.token = genId();

        await user.save();

        res.status(200).json({ msg: "Hemos enviado un email" });
    } catch (error) {
        console.log(error);
    }
};

export const checkTokenPass = async (req, res) => {
    const { token } = req.params;

    const tokenValidate = await User.findOne({ token });

    if (tokenValidate) {
        return res.status(200).json({ msg: "Token válido" });
    } else {
        const error = new Error("Token inválido");
        return res.status(403).json({ msg: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });

    if (user) {
        user.token = "";
        user.password = password;
        user.save();
        return res
            .status(200)
            .json({ msg: "Contraseña guardada correctamente" });
    } else {
        const error = new Error("Token inválido");
        return res.status(403).json({ msg: error.message });
    }
};
