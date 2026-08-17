'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  MessageSquare,
  CornerDownRight,
  Smile,
  CheckCircle2,
  MoreHorizontal,
  Send,
} from 'lucide-react'
import { toast } from 'sonner'

export interface CommentReaction {
  emoji: string
  count: number
  hasReacted: boolean
}

export interface CommentItem {
  id: string
  author: { name: string; avatar?: string; role?: string }
  content: string
  timestamp: string
  isResolved?: boolean
  reactions?: CommentReaction[]
  replies?: CommentItem[]
}

export interface CommentThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  comments?: CommentItem[]
  onAddComment?: (text: string) => void
  onReply?: (parentId: string, text: string) => void
}

const DEFAULT_COMMENTS: CommentItem[] = [
  {
    id: 'c-1',
    author: { name: 'Elena Rostova', role: 'Staff Architect' },
    content: 'Should we ensure the OKLCH theme engine provides automatic fallback to standard Hex for legacy Canvas renderers?',
    timestamp: '25 min ago',
    isResolved: false,
    reactions: [
      { emoji: '👍', count: 3, hasReacted: true },
      { emoji: '🚀', count: 2, hasReacted: false },
    ],
    replies: [
      {
        id: 'c-1-1',
        author: { name: 'Marcus Chen', role: 'Lead Developer' },
        content: 'Good catch Elena! Added a polyfill utility in lib/colors.ts with sRGB translation.',
        timestamp: '10 min ago',
        reactions: [{ emoji: '🎉', count: 4, hasReacted: true }],
      },
    ],
  },
]

