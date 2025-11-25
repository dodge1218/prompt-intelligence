import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function HistoryItemSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center gap-2 flex-wrap">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export function HistoryLoadingSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <HistoryItemSkeleton key={i} />
      ))}
    </div>
  )
}
