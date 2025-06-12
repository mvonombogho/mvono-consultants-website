'use client';

import { useToast } from "../use-toast";

export const toast = (props) => {
  const { toast: toastFunction } = useToast();
  return toastFunction(props);
};

export { useToast } from "../use-toast";
