package models

import "gorm.io/gorm"

type Rfq struct {
	gorm.Model
	Name          string `gorm:"size:64"`
	Amount         int
	Budget        int
    Specification string
	UsersID        int
	Users 		Konsumen

}