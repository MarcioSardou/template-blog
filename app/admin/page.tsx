"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, Trash2, Upload } from "lucide-react"
import Image from "next/image"

interface Post {
  id: string
  title: string
  content: string
  imageUrl?: string
  createdAt: string
}

export default function AdminPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imagePreview, setImagePreview] = useState<string>("")
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    const storedPosts = localStorage.getItem("blog-posts")
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setImageUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert("Por favor, preencha título e conteúdo")
      return
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim() || undefined,
      createdAt: new Date().toISOString(),
    }

    const updatedPosts = [newPost, ...posts]
    localStorage.setItem("blog-posts", JSON.stringify(updatedPosts))
    setPosts(updatedPosts)

    // Reset form
    setTitle("")
    setContent("")
    setImageUrl("")
    setImagePreview("")

    alert("Post criado com sucesso!")
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este post?")) {
      const updatedPosts = posts.filter((post) => post.id !== id)
      localStorage.setItem("blog-posts", JSON.stringify(updatedPosts))
      setPosts(updatedPosts)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Área Admin</h1>
          </div>
          <Link href="/">
            <Button variant="outline">Ver Blog</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create Post Form */}
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Digite o título do post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    placeholder="Escreva o conteúdo do post..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageFile">Upload de Imagem (opcional)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  {imagePreview && (
                    <div className="relative h-32 w-full mt-2 rounded-lg overflow-hidden border">
                      <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">Faça upload de uma imagem do seu computador</p>
                </div>

                <Button type="submit" className="w-full">
                  Publicar Post
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle>Posts Publicados ({posts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Nenhum post criado ainda</p>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-start justify-between gap-4 p-4 border rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
