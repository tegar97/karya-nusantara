package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	ProductName    string `json:"ProductName" gorm:"size:64"`
	CapacityProduct int `json:"CapacityProduct"`
	Price int  `json:"Price" `
	Description string `json:"Description" gorm:"size:64"`
	Image string `json:"Image" gorm:"size:64"`
	UsersID        int `json:"UsersID" gorm:"default:null"`
	Users 		Konsumen
	UkmID        int `json:"UkmID" gorm:"default:null"`
	Ukm 		UMKM
	BidCount int `json:"BidCount"`
	Status int `json:"Status" gorm:"size:1"`



}

type CreateProduct struct {
	ProductName string `json:"ProductName" gorm:"size:64"`
	CapacityProduct int `json:"CapacityProduct" gorm:"size:64"`
	Price int  `json:"Price" `
	Description string `json:"Description" gorm:"size:64"`
	Image string `json:"Image" gorm:"size:64"`
	UsersID        int `json:"UsersID" gorm:"default:null"`
	Users 		Konsumen
	UkmID        int `json:"UkmID" gorm:"default:null"`
	Ukm 		UMKM
	ERR         bool


}

