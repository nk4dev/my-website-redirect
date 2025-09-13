"use client"
import { Toaster as ChakraToaster, Portal, Spinner, Stack, Toast, createToaster, type ToasterProps } from '@chakra-ui/react'; // ToasterProps型をインポート

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})
const toasterProps: ToasterProps = {
   toaster: toaster,
   insetInline: { mdDown: '4' },
   children: (toast) => (
     <Toast.Root width={{ md: 'sm' }}>
       {toast.type === 'loading' ? <Spinner size="sm" color="blue.solid" /> : <Toast.Indicator />}
       <Stack gap="1" flex="1" maxWidth="100%">
         {toast.title && <Toast.Title />}
         {toast.description && <Toast.Description />}
       </Stack>
       {toast.action && <Toast.ActionTrigger />}
       {toast.meta?.closable && <Toast.CloseTrigger />}
     </Toast.Root>
   ),
 };
export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster {...toasterProps} />
    </Portal>
  )
}
