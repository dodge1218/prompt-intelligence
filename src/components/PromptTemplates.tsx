import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkle, Code, Article, ChartLine, Translate, Image as ImageIcon } from '@phosphor-icons/react'

interface PromptTemplate {
  id: string
  title: string
  category: string
  icon: React.ReactNode
  prompt: string
  description: string
}

const templates: PromptTemplate[] = [
  {
    id: 'code-review',
    title: 'Code Review',
    category: 'Development',
    icon: <Code className="w-5 h-5" weight="duotone" />,
    prompt: 'Review this Python function for bugs, performance issues, and best practices:\n\n```python\ndef calculate_sum(numbers):\n    total = 0\n    for i in range(len(numbers)):\n        total = total + numbers[i]\n    return total\n```',
    description: 'Get detailed code analysis with suggestions'
  },
  {
    id: 'blog-post',
    title: 'Blog Post',
    category: 'Writing',
    icon: <Article className="w-5 h-5" weight="duotone" />,
    prompt: 'Write a 500-word blog post about the benefits of meditation for busy professionals. Include practical tips they can implement today.',
    description: 'Create engaging content for your audience'
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    category: 'Analytics',
    icon: <ChartLine className="w-5 h-5" weight="duotone" />,
    prompt: 'Analyze this sales data and identify trends:\n\nQ1: $125k, Q2: $142k, Q3: $138k, Q4: $165k\n\nProvide insights and recommendations for the next quarter.',
    description: 'Extract insights from your data'
  },
  {
    id: 'translation',
    title: 'Translation',
    category: 'Language',
    icon: <Translate className="w-5 h-5" weight="duotone" />,
    prompt: 'Translate this text to Spanish while maintaining professional tone and cultural nuances:\n\n"We are excited to announce our partnership with your organization. This collaboration will bring innovative solutions to market."',
    description: 'Translate with context and nuance'
  },
  {
    id: 'creative-story',
    title: 'Creative Story',
    category: 'Creative',
    icon: <Sparkle className="w-5 h-5" weight="duotone" />,
    prompt: 'Write a short science fiction story (300 words) about a programmer who discovers their code has become sentient.',
    description: 'Generate creative narratives'
  },
  {
    id: 'image-description',
    title: 'Image Prompt',
    category: 'Visual',
    icon: <ImageIcon className="w-5 h-5" weight="duotone" />,
    prompt: 'Create a detailed image generation prompt for: A futuristic city at sunset with flying cars, neon signs, and rain-slicked streets in cyberpunk style.',
    description: 'Craft detailed image generation prompts'
  },
]

interface PromptTemplatesProps {
  onSelectTemplate: (prompt: string) => void
}

export function PromptTemplates({ onSelectTemplate }: PromptTemplatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkle className="w-5 h-5" weight="fill" />
          Prompt Templates
        </CardTitle>
        <CardDescription>
          Get started with these example prompts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:bg-accent/5 transition-colors border-border"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md">
                      {template.icon}
                    </div>
                    <div>
                      <CardTitle className="text-sm">{template.title}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-xs mt-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onSelectTemplate(template.prompt)}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
