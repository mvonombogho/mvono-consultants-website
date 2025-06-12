"use client"

import { createContext, useContext, useState } from "react"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "./toast"

const ToastContext = createContext({
  toast: ({ title, description, variant }) => {},
})

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = ({ title, description, variant }) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, variant }])
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(id)
    }, 5000)
  }

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      <ToastProvider>
        {children}
        <ToastViewport>
          {toasts.map(({ id, title, description, variant }) => (
            <Toast key={id} variant={variant} onClose={() => dismissToast(id)}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              <ToastClose onClick={() => dismissToast(id)} />
            </Toast>
          ))}
        </ToastViewport>
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export const toast = ({ title, description, variant }) => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("toast function must be used within a ToastContextProvider")
  }
  return context.toast({ title, description, variant })
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastContextProvider")
  }
  return context
}
