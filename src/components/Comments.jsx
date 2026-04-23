import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ThumbsUp, Send, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { db, auth } from '../lib/firebase'
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  updateDoc,
  doc,
  increment,
  serverTimestamp 
} from 'firebase/firestore'
import useStore from '../store/useStore'
import { Link } from 'react-router-dom'

export default function Comments({ movieId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [spoilerMode, setSpoilerMode] = useState(false)
  const { user } = useStore()

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('movieId', '==', movieId),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setComments(commentsData)
    })

    return unsubscribe
  }, [movieId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    setLoading(true)
    try {
      await addDoc(collection(db, 'comments'), {
        movieId,
        userId: user.uid,
        userName: user.displayName || user.email,
        userPhoto: user.photoURL || null,
        text: newComment,
        isSpoiler: spoilerMode,
        likes: 0,
        createdAt: serverTimestamp()
      })
      setNewComment('')
      setSpoilerMode(false)
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (commentId, currentLikes) => {
    if (!user) return
    
    try {
      const commentRef = doc(db, 'comments', commentId)
      await updateDoc(commentRef, {
        likes: increment(1)
      })
    } catch (error) {
      console.error('Error liking comment:', error)
    }
  }

  return (
    <div className="glass rounded-lg p-6 border border-white/10">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-6 h-6 text-luxury-red" />
        <h3 className="text-2xl font-title font-bold text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-start space-x-3">
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=C1121F&color=fff`}
              alt={user.displayName || user.email}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows="3"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setSpoilerMode(!spoilerMode)}
                  className={`flex items-center space-x-2 text-sm transition ${
                    spoilerMode ? 'text-luxury-red' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {spoilerMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>Contains Spoiler</span>
                </button>
                <button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className="flex items-center space-x-2 bg-luxury-red hover:bg-luxury-gold text-white px-6 py-2 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Posting...' : 'Post'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 glass p-4 rounded-lg border border-white/20 text-center">
          <p className="text-white/60 mb-3">Sign in to join the conversation</p>
          <Link
            to="/login"
            className="inline-block bg-luxury-red hover:bg-luxury-gold text-white px-6 py-2 rounded-full transition"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              index={index}
              onLike={handleLike}
              currentUser={user}
            />
          ))
        )}
      </div>
    </div>
  )
}

function CommentItem({ comment, index, onLike, currentUser }) {
  const [showSpoiler, setShowSpoiler] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start space-x-3 p-4 glass rounded-lg border border-white/10"
    >
      <img
        src={comment.userPhoto || `https://ui-avatars.com/api/?name=${comment.userName}&background=C1121F&color=fff`}
        alt={comment.userName}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-white font-semibold">{comment.userName}</span>
          <span className="text-white/40 text-sm">
            {comment.createdAt?.toDate().toLocaleDateString()}
          </span>
          {comment.isSpoiler && (
            <span className="px-2 py-0.5 bg-luxury-red/20 text-luxury-red text-xs rounded-full border border-luxury-red/30">
              Spoiler
            </span>
          )}
        </div>
        
        {comment.isSpoiler && !showSpoiler ? (
          <div className="mb-2">
            <button
              onClick={() => setShowSpoiler(true)}
              className="flex items-center space-x-2 text-white/60 hover:text-white transition text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Click to reveal spoiler</span>
            </button>
          </div>
        ) : (
          <p className="text-white/80 mb-2">{comment.text}</p>
        )}

        <button
          onClick={() => onLike(comment.id, comment.likes)}
          disabled={!currentUser}
          className="flex items-center space-x-1 text-white/60 hover:text-luxury-red transition text-sm disabled:cursor-not-allowed"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{comment.likes || 0}</span>
        </button>
      </div>
    </motion.div>
  )
}
