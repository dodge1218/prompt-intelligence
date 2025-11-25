import { useEffect } from 'react'

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: {
    ctrl?: boolean
    meta?: boolean
    shift?: boolean
    alt?: boolean
  } = {}
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const ctrlOrMeta = options.ctrl || options.meta
      const matchesModifiers =
        (!ctrlOrMeta || (event.ctrlKey || event.metaKey)) &&
        (!options.shift || event.shiftKey) &&
        (!options.alt || event.altKey)

      if (matchesModifiers && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, callback, options])
}
