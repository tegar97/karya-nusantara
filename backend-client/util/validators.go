package util

import (
	valid "github.com/asaskevich/govalidator"
	"karya-nusantara/models"
	"regexp"
)


func IsEmpty(str string,field string )(bool,string) {
	if len(str) == 0  {
		return true, field+"  wajib di isi"
	}


	return false, ""
}

func IsEmptyInteger(name int,field string  )(bool,string) {
	if name > -1  {
		return true, field+"  wajib di isi"
	}


	return false, ""
}

func ValidateRegister(u *models.Konsumen) *models.UserErrors2 {
	e := &models.UserErrors2{}

	if !valid.IsEmail(u.Email) {
		e.Err, e.Email = true, "Format Email Salah"
	}

	//if(len(e.CompanyEmail) >= 0 || len(e.Password) >= 0 || len(e.CompanyAdress) >= 0  || len(e.CompanyName) >= 0 ){
	//
	//}

	re := regexp.MustCompile("\\d") // regex check for at least one integer in string
	if !(len(u.Password) >= 8 && valid.HasLowerCase(string(u.Password)) && valid.HasUpperCase(string(u.Password)) && re.MatchString(string(u.Password))) {
		e.Err, e.Password = true, "Panjang kata sandi harus minimal 8 dan harus merupakan kombinasi dari huruf besar, huruf kecil dan angka "
	}
	e.Err, e.Name = IsEmpty(u.Name,"nama ")
	e.Err, e.Email = IsEmpty(u.Email,"email")
	e.Err, e.CompanyName = IsEmpty(u.CompanyName,"perusahaan")
	e.Err, e.PhoneNumber = IsEmpty(u.PhoneNumber,"nomor hp")
	e.Err, e.Name = IsEmpty(u.Name,"nama")
	e.Err, e.City = IsEmpty(u.City,"Kota")
	e.Err, e.Districts = IsEmpty(u.Districts,"Kecamatan")
	e.Err, e.Village = IsEmpty(u.Village,"Kelurahan")
	e.Err, e.Address = IsEmpty(u.Address,"Alamat")
	e.Err, e.PostCode = IsEmpty(u.PostCode,"Post Code")
	e.Err, e.Password = IsEmpty(u.Password,"Password")

	return e
}

func ValidateRegisterUKM(u *models.UMKM) *models.UserErrors {
	e := &models.UserErrors{}



	if !valid.IsEmail(u.Email) {
		e.Err, e.Email = true, "Format penulisan harus email,contoh : contoh@gmail.com"
	}

	//if(len(e.CompanyEmail) >= 0 || len(e.Password) >= 0 || len(e.CompanyAdress) >= 0  || len(e.CompanyName) >= 0 ){
	//
	//}

	re := regexp.MustCompile("\\d") // regex check for at least one integer in string
	if !(len(u.Password) >= 8 && valid.HasLowerCase(string(u.Password)) && valid.HasUpperCase(string(u.Password)) && re.MatchString(string(u.Password))) {
		e.Err, e.Password = true, "Panjang kata sandi harus minimal 8 dan harus merupakan kombinasi dari huruf besar, huruf kecil dan angka "
	}

	e.Err, e.UkmName = IsEmpty(u.UkmName,"nama ukm")
	e.Err, e.OwnerName = IsEmpty(u.OwnerName,"Nama Pemilik usaha")
	e.Err, e.BusinessSize = IsEmpty(u.BusinessSize,"Bentuk usaha")
	e.Err, e.BusinessAdress = IsEmpty(u.BusinessAdress,"Alamat usaha")
	e.Err, e.BusinessBirth = IsEmpty(u.BusinessBirth,"Tanggal mulai usaha")
	e.Err, e.TurnoverYears = IsEmpty(u.TurnoverYears,"Penghasilan perusahaan ")
	e.Err, e.PhoneNumber = IsEmpty(u.PhoneNumber,"no hp")
	e.Err, e.Email = IsEmpty(u.Email,"email")
	e.Err,e.Password = IsEmpty(u.Password,"Password")
	e.Err,e.Password = IsEmpty(u.Password,"Password")
	e.Err, e.City = IsEmpty(u.City,"Kota")
	e.Err, e.Districts = IsEmpty(u.Districts,"Kecamatan")
	e.Err, e.Village = IsEmpty(u.Village,"Kelurahan")
	e.Err, e.Address = IsEmpty(u.Address,"Alamat")
	e.Err, e.PostCode = IsEmpty(u.PostCode,"Post Code")
	return e
}

func ValidatorProduct(u models.Product) *models.CreateProduct {
	p := &models.CreateProduct{}

	p.ERR, p.ProductName = IsEmpty(u.ProductName,"product")
	p.ERR, p.Description = IsEmpty(u.Description,"deskripsi")
	//if !(u.Price  == 0 || u.CapacityProduct == 0) {
	//	p.ERR, p.Price = true, "Field ini wajib di isi "
	//}




	return p


}