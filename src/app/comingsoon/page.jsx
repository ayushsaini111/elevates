import Button from "@/Components/ui/Button"
import React from "react"
import Link from "next/link"

export default function Page() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6">

      <div className="text-center max-w-xl">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-serif tracking-wide mb-6">
          COMING SOON
        </h1>

        {/* Description */}
        <p className="text-gray-500 body-default max-w-sm mx-auto md:text-base mb-10">
          We’re working on this page. Please revisit after some time.
        </p>

        {/* Button */}
        <Link href="/">
          <Button  variant="secondary">
            ← Back
          </Button>
        </Link>

      </div>

    </section>
  )
}
