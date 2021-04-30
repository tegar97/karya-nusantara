package models

import (
	"gorm.io/gorm"
)

type Bid struct {
	 gorm.Model
	 CapacityProduct int
	 BidPrice int
	 Deadlines string `json:"Deadlines" `
	 star int
	 isAccept int  `json:"isAccept"  gorm:"size:1" gorm:"default:0"`
	ProductID int `json:"ProductID" gorm:"column:products_id" gorm:"default:null"`
	KonsumenID        int `json:"UsersID" gorm:"default:null"`
	Konsumen 		Konsumen
	 UkmID        int `json:"UkmID" gorm:"default:null"`
	 Ukm 		UMKM

}

type BidJoin struct {
	gorm.Model
	CapacityProduct int
	BidPrice int
	Deadlines string `json:"Deadlines" gorm:"size:64"`
	star int
	ProductName    string `json:"ProductName" gorm:"size:64"`
	Price int  `json:"Price" `
	Description string `json:"Description" gorm:"size:64"`
	isAccept int  `json:"isAccept"  gorm:"size:1" gorm:"default:0"`
	ProductID int `json:"ProductID" gorm:"default:null"`
	Product Product
	UsersID        int `json:"UsersID" gorm:"default:null"`
	Konsumen 		Konsumen
	UkmID        int `json:"UkmID" gorm:"default:null"`
	Ukm 		UMKM

}