package bid

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"karya-nusantara/database"
	"karya-nusantara/models"
)

func BidProduct(c *fiber.Ctx) error {
	var input  models.Bid

	c.BodyParser(&input)

	bid := models.Bid{BidPrice: input.BidPrice,CapacityProduct : input.CapacityProduct,Deadlines:  input.Deadlines,ProductID: input.ProductID,UkmID: input.UkmID}
	if err := database.DB.Create(&bid).Error; err != nil {
		return c.JSON(fiber.Map{
			"error":   true,
			"general": "Something went wrong, please try again later. 😕",
		})
	}
	var product = database.DB.Model(&models.Product{}).Where("id = ?", input.ProductID).Find(&models.Product{})

	if product.RowsAffected == 0  {
		return c.JSON(fiber.Map{
			"succes" : false,
		})
	}
	product.Updates(models.Product{Status: 1})
	product.Update("bid_count",gorm.Expr("bid_count + ?", 1))

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status" : true,
		"data" : bid,
	})


}


func GetMyBid(c *fiber.Ctx) error {

	type result struct {
		id  int
	}




	var p []models.Bid
	//
	//ukm := c.Locals("ukm")
	//
	//ukmId := fmt.Sprint(ukm)
	//
	//idUkm, _ :=  strconv.Atoi(ukmId)
	//db.Joins("JOIN emails ON emails.user_id = users.id AND emails.email = ?", "jinzhu@example.org").Joins("JOIN credit_cards ON credit_cards.user_id = users.id").Where("credit_cards.number = ?", "411111111111").Find(&user)
	//database.DB.Preload("products").Find(&p)
	//database.DB.Joins("JOIN products on bids.product_id=products.id").Where(&models.Bid{UkmID: idUkm}).Find(&p)
	//database.DB.Model(&models.Bid{}).Joins("JOIN products on products.id=bids.products_id").Scan(result{})
	//database.DB.Table("bids").Select("bids.*, products.*").Joins("left join products on products.id = bids.products_id").Scan(result{})

	database.DB.Table("bids").Select("bids.id, products.email").Joins("join products on products.id = bids.products_id")


	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"meessage" : "Success",
		"Data" : p,

	})
}