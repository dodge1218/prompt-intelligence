import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, CurrencyDollar, Crown, Lightning } from '@phosphor-icons/react'
import { checkout } from '@/lib/stripe'
import { toast } from 'sonner'
import { useState } from 'react'

interface PaymentGateProps {
  isOpen: boolean
  onClose: () => void
  onPurchase?: (tier: 'basic' | 'pro' | 'enterprise') => void
}

export function PaymentGate({ isOpen, onClose, onPurchase }: PaymentGateProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (tier: 'basic' | 'pro' | 'enterprise') => {
    try {
      setLoading(tier);
      
      // If onPurchase prop is provided (e.g. for dev mode bypass), use it
      if (onPurchase) {
        onPurchase(tier);
        return;
      }

      // Otherwise proceed with Stripe checkout
      await checkout(tier);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-3">
            <CurrencyDollar className="w-8 h-8 text-primary" weight="duotone" />
            Unlock Premium Analysis
          </DialogTitle>
          <DialogDescription className="text-base">
            Get AI-powered prompt intelligence with ICE + PIE scoring
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-3 mt-6">
          <Card className="border-2 border-border hover:border-muted-foreground/30 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl">Basic</CardTitle>
                <Badge variant="outline">Starter</Badge>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>Perfect for trying out Money GPT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <span className="text-sm">50 analyses per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <span className="text-sm">ICE + PIE scoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <span className="text-sm">Basic suggestions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <span className="text-sm">History access</span>
                </li>
              </ul>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handlePurchase('basic')}
                disabled={!!loading}
              >
                {loading === 'basic' ? 'Processing...' : 'Select Basic'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary shadow-lg scale-105">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl">Pro</CardTitle>
                <Badge className="bg-primary text-primary-foreground">
                  <Lightning className="w-3 h-3 mr-1" weight="fill" />
                  Popular
                </Badge>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>For serious prompt engineers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <span className="text-sm font-semibold">500 analyses per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <span className="text-sm">Advanced scoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <span className="text-sm">Priority suggestions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <span className="text-sm">Export to CSV/JSON</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" weight="fill" />
                  <span className="text-sm">API access</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                onClick={() => handlePurchase('pro')}
                disabled={!!loading}
              >
                {loading === 'pro' ? 'Processing...' : 'Select Pro'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary hover:border-secondary/70 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <Badge className="bg-secondary text-secondary-foreground">
                  <Crown className="w-3 h-3 mr-1" weight="fill" />
                  Ultimate
                </Badge>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>Unlimited power for teams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" weight="fill" />
                  <span className="text-sm font-semibold">Unlimited analyses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" weight="fill" />
                  <span className="text-sm">Custom model training</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" weight="fill" />
                  <span className="text-sm">Team collaboration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" weight="fill" />
                  <span className="text-sm">White-label options</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" weight="fill" />
                  <span className="text-sm">Dedicated support</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90" 
                onClick={() => handlePurchase('enterprise')}
                disabled={!!loading}
              >
                {loading === 'enterprise' ? 'Processing...' : 'Select Enterprise'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            All plans include data persistence, cross-device access, and continuous model improvements
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
