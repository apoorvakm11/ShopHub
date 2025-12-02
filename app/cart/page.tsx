"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
              <p className="text-secondary text-lg mb-8">Start shopping to add items to your cart</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-lg p-6 flex gap-6">
                    <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                      </Link>
                      <p className="text-primary font-bold text-lg mb-4">${item.price.toFixed(2)}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg bg-background">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-foreground hover:bg-muted transition-colors"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-foreground hover:bg-muted transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-secondary text-sm mb-2">Subtotal</p>
                      <p className="text-xl font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-secondary">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Tax (estimated)</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-lg text-foreground">Total</span>
                  <span className="text-3xl font-bold text-primary">${(cartTotal * 1.08).toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center block mb-3"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/"
                  className="w-full bg-muted text-foreground py-3 rounded-lg font-semibold hover:bg-border transition-colors text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
