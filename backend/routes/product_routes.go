package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func ProductRoutes(r *gin.Engine) {
	products := r.Group("/api/products")
	{
		products.GET("/", handlers.GetProducts)
		products.GET("/:id", handlers.GetProductByID)
		products.POST("/:id", handlers.CreateProduct)
		products.PUT("/:id", handlers.UpdateProduct)
		products.DELETE("/:id", handlers.DeleteProduct)
	}
}
