# Awesome Editor

Awesome Editor is a powerful, feature-rich text editor for React applications. It provides a comprehensive set of tools for creating and editing content with ease.

![Awesome Editor Interface](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-09%20094501-kC4AGs4HVdFBs4fWp1Up9jjfFUux4g.png)

## Features

- **WYSIWYG Editing**: What You See Is What You Get - edit your content exactly as it will appear.
- **Rich Text Editing**: Full support for formatting text, including bold, italic, underline, and strikethrough.
- **Multiple Heading Levels**: Easy creation of hierarchical content with H1 to H6 headings.
- **Lists**: Create ordered and unordered lists with multiple levels of nesting.
- **Markdown Support**: Write in Markdown and see the formatted output in real-time.
- **Code Highlighting**: Syntax highlighting for over 100 programming languages.
- **Image and Media Embedding**: Easily insert and resize images, videos, and other media.
- **Table Support**: Create and edit tables with merge/split cell capabilities.
- **Math Equations**: LaTeX support for mathematical equations.
- **Collaborative Editing**: Real-time collaboration with multiple users.
- **Version History**: Track changes and revert to previous versions.
- **Custom Plugins**: Extend functionality with a robust plugin system.
- **Customizable Toolbar**: Tailor the toolbar to your specific needs.
- **Theming**: Customize the look and feel with easy-to-use theming options.
- **Accessibility**: Fully compliant with WCAG 2.1 guidelines.
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices.
- **File Import/Export**: Support for various file formats including Markdown, HTML, and PDF.
- **AI-powered Content Generation**: Leverage AI to assist in content creation and editing.
- **Shortcut Support**: Extensive keyboard shortcuts for power users.
- **And much more!**: Continuously evolving with new features and improvements.

## Dependencies

Awesome Editor requires the following peer dependency:

- React 18 or higher

## Installation

To install Awesome Editor in your project, run the following command:

```
npm install awesome-editor
```

## How to Use

1. First, install the Awesome Editor package:

```
npm install awesome-editor
```

2. Set up your OpenAI API key:

   To use the AI-powered content generation feature, you need to set up your OpenAI API key as an environment variable. 

   Create a `.env.local` file in your project root and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   Make sure to add `.env.local` to your `.gitignore` file to keep your API key secure.

3. Import and use the Awesome Editor component in your React application:

```jsx
import React from 'react';
import AwesomeEditor from 'awesome-editor';

function MyComponent() {
  return (
    <AwesomeEditor
      value="Initial content"
      onChange={(newContent) => console.log(newContent)}
    />
  );
}
```

## Props

Awesome Editor accepts the following props:

- `value` (string): Initial content of the editor
- `onChange` (function): Callback function that receives the updated content
- `className` (string): Additional CSS class for styling

Example usage with all props:

```jsx
<AwesomeEditor
  value="Initial content"
  onChange={(newContent) => handleContentChange(newContent)}
  className="custom-editor-class"
/>
```

## How to Use with Shadcn UI and React Hook Form

Awesome Editor can be easily integrated with Shadcn UI components and React Hook Form for more complex form setups. Here's an example of how to use Awesome Editor as a controlled component within a form:

1. First, ensure you have the necessary dependencies installed:

```
npm install awesome-editor @hookform/resolvers @radix-ui/react-label react-hook-form zod
```

2. Import the required components and hooks:

```jsx
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import AwesomeEditor from 'awesome-editor'
```

3. Define your form schema and create your form:

```jsx
const formSchema = z.object({
  content: z.string().min(1, "Content is required"),
})

export function EditorForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Controller
          name="content"
          control={form.control}
          render={({ field }) => (
            <AwesomeEditor
              value={field.value}
              onChange={field.onChange}
              className="min-h-[400px] border-2 border-gray-300 rounded-md"
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

This example demonstrates how to:
- Use Awesome Editor within a React Hook Form setup
- Integrate with Shadcn UI components
- Use Zod for form validation
- Style the editor to match Shadcn UI aesthetics

For more detailed usage instructions and API documentation, please visit our [official documentation](https://awesome-editor.docs.com).

## License

Awesome Editor is released under the MIT License. See the LICENSE file for more details.