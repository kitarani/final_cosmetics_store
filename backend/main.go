package main

import (
	"backend/database"
	"backend/models"
	"backend/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	database.ConnectDB()

	err := database.DB.AutoMigrate(&models.Product{},
		&models.Category{},
		&models.User{},
		&models.Order{},
		&models.Review{},
		&models.CartItem{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
	routes.AuthRoutes(r)
	routes.ProductRoutes(r)
	routes.CategoryRoutes(r)
	routes.ReviewRoutes(r)
	routes.CartRoutes(r)
	routes.OrderRoutes(r)

	r.SetTrustedProxies([]string{"postgres"})
	r.Run(":8080")
}
