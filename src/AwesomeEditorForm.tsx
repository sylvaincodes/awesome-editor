import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import AwesomeEditor from "./AwesomeEditor"

const formSchema = z.object({
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
})

const blogExampleContent = `
<h1>The Future of Artificial Intelligence: Transforming Industries</h1>

<img src="/placeholder.svg?height=400&width=800" alt="AI concept illustration" style="max-width: 100%; height: auto;">

<h2>Listen to the Audio Summary</h2>
<audio controls>
  <source src="/path-to-audio-file.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<h2>Watch Our AI Expert Interview</h2>
<video controls style="max-width: 100%;">
  <source src="/path-to-video-file.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<h2>Introduction</h2>
<p>Artificial Intelligence (AI) is rapidly evolving and transforming various industries. From healthcare to finance, AI is revolutionizing the way we work, live, and interact with technology. In this blog post, we'll explore the current state of AI and its potential future impacts.</p>

<h2>Key Features of Modern AI</h2>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
  <div>
    <h3>Machine Learning</h3>
    <ul>
      <li>Deep Learning</li>
      <li>Neural Networks</li>
      <li>Reinforcement Learning</li>
    </ul>
  </div>
  <div>
    <h3>Natural Language Processing</h3>
    <ul>
      <li>Sentiment Analysis</li>
      <li>Language Translation</li>
      <li>Chatbots and Virtual Assistants</li>
    </ul>
  </div>
</div>

<h2>Industries Being Transformed</h2>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
  <div>
    <h3>Healthcare</h3>
    <p>AI is improving diagnostics, drug discovery, and personalized treatment plans.</p>
  </div>
  <div>
    <h3>Finance</h3>
    <p>AI-powered algorithms are enhancing fraud detection and automated trading.</p>
  </div>
</div>

<h2>Conclusion</h2>
<p>As AI continues to advance, we can expect to see even more innovative applications across various sectors. The future of AI is bright, and its potential to improve our lives and solve complex problems is immense.</p>
`

export function AwesomeEditorForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: blogExampleContent,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div>
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
        {form.formState.errors.content && <p>{form.formState.errors.content.message}</p>}
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Submit
      </button>
    </form>
  )
}

