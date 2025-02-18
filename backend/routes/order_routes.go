package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func OrderRoutes(r *gin.Engine) {
	orders := r.Group("/api/orders")
	{
		orders.GET("/:user_id", handlers.GetOrders)
		orders.POST("/", handlers.CreateOrder)
		orders.PUT("/:id/status", handlers.UpdateOrderStatus)
	}
}
