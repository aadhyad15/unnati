import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-serif text-3xl text-[#5C4033]">About Us</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-4 text-[#5C4033]/80">
            Unnati, started off as a group project put together by the students of the Department of Journalism at Lady Shri Ram College and was ambitiously motivated to create and drive positive change in emission production and management.
          </p>
          <p className="mb-4 text-[#5C4033]/80">
            We provide an easy-to-use carbon footprint tracker where you can log details about your daily activities—from transportation to energy use and more. Our system calculates your carbon emissions and offers valuable insights to help you understand the impact of your choices. By using our platform, you can keep an eye on your environmental impact and make adjustments where needed.
          </p>
          <p className="mb-4 text-[#5C4033]/80">
            We believe that every small step towards sustainability counts. That's why we don't just help you track your emissions—we also reward you for reducing them! Our incentive model is designed to encourage you to make greener life choices, whether it's reducing energy consumption, opting for eco-friendly transportation, or making conscious lifestyle changes. Hurry up and get started!
          </p>
          <Button asChild className="bg-[#5C4033] text-white hover:bg-[#5C4033]/90">
            <a href="/calculator">Go to Calculator</a>
          </Button>
        </div>
        <div className="grid gap-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MacBook%20Pro%2014%20(1).jpg-lH7lZzYHt9RsK6wTTsuPRWYtuIJDr4.jpeg"
            alt="Unnati team members"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  )
}