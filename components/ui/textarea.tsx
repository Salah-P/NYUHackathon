import * as React from 'react'
import { CheckCircle, X, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.ComponentProps<'textarea'> {
  leftIcon?: LucideIcon
  helperText?: string
  errorMessage?: string
  isValid?: boolean
  maxLength?: number
  showCharacterCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className,
    leftIcon: LeftIcon,
    helperText,
    errorMessage,
    isValid,
    maxLength,
    showCharacterCount = true,
    disabled,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    
    // Use controlled value if provided, otherwise use internal state
    const isControlled = props.value !== undefined
    const [internalValue, setInternalValue] = React.useState(props.defaultValue || '')
    const value = isControlled ? props.value : internalValue
    const valueString = value?.toString() || ''

    const hasError = !!errorMessage
    const isInputValid = isValid === true && !hasError && valueString.length > 0
    const currentLength = valueString.length
    const shouldShowCount = showCharacterCount && maxLength && (currentLength > 0 || isFocused)

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      props.onChange?.(e)
    }

    return (
      <div className="relative w-full">
        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3 top-3 z-10">
              <LeftIcon className={cn(
                "h-4 w-4 transition-colors duration-200",
                hasError ? "text-red-500" : 
                isFocused ? "text-emerald-500" : "text-gray-400"
              )} />
            </div>
          )}
          
          <textarea
            ref={ref}
            data-slot="textarea"
            maxLength={maxLength}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={cn(
              // Base styles
              'flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs',
              'transition-all duration-200 outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray-400 disabled:bg-gray-50',
              'md:text-sm',
              
              // Padding adjustments for icons
              LeftIcon && 'pl-10',
              
              // Placeholder styles
              'placeholder:text-gray-500',
              
              // Border and focus states
              !hasError && !isInputValid && 'border-gray-300 dark:border-gray-600',
              isFocused && !hasError && 'border-emerald-500 ring-2 ring-emerald-500/20',
              hasError && 'border-red-500 ring-2 ring-red-500/20',
              isInputValid && !isFocused && !hasError && 'border-green-500',
              
              // Dark mode
              'dark:bg-input/30 dark:border-input',
              
              className,
            )}
            {...props}
            value={isControlled ? props.value : value}
          />
          
          {/* Validation indicators */}
          {(hasError || isInputValid) && (
            <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
              {hasError && (
                <X className="h-4 w-4 text-red-500" />
              )}
              {isInputValid && !hasError && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
          )}
        </div>
        
        {/* Helper text, error message and character count */}
        <div className="mt-1 flex justify-between items-start">
          <div className="flex-1">
            {hasError && (
              <p className="text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            )}
            {helperText && !hasError && (
              <p className="text-sm text-gray-500">
                {helperText}
              </p>
            )}
          </div>
          {shouldShowCount && (
            <p className={cn(
              "text-sm ml-2",
              hasError ? "text-red-500" : 
              currentLength > maxLength! * 0.9 ? "text-yellow-500" : "text-gray-400"
            )}>
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
