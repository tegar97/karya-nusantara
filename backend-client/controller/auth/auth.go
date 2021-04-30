package auth

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	_ "golang.org/x/crypto/bcrypt"
	"karya-nusantara/Email"
	"karya-nusantara/database"
	"karya-nusantara/models"
	"karya-nusantara/util"
	"math/rand"
	"strconv"
	"time"
)

var jwtKey = []byte("karya_nusantara_2021")

const charset = "abcdefghijklmnopqrstuvwxyz" +
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

var seededRand *rand.Rand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func StringWithCharset(length int, charset string) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func String(length int) string {
	return StringWithCharset(length, charset)
}
func Register(c *fiber.Ctx) error {
	u := new(models.Konsumen)
	c.BodyParser(u);


	errors := util.ValidateRegister(u)
	if errors.Err {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}
	if count := database.DB.Where(&models.Konsumen{Email: u.Email}).First(new(models.Konsumen)).RowsAffected; count > 0 {
		errors.Err, errors.Email = true, "Email is already registered"
	}
	if count2 := database.DB.Where(&models.UMKM{Email: u.Email}).First(new(models.UMKM)).RowsAffected; count2 > 0 {
		errors.Err, errors.Email = true, "Email is already registered"
	}
	if errors.Err {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}
	type typetime *time.Time

	// Hashing the password with a random salt
	hashedPassword,err := bcrypt.GenerateFromPassword([]byte(u.Password), 10)
	if err != nil {
		panic(err)
	}
	u.Password = string(hashedPassword)
	u.IsVerify = 0
	u.VerifyExpire = time.Now().Add( time.Minute * 30 )
	u.VerifyToken = StringWithCharset(12,charset)



	if err := database.DB.Create(&u).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"general": "Something went wrong, please try again later. 😕",
		})
	}
	//claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
	//	Issuer:    strconv.Itoa(int(u.ID)),
	//	ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	//})
	//token, err := claims.SignedString([]byte(jwtKey))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  false,
			"message": "jwt error",
		})
	}

	//cookie := fiber.Cookie{
	//	Name:     "jwt",
	//	Value:    token,
	//	Expires:  time.Now().Add(time.Hour * 24),
	//	HTTPOnly: true,
	//}
	//
	//c.Cookie(&cookie)

	return c.Status(fiber.StatusOK).JSON(u)

}


func RegisterForUKM(c *fiber.Ctx) error {
	u := new(models.UMKM)
	p := new(models.UkmProduct)
	//P := new(models.Product)



	c.BodyParser(u);
	c.BodyParser(p);


	errors := util.ValidateRegisterUKM(u)
	if errors.Err {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}
	if count := database.DB.Where(&models.UMKM{Email: u.Email}).First(new(models.UMKM)).RowsAffected; count > 0 {
		errors.Err, errors.Email = true, "Email is already registered"
	}
	if count2 := database.DB.Where(&models.Konsumen{Email: u.Email}).First(new(models.Konsumen)).RowsAffected; count2 > 0 {
		errors.Err, errors.Email = true, "Email is already registered"
	}


	if errors.Err {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}
	type typetime *time.Time

	// Hashing the password with a random salt
	hashedPassword,err := bcrypt.GenerateFromPassword([]byte(u.Password), 10)
	if err != nil {
		panic(err)
	}
	u.Password = string(hashedPassword)
	u.IsVerify = 0
	u.VerifyExpire = time.Now().Add( time.Minute * 30 )
	u.VerifyToken = StringWithCharset(12,charset)
	u.IsAccept = 0


	//file,err := c.FormFile("Image")
	//
	//if err != nil {
	//	return c.Status(http.StatusBadRequest).JSON(fiber.Map{
	//		"message" : "error",
	//	})
	//
	//}
	//if err := c.SaveFile(file, fmt.Sprintf("./img/%s",file.Filename)); err != nil {
	//	return c.Status(http.StatusBadRequest).JSON(fiber.Map{
	//		"message" : "error",
	//	})
	//}
	//P.Image = file.Filename
	//if err := database.DB.Create(&P).Error; err != nil {
	//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	//		"error":   true,
	//		"general": "Something went wrong, please try again later. 😕",
	//	})
	//}
	//
	//u.ProductID = int(P.ID)

	if err := database.DB.Create(&u).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"general": "Something went wrong, please try again later. 😕",
		})
	}






	//claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
	//	Issuer:    strconv.Itoa(int(u.ID)),
	//	ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	//})
	//token, err := claims.SignedString([]byte(jwtKey))
	//if err != nil {
	//	return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
	//		"status":  false,
	//		"message": "jwt error",
	//	})
	//}
	//
	//cookie := fiber.Cookie{
	//	Name:     "jwt",
	//	Value:    token,
	//	Expires:  time.Now().Add(time.Hour * 24),
	//	HTTPOnly: true,
	//}

	//var link =  "http://127.0.0.1:5000/api/v1/users/verify/"+u.VerifyToken
	////c.Cookie(&cookie)
	//Email.VerifyEmail(u.Email,u.UkmName,link)
	p.UkmID = int(u.ID)

	if err := database.DB.Create(&p).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"general": "Something went wrong, please try again later. 😕",
		})
	}

	return c.Status(fiber.StatusOK).JSON(u)

}

