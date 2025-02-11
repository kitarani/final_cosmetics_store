package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func CartRoutes(r *gin.Engine) {
	cart := r.Group("/api/cart")
	{
		cart.GET("/:user_id", handlers.GetCart)
		cart.POST("/add", handlers.AddToCart)
		cart.DELETE("/remove/:id", handlers.RemoveFromCart)
	}
}
