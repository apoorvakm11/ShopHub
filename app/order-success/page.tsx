"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-24 h-24 text-green-500" />
            </div>

            <h1 className="text-5xl font-bold text-foreground mb-4">Order Successful!</h1>
            <p className="text-secondary text-xl mb-8">
              Thank you for your purchase. Your order has been confirmed and will be delivered soon.
            </p>

            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-secondary mb-1">Order Number</p>
                  <p className="text-2xl font-bold text-foreground">
                    ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-secondary mb-1">Estimated Delivery</p>
                  <p className="text-lg font-semibold text-foreground">3-5 Business Days</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-secondary">A confirmation email has been sent to your inbox.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/cart"
                  className="bg-muted text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-border transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
