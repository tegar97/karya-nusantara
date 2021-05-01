package product

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"karya-nusantara/database"
	"karya-nusantara/models"
	"karya-nusantara/util"
	"strconv"
)

func GetMyProductRequest(c *fiber.Ctx) error {

	var p []models.Product

	user := c.Locals("users")
	ukm := c.Locals("ukm")

	userId := fmt.Sprint(user)
	ukmId := fmt.Sprint(ukm)

	id, _ :=  strconv.Atoi(userId)
	idUkm, _ :=  strconv.Atoi(ukmId)
	if id != 0 {
		database.DB.Where(&models.Product{UsersID: id}).Find(&p)

	}else{
		database.DB.Where(&models.Product{UkmID: idUkm}).Find(&p)

	}


	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"meessage" : "Success",
		"Data" : p,
		"id" : id,

	})

}
type Pagination struct {
	Limit int    `json:"limit"`
	Page  int    `json:"page"`
	Sort  string `json:"sort"`
}



//func  Paginate(db *gorm.DB) error {
//	page, _ := strconv.Atoi(c.Query("page"))
//	if page == 0 {
//		page = 1
//	}
//	pageSize, _ := strconv.Atoi(c.Query("page_size"))
//
//	if err := database.DB.Find(&p).Error; err != nil {
//		return c.Status(fiber.StatusOK).JSON(fiber.Map{
//			"Message" : "Error",
//		})
//	}
//	switch {
//	case pageSize > 100:
//		pageSize = 100
//	case pageSize <= 0:
//		pageSize = 10
//	}
//
//	offset := (page - 1) * pageSize
//	return database.DB.Offset(offset).Limit(pageSize)
//}

func Paginate(c * fiber.Ctx) func(db *gorm.DB) *gorm.DB {
	return func (db *gorm.DB) *gorm.DB {
		page, _ := strconv.Atoi(c.Query("page"))
		if page == 0 {
			page = 1
		}

		pageSize, _ := strconv.Atoi(c.Query("page_size"))
		switch {
		case pageSize > 100:
			pageSize = 100
		case pageSize <= 0:
			pageSize = 10
		}

		offset := (page - 1) * pageSize
		return db.Offset(offset).Limit(pageSize)
	}
}

func GetAllProduct (c * fiber.Ctx) error {
	var p []models.Product

	database.DB.Find(&p)


	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"Success" : true,
		"data" : p,
	})

}

func DeleteProduct(c *fiber.Ctx) error {

	id := c.Params("id")
	pid, _ :=  strconv.Atoi(id)




	db := database.DB.Model(&models.Product{}).Where("id = ?", pid).Take(&models.Product{}).Unscoped().Delete(&models.Product{})

	if db.Error != nil {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"success" : false,
			"message" : db.Error,
		})
	}


	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success" : true,
		"PARAMS" : c.Params("id"),
	})



}
func NewProduct(c *fiber.Ctx) error {
	 var i models.Product

	c.BodyParser(&i)


	errors := util.ValidatorProduct(i)
	if errors.ERR {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}



	//file,err := c.FormFile("Image")
	//
	//
	//if err != nil {
	//	return c.Status(http.StatusBadRequest).JSON(fiber.Map{
	//		"message" : err ,
	//	})
	//
	//}
	//if err := c.SaveFile(file, fmt.Sprintf("./img/%s", file.Filename)); err != nil {
	//	return c.Status(http.StatusBadRequest).JSON(fiber.Map{
	//		"message" : "error",
	//	})
	//}


	product := models.Product{ProductName: i.ProductName,CapacityProduct: i.CapacityProduct,Description: i.Description,Price: i.Price,Image: i.Image,UsersID: i.UsersID,UkmID: i.UkmID}
	//if err := database.DB.Create(i).Error; err != nil {
	//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	//		"error":   true,
	//		"general": "Something went wrong, please try again later. 😕",
	//		"message" : err,
	//	})
	//}

	if err := database.DB.Create(&product).Error; err != nil {
		return c.JSON(fiber.Map{
			"error":   true,
			"general": "Something went wrong, please try again later. 😕",
		})
	}
	//_ := c.Locals("users")


	return c.JSON(fiber.Map{
		"success" : true,
		"data" : product,
	})

}

//func GetProductUser(c *fiber.Ctx) error {
//	i := new(models.Product)
//
//	database.DB.Where("id = ?", models.).First(&user)
//
//
//
//
//
//}

