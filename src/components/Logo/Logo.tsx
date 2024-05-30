import { ImgHTMLAttributes } from "react";

export const Logo = (props: ImgHTMLAttributes<Element>) => {
  return <img src="/images/loans/loan_log.png" alt="loan logo" {...props} />;
};
