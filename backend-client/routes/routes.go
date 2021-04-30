package routes

import (
	"github.com/gofiber/fiber/v2"
	"karya-nusantara/controller/auth"
	"karya-nusantara/controller/bid"
	"karya-nusantara/controller/product"
	"karya-nusantara/controller/rfq"
)

func Routes(app *fiber.App) {
	app.Post("/api/v1/users/register",auth.Register)
	app.Post("/api/v1/users/login",auth.LoginUser)
	app.Get("/api/v1/users/me",auth.GetUser)

	app.Get("/api/v1/users/me/ukm",auth.GetUserUKM)

	app.Get("/api/v1/users/logout",auth.Logout)
	app.Post("/api/v1/users/me/resendVerify",auth.ResendVerifyEmail)

	app.Put("/api/v1/users/verify/:token",auth.VerifyEmail)
	app.Put("/api/v1/users/verify/ukm/:token",auth.VerifyEmailUKM)

	app.Post("/api/v1/users/ukm",auth.RegisterForUKM)

	app.Post("/api/v1/rfqs",auth.GetUserForBackside,rfq.NewRfqs)
	app.Post("/api/v1/product",auth.GetUserForBackside,product.NewProduct)
	app.Get("/api/v1/product",product.GetAllProduct)
	app.Get("/api/v1/me/request/product",auth.GetUserForBackside,product.GetMyProductRequest)
	app.Delete("/api/v1/product/:id",auth.GetUserForBackside,product.DeleteProduct)
	app.Get("/api/v1/testCookie",auth.TestSendCookie)

	app.Post("/api/v1/bid",auth.GetUserForBackside,bid.BidProduct)
	app.Get("/api/v1/bid",auth.GetUserForBackside,bid.GetMyBid)



}