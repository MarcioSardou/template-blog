"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

interface Post {
  id: string
  title: string
  content: string
  imageUrl?: string
  createdAt: string
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const storedPosts = localStorage.getItem("blog-posts")
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts))
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="border-b border-[#E5D5B7] bg-white">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Blog de Engenharia</h1>
          <Link href="/admin">
            <Button
              variant="outline"
              className="border-[#D97706] text-[#D97706] hover:bg-[#D97706] hover:text-white bg-transparent"
            >
              Admin
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Author Image */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#E5D5B7] bg-gray-200">
                <Image
                  src="/professional-engineer-portrait.png"
                  alt="Autor do Blog"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2">
                João Silva <span className="text-xl text-[#737373]">(Engenheiro)</span>
              </h2>
              <p className="text-[#1a1a1a] leading-relaxed mb-4">
                Engenheiro com mais de 10 anos de experiência em desenvolvimento de software e sistemas complexos.
                Especialista em arquitetura de soluções e tecnologias modernas.
              </p>
              <div className="border-t-2 border-[#E5D5B7] pt-4">
                <p className="text-[#1a1a1a] italic leading-relaxed">
                  Este blog compartilha conhecimentos técnicos, experiências práticas e reflexões sobre engenharia de
                  software, arquitetura de sistemas e as melhores práticas do desenvolvimento moderno.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-[#737373] mb-4">Nenhum post publicado ainda</h2>
            <p className="text-[#737373] mb-6">Comece criando seu primeiro post na área admin</p>
            <Link href="/admin">
              <Button className="bg-[#D97706] hover:bg-[#B45309] text-white">Ir para Admin</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer bg-white border-[#E5D5B7]">
                  <CardHeader className="space-y-4">
                    <Badge className="w-fit bg-transparent border-none text-[#D97706] font-semibold text-sm uppercase tracking-wide px-0">
                      📝 Artigo
                    </Badge>

                    <div className="flex items-center gap-4 text-sm text-[#737373]">
                      <span>👤 João Silva</span>
                      <span>•</span>
                      <span>
                        📅{" "}
                        {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>⏱️ 5 min de leitura</span>
                    </div>

                    <CardTitle className="text-3xl font-bold text-[#1a1a1a] text-balance leading-tight">
                      {post.title}
                    </CardTitle>

                    <p className="text-[#1a1a1a] italic leading-relaxed">
                      Uma exploração técnica sobre {post.title.toLowerCase()}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-[#1a1a1a] leading-relaxed text-pretty">{post.content.substring(0, 200)}...</p>

                    {post.imageUrl && (
                      <div className="relative h-64 w-full rounded-lg overflow-hidden">
                        <Image
                          src={post.imageUrl || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A]">
                        engenharia
                      </Badge>
                      <Badge variant="secondary" className="bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A]">
                        tecnologia
                      </Badge>
                      <Badge variant="secondary" className="bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A]">
                        desenvolvimento
                      </Badge>
                    </div>

                    <span className="inline-flex items-center text-[#D97706] font-semibold">Ler mais →</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
