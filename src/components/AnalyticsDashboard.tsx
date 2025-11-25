
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PromptAnalysis } from '@/lib/types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line, PieChart, Pie, Legend } from 'recharts';
import { Brain, TrendUp, Lightning, CurrencyDollar } from '@phosphor-icons/react';

interface AnalyticsDashboardProps {
  history: PromptAnalysis[];
}

export function AnalyticsDashboard({ history }: AnalyticsDashboardProps) {
  const stats = useMemo(() => {
    if (!history.length) return null;

    const totalPrompts = history.length;
    const avgIceScore = history.reduce((acc, curr) => acc + curr.iceScore.overall, 0) / totalPrompts;
    const totalTokens = history.reduce((acc, curr) => acc + (curr.tokenCount || 0), 0);
    
    // Mock cost calculation (assuming mix of models, mostly Flash for savings)
    // GPT-4o cost would be ~$15/1M tokens. Flash is $0.35/1M.
    // Savings = (TotalTokens / 1M) * (15 - 0.35)
    const estimatedSavings = (totalTokens / 1000000) * (15 - 0.35);

    // Tier Distribution
    const tierCounts: Record<string, number> = {};
    history.forEach(h => {
      const tier = `Tier ${h.pieClassification.tier}`;
      tierCounts[tier] = (tierCounts[tier] || 0) + 1;
    });
    const tierData = Object.entries(tierCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Category Distribution
    const categoryCounts: Record<string, number> = {};
    history.forEach(h => {
      const cat = h.pieClassification.primaryCategory;
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    const categoryData = Object.entries(categoryCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5

    // Score Trend (Last 20)
    const trendData = [...history]
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(-20)
      .map(h => ({
        date: new Date(h.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        score: h.iceScore.overall
      }));

    return {
      totalPrompts,
      avgIceScore: Math.round(avgIceScore),
      totalTokens,
      estimatedSavings: estimatedSavings < 0.01 ? '< $0.01' : `$${estimatedSavings.toFixed(2)}`,
      tierData,
      categoryData,
      trendData
    };
  }, [history]);

  if (!history.length) {
    return (
      <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
        <TrendUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No data available for analytics</p>
        <p className="text-sm">Start analyzing prompts to see insights here</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPrompts}</div>
            <p className="text-xs text-muted-foreground">Lifetime prompts processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg ICE Score</CardTitle>
            <Lightning className="h-4 w-4 text-yellow-500" weight="fill" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgIceScore}</div>
            <p className="text-xs text-muted-foreground">/ 100 points</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Processed</CardTitle>
            <div className="h-4 w-4 text-muted-foreground font-mono text-xs">TXT</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTokens.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total input/output tokens</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Savings</CardTitle>
            <CurrencyDollar className="h-4 w-4 text-green-500" weight="fill" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.estimatedSavings}</div>
            <p className="text-xs text-muted-foreground">vs. GPT-4o pricing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Score Trend */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>ICE Scores over your last 20 analyses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.trendData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tier Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Tier Distribution</CardTitle>
            <CardDescription>Breakdown of prompt quality tiers</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.tierData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={60} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]}>
                  {stats.tierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.name === 'Tier 1' ? '#10b981' : 
                      entry.name === 'Tier 2' ? '#34d399' : 
                      entry.name === 'Tier 3' ? '#6ee7b7' : '#9ca3af'
                    } />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Most frequent prompt types</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[
                      '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'
                    ][index % 5]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
