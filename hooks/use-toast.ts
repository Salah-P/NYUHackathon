'use client'

// Inspired by react-hot-toast library
import * as React from 'react'

import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'destructive'
  duration?: number
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string, duration?: number) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, duration || TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      // Clear timeout when dismissing
      if (toastId) {
        if (toastTimeouts.has(toastId)) {
          clearTimeout(toastTimeouts.get(toastId))
          toastTimeouts.delete(toastId)
        }
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          if (toastTimeouts.has(toast.id)) {
            clearTimeout(toastTimeouts.get(toast.id))
            toastTimeouts.delete(toast.id)
          }
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, 'id'>

function toast({ duration, variant, ...props }: Toast) {
  const id = genId()

  // Set auto-dismiss duration based on variant if not provided
  const getAutoDismissDuration = (variant?: string, customDuration?: number) => {
    if (customDuration !== undefined) return customDuration
    if (customDuration === 0) return undefined // Don't auto-dismiss
    
    switch (variant) {
      case 'success':
        return 3000 // 3 seconds
      case 'error':
        return undefined // Don't auto-dismiss errors (manual only)
      case 'warning':
        return 4000 // 4 seconds
      case 'info':
        return 3000 // 3 seconds
      default:
        return 4000 // 4 seconds default
    }
  }

  const autoDismissDuration = getAutoDismissDuration(variant, duration)

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })
  const dismiss = () => {
    // Clear any existing timeout
    if (toastTimeouts.has(id)) {
      clearTimeout(toastTimeouts.get(id))
      toastTimeouts.delete(id)
    }
    dispatch({ type: 'DISMISS_TOAST', toastId: id })
  }

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      variant,
      duration: autoDismissDuration,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // Set up auto-dismiss timer if duration is specified
  if (autoDismissDuration) {
    const timeout = setTimeout(() => {
      dismiss()
    }, autoDismissDuration)
    
    toastTimeouts.set(id, timeout)
  }

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
    success: (props: Omit<Toast, 'variant'>) => toast({ ...props, variant: 'success' }),
    error: (props: Omit<Toast, 'variant'>) => toast({ ...props, variant: 'error' }),
    warning: (props: Omit<Toast, 'variant'>) => toast({ ...props, variant: 'warning' }),
    info: (props: Omit<Toast, 'variant'>) => toast({ ...props, variant: 'info' }),
  }
}

// Convenience functions for different toast types
export const toastSuccess = (props: Omit<Toast, 'variant'>) => 
  toast({ ...props, variant: 'success' })

export const toastError = (props: Omit<Toast, 'variant'>) => 
  toast({ ...props, variant: 'error' })

export const toastWarning = (props: Omit<Toast, 'variant'>) => 
  toast({ ...props, variant: 'warning' })

export const toastInfo = (props: Omit<Toast, 'variant'>) => 
  toast({ ...props, variant: 'info' })

export { useToast, toast }
