package models

import (
	"gorm.io/gorm"
	"time"
)

type UMKM struct {
	gorm.Model
	UkmName          string `gorm:"size:64"`
	OwnerName          string `gorm:"size:64"`
	Email         string `json:"email" gorm:"unique"`
	Password string `json:"password"`
	BusinessSize   string  `json:"BusinessSize" gorm:"size:64"`
	BusinessBirth string ` json:"BusinessBirth" gorm:"size:40"`
	IsVerify int `json:"isVerify" gorm:"size:1"`
	VerifyToken string `json:"VerifyToken" gorm:"size:65"`
	VerifyExpire  time.Time `gorm:"type:datetime" json:"VerifyExpire"`
	PasswordResetToken string `json:"PasswordResetToken" `
	PasswordResetExpire string `json:"PasswordResetExpire" gorm:"size:65"`
	IsAccept int `json:"IsAccept" gorm:"size:1"`
	BusinessAdress string `json:"BusinessAdress"`
	TurnoverYears string `json:"TurnoverYears"`
	BusinessInstagram string  `json:"BusinessInstagram" gorm:"size:65"`
	IsMemberUKMID int `json:"IsMemberUKMID" `
	InterestedJoin int `json:"InterestedJoin"  `
	CertficateName string
	CertificateID string
	Employees   int `json:"employees"  `
	PhoneNumber   string `json:"PhoneNumber" gorm:"size:20"`
	BusinnesEmail  string `json:"BusinnesEmail"  gorm:"size:65"`
}