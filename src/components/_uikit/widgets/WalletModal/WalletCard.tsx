import React from "react";
import Button from "../../components/Button/Button";
import { connectorLocalStorageKey } from "./config";
import { Login, Config } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  mb: string;
}
const isBlock = true;

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss }) => {
  const { title, icon: Icon } = walletConfig;
  return (
    <Button
      width="112px"
      height="112px"
      variant="contrast"
      scale="xst"
      onClick={() => {
        login(walletConfig.connectorId);
        window.localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
        onDismiss();
      }}
      style={{ justifyContent: "start" }}
      mb="12px"
      ml="6px"
      mr="6px"
      isBlock={isBlock}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
    <Icon width="48px" mt="12px" mb="12px" />
        {title}
    </Button>
  );
};

export default WalletCard;
