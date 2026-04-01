import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TagFilter from '@/components/TagFilter'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('TagFilter', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders nothing when tags array is empty', () => {
    const { container } = render(<TagFilter tags={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a button for each tag', () => {
    render(<TagFilter tags={['react', 'typescript', 'nextjs']} />)
    expect(screen.getByRole('button', { name: 'react' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'typescript' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'nextjs' })).toBeInTheDocument()
  })

  it('navigates to /blog?tag=<tag> when an inactive tag is clicked', async () => {
    render(<TagFilter tags={['react', 'typescript']} />)
    await userEvent.click(screen.getByRole('button', { name: 'react' }))
    expect(mockPush).toHaveBeenCalledWith('/blog?tag=react')
  })

  it('navigates to /blog when the active tag is clicked (deselect)', async () => {
    render(<TagFilter tags={['react', 'typescript']} activeTag="react" />)
    await userEvent.click(screen.getByRole('button', { name: 'react' }))
    expect(mockPush).toHaveBeenCalledWith('/blog')
  })

  it('marks the active tag button with aria-pressed=true', () => {
    render(<TagFilter tags={['react', 'typescript']} activeTag="react" />)
    expect(screen.getByRole('button', { name: 'react' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: 'typescript' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })
})
