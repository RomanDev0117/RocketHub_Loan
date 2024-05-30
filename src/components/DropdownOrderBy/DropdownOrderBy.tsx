import { TDropdownProps } from "../Dropdown/Dropdown";
import { SwitchButton } from "../SwitchButton/SwitchButton";
import styles from "./DropdownOrderBy.module.scss";
import { useCasesOptions } from "@/hooks/useCasesOptions";

type TProps = Omit<TDropdownProps<string>, "options">;

export const DropdownOrderBy = (props: TProps) => {
  const { sortOptions } = useCasesOptions();
  return (
    <SwitchButton
      prefix="Price:"
      placeholderTextClassName={styles.placeholder}
      options={sortOptions}
      {...props}
    />
  );
};
