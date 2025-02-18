package handlers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCategories(c *gin.Context) {
	var categories []models.Category
	database.DB.Preload("Products").Find(&categories)
	c.JSON(http.StatusOK, categories)
}

func GetCategoryByID(c *gin.Context) {
	var category models.Category
	if err := database.DB.Preload("Products").First(&category, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	c.JSON(http.StatusOK, category)
}

func CreateCategory(c *gin.Context) {
	var category models.Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&category)
	c.JSON(http.StatusCreated, category)
}

func UpdateCategory(c *gin.Context) {
	var category models.Category
	if err := database.DB.First(&category, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Save(&category)
	c.JSON(http.StatusOK, category)
}

func DeleteCategory(c *gin.Context) {
	var category models.Category
	if err := database.DB.First(&category, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	database.DB.Delete(&category)
	c.JSON(http.StatusOK, gin.H{"message": "Category removed"})
}
