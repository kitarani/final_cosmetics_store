package handlers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCart(c *gin.Context) {
	var cartItems []models.CartItem
	userID := c.Param("user_id")

	database.DB.Where("user_id = ?", userID).Find(&cartItems)
	c.JSON(http.StatusOK, cartItems)
}

func AddToCart(c *gin.Context) {
	var cartItem models.CartItem
	if err := c.ShouldBindJSON(&cartItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&cartItem)
	c.JSON(http.StatusCreated, cartItem)
}

func RemoveFromCart(c *gin.Context) {
	var cartItem models.CartItem
	if err := database.DB.First(&cartItem, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found in cart"})
		return
	}
	database.DB.Delete(&cartItem)
	c.JSON(http.StatusOK, gin.H{"message": "The product has been removed from the cart"})
}
