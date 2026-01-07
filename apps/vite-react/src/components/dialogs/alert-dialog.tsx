import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface AlertDialogProps {
  title: string;
  description: string;
  okText?: string;
  onClose: (result: boolean) => void;
  onCancel?: () => void;

  destructive: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export function AlertDialog({
  title,
  description,
  okText: confirmText = "확인",
  onClose,

  destructive,
  disabled = false,
  isLoading,
}: AlertDialogProps) {
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
