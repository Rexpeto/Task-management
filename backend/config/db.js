import mongoose from "mongoose";

const connect = async () => {
    try {
        const connection = await mongoose.connect(
            `${process.env.BACKEND_URL}/uptask`
        );
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`Conectado a ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connect;
