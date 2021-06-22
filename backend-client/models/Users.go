package models

import (
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
	"math/rand"
	"time"
)

type Konsumen struct {
	gorm.Model
	Name          string `gorm:"size:64"`
	UUID   int
	Email         string `json:"email" gorm:"unique"`
	City         string `json:"city"`
	Districts         string `json:"districts"`
	Village  string `json:"village"`
	PostCode  string `json:"postCode"`
	Password string `json:"password"`
	CompanyName   string  `json:"CompanyName" gorm:"size:64"`
	IsVerify int `json:"isVerify" gorm:"size:1"`
	Role int `json:"isVerify" gorm:"size:1" gorm:"default:1" `
	VerifyToken string `json:"VerifyToken" gorm:"size:65"`
	VerifyExpire  time.Time `gorm:"type:datetime" json:"VerifyExpire"  `
	PhoneNumber   string `json:"PhoneNumber" gorm:"size:20"`
	PasswordResetToken string `json:"PasswordResetToken" `
	PasswordResetExpire string `json:"PasswordResetExpire" gorm:"size:65"`

}

func (u *Konsumen) BeforeCreate(tx *gorm.DB) (err error) {
	u.UUID = rand.Intn(9000000000000000)


	return
}
type Claims struct {
	 jwt.StandardClaims
	ID uint `gorm:"primaryKey"`
}

type UserErrors struct {
	UkmName          string `json:"UkmName"`
	OwnerName          string `json:"OwnerName"`
	Err      bool   `json:"error"`
	Email    string `json:"email"`
	Password string `json:"password"`
	CompanyName   string `json:"CompanyName"`
	CompanyBirth  *time.Time `json:"CompanyBirth"`
	CompanyAdress string `json:"CompanyAdress"`
	PhoneNumber   string `json:"PhoneNumber"`
	CompanyEmail  string `json:"CompanyEmail"`
	BusinessSize   string  `json:"BusinessSize" gorm:"size:64"`
	BusinessBirth string ` json:"BusinessBirth" gorm:"size:40"`
	BusinessAdress string `json:"BusinessAdress"`
	TurnoverYears string `json:"TurnoverYears"`
	BusinessInstagram string  `json:"BusinessInstagram" gorm:"size:65"`
	IsMemberUKMID int `json:"IsMemberUKMID" gorm:"size:1"`
	InterestedJoin int `json:"InterestedJoin"  gorm:"size:1"`
	CertficateName string
	CertificateID string
	Employees   int
	BusinnesEmail  string `json:"BusinnesEmail"  gorm:"size:65"`

}


type UserErrors2 struct {
	Name          string `gorm:"size:64"`
	Email         string `json:"email" gorm:"unique"`
	Password string `json:"password"`
	CompanyName   string  `json:"CompanyName" gorm:"size:64"`
	CompanyBirth  string `json:"CompanyBirth"`
	CompanyAdress string `json:"CompanyAdress"`
	PhoneNumber   string `json:"PhoneNumber" gorm:"size:20"`
	CompanyEmail  string `json:"CompanyEmail"  gorm:"size:65"`
	Err      bool   `json:"error"`


}

