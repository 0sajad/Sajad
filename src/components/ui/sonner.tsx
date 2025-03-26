
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg data-[type=success]:group-[.toaster]:bg-gradient-to-r data-[type=success]:group-[.toaster]:from-green-500 data-[type=success]:group-[.toaster]:to-green-600 data-[type=success]:group-[.toaster]:text-white data-[type=error]:group-[.toaster]:bg-gradient-to-r data-[type=error]:group-[.toaster]:from-red-500 data-[type=error]:group-[.toaster]:to-red-600 data-[type=error]:group-[.toaster]:text-white toast-3d",
          description: "group-[.toast]:text-muted-foreground data-[type=success]:group-[.toast]:text-white/90 data-[type=error]:group-[.toast]:text-white/90",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          title: "text-base font-semibold data-[type=success]:group-[.toast]:text-white data-[type=error]:group-[.toast]:text-white",
          // The iconThumb property is causing the error, so let's remove it
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
