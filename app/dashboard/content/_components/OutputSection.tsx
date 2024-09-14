import React, { useEffect, useRef } from 'react'
import "@toast-ui/editor/dist/toastui-editor.css"
import { Editor } from "@toast-ui/react-editor"
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

interface OutputProps {
    aiOutput: string
}

const OutputSection = ( {aiOutput}: OutputProps ) => {
    const editorRef:any = useRef();

    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(aiOutput)
    }, [aiOutput])

    return (
        <div className="bg-white shadow-lg border rounded-lg p-4">
            <article className="flex justify-between items-center pb-4">
                <h2 className="text-lg font-medium">Your Result:</h2>
                <Button className="flex gap-2 items-center bg-indigo-500 hover:bg-indigo-600"><Copy/> Copy</Button>
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
