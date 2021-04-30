package Email

import (
	"bytes"
	"fmt"
	"gopkg.in/gomail.v2"
	"html/template"
	"log"
	"net/smtp"
)

const CONFIG_SMTP_HOST = "smtp.gmail.com"
const CONFIG_SMTP_PORT = 587
const CONFIG_SENDER_NAME = "PT. Karya Nusantara <kakarot1234567ar@gmail.com>"
const CONFIG_AUTH_EMAIL = "kakarot1234567ar@gmail.com"
const CONFIG_AUTH_PASSWORD = "tegar123"



func Mail() {

	mailer := gomail.NewMessage()
	mailer.SetHeader("From", CONFIG_SENDER_NAME)
	mailer.SetHeader("To", "kakarot123456ar@gmail.com")
	mailer.SetAddressHeader("Cc", "kakarot123456ar@gmail.com", "Tra Lala La")
	mailer.SetHeader("Subject", "Test mail")
	mailer.SetBody("text/html", "Hello, <b>have a nice day</b>")

	dialer := gomail.NewDialer(
		CONFIG_SMTP_HOST,
		CONFIG_SMTP_PORT,
		CONFIG_AUTH_EMAIL,
		CONFIG_AUTH_PASSWORD,
	)

	err := dialer.DialAndSend(mailer)
	if err != nil {
		log.Fatal(err.Error())
	}

	log.Println("Mail sent!")
}


func VerifyEmail(email string,name string,link string) {
	mailer := gomail.NewMessage()
	mailer.SetHeader("From", CONFIG_SENDER_NAME)
	mailer.SetHeader("To", email)
	mailer.SetAddressHeader("Cc", "kakarot123456ar@gmail.com", "Helo " + name)
	mailer.SetHeader("Subject","Verify akun anda " )
	mailer.SetBody("text/html", "Verify email : "+ "<button><a href="+link+"'>Verify</a></button")
	//mailer.Attach("email_template_verifikasi.html")
	dialer := gomail.NewDialer(
		CONFIG_SMTP_HOST,
		CONFIG_SMTP_PORT,
		CONFIG_AUTH_EMAIL,
		CONFIG_AUTH_PASSWORD,
	)

	err := dialer.DialAndSend(mailer)
	if err != nil {
		log.Fatal(err.Error())
	}

	log.Println("Mail sent!")
}



func TestEmailHtml() {

	// Sender data.
	from := "kakarot123456a7r@gmail.com"
	password := "tegar123"

	// Receiver email address.
	to := []string{
		"kakarot123456ar@example.com",
	}

	// smtp server configuration.
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Authentication.
	auth := smtp.PlainAuth("", from, password, smtpHost)

	t, _ := template.ParseFiles("template.html")

	var body bytes.Buffer

	mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body.Write([]byte(fmt.Sprintf("Subject: This is a test subject \n%s\n\n", mimeHeaders)))

	t.Execute(&body, struct {
		Name    string
		Message string
	}{
		Name:    "Puneet Singh",
		Message: "This is a test message in a HTML template",
	})

	// Sending email.
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, body.Bytes())
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Email Sent!")
}
