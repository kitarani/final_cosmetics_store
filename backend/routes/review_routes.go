package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func ReviewRoutes(r *gin.Engine) {
	reviews := r.Group("/api/products/:id/reviews")
	{
		reviews.GET("/", handlers.GetReviewsByProduct)
		reviews.POST("/", handlers.CreateReview)
		reviews.DELETE("/:id", handlers.DeleteReview)
	}
}
