package models

import (
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
	"time"
	"github.com/google/uuid"

)

type Konsumen struct {
	gorm.Model
	Name               string ` json:"name" gorm:"size:64"`
	UUID               string   `json:"UUID"  gorm:"unique"`
	LoginKey           string     `json:"LoginKey"  gorm:"unique"`
	Email              string    `json:"email" gorm:"unique"`
	City               string    `json:"city" gorm:"size:64"`
	Districts          string   `json:"districts"gorm:"size:64"`
	Address            string    `json:"address"`
	Village            string    `json:"village" gorm:"size:64"`
	PostCode           string    `json:"postCode" gorm:"size:15"`
	Password           string    `json:"password"`
	CompanyName        string    `json:"CompanyName" gorm:"size:64"`
	IsVerify           int       `json:"isVerify" gorm:"size:1"`
	Role               int64        `gorm:"default:1"`
	VerifyToken        string    `json:"VerifyToken" gorm:"size:65"`
	VerifyExpire       time.Time `gorm:"type:datetime" json:"VerifyExpire"  `
	PhoneNumber        string    `json:"PhoneNumber" gorm:"size:20"`
	PasswordResetToken string    `json:"PasswordResetToken" `
	PasswordResetExpire string `json:"PasswordResetExpire" gorm:"size:65"`

}

func (u *Konsumen) BeforeCreate(tx *gorm.DB) (err error) {
	u.LoginKey = uuid.New().String()


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
	City               string    `json:"city" gorm:"size:64"`
	Districts          string   `json:"districts"gorm:"size:64"`
	Address            string    `json:"address"`
	Village            string    `json:"village" gorm:"size:64"`
	PostCode           string    `json:"postCode" gorm:"size:15"`
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
	Name               string ` json:"name" `
	Email              string    `json:"email" `
	City               string    `json:"city" `
	Districts          string   `json:"districts"`
	Address            string    `json:"address"`
	Village            string    `json:"village" `
	PostCode           string    `json:"postCode"`
	Password           string    `json:"password"`
	CompanyName        string    `json:"CompanyName"`
	PhoneNumber        string    `json:"PhoneNumber"`
	Err      bool   `json:"error"`


}

