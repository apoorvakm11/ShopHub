"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useCart } from "@/context/cart-context"
import { useParams } from "next/navigation"

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 129.99,
    image: "/wireless-headphones.png",
    description: "High-quality sound with noise cancellation and 30-hour battery life",
    fullDescription:
      "Experience premium audio quality with our advanced wireless headphones. Featuring industry-leading noise cancellation technology, 30-hour battery life, and premium comfort padding for extended listening sessions. Perfect for music lovers and professionals.",
    specs: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Premium leather ear cups",
      "Built-in microphone",
      "Foldable design",
    ],
    category: "electronics",
    rating: 4.8,
    reviews: 324,
  },
  {
    id: 2,
    title: "Smart Watch Pro",
    price: 299.99,
    image: "/smartwatch-lifestyle.png",
    description: "Advanced fitness tracking and health monitoring features",
    fullDescription:
      "Monitor your health and fitness with our advanced smart watch. Features continuous heart rate monitoring, blood oxygen tracking, sleep analysis, and 100+ workout modes.",
    specs: ["AMOLED display", "Heart rate monitor", "Blood oxygen tracking", "Sleep tracking", "GPS", "14-day battery"],
    category: "electronics",
    rating: 4.6,
    reviews: 215,
  },
  {
    id: 3,
    title: "Ultra-Fast USB-C Cable",
    price: 24.99,
    image: "/usb-c-cable.jpg",
    description: "5A charging cable with 2-year warranty",
    fullDescription:
      "High-speed USB-C cable supporting 5A charging and data transfer up to 480 Mbps. Durable nylon braiding resists tangles.",
    specs: ["5A charging", "480 Mbps data transfer", "Nylon braided", "2-meter length", "2-year warranty"],
    category: "accessories",
    rating: 4.5,
    reviews: 892,
  },
  {
    id: 4,
    title: "Portable Power Bank",
    price: 49.99,
    image: "/portable-power-bank.png",
    description: "20000mAh capacity with fast charging support",
    fullDescription:
      "Charge your devices on the go with our 20000mAh portable power bank. Supports fast charging and comes with multiple output ports.",
    specs: ["20000mAh capacity", "Multiple USB ports", "LED display", "Fast charging", "Compact design"],
    category: "accessories",
    rating: 4.7,
    reviews: 543,
  },
  {
    id: 5,
    title: "Premium Phone Stand",
    price: 34.99,
    image: "/phone-stand.jpg",
    description: "Adjustable aluminum stand for all devices",
    fullDescription:
      "Premium adjustable aluminum stand compatible with all smartphones and tablets. Features 360-degree rotation and non-slip base.",
    specs: [
      "Aluminum construction",
      "360-degree rotation",
      "Non-slip base",
      "Adjustable angles",
      "Universal compatibility",
    ],
    category: "accessories",
    rating: 4.4,
    reviews: 156,
  },
  {
    id: 6,
    title: "Mechanical Keyboard",
    price: 159.99,
    image: "/mechanical-keyboard.png",
    description: "RGB backlit keyboard with custom switches",
    fullDescription:
      "Professional-grade mechanical keyboard with customizable RGB backlighting and precision mechanical switches.",
    specs: ["Mechanical switches", "RGB backlighting", "Aluminum frame", "Programmable keys", "USB-C connection"],
    category: "peripherals",
    rating: 4.9,
    reviews: 478,
  },
  {
    id: 7,
    title: "Gaming Mouse",
    price: 89.99,
    image: "/gaming-mouse.png",
    description: "16000 DPI sensor with customizable buttons",
    fullDescription: "High-precision gaming mouse with 16000 DPI sensor, customizable buttons, and ergonomic design.",
    specs: ["16000 DPI sensor", "8 customizable buttons", "Ergonomic design", "RGB lighting", "Lightweight build"],
    category: "peripherals",
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 8,
    title: "Webcam HD",
    price: 79.99,
    image: "/webcam-hd.jpg",
    description: "1080p resolution with auto-focus",
    fullDescription:
      "Crystal-clear 1080p webcam with auto-focus and built-in microphone. Perfect for streaming and video calls.",
    specs: ["1080p resolution", "Auto-focus", "Built-in microphone", "90-degree field of view", "USB plug-and-play"],
    category: "peripherals",
    rating: 4.6,
    reviews: 189,
  },
]

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = Number(params.id)
  const product = PRODUCTS.find((p) => p.id === productId)

  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-lg text-secondary">Product not found</p>
          </div>
        </main>
      </>
    )
  }

  const handleAddToCart = () => {
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image }, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const recommendedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-card border border-border rounded-lg p-8">
              <div className="relative w-full h-96">
                <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-foreground mb-4">{product.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-semibold text-primary">★ {product.rating}</span>
                    <span className="text-secondary">({product.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-secondary text-lg leading-relaxed">{product.fullDescription}</p>
              </div>

              {/* Specs */}
              <div className="mb-8 bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and Actions */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-foreground">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg bg-background">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-semibold text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
                    isAdded ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isAdded ? "✓ Added to Cart" : "Add to Cart"}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    isWishlisted ? "bg-red-100 text-red-600" : "bg-muted text-foreground hover:bg-border"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          {recommendedProducts.length > 0 && (
            <div className="border-t border-border pt-12">
              <h2 className="text-3xl font-bold text-foreground mb-8">Recommended Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`}>
                    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative w-full h-40 bg-muted">
                        <Image
                          src={p.image || "/placeholder.svg"}
                          alt={p.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{p.title}</h3>
                        <span className="text-lg font-bold text-primary">${p.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
