import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LockSimple } from '@phosphor-icons/react'

interface LockedContentProps {
  children: ReactNode
  isLocked: boolean
  onUnlock: () => void
}

export function LockedContent({ children, isLocked, onUnlock }: LockedContentProps) {
  if (!isLocked) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      <div className="filter blur-xl opacity-30 pointer-events-none select-none">
        {children}
      </div>
      <Card className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm border-2 border-accent/50">
        <CardContent className="text-center space-y-4 p-8">
          <div className="flex justify-center">
            <div className="p-4 bg-accent/20 rounded-full">
              <LockSimple className="w-12 h-12 text-accent" weight="duotone" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Premium Analysis Locked</h3>
            <p className="text-muted-foreground max-w-md">
              Upgrade to view detailed ICE scores, PIE classification, and actionable suggestions
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={onUnlock}
          >
            <LockSimple className="w-5 h-5 mr-2" weight="fill" />
            Unlock Premium Features
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
