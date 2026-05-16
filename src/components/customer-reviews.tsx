"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Trash2, Lock, Send, MessageSquare, Sparkles, ChefHat, Users, Home, Quote, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLoginGate } from "@/components/login-gate"

type Review = {
  id: string
  name: string
  rating: number
  comment: string
  createdAt: string
  emoji?: string
  categories?: {
    food: number
    service: number
    ambiance: number
  }
  helpfulCount?: number
}

const EMOJIS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😍", label: "Love it" },
  { emoji: "🔥", label: "Amazing" },
  { emoji: "👌", label: "Perfect" },
  { emoji: "🤤", label: "Delicious" },
  { emoji: "⭐", label: "Excellent" },
]

const CATEGORIES = [
  { key: "food" as const, label: "Food Quality", icon: ChefHat },
  { key: "service" as const, label: "Service", icon: Users },
  { key: "ambiance" as const, label: "Ambiance", icon: Home },
]

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&auto=format&fit=crop"
]

export function CustomerReviews() {
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("")
  const [categories, setCategories] = useState({ food: 0, service: 0, ambiance: 0 })
  const [categoryHover, setCategoryHover] = useState({ food: 0, service: 0, ambiance: 0 })
  const [showConfetti, setShowConfetti] = useState(false)

  // Admin deletion state
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [adminPassword, setAdminPassword] = useState("")
  const [deleting, setDeleting] = useState(false)
  const { user } = useLoginGate()

  // Fetch reviews
  const fetchReviews = () => {
    try {
      setLoading(true)
      const stored = localStorage.getItem("kavitha_reviews")
      if (stored) {
        setReviews(JSON.parse(stored))
      } else {
        const initial: Review[] = [
          {
            id: "1",
            name: "Rahul M.",
            rating: 5,
            comment: "The ambiance is absolutely stunning! The amber lighting and modern decor made our anniversary dinner very special. Highly recommend the Mushroom Biriyani.",
            createdAt: new Date().toISOString(),
            emoji: "🔥",
            categories: { food: 5, service: 5, ambiance: 5 }
          },
          {
            id: "2",
            name: "Priya S.",
            rating: 4,
            comment: "Great food and very polite staff. The glassmorphism design of their new menu cards is a nice touch! Loved the Paneer Butter Masala.",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            emoji: "🤤",
            categories: { food: 4, service: 5, ambiance: 4 }
          },
          {
            id: "3",
            name: "Arjun K.",
            rating: 5,
            comment: "From the moment we walked in, the service was impeccable. The suite was immaculate with breathtaking views. Truly a 5-star experience.",
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            emoji: "⭐",
            categories: { food: 5, service: 5, ambiance: 5 }
          }
        ]
        setReviews(initial)
        localStorage.setItem("kavitha_reviews", JSON.stringify(initial))
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  // Submit review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || rating === 0 || !comment.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select a rating.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        name,
        rating,
        comment,
        emoji: selectedEmoji,
        categories,
        createdAt: new Date().toISOString(),
      }
      
      const updated = [newReview, ...reviews]
      setReviews(updated)
      localStorage.setItem("kavitha_reviews", JSON.stringify(updated))

      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      
      toast({
        title: "Review Submitted! 🎉",
        description: "Thank you for sharing your experience!",
      })
      // Reset form
      setName("")
      setRating(0)
      setComment("")
      setSelectedEmoji("")
      setCategories({ food: 0, service: 0, ambiance: 0 })
      setSubmitting(false)
      setIsModalOpen(false)
    }, 800)
  }

  const handleCategoryRating = (category: keyof typeof categories, value: number) => {
    setCategories(prev => ({ ...prev, [category]: value }))
  }


  // Delete review (admin only)
  const handleDelete = (id: string) => {
    if (!user?.isAdmin) return
    
    setDeleting(true)
    setTimeout(() => {
      const updated = reviews.filter(r => r.id !== id)
      setReviews(updated)
      localStorage.setItem("kavitha_reviews", JSON.stringify(updated))
      
      toast({
        title: "Review Deleted",
        description: "The review has been removed by admin.",
      })
      setDeleting(false)
    }, 300)
  }

  return (
    <section aria-labelledby="customer-reviews-title" className="relative rounded-[2.5rem] overflow-hidden py-24 px-6 md:px-12 bg-zinc-950 text-zinc-50 shadow-2xl my-8 mx-auto max-w-7xl">
      {/* Premium Parallax/Image Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1542314831-c6a4d1409e5c?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Hotel Interior" 
          className="w-full h-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
        <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay" />
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: "50%",
                y: "50%",
                scale: 0,
                rotate: 0,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'][i % 5]
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-500 font-medium tracking-widest uppercase text-sm">Guestbook</span>
            </motion.div>
            <motion.h2 
              id="customer-reviews-title" 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-white leading-tight text-balance" 
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Stories from Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 italic">Guests</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-300 text-lg font-light max-w-xl"
            >
              Discover the unforgettable moments, exquisite dining, and unparalleled comfort experienced by our patrons at Kavitha Hotel.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full px-8 py-6 text-base font-medium bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_-10px_rgba(245,158,11,0.6)] hover:-translate-y-1 border-none">
                  <Plus className="mr-2 h-5 w-5" /> Share Your Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-zinc-200/20 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-50 shadow-2xl rounded-3xl p-0">
                
                {/* Modal Header with decorative bg */}
                <div className="relative pt-10 pb-6 px-8 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Quote className="h-32 w-32 rotate-12" />
                  </div>
                  <DialogTitle className="text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    We'd love to hear from you
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    Your feedback helps us create better experiences for all our guests.
                  </DialogDescription>
                </div>

                <div className="px-8 pb-8 pt-2">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label htmlFor="review-name" className="text-sm font-medium">Your Name</label>
                      <Input
                        id="review-name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-xl h-12 px-4 focus-visible:ring-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Overall Rating */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Overall Rating</label>
                        <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              className="focus:outline-none p-1"
                            >
                              <Star
                                className={`h-7 w-7 transition-all duration-300 ${
                                  star <= (hoverRating || rating)
                                    ? "fill-amber-400 text-amber-400 drop-shadow-md"
                                    : "text-zinc-300 dark:text-zinc-700"
                                }`}
                              />
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Emoji Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Vibe</label>
                        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto gap-2 scrollbar-none">
                          {EMOJIS.map((item) => (
                            <motion.button
                              key={item.emoji}
                              type="button"
                              onClick={() => setSelectedEmoji(item.emoji)}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                                selectedEmoji === item.emoji
                                  ? "bg-amber-100 dark:bg-amber-900/40 shadow-sm"
                                  : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
                              }`}
                              title={item.label}
                            >
                              <span className="text-xl block">{item.emoji}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Category Ratings */}
                    <div className="space-y-3 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <label className="text-sm font-medium block mb-3">Rate by Category (Optional)</label>
                      <div className="grid gap-4">
                        {CATEGORIES.map((category) => {
                          const Icon = category.icon
                          return (
                            <div key={category.key} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                                  <Icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                </div>
                                <span className="text-sm font-medium">{category.label}</span>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <motion.button
                                    key={star}
                                    type="button"
                                    onClick={() => handleCategoryRating(category.key, star)}
                                    onMouseEnter={() => setCategoryHover(prev => ({ ...prev, [category.key]: star }))}
                                    onMouseLeave={() => setCategoryHover(prev => ({ ...prev, [category.key]: 0 }))}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="focus:outline-none"
                                  >
                                    <Star
                                      className={`h-5 w-5 transition-colors ${
                                        star <= (categoryHover[category.key] || categories[category.key])
                                          ? "fill-amber-400 text-amber-400"
                                          : "text-zinc-300 dark:text-zinc-700"
                                      }`}
                                    />
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="review-comment" className="text-sm font-medium">
                          Your Experience
                        </label>
                        <span className={`text-xs ${
                          comment.length > 150 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
                        }`}>
                          {comment.length} characters
                        </span>
                      </div>
                      <Textarea
                        id="review-comment"
                        placeholder="Share the details of your stay or dining experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={5}
                        className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-xl resize-none p-4 focus-visible:ring-amber-500"
                      />
                    </div>

                    <div className="pt-2">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full h-14 text-base rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold shadow-lg shadow-amber-500/20 transition-all"
                        >
                          {submitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="mr-2"
                              >
                                <Sparkles className="h-5 w-5" />
                              </motion.div>
                              Publishing...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Publish Review
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Star className="h-8 w-8 text-amber-500 opacity-50" />
            </motion.div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-xl font-light">Be the first to share a beautiful memory.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
            <AnimatePresence mode="popLayout">
              {reviews.map((review, index) => {
                // Pick a pseudo-random avatar based on the review ID
                const avatarIndex = parseInt(review.id.slice(-3) || "0") % AVATARS.length
                const avatarUrl = AVATARS[avatarIndex]

                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="group relative flex flex-col justify-between p-8 rounded-3xl bg-zinc-900/40 hover:bg-zinc-800/60 backdrop-blur-md border border-zinc-700/50 hover:border-amber-500/50 transition-all duration-500 shadow-2xl overflow-hidden h-full"
                  >
                    {/* Decorative Background Quote */}
                    <div className="absolute top-6 right-6 text-zinc-800/30 group-hover:text-amber-500/10 transition-colors duration-500 pointer-events-none">
                      <Quote className="h-24 w-24 rotate-12" />
                    </div>

                    {/* Delete button (admin only) */}
                    {user?.isAdmin && (
                      <button
                        onClick={() => handleDelete(review.id)}
                        disabled={deleting}
                        className="absolute bottom-6 right-6 p-2 rounded-full bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 z-20"
                        aria-label="Delete review"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}

                    <div className="relative z-10 flex-grow">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-zinc-700"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-zinc-300 text-lg leading-relaxed font-light mb-8 italic" style={{ fontFamily: "var(--font-playfair)" }}>
                        "{review.comment}"
                      </p>
                    </div>

                    <div className="relative z-10 mt-auto pt-6 border-t border-zinc-700/50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={avatarUrl} 
                          alt={review.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700 group-hover:border-amber-500/50 transition-colors"
                        />
                        <div>
                          <p className="font-medium text-zinc-100">{review.name}</p>
                          <p className="text-xs text-zinc-500 uppercase tracking-wider">
                            {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      
                      {review.emoji && (
                        <div className="text-3xl bg-zinc-800/50 w-12 h-12 rounded-full flex items-center justify-center border border-zinc-700/50 backdrop-blur-sm group-hover:scale-110 transition-transform">
                          {review.emoji}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
