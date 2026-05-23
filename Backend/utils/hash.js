import crypto from "crypto"

export const hash = (password) => {
    const hashing = crypto.createHash("sha512")
    // Se usa PEPPER del .env + la contraseña para mayor seguridad
    const hashed = hashing.update(process.env.PEPPER + password).digest("base64url")
    return hashed
}
