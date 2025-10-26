import * as React from 'react'
import { CheckCircle, X, Eye, EyeOff, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  helperText?: string
  errorMessage?: string
  isValid?: boolean
  showPasswordToggle?: boolean
  maxLength?: number
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    helperText,
    errorMessage,
    isValid,
    showPasswordToggle = false,
    maxLength,
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    
    // Use controlled value if provided, otherwise use internal state
    const isControlled = props.value !== undefined
    const [internalValue, setInternalValue] = React.useState(props.defaultValue || '')
    const value = isControlled ? props.value : internalValue
    const valueString = value?.toString() || ''

    const inputType = showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type
    const hasError = !!errorMessage
    const isInputValid = isValid === true && !hasError && valueString.length > 0

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      props.onChange?.(e)
    }

    return (
      <div className="relative w-full">
        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <LeftIcon className={cn(
                "h-4 w-4 transition-colors duration-200",
                hasError ? "text-red-500" : 
                isFocused ? "text-primary" : "text-secondary"
              )} />
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            data-slot="input"
            maxLength={maxLength}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={cn(
              // Base styles
              'file:text-foreground selection:bg-primary selection:text-primary-foreground',
              'h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs',
              'transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray-400 disabled:bg-gray-50',
              'md:text-sm',
              
              // Padding adjustments for icons
              LeftIcon && 'pl-10',
              (RightIcon || showPasswordToggle || isInputValid || hasError) && 'pr-10',
              
              // Placeholder styles
              'placeholder:text-secondary',
              
              // Border and focus states
              !hasError && !isInputValid && 'border-secondary',
              isFocused && !hasError && 'border-primary ring-2 ring-primary/20',
              hasError && 'border-red-500 ring-2 ring-red-500/20',
              isInputValid && !isFocused && !hasError && 'border-green-500',
              
              // Dark mode
              'dark:bg-input/30 dark:border-input',
              
              className,
            )}
            {...props}
            value={isControlled ? props.value : value}
          />
          
          {/* Right side icons and indicators */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 flex items-center gap-1">
            {hasError && (
              <X className="h-4 w-4 text-red-500" />
            )}
            {isInputValid && !hasError && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
            {RightIcon && !showPasswordToggle && !hasError && !isInputValid && (
              <RightIcon className={cn(
                "h-4 w-4 transition-colors duration-200",
                isFocused ? "text-primary" : "text-secondary"
              )} />
            )}
          </div>
        </div>
        
        {/* Helper text and error message */}
        <div className="mt-1 flex justify-between items-start">
          <div className="flex-1">
            {hasError && (
              <p className="text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            )}
            {helperText && !hasError && (
              <p className="text-sm text-secondary">
                {helperText}
              </p>
            )}
          </div>
          {maxLength && (
            <p className={cn(
              "text-sm ml-2",
              hasError ? "text-red-500" : "text-secondary"
            )}>
              {valueString.length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
