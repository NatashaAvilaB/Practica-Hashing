import { connectDB } from "../utils/db.js"
import { hash } from "../utils/hash.js"

export const login = async (req, res) => {
    const sql = await connectDB()
    const { username, password } = req.body
    const texto = "SELECT * FROM users WHERE username = $1"
    const values = [username]
    const result = await sql.query(texto, values)

    if (result.rows.length < 1) {
        res.status(404).json({ login: false, user: {} })
        return
    }

    const hashed = hash(password)

    if (result.rows[0].password === hashed) {
        res.status(200).json({ login: true, user: result.rows[0] })
    } else {
        res.status(404).json({ login: false, user: {} })
    }
}
