import { forwardRef, ButtonHTMLAttributes } from "react";

import { useDialogContext } from "../../context/DialogProvider";

const DialogClose = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function DialogClose(props, ref) {
  const { setOpen } = useDialogContext();
  return (
    <button type="button" {...props} ref={ref} onClick={() => setOpen(false)} />
  );
});

export default DialogClose;
