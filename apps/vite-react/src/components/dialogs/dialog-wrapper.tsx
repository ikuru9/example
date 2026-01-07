import { useDialog } from "@/hooks/use-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export function DialogWrapper() {
  const { component: Component, props: _props, open, closeDialog, cancelDialog } = useDialog();

  if (!Component || !open) {
    return null;
  }

  const props = useCallback(() => {
    const { className: _, ...props } = _props;
    return props;
  }, [_props]);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && cancelDialog()}>
      <DialogContent className={cn(_props.className && _props.className)}>
        <Component {...props} onClose={closeDialog} onCancel={cancelDialog} />
      </DialogContent>
    </Dialog>
  );
}
