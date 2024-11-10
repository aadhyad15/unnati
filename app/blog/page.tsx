import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Blog() {
  const blogPosts = [
    {
      title: "Track Your Carbon Footprint for a Greener Future",
      author: "Ridhima",
      excerpt: "Are you aware of your impact on climate change? Now, you can be! Understanding our emissions is a vital first step toward creating meaningful change.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MacBook%20Pro%2014%20(5).jpg-JYJ9Ofsdo1iC6UoYBLi0RZUfeTewXy.jpeg"
    },
    // Add more blog posts here
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-serif text-3xl text-[#5C4033]">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={200}
              className="aspect-video object-cover"
            />
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#5C4033]/80">By {post.author}</p>
              <p className="mt-2 text-[#5C4033]/80">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="text-[#5C4033] hover:underline">
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}