import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TagFilter from '@/components/TagFilter'

describe('TagFilter', () => {
  it('renders nothing when tags array is empty', () => {
    const { container } = render(<TagFilter tags={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a link for each tag', () => {
    render(<TagFilter tags={['react', 'typescript']} />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveTextContent('react')
    expect(links[1]).toHaveTextContent('typescript')
  })

  it('inactive tag links to /blog?tag=<tag>', () => {
    render(<TagFilter tags={['react']} />)
    expect(screen.getByRole('link', { name: 'react' })).toHaveAttribute(
      'href',
      '/blog?tag=react'
    )
  })

  it('active tag links to /blog (deselect on click)', () => {
    render(<TagFilter tags={['react']} activeTag="react" />)
    expect(screen.getByRole('link', { name: 'react' })).toHaveAttribute(
      'href',
      '/blog'
    )
  })

  it('marks the active tag with aria-current="page"', () => {
    render(<TagFilter tags={['react', 'typescript']} activeTag="react" />)
    expect(screen.getByRole('link', { name: 'react' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('link', { name: 'typescript' })).not.toHaveAttribute(
      'aria-current'
    )
  })

  it('encodes special characters in tag hrefs', () => {
    render(<TagFilter tags={['c++']} />)
    expect(screen.getByRole('link', { name: 'c++' })).toHaveAttribute(
      'href',
      '/blog?tag=c%2B%2B'
    )
  })
})
