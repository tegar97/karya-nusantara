package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"karya-nusantara/models"
	"log"
)

var DB *gorm.DB


func ConnectDatabase() {
	dsn := "root@tcp(127.0.0.1:3306)/karya_nusantara?charset=utf8mb4&parseTime=True&loc=Local&parseTime=True"
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("error conenect to database")
	}
	database.AutoMigrate(&models.UkmProduct{},&models.UMKM{},&models.Bid{},&models.Konsumen{},&models.Product{})
	DB = database
	log.Println("connected")

}