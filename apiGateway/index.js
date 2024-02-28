const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

const proxyOptions = {
  target: process.env.API_URL, // http://localhost:3030
  changeOrigin: true,
  pathRewrite: {
    "\/voitures": "/api/voitures",
    "\/user": "/api/user",
    "\/connexion": "/api/user/connexion"
  },
}

const proxy = createProxyMiddleware(proxyOptions)
app.use("/", proxy)
app.listen("3000", () => {
    console.log(
      `le serveur proxy ecoute sur ${process.env.HOST}:${process.env.PORT}`
    )
})