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

const DataTree = ({ data, style }) => {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResize(wrapperRef)
  const previousData = usePrevious(data)
  useEffect(() => {
    const svg = select(svgRef.current)
    if (!dimensions) return

    console.log(dimensions)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const widthOffset = (width / 100) * 20
    // const heightOffset = (height / 100) * 10
    const root = hierarchy(data)

    //if time rework tree size to only max width: 70rem;
    const treeLayout = tree().size([height, width - widthOffset])
    // .padding(2)

    const linkGenerator = linkHorizontal()
      .source((link) => link.source)
      .target((link) => link.target)
      .x((node) => node.y + 10)
      .y((node) => node.x)

    treeLayout(root)

    //nodes
    // nodes
    svg
      .selectAll('.node')
      .data(root.descendants())
      .join((enter) => enter.append('circle').attr('opacity', 0))
      .attr('class', 'node')
      .attr('cx', (node) => node.y + 10)
      .attr('cy', (node) => node.x)
      .attr('r', 4)
      .transition()
      .duration(500)
      .delay((node) => node.depth * 300)
      .attr('opacity', 1)

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
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('opacity', 1)
      .attr('stroke-dashoffset', function () {
        return this.getTotalLength()
      })
      .transition()
      .duration(500)
      .delay((link) => link.source.depth * 500)
      .attr('stroke-dashoffset', 0)

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
      .attr('font-size', 'clamp(0.75rem, 1.5vw, 1.25rem)')
      .attr('font-weight', 'bold')
      .text((node) => node.data.name)
      .transition()
      .duration(500)
      .delay((node) => node.depth * 300)
      .attr('opacity', 1)
  }, [data, dimensions, previousData])

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
