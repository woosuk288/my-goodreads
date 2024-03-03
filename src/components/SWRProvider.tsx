"use client";
import { SWRConfig, SWRConfiguration } from "swr";

interface Props {
  value?: SWRConfiguration | ((parentConfig?: SWRConfiguration | undefined) => SWRConfiguration) | undefined;
  children: React.ReactNode;
}

export const SWRProvider = ({ value, children }: Props) => {
  return <SWRConfig value={value}>{children}</SWRConfig>;
};
