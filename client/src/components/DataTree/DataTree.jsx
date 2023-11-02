import { select, hierarchy, tree, linkHorizontal, link } from 'd3'
import { useEffect, useRef } from 'react'
import useResize from '../../utils/useResize'

const data = {
  name: 'Lose Weight', // GOAL
  children: [
    {
      name: 'Eat 2 Healthy meals/day', // Measurable
      children: [
        { name: 'Grocery shopping 1/week' }, // TASK
        { name: 'Meal prep for 5+ days of lunches' },
        { name: 'Try a new recipe 2/week' },
      ],
    },
    {
      name: 'Exercise 3x/week',
      children: [
        { name: 'Get a gym membership' },
        { name: 'Set a workout plan for the week' },
        { name: 'Laundry 1/week' },
      ],
    },
    {
      name: 'Sleep 8 hours/night',
      children: [
        { name: 'Set a bedtime alarm' },
        { name: 'No screens 1 hour before bed' },
        { name: 'Hot shower no less than 2hrs before bed' },
      ],
    },
  ],
}

const DataTree = ({ data }) => {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResize(wrapperRef)
  useEffect(() => {
    const svg = select(svgRef.current)
    if (!dimensions) return

    const root = hierarchy(data)
    const treeLayout = tree().size([dimensions.height, dimensions.width])
    treeLayout(root)

    const linkGenerator = linkHorizontal()
      .source((link) => link.source)
      .target((link) => link.target)
      .x((node) => node.y)
      .y((node) => node.x)

    //nodes
    svg
      .selectAll('.node')
      .data(root.descendants())
      .join('circle')
      .attr('class', 'node')
      .attr('r', 4)
      .attr('fill', 'black')
      .attr('cx', (node) => node.y)
      .attr('cy', (node) => node.x)
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay((node) => node.depth * 500)
      .attr('opacity', 1)

    //links
    svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', linkGenerator)
      .attr('stroke-dasharray', function () {
        const length = this.getTotalLength()
        return `${length} ${length}`
      })
      .attr('stroke-dashoffset', function () {
        const length = this.getTotalLength()
        return length
      })
      .transition()
      .duration(500)
      .delay((linkObj) => linkObj.source.depth * 500)
      .attr('stroke-dashoffset', 0)

    //labels
    svg
      .selectAll('.label')
      .data(root.descendants())
      .join('text')
      .attr('class', 'label')
      .text((node) => node.data.name)
      .attr('text-anchor', 'middle')
      .attr('font-size', 24)
      .attr('x', (node) => node.y)
      .attr('y', (node) => node.x - 12)
  }, [data, dimensions])
  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef}></svg>
    </div>
  )
}
export default DataTree
