import { useDialog } from "@/hooks/use-dialog";
import { Button } from "./ui/button";
import { ConfirmDialog } from "./dialogs/confirm-dialog";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth";

export default function SignOutButton({
  onConfirm,
  disabled,
  isLoading,
}: {
  onConfirm?: () => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  const { openDialog } = useDialog();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuthStore();

  const handleSignOut = async () => {
    auth.reset();
    // Preserve current location for redirect after sign-in
    const currentPath = location.href;

    await onConfirm?.();

    navigate({
      to: "/sign-in",
      search: { redirect: currentPath },
      replace: true,
    });
  };

  const handleConfirm = async () => {
    const result = await openDialog(ConfirmDialog, {
      title: "로그아웃",
      description: "로그아웃 하시겠습니까?",
      destructive: true,
      className: "sm:max-w-sm",
    });

    if (result) {
      handleSignOut();
    }
  };

  return (
    <>
      <Button variant="default" onClick={handleConfirm} disabled={disabled || isLoading}>
        로그아웃
      </Button>
    </>
  );
}
