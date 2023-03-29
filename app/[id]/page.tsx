'use client'
import { FormEvent, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

// give a type definition for a dictionary
type chats = {
    [key: string]: string[]
}

export default function Chat() {

    const router = useRouter();
    const pathname = usePathname()

    // how to add object type to usestate

    const [chats, setChats] = useState<chats>({})

    // handle the form submit
    const handleSubmit = (e : any) => {
        e.preventDefault()
        const userChat: string = e.target[0].value

        
        console.log(userChat)
        let currentChats = chats[pathname]
        if (currentChats) {
            currentChats.push(userChat)
            setChats({ ...chats, [pathname]: currentChats })
        } else {
            setChats({ ...chats, [pathname]: [userChat] })
        }
        // create a new object with the current chats
        
        // add the user chat to the chats object with the key as the current path
        // set state to the new chats object
        // call the api
        fetch('/api/hello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userChat })
        })
            .then(res => res.text())
            .then(data => {
                // add the user chat and the bot response to the chats array
                let currentChats = chats[pathname]
                if (currentChats) {
                    currentChats.push(userChat, data)
                    setChats({ ...chats, [pathname]: currentChats })
                }
                else {
                    setChats({ ...chats, [pathname]: [userChat, data] })
                }

            })
        // clear the input
        e.target[0].value = ''
    }


    return (
        <div className="relative flex flex-col h-full items-stretch">
            <div className="flex flex-1 justify-center w-full">
                <ul className="w-full">
                    {chats[pathname] ? chats[pathname].map((chat, index) => {
                        return (
                            <li className={`w-full pt-6 pb-10 border-b border-black/10  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                <div className="w-1/2 mx-auto">
                                    <div className="flex items-center gap-6">
                                        <div className="w-7 h-7 rounded-sm bg-gray-300"><p className="flex justify-center items-center font-semibold">{index % 2 === 0 ? 'U' : 'GPT'}</p></div>
                                        <div className="text-sm w-5/6 text-black/80">{chat}</div>
                                    </div>
                                </div>
                            </li>
                        )
                    }) : null}
                </ul>
            </div>
            <div className="absolute bottom-0 left-0 w-full border-t bg-white pt-2 items-center flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col w-full py-4 flex-grow relative border border-black/10 bg-white rounded-md shadow-sm  max-w-3xl mx-auto justify-center">
                    <div className="flex flex-1 w-full">
                        <textarea className="w-full h-6 overflow-y-hidden p-2 focus:outline-none resize-none pr-4" placeholder=""></textarea>
                    </div>
                    <button className="absolute p-1 rounded-md text-gray-500 bottom-3 right-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </form>
                <div className="text-black/50 text-xs my-3">
                    ChatGPT Mar 14 Version. Free Research Preview. Our goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve.</div>
            </div>
        </div>
    )
}