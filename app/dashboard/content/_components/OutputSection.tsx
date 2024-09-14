import React, { useEffect, useRef } from 'react'
import "@toast-ui/editor/dist/toastui-editor.css"
import { Editor } from "@toast-ui/react-editor"
import { Button } from '@/components/ui/button'
import { Copy, Share2, ChevronDown } from 'lucide-react'
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { SiHashnode } from "react-icons/si"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface OutputProps {
    aiOutput: string
    templateSlug: string
}

const OutputSection = ({ aiOutput }: OutputProps) => {
    const editorRef: any = useRef();

    const shareOptions = {
        "YouTube": "https://studio.youtube.com/channel",
        "Twitter": "https://twitter.com/intent/tweet",
        "Instagram": "https://www.instagram.com",
        "Hashnode": "https://hashnode.com/create"
    };

    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(aiOutput)
    }, [aiOutput])

    const copyContent = () => {
        navigator.clipboard.writeText(aiOutput)
            .then(() => alert('Content copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    }

    const shareContent = (url: string) => {
        window.open(url, '_blank');
    }

    const renderShareIcon = (platform: string) => {
        switch (platform) {
            case "YouTube": return <FaYoutube className="w-4 h-4 mr-2" />;
            case "Twitter": return <FaTwitter className="w-4 h-4 mr-2" />;
            case "Instagram": return <FaInstagram className="w-4 h-4 mr-2" />;
            case "Hashnode": return <SiHashnode className="w-4 h-4 mr-2" />;
            default: return <Share2 className="w-4 h-4 mr-2" />;
        }
    }

    return (
        <div className="bg-white shadow-lg border rounded-lg p-4">
            <article className="flex justify-between items-center pb-4">
                <h2 className="text-lg font-medium">Your Result:</h2>
                <div className="flex gap-2">
                    <Button onClick={copyContent} className="flex gap-2 items-center bg-indigo-500 hover:bg-indigo-600">
                        <Copy className="w-4 h-4" /> Copy
                    </Button>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <Button className="flex gap-2 items-center bg-green-500 hover:bg-green-600">
                                <Share2 className="w-4 h-4" /> Share <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className="bg-white rounded-md shadow-lg p-2 z-50">
                            {Object.entries(shareOptions).map(([platform, url]) => (
                                <DropdownMenu.Item key={platform} onSelect={() => shareContent(url)} className="flex items-center my-1 border px-2 py-1 cursor-pointer hover:bg-gray-100 rounded">
                                    {renderShareIcon(platform)}
                                    {platform}
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
            </article>
            <Editor
                ref={editorRef}
                initialValue="Your result will reflect here"
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                userCommandShortcut={true}
            />
        </div>
    )
}

export default OutputSection
