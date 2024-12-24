import { toast, ToastContent, ToastOptions } from "react-toastify";

const TOAST_DURATION = 3500;

export const promiseToast = (
  initialContent: ToastContent,
  initialOptions?: ToastOptions,
) => {
  const toastId = toast.loading(initialContent, initialOptions);

  const triggerSuccessToast = (
    content: ToastContent,
    options?: ToastOptions,
  ) => {
    toast.update(toastId, {
      render: content,
      type: "success",
      isLoading: false,
      autoClose: TOAST_DURATION,
      ...options,
    });
  };

  const triggerErrorToast = (content: ToastContent, options?: ToastOptions) => {
    toast.update(toastId, {
      render: content,
      type: "error",
      isLoading: false,
      autoClose: TOAST_DURATION,
      ...options,
    });
  };

  return { triggerSuccessToast, triggerErrorToast };
};
