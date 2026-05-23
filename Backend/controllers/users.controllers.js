import { connectDB } from "../utils/db.js"
import { hash } from "../utils/hash.js"

export const getUsers = async (req, res) => {
    const sql = await connectDB()
    const result = await sql.query("SELECT * FROM users")
    res.json(result.rows)
}

export const getUser = async (req, res) => {
    const sql = await connectDB()
    const id = req.params.id
    const result = await sql.query("SELECT * FROM users WHERE id = $1", [id])
    res.json(result.rows)
}

export const postUser = async (req, res) => {
    const sql = await connectDB()
    const { name, username, password, points } = req.body
    const hashedPassword = hash(password)
    const texto = "INSERT INTO users (name, username, password, points) VALUES ($1, $2, $3, $4) RETURNING *"
    const result = await sql.query(texto, [name, username, hashedPassword, points])
    res.json(result.rows)
}

export const putUser = async (req, res) => {
    const sql = await connectDB()
    const id = req.params.id
    const { name, username, password, points } = req.body
    const hashedPassword = hash(password)
    const texto = "UPDATE users SET name=$1, username=$2, password=$3, points=$4 WHERE id = $5 RETURNING *"
    const result = await sql.query(texto, [name, username, hashedPassword, points, id])
    res.json(result.rows)
}

export const deleteUser = async (req, res) => {
    const sql = await connectDB()
    const id = req.params.id
    const result = await sql.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])
    res.json(result.rows)
}
