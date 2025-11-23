"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Trash2, Lock, Send, MessageSquare, ThumbsUp, Award, Sparkles, ChefHat, Users, Home } from "lucide-react"
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

export function CustomerReviews() {
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("")
  const [categories, setCategories] = useState({ food: 0, service: 0, ambiance: 0 })
  const [categoryHover, setCategoryHover] = useState({ food: 0, service: 0, ambiance: 0 })
  const [showPreview, setShowPreview] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  // Admin deletion state
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [adminPassword, setAdminPassword] = useState("")
  const [deleting, setDeleting] = useState(false)

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews")
      const data = await res.json()
      if (data.ok) {
        setReviews(data.reviews)
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
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          rating, 
          comment,
          emoji: selectedEmoji,
          categories
        }),
      })

      const data = await res.json()

      if (data.ok) {
        // Show confetti
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
        setShowPreview(false)
        // Refresh reviews
        fetchReviews()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to submit review",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleCategoryRating = (category: keyof typeof categories, value: number) => {
    setCategories(prev => ({ ...prev, [category]: value }))
  }

  const getReviewBadge = () => {
    const avgCategory = Object.values(categories).reduce((a, b) => a + b, 0) / 3
    const hasEmoji = !!selectedEmoji
    const commentLength = comment.length
    
    if (avgCategory >= 4 && hasEmoji && commentLength > 100) {
      return { icon: Award, label: "Detailed Reviewer", color: "text-amber-500" }
    } else if (commentLength > 150) {
      return { icon: Sparkles, label: "Thoughtful Review", color: "text-emerald-500" }
    } else if (hasEmoji) {
      return { icon: ThumbsUp, label: "Expressive", color: "text-pink-500" }
    }
    return null
  }

  // Delete review (admin only)
  const handleDelete = async () => {
    if (!deleteId || !adminPassword) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/reviews?id=${deleteId}&password=${encodeURIComponent(adminPassword)}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.ok) {
        toast({
          title: "Review Deleted",
          description: "The review has been removed.",
        })
        setDeleteId(null)
        setAdminPassword("")
        fetchReviews()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete review",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <section aria-labelledby="customer-reviews-title" className="space-y-8">
      <div className="text-center">
        <h2 id="customer-reviews-title" className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Customer Reviews
        </h2>
        <p className="text-muted-foreground">Share your experience with us!</p>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
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

      {/* Submit Review Form */}
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 shadow-lg relative overflow-hidden"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 bg-emerald-300/10 dark:bg-emerald-600/10 rounded-full blur-xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${i * 25}%`,
                top: `${i * 15}%`,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4 relative z-10">
          <MessageSquare className="h-6 w-6 text-emerald-600" />
          <h3 className="text-xl font-semibold">Leave a Review</h3>
          {getReviewBadge() && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-white dark:bg-gray-800 border"
            >
              {(() => {
                const Badge = getReviewBadge()
                if (!Badge) return null
                const Icon = Badge.icon
                return (
                  <>
                    <Icon className={`h-3 w-3 ${Badge.color}`} />
                    <span className={Badge.color}>{Badge.label}</span>
                  </>
                )
              })()}
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* Name Input */}
          <div>
            <label htmlFor="review-name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <motion.div whileFocus={{ scale: 1.01 }}>
              <Input
                id="review-name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white dark:bg-gray-900 transition-all focus:ring-2 focus:ring-emerald-500"
              />
            </motion.div>
          </div>

          {/* Emoji Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">How was your experience?</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map((item) => (
                <motion.button
                  key={item.emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(item.emoji)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl border-2 transition-all ${
                    selectedEmoji === item.emoji
                      ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="ml-1 text-xs">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Overall Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">Overall Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  <motion.div
                    animate={{
                      scale: star <= (hoverRating || rating) ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Star
                      className={`h-8 w-8 transition-all duration-300 ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400 drop-shadow-lg"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </motion.div>
                </motion.button>
              ))}
              {rating > 0 && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-2 text-sm font-medium text-emerald-600"
                >
                  {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                </motion.span>
              )}
            </div>
          </div>

          {/* Category Ratings */}
          <div className="space-y-3 bg-white dark:bg-gray-900/50 rounded-xl p-4">
            <label className="block text-sm font-medium">Rate by Category (Optional)</label>
            {CATEGORIES.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm">{category.label}</span>
                    </div>
                    {categories[category.key] > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {categories[category.key]}/5
                      </span>
                    )}
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
                              ? "fill-emerald-500 text-emerald-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Review Text */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="review-comment" className="block text-sm font-medium">
                Your Review
              </label>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${
                  comment.length > 150 ? "text-emerald-600" : "text-muted-foreground"
                }`}>
                  {comment.length} characters
                </span>
                {comment.length > 50 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-xs text-emerald-600 hover:underline"
                  >
                    {showPreview ? "Hide" : "Show"} Preview
                  </motion.button>
                )}
              </div>
            </div>
            <Textarea
              id="review-comment"
              placeholder="Tell us about your experience... (Be detailed for a special badge!)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="bg-white dark:bg-gray-900 resize-none transition-all focus:ring-2 focus:ring-emerald-500"
            />
            
            {/* Live Preview */}
            <AnimatePresence>
              {showPreview && comment.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Preview</span>
                    {selectedEmoji && <span className="text-2xl">{selectedEmoji}</span>}
                  </div>
                  <p className="text-sm italic">"{comment}"</p>
                  <div className="mt-2 pt-2 border-t flex items-center justify-between">
                    <p className="text-xs font-medium">{name || "Your Name"}</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white gap-2 shadow-lg hover:shadow-emerald-500/50 transition-all"
            >
              {submitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Review
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* Reviews Display */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Reviews ({reviews.length})</h3>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-xl transition-all hover:border-emerald-300 dark:hover:border-emerald-700 group overflow-hidden"
                >
                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                  
                  {/* Emoji badge */}
                  {review.emoji && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-3 left-3 text-3xl z-10"
                    >
                      {review.emoji}
                    </motion.div>
                  )}

                  {/* Delete button (admin only) */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setDeleteId(review.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 dark:hover:bg-red-900/40 z-10"
                        aria-label="Delete review"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-red-500" />
                          Admin Authentication Required
                        </DialogTitle>
                        <DialogDescription>
                          Enter the admin password to delete this review.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <Input
                          type="password"
                          placeholder="Admin Password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleDelete}
                            disabled={deleting || !adminPassword}
                            variant="destructive"
                            className="flex-1"
                          >
                            {deleting ? "Deleting..." : "Delete Review"}
                          </Button>
                          <Button
                            onClick={() => {
                              setDeleteId(null)
                              setAdminPassword("")
                            }}
                            variant="outline"
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3 relative z-10">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-4 relative z-10">{review.comment}</p>

                  {/* Category ratings if available */}
                  {review.categories && Object.values(review.categories).some(v => v > 0) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mb-4 space-y-1 text-xs relative z-10"
                    >
                      {CATEGORIES.map((cat) => {
                        const value = review.categories?.[cat.key]
                        if (!value) return null
                        const Icon = cat.icon
                        return (
                          <div key={cat.key} className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Icon className="h-3 w-3 text-emerald-600" />
                              <span>{cat.label}</span>
                            </div>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-2.5 w-2.5 ${
                                    star <= value
                                      ? "fill-emerald-500 text-emerald-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </motion.div>
                  )}

                  {/* Name and Date */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700 relative z-10">
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
