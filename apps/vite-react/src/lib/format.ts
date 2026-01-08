import { DATE_FORMAT } from "@/configs/format";
import dayjs from "dayjs";

export const formatDate = (date?: Date | null): string => {
  if (!date) {
    return "";
  }

  return dayjs(date).format(DATE_FORMAT);
};
