import { Tooltip as ChakraTooltip, Portal , PopoverTriggerProps} from "@chakra-ui/react"
import * as React from "react"

export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  content: React.ReactNode
  contentProps?: ChakraTooltip.ContentProps
  disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      portalRef,
      ...rest
    } = props

if (disabled) return children

return (
  <>
    {children}
    <ChakraTooltip.Root {...rest}>
        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Content ref={ref} {...contentProps}>
            {showArrow && (
              <>
                <ChakraTooltip.Arrow />
                <ChakraTooltip.ArrowTip />
              </>
            )}
            {content}
          </ChakraTooltip.Content>
        </Portal>
      </ChakraTooltip.Root>
    </>
    )
  },
)
