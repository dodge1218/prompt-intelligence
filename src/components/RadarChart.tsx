import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import type { ICEScore } from '@/lib/types'

interface RadarChartProps {
  score: ICEScore
  size?: number
}

export function RadarChart({ score, size = 200 }: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = 20
    const width = size
    const height = size
    const radius = Math.min(width, height) / 2 - margin

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)

    const data = [
      { axis: 'Idea', value: score.idea },
      { axis: 'Cost', value: score.cost },
      { axis: 'Exploitability', value: score.exploitability },
    ]

    const angleSlice = (Math.PI * 2) / data.length

    const rScale = d3.scaleLinear().range([0, radius]).domain([0, 100])

    const levels = 5
    for (let i = 0; i < levels; i++) {
      const levelFactor = radius * ((i + 1) / levels)
      g.append('circle')
        .attr('r', levelFactor)
        .style('fill', 'none')
        .style('stroke', 'oklch(0.30 0.02 270)')
        .style('stroke-width', '0.5px')
        .style('stroke-opacity', 0.5)
    }

    const axes = g.selectAll('.axis').data(data).enter().append('g').attr('class', 'axis')

    axes
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
      .style('stroke', 'oklch(0.30 0.02 270)')
      .style('stroke-width', '1px')

    axes
      .append('text')
      .attr('class', 'legend')
      .style('font-size', '12px')
      .style('fill', 'oklch(0.95 0.02 200)')
      .style('font-weight', '600')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', (d, i) => (rScale(100) + 15) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (d, i) => (rScale(100) + 15) * Math.sin(angleSlice * i - Math.PI / 2))
      .text((d) => d.axis)

    const radarLine = d3
      .lineRadial<{ axis: string; value: number }>()
      .radius((d) => rScale(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed)

    g.append('path')
      .datum(data)
      .attr('d', radarLine)
      .style('fill', 'oklch(0.80 0.15 195)')
      .style('fill-opacity', 0.3)
      .style('stroke', 'oklch(0.80 0.15 195)')
      .style('stroke-width', '2px')

    g.selectAll('.radarCircle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .style('fill', 'oklch(0.80 0.15 195)')
      .style('stroke', 'oklch(0.15 0.02 270)')
      .style('stroke-width', '2px')
  }, [score, size])

  return <svg ref={svgRef} width={size} height={size} />
}
