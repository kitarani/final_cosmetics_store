package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	UserID uint   `json:"user_id"`
	Status string `json:"status" gorm:"default:'pending'"`
}
