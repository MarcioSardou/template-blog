"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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

export default function PostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const storedPosts = localStorage.getItem("blog-posts")
    if (storedPosts) {
      const posts: Post[] = JSON.parse(storedPosts)
      const foundPost = posts.find((p) => p.id === params.id)
      if (foundPost) {
        setPost(foundPost)
      } else {
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [params.id, router])

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <p className="text-[#737373]">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="border-b border-[#E5D5B7] bg-white">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-[#1a1a1a] hover:text-[#D97706] transition-colors cursor-pointer">
              Blog de Engenharia
            </h1>
          </Link>
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
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-[#D97706] font-semibold hover:text-[#B45309] mb-8">
          ← Voltar para todos os posts
        </Link>

        <article className="bg-white rounded-lg border border-[#E5D5B7] p-8 md:p-12">
          {/* Category Badge */}
          <Badge className="w-fit bg-transparent border-none text-[#D97706] font-semibold text-sm uppercase tracking-wide px-0 mb-4">
            📝 Artigo
          </Badge>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-[#737373] mb-6">
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

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-balance leading-tight mb-6">
            {post.title}
          </h1>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
              <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-[#1a1a1a] leading-relaxed text-pretty whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-[#E5D5B7]">
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
        </article>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button className="bg-[#D97706] hover:bg-[#B45309] text-white">Ver todos os posts</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
