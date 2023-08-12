import { toast } from "react-toastify";

export const types = {
  SUCCESS: "success",
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
};

export const notify = (type, message) => {
  if (type === types.SUCCESS)
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  if (type === types.ERROR)
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  if (type === types.WARN)
    toast.warn(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  if (type === types.INFO)
    toast.info(message, {
      position: toast.POSITION.TOP_CENTER,
    });
};
