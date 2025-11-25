
import { ChainData } from '../components/ChainVisualization';

export function exportChainsToJSON(chains: ChainData[]) {
  const dataStr = JSON.stringify(chains, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `money-gpt-chains-${new Date().toISOString().slice(0, 10)}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function exportChainsToCSV(chains: ChainData[]) {
  if (chains.length === 0) return;

  // Define headers
  const headers = [
    'Chain ID',
    'Start Time',
    'End Time',
    'Prompt Count',
    'Growth Delta (M-Tier)',
    'Growth Delta (SAL)',
    'Growth Delta (Complexity)',
    'Loop Pattern',
    'Vow Event',
    'Theme Cluster',
    'Symbolic Role Drift',
    'Kairos/Chronos Ratio'
  ];

  // Map data to rows
  const rows = chains.map(chain => [
    chain.id,
    chain.start_timestamp,
    chain.end_timestamp,
    chain.prompt_count,
    chain.growth_delta?.mtier || 0,
    chain.growth_delta?.sal || 0,
    chain.growth_delta?.complexity || 0,
    chain.loop_pattern || '',
    chain.vow_event || '',
    (chain.theme_cluster || []).join('; '),
    chain.symbolic_role_drift || '',
    chain.kairos_chronos_ratio || 0
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csvContent);
  const exportFileDefaultName = `money-gpt-chains-${new Date().toISOString().slice(0, 10)}.csv`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}
