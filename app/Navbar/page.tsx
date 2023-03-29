"use client"
import Conversation from "@/components/conversation";
import { useState } from "react";
// import next navigation
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

type conversations = {
    topic: string,
    route: string
}

export default function Navbar() {
    const [messages, setMessages] = useState<conversations[]>([])
    const router = useRouter();
    
    function clearMessages() {
        setMessages([])
        // redirect to the '/' route
        router.push('/')
    }

    function addMessage() {
        let route = v4();
        setMessages(messages => [...messages, {topic: "New chat", route: route}])
        router.push(`/${route}`)
    }
    return (
        <div className="bg-[#282424] h-full text-slate-200 flex flex-1 flex-col space-y-1 p-2">
            <button className='border border-gray-100/20 rounded-md p-3 text-left w-full' onClick={addMessage}>
                <span className="inline-flex gap-3">
                    <div className="ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                    </div>
                    <h4>New chat</h4>
                </span>
            </button>

            <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
                {messages.map((val, index) => 
                    <Conversation key={index} value={val.topic} route={val.route} />
                )}
            </div>

            <button className="flex py-3 px-3" onClick={clearMessages}>
                <span className="inline-flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Clear conversations
                </span>
            </button>
        </div>
    )
}