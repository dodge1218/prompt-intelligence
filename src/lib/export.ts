import type { PromptAnalysis } from './types'

export function exportToJSON(analyses: PromptAnalysis[]): void {
  const dataStr = JSON.stringify(analyses, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  downloadFile(dataBlob, `pie-analyses-${Date.now()}.json`)
}

export function exportToCSV(analyses: PromptAnalysis[]): void {
  const headers = [
    'ID',
    'Timestamp',
    'Date',
    'Prompt',
    'Token Count',
    'ICE Overall',
    'ICE Idea',
    'ICE Cost',
    'ICE Exploitability',
    'PIE Tier',
    'Primary Category',
    'Secondary Categories',
    'Reasoning',
    'Suggestions'
  ]

  const rows = analyses.map((analysis) => [
    analysis.id,
    analysis.timestamp.toString(),
    new Date(analysis.timestamp).toISOString(),
    `"${analysis.prompt.replace(/"/g, '""')}"`,
    analysis.tokenCount.toString(),
    analysis.iceScore.overall.toString(),
    analysis.iceScore.idea.toString(),
    analysis.iceScore.cost.toString(),
    analysis.iceScore.exploitability.toString(),
    analysis.pieClassification.tier.toString(),
    analysis.pieClassification.primaryCategory,
    `"${analysis.pieClassification.secondaryCategories.join(', ')}"`,
    `"${analysis.pieClassification.reasoning.replace(/"/g, '""')}"`,
    `"${(analysis.suggestions || []).join('; ').replace(/"/g, '""')}"`
  ])

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  downloadFile(dataBlob, `pie-analyses-${Date.now()}.csv`)
}

export function exportSingleAnalysisToJSON(analysis: PromptAnalysis): void {
  const dataStr = JSON.stringify(analysis, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  downloadFile(dataBlob, `pie-analysis-${analysis.id}.json`)
}

export function exportSingleAnalysisToCSV(analysis: PromptAnalysis): void {
  exportToCSV([analysis])
}

function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
