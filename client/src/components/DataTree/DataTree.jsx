import { select, hierarchy, tree, linkHorizontal } from 'd3'
import { useEffect, useRef, useState } from 'react'
import useResize from '../../utils/useResize'

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const DataTree = ({ treeData, style }) => {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResize(wrapperRef)
  const previousData = usePrevious(treeData)
  useEffect(() => {
    const svg = select(svgRef.current)
    if (!dimensions) return

    console.log(dimensions)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const widthOffset = (width / 100) * 20
    // const heightOffset = (height / 100) * 10
    const root = hierarchy(treeData)

    //if time rework tree size to only max width: 70rem;
    const treeLayout = tree().size([height - 60, width - widthOffset])
    // .padding(2)
    const colors = [
      'black',
      'magenta',
      'lightseagreen',
      'orange',
      'mediumspringgreen',
      'lightsalmon',
    ]
    const linkGenerator = linkHorizontal()
      .source((link) => link.source)
      .target((link) => link.target)
      .x((node) => node.y + 10)
      .y((node) => node.x)

    treeLayout(root)

    // links
    // const enteringAndUpdatingLinks =
    svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('stroke-dasharray', function () {
        const length = this.getTotalLength()
        return `${length} ${length}`
      })
      .attr('stroke', 'midnightblue')
      .attr('fill', 'none')
      .attr('opacity', 1)
      .attr('stroke-dashoffset', function () {
        return this.getTotalLength()
      })
      .transition()
      .duration(500)
      .delay((link) => link.source.depth * 500)
      .attr('stroke-dashoffset', 0)
    //nodes
    // nodes
    svg
      .selectAll('.node')
      .data(root.descendants())
      .join((enter) => enter.append('circle').attr('opacity', 0))
      .attr('class', 'node')
      .attr('fill', (node) => colors[Math.min(node.depth, colors.length - 1)])
      // .attr('fill', (node) => (node.depth === 0 ? '#0bafc' : 'yellow'))
      .attr('cx', (node) => node.y + 10)
      .attr('cy', (node) => node.x)
      .attr('r', 4)
      .transition()
      .duration(500)
      .delay((node) => node.depth * 300)
      .attr('opacity', 1)

    // labels
    svg
      .selectAll('.label')
      .data(root.descendants())
      // .join((enter) => enter.append('text').attr('opacity', 0))
      .join('text')
      .attr('opacity', 0)
      .attr('class', 'label')
      .attr('x', (node) => node.y)
      .attr('y', (node) => node.x - 12)
      .attr('text-anchor', 'center')
      .attr('font-size', 'clamp(0.75rem, 1vw, 1.15rem)')
      .attr('font-weight', 'bold')
      .text((node) => node.data.name)
      .transition()
      .duration(500)
      .delay((node) => node.depth * 300)
      .attr('opacity', 1)
  }, [treeData, dimensions, previousData])

  return (
    <div
      ref={wrapperRef}
      style={{ marginBottom: '2rem' }}
      className={style.svgWrapper}
    >
      <svg ref={svgRef}></svg>
    </div>
  )
}
export default DataTree
