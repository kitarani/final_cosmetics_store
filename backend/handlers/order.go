package handlers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetOrders(c *gin.Context) {
	var orders []models.Order
	userID := c.Param("user_id")

	database.DB.Where("user_id = ?", userID).Find(&orders)
	c.JSON(http.StatusOK, orders)
}

func CreateOrder(c *gin.Context) {
	var order models.Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&order)
	c.JSON(http.StatusCreated, order)
}

func UpdateOrderStatus(c *gin.Context) {
	var order models.Order
	if err := database.DB.First(&order, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}
	c.BindJSON(&order)
	database.DB.Save(&order)
	c.JSON(http.StatusOK, order)
}
