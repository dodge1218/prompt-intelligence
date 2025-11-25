import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { PIECategory, PIETier } from '@/lib/types'
import { CATEGORY_DESCRIPTIONS, getCategoryLabel, getTierColor } from '@/lib/scoring'

interface TierMatrixProps {
  primaryCategory: PIECategory
  secondaryCategories?: PIECategory[]
}

const CATEGORIES_BY_TIER: Record<PIETier, PIECategory[]> = {
  1: ['dopamine', 'escape', 'loops'],
  2: ['builder', 'deploy', 'tool'],
  3: ['strategic', 'kairos', 'self-authoring'],
}

const TIER_LABELS: Record<PIETier, string> = {
  1: 'Tier 1: Reactive',
  2: 'Tier 2: Productive',
  3: 'Tier 3: Strategic',
}

export function TierMatrix({ primaryCategory, secondaryCategories = [] }: TierMatrixProps) {
  const isPrimary = (category: PIECategory) => category === primaryCategory
  const isSecondary = (category: PIECategory) => secondaryCategories.includes(category)

  return (
    <div className="space-y-4">
      {([3, 2, 1] as PIETier[]).map((tier) => (
        <div key={tier} className="space-y-2">
          <div className="text-sm font-semibold text-muted-foreground">{TIER_LABELS[tier]}</div>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES_BY_TIER[tier].map((category) => {
              const isActive = isPrimary(category) || isSecondary(category)
              return (
                <Card
                  key={category}
                  className={`p-3 transition-all ${
                    isPrimary(category)
                      ? 'ring-2 ring-accent bg-accent/10'
                      : isSecondary(category)
                        ? 'ring-1 ring-cyan bg-cyan/5'
                        : 'opacity-40'
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{getCategoryLabel(category)}</span>
                      {isPrimary(category) && (
                        <Badge variant="default" className="text-xs">
                          Primary
                        </Badge>
                      )}
                      {isSecondary(category) && (
                        <Badge variant="outline" className="text-xs">
                          Secondary
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {CATEGORY_DESCRIPTIONS[category]}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
