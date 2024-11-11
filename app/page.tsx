import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <section className="gap-6 lg:gap-12 flex">
        <img src="/unnati/images/hero-image.png" className="w-3/5" />
        <div className="flex text-[#4D3503] leading-tight text-6xl font-swear flex-col justify-center pl-4 pr-8">
          <h1 className="mb-4">
            At <span className="font-thin">Unnati</span>, there is no catch.
          </h1>
          <p className="">
            We <span className="font-thin">gift</span> you for making
            sustainable choices to help{' '}
            <span className="font-thin">save the planet!</span>
          </p>
          <Link
            className="bg-transparent text-xl border-2 transition-colors mt-8 block border-[#4D3503] rounded-full text-[#4D3503] hover:bg-[#4D3503]/10 px-10 w-fit font-droid py-3 leading-none"
            href="/calculator"
          >
            Explore
          </Link>
        </div>
      </section>

      <section className="container px-4">
        <h2 className="mb-12 font-swear text-5xl text-[#5C4033]">
          What <span className="font-thin">We</span> Do
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Sustainability',
              description:
                'We help your everyday choices be more sustainable and better for the environment!',
              image: '/unnati/images/sustainability.png',
              color: 'bg-[#556B2F]',
              text: 'white',
            },
            {
              title: 'Keeping Track',
              description:
                'Log your everyday emissions and find out how to reduce them with better alternatives.',
              image: '/unnati/images/keeping-track.png',
              color: 'bg-[#FFB6A3]',
              text: '#A85944',
            },
            {
              title: 'Rewards',
              description:
                'Get rewards each time you save emissions! We believe in positive reinforcement to drive change.',
              image: '/unnati/images/rewards.png',
              color: 'bg-[#6B7A97]',
              text: 'white',
            },
            {
              title: 'Saving the Planet',
              description:
                'Save the planet with your conscious choices and learn more about it on our blog.',
              image: '/unnati/images/saving-planet.png',
              color: 'bg-[#F4C430]',
              text: '#7C3725',
            },
          ].map(item => (
            <div
              key={item.title}
              className={`px-6 py-8 ${item.color} flex flex-col gap-4`}
              style={{ color: item.text }}
            >
              <h3 className="mb-2 font-swear text-4xl">{item.title}</h3>
              <p className="mb-4 font-droid">{item.description}</p>
              <button
                style={{ borderColor: item.text }}
                className="border-[2px] rounded-full px-6 py-0.5 text-base bg-transparent w-fit"
              >
                <Link href="/calculator">Explore</Link>
              </button>
              <img src={item.image} className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