export function CommentThread({
  comments: controlledComments,
  onAddComment,
  onReply,
  className,
  ...props
}: CommentThreadProps) {
  const [comments, setComments] = React.useState<CommentItem[]>(controlledComments || DEFAULT_COMMENTS)
  const [newRootComment, setNewRootComment] = React.useState('')
  const [replyInputs, setReplyInputs] = React.useState<Record<string, string>>({})
  const [activeReplyId, setActiveReplyId] = React.useState<string | null>(null)

  const activeComments = controlledComments || comments

  const handleAddRootComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRootComment.trim()) return

    const newItem: CommentItem = {
      id: `c-${Date.now()}`,
      author: { name: 'Alex Rivera', role: 'Product Lead' },
      content: newRootComment.trim(),
      timestamp: 'Just now',
      reactions: [],
      replies: [],
    }

    setComments((prev) => [...prev, newItem])
    onAddComment?.(newRootComment.trim())
    setNewRootComment('')
    toast.success('Comment posted')
  }

  const handleSendReply = (parentId: string) => {
    const text = replyInputs[parentId]?.trim()
    if (!text) return

    const replyItem: CommentItem = {
      id: `r-${Date.now()}`,
      author: { name: 'Alex Rivera', role: 'Product Lead' },
      content: text,
      timestamp: 'Just now',
    }

    const updated = activeComments.map((c) => {
      if (c.id === parentId) {
        return { ...c, replies: [...(c.replies || []), replyItem] }
      }
      return c
    })

    setComments(updated)
    onReply?.(parentId, text)
    setReplyInputs((prev) => ({ ...prev, [parentId]: '' }))
    setActiveReplyId(null)
    toast.success('Reply posted')
  }

  const handleToggleReaction = (commentId: string, emoji: string) => {
    const toggleReactionInList = (list: CommentItem[]): CommentItem[] => {
      return list.map((c) => {
        if (c.id === commentId) {
          const rxList = c.reactions || []
          const existing = rxList.find((r) => r.emoji === emoji)
          let updatedRx: CommentReaction[]

          if (existing) {
            updatedRx = rxList.map((r) =>
              r.emoji === emoji
                ? { ...r, count: r.hasReacted ? r.count - 1 : r.count + 1, hasReacted: !r.hasReacted }
                : r
            )
          } else {
            updatedRx = [...rxList, { emoji, count: 1, hasReacted: true }]
          }
          return { ...c, reactions: updatedRx }
        }
        if (c.replies) {
          return { ...c, replies: toggleReactionInList(c.replies) }
        }
        return c
      })
    }

    setComments(toggleReactionInList(activeComments))
  }

  return (
    <div
      data-slot="comment-thread"
      className={cn(
        'flex flex-col gap-4 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold">
            <MessageSquare className="size-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">Threaded Discussions</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Contextual team comments with reactions and resolution tracking
            </span>
          </div>
        </div>

        <Badge variant="subtle" theme="brand" size="sm">
          {activeComments.length} Active Threads
        </Badge>
      </div>

      {/* Discussion List */}
      <div className="flex flex-col gap-4">
        {activeComments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col gap-3 p-3.5 rounded-2xl bg-[var(--surface-muted)]/30 border border-[var(--outline-base)]"
          >
            {/* Comment Author & Body */}
            <div className="flex items-start gap-3">
              <Avatar label={comment.author.name} size="sm" />
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[var(--ink-primary)]">{comment.author.name}</span>
                  {comment.author.role && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--surface-base)] text-[var(--ink-muted)] border border-[var(--outline-base)]">
                      {comment.author.role}
                    </span>
                  )}
                  <span className="text-[10px] text-[var(--ink-muted)] ml-auto">{comment.timestamp}</span>
                </div>

                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">{comment.content}</p>

                {/* Reactions & Reply Trigger */}
                <div className="flex items-center gap-2 pt-1 text-xs">
                  {comment.reactions?.map((rx) => (
                    <button
                      key={rx.emoji}
                      type="button"
                      onClick={() => handleToggleReaction(comment.id, rx.emoji)}
                      className={cn(
                        'flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono border transition-colors cursor-pointer',
                        rx.hasReacted
                          ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] border-[var(--brand-solid)]/40'
                          : 'bg-[var(--surface-base)] text-[var(--ink-muted)] border-[var(--outline-base)] hover:text-[var(--ink-primary)]'
                      )}
                    >
                      <span>{rx.emoji}</span>
                      <span>{rx.count}</span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[var(--ink-muted)] hover:text-[var(--brand-solid)] cursor-pointer ml-1"
                  >
                    <CornerDownRight className="size-3" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="flex flex-col gap-2.5 pl-8 border-l-2 border-[var(--outline-base)] ml-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-2.5 text-xs">
                    <Avatar label={reply.author.name} size="xs" />
                    <div className="flex flex-col gap-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--ink-primary)]">{reply.author.name}</span>
                        <span className="text-[10px] text-[var(--ink-muted)]">{reply.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[var(--ink-secondary)]">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Inline Reply Input */}
            {activeReplyId === comment.id && (
              <div className="flex items-center gap-2 pl-8 pt-1">
                <input
                  type="text"
                  autoFocus
                  placeholder="Write a reply..."
                  value={replyInputs[comment.id] || ''}
                  onChange={(e) => setReplyInputs((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendReply(comment.id)
                  }}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] text-xs text-[var(--ink-primary)] outline-hidden focus:border-[var(--brand-solid)]"
                />
                <Button
                  variant="solid"
                  theme="brand"
                  size="xs"
                  onClick={() => handleSendReply(comment.id)}
                >
                  Reply
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Root Comment Form */}
      <form onSubmit={handleAddRootComment} className="flex items-center gap-2 pt-2 border-t border-[var(--outline-base)]/40">
        <input
          type="text"
          placeholder="Start a new discussion thread..."
          value={newRootComment}
          onChange={(e) => setNewRootComment(e.target.value)}
          className="flex-1 px-3.5 py-2 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] text-xs text-[var(--ink-primary)] outline-hidden focus:border-[var(--brand-solid)]"
        />
        <Button
          variant="solid"
          theme="brand"
          size="sm"
          type="submit"
          disabled={!newRootComment.trim()}
          prefix={<Send className="size-3.5" />}
        >
          Post
        </Button>
      </form>
    </div>
  )
}
