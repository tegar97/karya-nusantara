package models

import (
	"time"
)

// GenerateISOString generates a time string equivalent to Date.now().toISOString in JavaScript
func GenerateISOString() string {
	return time.Now().UTC().Format("2006-01-02T15:04:05.999Z07:00")
}

// Base contains common columns for all tables
type Base struct {
	ID        uint      `gorm:"primaryKey"`
	CreatedAt string    `json:"created_at"`
	UpdatedAt string    `json:"updated_at"`
}

