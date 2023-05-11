import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b5b28434dd4047",
        pass: "c341dbbfc1fe7b",
    },
});

export const emailRegister = async ({ name, email, token }) => {
    const info = await transport.sendMail({
        from: "UpTask Vyper '<account@upstask.com>'",
        to: email,
        subject: "UpTask Vyper - Account Confirm",
        html: `<p>Hola, Bienvenido ${name} Confirmar tu cuenta de Task Management</p>
            <p>Tu cuenta ya esta casi lista, solo debes darle clic al siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar Cuenta</a>
            <p>Si tu no creaste esta cuenta, ignora este correo</p>
        `,
    });
};

export const emailForgotPass = async ({ name, email, token }) => {
    const info = await transport.sendMail({
        from: "UpTask Vyper '<account@upstask.com>'",
        to: email,
        subject: "UpTask Vyper - Reset Password",
        html: `<p>Hola, ${name} Has solicitado un reinicio de tu contraseña</p>
            <p>Puedes restablecer tu contraseña con el siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/forgotPass/${token}">Restablecer contraseña</a>
            <p>Si tu no solicitaste el reinicio de contraseña, ignora este correo</p>
        `,
    });
};
