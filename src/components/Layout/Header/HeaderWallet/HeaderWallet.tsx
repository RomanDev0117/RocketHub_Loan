import { Button } from "@/components/Button/Button";
import { WalletIcon } from "@/components/icons/WalletIcon";
import styles from "./HeaderWallet.module.scss";
import { T } from "@/i18n/translate";
import { useWalletPopup } from "@/hooks/useWalletPopup";
import { useIsMobileHeader } from "@/hooks/useMediaHooks";
import {
  closeNotifications,
  collapseSidebar,
} from "@/store/actions/appActions";
import { HeaderVault } from "../HeaderVault/HeaderVault";
import { useState } from "react";

export const HeaderWallet = () => {
  const { openWallet } = useWalletPopup();
  const [vaultVisible, setVaultVisible] = useState(false);
  const isMobileHeader = useIsMobileHeader();

  // const handleWalletContainerClick = () => {
  //   if (isMobileHeader) {
  //     handleWalletClick();
  //   }
  // };

  const handleWalletClick = () => {
    openWallet();

    if (isMobileHeader) {
      collapseSidebar();
      closeNotifications();
    }
  };

  return (
    <div
      className={styles.walletContainer}
      // onClick={handleWalletContainerClick}
    >
      <div
        className={styles.balanceContainer}
        onMouseEnter={() => setVaultVisible(true)}
        onMouseLeave={() => setVaultVisible(false)}
      >
        <HeaderVault visible={vaultVisible} />
      </div>
      <Button
        size="s"
        prepend={<WalletIcon />}
        onClick={handleWalletClick}
        pressable
        className={styles.walletButton}
      >
        {!isMobileHeader && <T id="common.Wallet" defaultMessage="Wallet" />}
      </Button>
    </div>
  );
};
