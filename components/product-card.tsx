"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { useState } from "react"

interface ProductCardProps {
  id: number
  title: string
  price: number
  image: string
  description: string
}

export function ProductCard({ id, title, price, image, description }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({ id, title, price, image }, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <Link href={`/product/${id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative w-full h-48 bg-muted overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{title}</h3>
          <p className="text-sm text-secondary line-clamp-2 mb-4 flex-1">{description}</p>

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isAdded ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {isAdded ? "✓ Added" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
