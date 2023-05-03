"use client"

import { FC, HTMLAttributes, useState } from 'react'
import {cn} from '@/lib/utils'
import TextareaAutosize from 'react-textarea-autosize'
import { useMutation } from '@tanstack/react-query'
import {nanoid} from 'nanoid'
import { Message } from '@/lib/validators/message'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({className, ...props}) => {
    const [input, setInput] = useState<string> ('')

    const {mutate: sendMessage, isLoading} = useMutation(
        {
            mutationFn: async (message: Message) => {
              const response = await fetch('/api/message',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({messages: [message]})
            })

            return response.body
            },
            onSuccess: () => {
              console.log('Success')
            } //THis shows that it is successful.
        }
    )

  return <div {...props} className={cn('border-t border-zinc-300', className)}>
    <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
        <TextareaAutosize
        onKeyDown={(e) => {
          if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault()

            const message = {
              id: nanoid(),
              isUserMessage: true,
              text: input,
            }
            sendMessage(message)
          }
        }}
        rows ={2}
        maxRows={4}
        autoFocus
        placeholder='Write a message...'
        onChange={(e) => setInput(e.target.value)}
        className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6 rounded-lg '
        />
    </div>
  </div>
}

export default ChatInput