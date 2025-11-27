import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Crown, LockKey, ShieldCheck, TrendUp, Lightning } from '@phosphor-icons/react'
import { checkout } from '@/lib/stripe'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface PaymentGateProps {
  isOpen: boolean
  onClose: () => void
  onPurchase?: (product: 'pie_audit') => void
}

export function PaymentGate({ isOpen, onClose, onPurchase }: PaymentGateProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, [isOpen]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handlePurchase = async () => {
    try {
      setLoading(true);
      
      if (!isAuthenticated) {
        toast.error('Please sign in to purchase');
        // You might want to trigger the auth modal here if you have access to it
        // For now, we'll just close this and let the user sign in
        onClose();
        // Ideally, we would open the AuthModal here. 
        // Since we can't easily pass that callback right now without prop drilling, 
        // we rely on the user to click "Sign In" in the header.
        // A better UX would be to have an onSignInRequest prop.
        return;
      }

      // If onPurchase prop is provided AND we are in dev mode (checked inside App.tsx usually), use it.
      // But for production, we want to force Stripe.
      // We'll assume if onPurchase is passed, it's for a valid reason (like dev bypass).
      if (onPurchase) {
        onPurchase('pie_audit');
        return;
      }

      // Otherwise proceed with Stripe checkout
      await checkout('pie_audit');
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-primary" weight="fill" />
                Unlock Full Analysis
              </DialogTitle>
              <DialogDescription className="text-base">
                You've discovered a prompt with potential. Now, get the professional intelligence you need to perfect it.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit">
                  <TrendUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Maximize Performance</h4>
                  <p className="text-sm text-muted-foreground">Get actionable suggestions to increase your ICE score and effectiveness.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit">
                  <LockKey className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Unlock Hidden Metrics</h4>
                  <p className="text-sm text-muted-foreground">Reveal the full PIE classification, exploitability risks, and cost analysis.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit">
                  <Lightning className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Instant ROI</h4>
                  <p className="text-sm text-muted-foreground">Stop guessing. Know exactly how to improve your prompt for production.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <Card className="border-2 border-primary shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                BEST VALUE
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">PIE Audit Report</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
                <CardDescription>Lifetime access to this analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" weight="fill" />
                    <span className="text-sm">Full ICE + PIE Scoring Breakdown</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" weight="fill" />
                    <span className="text-sm">Detailed Improvement Roadmap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" weight="fill" />
                    <span className="text-sm">Exportable PDF/JSON Report</span>
                  </li>
                </ul>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-semibold shadow-lg shadow-primary/20" 
                  onClick={handlePurchase}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : isAuthenticated ? 'Purchase Audit - $29' : 'Sign In to Purchase'}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure payment via Stripe</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
