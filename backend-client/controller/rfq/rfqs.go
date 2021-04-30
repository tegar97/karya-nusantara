package rfq

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"karya-nusantara/database"
	"karya-nusantara/models"
	"net/http"
	"strconv"
)



func NewRfqs(c *fiber.Ctx) error {
	i := new(models.Rfq)

	c.BodyParser(i)


	file,err := c.FormFile("file")

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message" : "error",
		})

	}
	if err := c.SaveFile(file, fmt.Sprintf("./img/%s", file.Filename)); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message" : "error",
		})
	}

	 user := fmt.Sprint(c.Locals("users"))
	/** converting the str1 variable into an int using Atoi method */
	i1, _ := strconv.Atoi(user)


	//str := fmt.Sprint(user)

	i.UsersID = i1
	if err := database.DB.Create(&i).Error; err != nil {
		return c.JSON(fiber.Map{
			"error":   true,
			"general": "Something went wrong, please try again later. 😕",
		})
	}








	return c.JSON(i1)

}

