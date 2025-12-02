"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { ProductGrid } from "@/components/product-grid"
import { Search, Filter } from "lucide-react"

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 129.99,
    image: "/wireless-headphones.png",
    description: "High-quality sound with noise cancellation and 30-hour battery life",
    category: "electronics",
  },
  {
    id: 2,
    title: "Smart Watch Pro",
    price: 299.99,
    image: "/smartwatch-lifestyle.png",
    description: "Advanced fitness tracking and health monitoring features",
    category: "electronics",
  },
  {
    id: 3,
    title: "Ultra-Fast USB-C Cable",
    price: 24.99,
    image: "/usb-c-cable.jpg",
    description: "5A charging cable with 2-year warranty",
    category: "accessories",
  },
  {
    id: 4,
    title: "Portable Power Bank",
    price: 49.99,
    image: "/portable-power-bank.png",
    description: "20000mAh capacity with fast charging support",
    category: "accessories",
  },
  {
    id: 5,
    title: "Premium Phone Stand",
    price: 34.99,
    image: "/phone-stand.jpg",
    description: "Adjustable aluminum stand for all devices",
    category: "accessories",
  },
  {
    id: 6,
    title: "Mechanical Keyboard",
    price: 159.99,
    image: "/mechanical-keyboard.png",
    description: "RGB backlit keyboard with custom switches",
    category: "peripherals",
  },
  {
    id: 7,
    title: "Gaming Mouse",
    price: 89.99,
    image: "/gaming-mouse.png",
    description: "16000 DPI sensor with customizable buttons",
    category: "peripherals",
  },
  {
    id: 8,
    title: "Webcam HD",
    price: 79.99,
    image: "/webcam-hd.jpg",
    description: "1080p resolution with auto-focus",
    category: "peripherals",
  },
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState(500)

  const categories = ["all", ...new Set(PRODUCTS.map((p) => p.category))]

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice = product.price <= priceRange
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [searchTerm, selectedCategory, priceRange])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to ShopHub</h1>
            <p className="text-secondary text-lg">Discover our premium collection of electronics and accessories</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-secondary" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-border"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Max Price: <span className="text-primary font-bold">${priceRange}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-secondary">
                Showing {filteredProducts.length} of {PRODUCTS.length} products
              </div>
              <ProductGrid products={filteredProducts} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
