import { sign } from "jsonwebtoken";

export default function generateSecret() {
    const secretPasswd = process.env["SECRET_PASSWD"];
    
    if (!secretPasswd) {
        throw new Error("Secret password not found in env");
    }

    const token = sign({}, secretPasswd, {algorithm: "HS512"});

    return token;
}
