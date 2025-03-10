import {
  ReactNode,
  forwardRef,
  HTMLProps,
  isValidElement,
  cloneElement,
  ReactElement,
} from "react";
import { useMergeRefs } from "@floating-ui/react";

import { useDialogContext } from "../../context/DialogProvider";

interface DialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

const DialogTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & DialogTriggerProps
>(function DialogTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useDialogContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref;

  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    const element = children as ReactElement<Record<string, unknown>>;

    const mergedProps = {
      ref,
      ...props,
      ...element.props,
      "data-state": context.open ? "open" : "closed",
    } as const;

    return cloneElement(element, context.getReferenceProps(mergedProps));
  }

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

export default DialogTrigger;
