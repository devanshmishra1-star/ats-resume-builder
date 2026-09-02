'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import {
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Code, Image as ImageIcon, Link as LinkIcon, 
  Youtube as YoutubeIcon, Table as TableIcon, Minus
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Youtube.configure({ inline: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] max-w-none p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      // Only set content if the editor is completely empty but value has content
      // This prevents cursor jumping while typing, but fixes issues where 
      // the initialData didn't hydrate the editor correctly.
      if (editor.getHTML() === '<p></p>' || editor.getHTML() === '') {
        editor.commands.setContent(value);
      }
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const input = document.createElement('file');
    // Wait, creating an input element dynamically
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.onchange = async () => {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          // Provide some visual feedback
          const loadingToast = window.document.createElement('div');
          loadingToast.textContent = 'Uploading image...';
          loadingToast.style.position = 'fixed';
          loadingToast.style.top = '20px';
          loadingToast.style.right = '20px';
          loadingToast.style.background = '#3b82f6';
          loadingToast.style.color = 'white';
          loadingToast.style.padding = '10px 20px';
          loadingToast.style.borderRadius = '5px';
          loadingToast.style.zIndex = '9999';
          window.document.body.appendChild(loadingToast);

          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData
          });
          
          window.document.body.removeChild(loadingToast);
          
          if (res.ok) {
            const data = await res.json();
            editor.chain().focus().setImage({ src: data.url }).run();
          } else {
            alert('Image upload failed');
          }
        } catch (error) {
          alert('Upload error');
        }
      }
    };
    fileInput.click();
  };

  const addYoutube = () => {
    const url = window.prompt('YouTube URL');
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const MenuBar = () => (
    <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1 rounded-t-md">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}><Bold size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}><Italic size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}><Strikethrough size={16} /></button>
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}><Heading1 size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}><Heading2 size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}><Heading3 size={16} /></button>
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}><List size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}><ListOrdered size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}><Quote size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'bg-gray-200' : ''}`}><Code size={16} /></button>
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
      <button type="button" onClick={toggleLink} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}><LinkIcon size={16} /></button>
      <button type="button" onClick={addImage} className="p-1.5 rounded hover:bg-gray-200"><ImageIcon size={16} /></button>
      <button type="button" onClick={addYoutube} className="p-1.5 rounded hover:bg-gray-200"><YoutubeIcon size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="p-1.5 rounded hover:bg-gray-200"><TableIcon size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-1.5 rounded hover:bg-gray-200"><Minus size={16} /></button>
    </div>
  );

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
      <MenuBar />
      <EditorContent editor={editor} />
    </div>
  );
}
