import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CodeBlock from '@/components/CodeBlock'

describe('CodeBlock', () => {
  const html = '<pre><code>const x = 1</code></pre>'
  const code = 'const x = 1'

  it('renders highlighted HTML', () => {
    const { container } = render(<CodeBlock html={html} code={code} />)
    expect(container.querySelector('pre')).toBeInTheDocument()
    expect(container.querySelector('code')?.textContent).toBe('const x = 1')
  })

  it('shows a copy button', () => {
    render(<CodeBlock html={html} code={code} />)
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
  })

  it('copies code to clipboard and shows confirmation', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    render(<CodeBlock html={html} code={code} />)
    const btn = screen.getByRole('button', { name: /copy/i })
    await userEvent.click(btn)

    expect(writeText).toHaveBeenCalledWith(code)
    expect(await screen.findByText('Copied!')).toBeInTheDocument()
  })

  it('copy button has accessible label', () => {
    render(<CodeBlock html={html} code={code} />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-label')
  })
})
