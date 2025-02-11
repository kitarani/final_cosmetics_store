package handlers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetReviewsByProduct(c *gin.Context) {
	var reviews []models.Review
	productID := c.Param("id")

	database.DB.Where("product_id = ?", productID).Find(&reviews)
	c.JSON(http.StatusOK, reviews)
}

func CreateReview(c *gin.Context) {
	var review models.Review
	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&review)
	c.JSON(http.StatusCreated, review)
}

func DeleteReview(c *gin.Context) {
	var review models.Review
	if err := database.DB.First(&review, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Review not found"})
		return
	}
	database.DB.Delete(&review)
	c.JSON(http.StatusOK, gin.H{"message": "Review removed"})
}
