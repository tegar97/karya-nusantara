package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger" // new
	"karya-nusantara/database"
	"karya-nusantara/routes"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	//app.Use(limiter.New(limiter.Config{
	//	Max:        5,
	//	Expiration: 1 * time.Minute,
	//	KeyGenerator: func(c *fiber.Ctx) string {
	//		return c.IP()
	//	},
	//	LimitReached: func(c *fiber.Ctx) error {
	//		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "general": "Terlalu banyak request "})
	//	},
	//}))

	database.ConnectDatabase()
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH",

	}))
	//Email.SendEmailTemplate()
	routes.Routes(app)
	app.Listen(":5000")
}