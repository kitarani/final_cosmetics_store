package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name        string   `json:"name" gorm:"not null"`
	Description string   `json:"description"`
	Price       string   `json:"price" gorm:"not null"`
	CategoryID  *uint    `json:"category_id"`
	Category    Category `json:"category" `
	ImageURL    string   `json:"image_url"`
}
