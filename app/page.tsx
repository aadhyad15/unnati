import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <section className="container grid gap-6 px-4 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="font-serif text-3xl text-[#5C4033] lg:text-4xl">
            At <span className="italic">Unnati</span>, there is no catch.
          </h1>
          <p className="text-lg text-[#5C4033]/80">
            We <span className="italic">gift</span> you for making sustainable choices to help{' '}
            <span className="italic">save the planet!</span>
          </p>
          <Button
            asChild
            className="w-fit bg-[#5C4033] text-white hover:bg-[#5C4033]/90"
          >
            <Link href="/calculator">Explore</Link>
          </Button>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            alt="Illustration of people in public transport"
            className="object-cover"
            src="/images/hero-image.jpg"
            fill
          />
        </div>
      </section>

      <section className="container px-4">
        <h2 className="mb-8 font-serif text-2xl text-[#5C4033] lg:text-3xl">
          What <span className="italic">We</span> Do
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Sustainability",
              description: "We help your everyday choices be more sustainable and better for the environment!",
              image: "/images/sustainability.jpg",
              color: "bg-[#556B2F]",
            },
            {
              title: "Keeping Track",
              description: "Log your everyday emissions and find out how to reduce them with better alternatives.",
              image: "/images/keeping-track.jpg",
              color: "bg-[#FFB6A3]",
            },
            {
              title: "Rewards",
              description: "Get rewards each time you save emissions! We believe in positive reinforcement to drive change.",
              image: "/images/rewards.jpg",
              color: "bg-[#6B7A97]",
            },
            {
              title: "Saving the Planet",
              description: "Save the planet with your conscious choices and learn more about it on our blog.",
              image: "/images/saving-planet.jpg",
              color: "bg-[#F4C430]",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-serif text-xl text-[#5C4033]">{item.title}</h3>
              <div className={`mb-4 aspect-video rounded-lg ${item.color} relative overflow-hidden`}>
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <p className="mb-4 text-[#5C4033]/80">{item.description}</p>
              <Button
                asChild
                variant="outline"
                className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white"
              >
                <Link href="/calculator">Explore</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}