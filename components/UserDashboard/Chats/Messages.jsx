'use client'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useEffect, useRef } from 'react'

const Messages = ({ messages, userIdDB }) => {
  const scrollDownRef = useRef(null)

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm')
  }

  // Sort messages by creation date
  if (messages) {
    messages = messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  useEffect(() => {
    scrollDownRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      id='messages'
      className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
      <div ref={scrollDownRef} />

      {messages && messages.map((message, index) => {
        // Safeguard: Check if message and senderId exist
        if (!message || !message.senderId) {
          return null; // Skip invalid message objects
        }

        const isCurrentUser = message.senderId === userIdDB

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === message.senderId

        return (
          <div className='chat-message' key={`${message._id}-${message.createdAt}`}>
            <div className={cn('flex items-end', { 'justify-end': isCurrentUser })}>
              <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2', {
                'order-1 items-end': isCurrentUser,
                'order-2 items-start': !isCurrentUser,
              })}>
                <span
                  className={cn('px-4 py-2 rounded-lg inline-block', {
                    'bg-indigo-600 text-white': isCurrentUser,
                    'bg-gray-200 text-gray-900': !isCurrentUser,
                    'rounded-br-none': !hasNextMessageFromSameUser && isCurrentUser,
                    'rounded-bl-none': !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.text}{' '}
                  <span className='ml-2 text-xs text-gray-400'>
                    {formatTimestamp(message.createdAt)}
                  </span>
                </span>
              </div>

              <div
                className={cn('relative w-6 h-6', {
                  'order-2': isCurrentUser,
                  'order-1': !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                {/* Profile image placeholder */}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
