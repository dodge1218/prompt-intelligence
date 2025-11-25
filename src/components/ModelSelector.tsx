import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Brain } from '@phosphor-icons/react'
import { getAvailableModels, MODEL_INFO, estimateCost, type AIModel } from '@/lib/scoring'

interface ModelSelectorProps {
  selectedModel: AIModel
  onModelChange: (model: AIModel) => void
  estimatedTokens?: number
}

export function ModelSelector({ selectedModel, onModelChange, estimatedTokens = 0 }: ModelSelectorProps) {
  const availableModels = getAvailableModels()
  const selectedInfo = MODEL_INFO[selectedModel]

  return (
    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-muted-foreground" weight="duotone" />
        <span className="text-sm font-medium">AI Model:</span>
      </div>
      
      <Select value={selectedModel} onValueChange={(value) => onModelChange(value as AIModel)}>
        <SelectTrigger className="w-[280px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableModels.map((model) => {
            const info = MODEL_INFO[model]
            return (
              <SelectItem key={model} value={model}>
                <div className="flex flex-col gap-1 py-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{info.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {info.provider}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{info.description}</span>
                </div>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>

      <div className="ml-auto flex items-center gap-4">
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Cost per 1M tokens</div>
          <div className="text-sm font-semibold">${selectedInfo.costPer1MTokens.toFixed(2)}</div>
        </div>
        
        {estimatedTokens > 0 && (
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Est. cost</div>
            <div className="text-sm font-semibold text-primary">
              ${estimateCost(estimatedTokens, selectedModel).toFixed(4)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
