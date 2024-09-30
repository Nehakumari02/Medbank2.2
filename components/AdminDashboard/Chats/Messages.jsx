'use client'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'

const Messages= ({
  messages,
  userIdDB
}) => {

  const scrollDownRef = useRef(null)

  const formatTimestamp = (timestamp) => {
    return format(timestamp, 'HH:mm')
  }

  // messages = messages.sort((a, b) => a.createdAt - b.createdAt)
  if(messages)
    messages = messages.sort((a, b) =>  new Date(b.createdAt) - new Date(a.createdAt));


  useEffect(() => {
    // messages = messages.sort((a, b) => b.createdAt - a.createdAt);
    scrollDownRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  

  return (
    <div
      id='messages'
      className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
      <div ref={scrollDownRef} />

      {messages && messages.map((message, index) => {
        const isCurrentUser = message.senderId === userIdDB

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId

        return (
          <div
            className='chat-message'
            key={`${message._id}-${message.createdAt}`}>
            <div
              className={cn('flex items-end', {
                'justify-end': isCurrentUser,
              })}>
              <div
                className={cn(
                  'flex flex-col space-y-2 text-base max-w-xs mx-2',
                  {
                    'order-1 items-end': isCurrentUser,
                    'order-2 items-start': !isCurrentUser,
                  }
                )}>
                <span
                  className={cn('px-4 py-2 rounded-lg inline-block', {
                    'bg-[#3E8DA7] text-white': isCurrentUser,
                    'bg-[#EFF4FB] text-gray-900': !isCurrentUser,
                    'rounded-br-none':
                      !hasNextMessageFromSameUser && isCurrentUser,
                    'rounded-bl-none':
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}>
                  {message.text}{' '}
                  <span className='ml-2 text-xs text-gray-400'>
                    {formatTimestamp(message.createdAt)}
                  </span>
                </span>
              </div>

              {/* <div
                className={cn('relative w-6 h-6', {
                  'order-2': isCurrentUser,
                  'order-1': !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}>
                <Image
                  fill
                  src={
                    isCurrentUser ? (sessionImg) : chatPartner.image
                  }
                  alt='Profile picture'
                  referrerPolicy='no-referrer'
                  className='rounded-full'
                />
              </div> */}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Messages