func VerifyEmail (c *fiber.Ctx) error{
	token := c.Params("token")
	var users = database.DB.Model(&models.Konsumen{}).Where("verify_token = ?", token,"verify_expire =<" , time.Now()).Find(&models.Konsumen{})

	if users.RowsAffected == 0  {
		return c.JSON(fiber.Map{
			"succes" : false,
		})
	}
	users.Updates(models.Konsumen{IsVerify: 1,VerifyToken: "0"})


	return c.JSON(fiber.Map{
		"succes" : string(c.Params("token")),
	})
}

func VerifyEmailUKM (c *fiber.Ctx) error{
	token := c.Params("token")
	var users = database.DB.Model(&models.UMKM{}).Where("verify_token = ?", token,"verify_expire =<" , time.Now()).Find(&models.UMKM{})

	if users.RowsAffected == 0  {
		return c.JSON(fiber.Map{
			"succes" : false,
		})
	}
	users.Updates(models.UMKM{IsVerify: 1,VerifyToken: "0"})


	return c.JSON(fiber.Map{
		"succes" : string(c.Params("token")),
	})
}


func ResendVerifyEmail (c *fiber.Ctx) error {

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtKey), nil
	})
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})

	}
	claims := token.Claims.(*jwt.StandardClaims)
	var user models.Konsumen
	VerifyToken := StringWithCharset(12,charset)

	var link =  "http://127.0.0.1:5000/api/v1/users/verify/"+ VerifyToken

	database.DB.Where("id = ?", claims.Issuer).First(&user)

	Email.VerifyEmail(user.Email,user.Name,link)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success" : true,
	})

}


