import React from "react";
import styled from "styled-components";
import { Modal } from "../Modal";
import WalletCard from "./WalletCard";
import config from "./config";
import { Login } from "./types";

interface Props {
  login: Login;
  onDismiss?: () => void;
}

const CardContainer = styled.div`
  max-width: 496px;
  width: 100%;
  max-height: 237px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    li {
      list-style: none;
      flex: 0 0 23%;
    }
  }
`;

const helperLink ="https://docs.pancakeswap.finance/get-started/connection-guide";
const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => (
  <Modal title="Connect to a wallet" onDismiss={onDismiss} helperLink={helperLink}>
    <CardContainer>
      <ul>
        {config.map((entry, index) => (
          <li>
            <WalletCard
              key={entry.title}
              login={login}
              walletConfig={entry}
              onDismiss={onDismiss}
              mb={index < config.length - 1 ? "8px" : "0"}
            />
          </li>
        ))}
      </ul>
    </CardContainer>
  </Modal>
);

export default ConnectModal;
