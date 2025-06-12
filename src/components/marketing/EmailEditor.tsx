'use client'

import { useEffect, useState } from 'react'

// A simplified WYSIWYG email editor component
export default function EmailEditor({ 
  initialValue = '', 
  onChange 
}: { 
  initialValue: string
  onChange: (content: string) => void 
}) {
  const [editorContent, setEditorContent] = useState(initialValue)
  
  useEffect(() => {
    // If initialValue changes externally, update the editor
    setEditorContent(initialValue)
  }, [initialValue])

  // Handle content change
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value
    setEditorContent(newContent)
    onChange(newContent)
  }
  
  // Basic toolbar functions
  const insertFormat = (format: string) => {
    const formattingMap: Record<string, string> = {
      'bold': '<strong>Text</strong>',
      'italic': '<em>Text</em>',
      'underline': '<u>Text</u>',
      'heading': '<h2>Heading</h2>',
      'paragraph': '<p>Paragraph text</p>',
      'link': '<a href="https://example.com">Link text</a>',
      'list': '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>',
      'button': '<a href="https://mvonoconsultants.com" style="display:inline-block; padding:10px 20px; background-color:#4f46e5; color:white; text-decoration:none; border-radius:4px; font-weight:bold;">Call to Action</a>',
      'spacer': '<div style="height:20px"></div>',
      'divider': '<hr style="border:0; border-top:1px solid #e5e7eb; margin:20px 0;" />',
    }
    
    // Insert the formatting at cursor position or at the end
    setEditorContent(prev => {
      const textToInsert = formattingMap[format] || ''
      const newContent = prev + textToInsert
      onChange(newContent)
      return newContent
    })
  }

  return (
    <div className="email-editor">
      {/* Toolbar */}
      <div className="bg-gray-100 p-2 border-b flex flex-wrap gap-1">
        <button 
          type="button"
          onClick={() => insertFormat('bold')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <span className="font-bold">B</span>
        </button>
        <button 
          type="button"
          onClick={() => insertFormat('italic')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <span className="italic">I</span>
        </button>
        <button 
          type="button"
          onClick={() => insertFormat('underline')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Underline"
        >
          <span className="underline">U</span>
        </button>
        <span className="border-r border-gray-300 mx-1 h-6 self-center"></span>
        <button 
          type="button"
          onClick={() => insertFormat('heading')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Heading"
        >
          H
        </button>
        <button 
          type="button"
          onClick={() => insertFormat('paragraph')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Paragraph"
        >
          P
        </button>
        <button 
          type="button"
          onClick={() => insertFormat('link')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Link"
        >
          🔗
        </button>
        <button 
          type="button"
          onClick={() => insertFormat('list')}
          className="p-2 hover:bg-gray-200 rounded"
          title="List"
        >
          •••
        </button>
        <span className="border-r border-gray-300 mx-1 h-6 self-center"></span>
        <button 
          type="button"
          onClick={() => insertFormat('button')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Button"
        >
          Button
        </button>
        <button 
          type="button"
          onClick={() => insertFormat('spacer')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Add Space"
        >
          ↕️
        </button>
        <button 
          type="button"
          onClick={() => insertFormat('divider')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Divider"
        >
          —
        </button>
      </div>
      
      {/* Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Text editor */}
        <div>
          <p className="text-sm font-medium mb-2">HTML Editor</p>
          <textarea
            value={editorContent}
            onChange={handleContentChange}
            className="w-full h-[500px] border rounded-md p-3 font-mono text-sm resize-none"
          />
        </div>
        
        {/* Preview */}
        <div>
          <p className="text-sm font-medium mb-2">Preview</p>
          <div className="border rounded-md p-4 h-[500px] overflow-auto bg-white">
            <div
              dangerouslySetInnerHTML={{ __html: editorContent }}
              className="email-preview"
            />
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-gray-50 border-t text-sm text-gray-500">
        For advanced formatting, you can edit the HTML directly in the editor.
      </div>
    </div>
  )
}