func LoginUser(c *fiber.Ctx) error {
	type LoginInput struct {
		Email string `json:"Email"`
		Password string `json:"Password"`
		Role string `json:"Role"`
	}

	input := new(LoginInput)

	if err := c.BodyParser(input); err != nil {
		return c.JSON(fiber.Map{"error": true, "input": "Please review your input"})

	}

	// check if a user exists

	u := new(models.Konsumen)
	P := new(models.UMKM)

	database.DB.Where(&models.UMKM{Email : input.Email}).First(&u);
	database.DB.Where(&models.UMKM{Email : input.Email}).First(&P);
	if u.Email == input.Email {
		//if err := 	database.DB.Where(&models.UMKM{Email : input.Email}).First(&u); err.RowsAffected <= 0 {
		//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "general": "Email tidak di temukan"})
		//
		//}
		if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(input.Password)); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "general": "Password Salah. 2"})
		}

		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(u.UUID)),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		})
		token, err := claims.SignedString([]byte(jwtKey))
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status":  false,
				"message": "jwt error",
			})
		}

		cookie := fiber.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  time.Now().Add(time.Hour * 24),
		}


		c.Cookie(&cookie)

		return c.Status(fiber.StatusOK).JSON(u)

	}else if (P.Email == input.Email){

		//if res := 	database.DB.Where(&models.UMKM{Email : input.Email}).First(&P); res.RowsAffected <= 0 {
		//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "general": "Email tidak di temukan"})
		//
		//}

		//if err := P.IsAccept != 1;  err != nil {
		//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "general": "Akun anda belum aktif 2"})
		//
		//}

		if(P.IsAccept != 1 ) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "general": "Akun anda belum aktif"})

		}
		//if res := database.DB.Where(&models.UMKM{IsAccept: 2}).First(&P); res != nil {
		//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "general": "Anda ditolak sebagi mitra ukm karya nusantara"})
		//
		//}
		if err := bcrypt.CompareHashAndPassword([]byte(P.Password), []byte(input.Password)); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "general": "Password Salah."})
		}
		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(P.ID)),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		})
		token, err := claims.SignedString([]byte(jwtKey))
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status":  false,
				"general": "jwt error",
			})
		}

		cookie := fiber.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  time.Now().Add(time.Hour * 24),
		}


		c.Cookie(&cookie)

		return c.Status(fiber.StatusOK).JSON(P)


	}

	//claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
	//	Issuer:    strconv.Itoa(int(u.UUID)),
	//	ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	//})
	//token, err := claims.SignedString([]byte(jwtKey))
	//if err != nil {
	//	return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
	//		"status":  false,
	//		"message": "jwt error",
	//	})
	//}
	//
	//cookie := fiber.Cookie{
	//	Name:     "jwt",
	//	Value:    token,
	//	Expires:  time.Now().Add(time.Hour * 24),
	//	HTTPOnly: true,
	//}
	//
	//
	//c.Cookie(&cookie)
	//if input.Role == "users" {
	//	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
	//		Issuer:    strconv.Itoa(int(u.UUID)),
	//		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	//	})
	//	token, err := claims.SignedString([]byte(jwtKey))
	//	if err != nil {
	//		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
	//			"status":  false,
	//			"message": "jwt error",
	//		})
	//	}
	//
	//	cookie := fiber.Cookie{
	//		Name:     "jwt",
	//		Value:    token,
	//		Expires:  time.Now().Add(time.Hour * 24),
	//		HTTPOnly: true,
	//	}
	//
	//
	//	c.Cookie(&cookie)
	//}else{
	//	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
	//		Issuer:    strconv.Itoa(int(P.ID)),
	//		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	//	})
	//	token, err := claims.SignedString([]byte(jwtKey))
	//	if err != nil {
	//		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
	//			"status":  false,
	//			"message": "jwt error",
	//		})
	//	}
	//
	//	cookie := fiber.Cookie{
	//		Name:     "jwt",
	//		Value:    token,
	//		Expires:  time.Now().Add(time.Hour * 24),
	//		HTTPOnly: true,
	//	}
	//
	//
	//	c.Cookie(&cookie)
	//}
	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "general": "Email tidak ditemukan"})

	//if(input.Role == "users" ){
	//	return c.Status(fiber.StatusOK).JSON(u)
	//
	//}else{
	//	return c.Status(fiber.StatusOK).JSON(P)
	//
	//}

}

func TestSendCookie (c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "tessss",
		Value:    "tesssssss",
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}


	c.Cookie(&cookie)

	return c.Status(fiber.StatusOK).JSON(cookie)

}

func GetUser(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtKey), nil
	})
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})

	}
	claims := token.Claims.(*jwt.StandardClaims)
	var user models.Konsumen
	var ukm models.UMKM


	 dataUser := database.DB.Where("uuid = ?", claims.Issuer).Find(&user).RowsAffected

	if dataUser == 1 {
		database.DB.Where("id = ?", claims.Issuer).First(&user)
		return c.JSON(user)

	}else{
		database.DB.Where("id = ?", claims.Issuer).First(&ukm)
		return c.JSON(ukm)
	}

}

func GetUserUKM(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtKey), nil
	})
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})

	}
	claims := token.Claims.(*jwt.StandardClaims)
	var user models.UMKM

	database.DB.Where("id = ?", claims.Issuer).First(&user)

	return c.JSON(user)

}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}


func GetUserForBackside(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	if cookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message" : "Silahkan Login Terlebih Dahulu untuk melanjutkan",
		})
	}
	token, _ := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtKey), nil
	})

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.Konsumen
	var ukm models.UMKM



	database.DB.Where("id = ?", claims.Issuer).First(&user).Select("id")
	database.DB.Where("id = ?", claims.Issuer).First(&ukm).Select("id")


	c.Locals("users",user.ID)
	c.Locals("ukm",ukm.ID)

	return c.Next()

}
