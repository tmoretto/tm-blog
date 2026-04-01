import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '@/components/ThemeToggle'

const matchMediaMock = vi.fn()

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })
})

describe('ThemeToggle', () => {
  it('renders a button with an accessible label', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/light mode|dark mode/i)
    )
  })

  it('initialises to light mode when no preference is stored', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('initialises to dark mode when localStorage says dark', () => {
    localStorage.setItem('theme', 'dark')
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('initialises to dark mode when system prefers dark and no stored value', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    render(<ThemeToggle />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles dark mode on click and persists to localStorage', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')

    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
