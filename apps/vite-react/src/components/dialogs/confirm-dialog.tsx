import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onClose: (result: boolean) => void;
  onCancel?: () => void;

  destructive?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onClose,
  onCancel,

  destructive,
  disabled = false,
  isLoading,
}: ConfirmDialogProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose
          render={
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                onCancel?.();
                onClose(false);
              }}
            >
              {cancelText}
            </Button>
          }
        />
        <DialogClose
          render={
            <Button
              variant={destructive ? "destructive" : "default"}
              disabled={disabled || isLoading}
              onClick={() => onClose(true)}
            >
              {confirmText}
            </Button>
          }
        />
      </DialogFooter>
    </>
  );
}
