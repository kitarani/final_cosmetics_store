package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func CategoryRoutes(r *gin.Engine) {
	categories := r.Group("/api/categories")
	{
		categories.GET("/", handlers.GetCategories)
		categories.GET("/:id", handlers.GetCategoryByID)
		categories.POST("/", handlers.CreateCategory)
		categories.PUT("/:id", handlers.UpdateCategory)
		categories.DELETE("/:id", handlers.DeleteCategory)
	}
}
