import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WarningCircle, ArrowRight } from '@phosphor-icons/react'
import type { SimilarPromptResult } from '@/lib/vectorization'
import { getTierColor } from '@/lib/scoring'

interface DuplicateWarningProps {
  similarPrompt: SimilarPromptResult
  similarity: number
  onViewExisting: () => void
  onContinueAnyway: () => void
}

export function DuplicateWarning({
  similarPrompt,
  similarity,
  onViewExisting,
  onContinueAnyway,
}: DuplicateWarningProps) {
  const similarityPercent = Math.round(similarity * 100)
  const isDuplicate = similarity >= 0.9

  return (
    <Alert variant={isDuplicate ? 'destructive' : 'default'} className="border-2">
      <WarningCircle className="h-5 w-5" weight="fill" />
      <AlertTitle className="text-base font-semibold">
        {isDuplicate ? 'Duplicate Detected' : 'Similar Prompt Found'}
      </AlertTitle>
      <AlertDescription className="space-y-3">
        <p className="text-sm">
          {isDuplicate
            ? `This prompt is ${similarityPercent}% similar to one you've already analyzed.`
            : `This prompt is ${similarityPercent}% similar to a previous submission.`}
        </p>

        <div className="bg-background/50 p-3 rounded-md">
          <p className="text-xs text-muted-foreground mb-2">Previous prompt:</p>
          <p className="font-mono text-sm mb-2">{similarPrompt.prompt}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={getTierColor(similarPrompt.pie_tier as 1 | 2 | 3)} variant="secondary">
              Tier {similarPrompt.pie_tier}
            </Badge>
            <Badge variant="outline">ICE: {similarPrompt.ice_overall}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onViewExisting}>
            <ArrowRight className="w-4 h-4 mr-2" />
            View Existing Analysis
          </Button>
          <Button variant="secondary" size="sm" onClick={onContinueAnyway}>
            Analyze Anyway
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
