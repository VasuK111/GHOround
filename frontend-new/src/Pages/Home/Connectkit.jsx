import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import Home from "./index.jsx";
import MyComponent from "./MyComponent.jsx";

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID, 
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

    appName: "GHOround",

  }),
);

const ConnectWallet = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <MyComponent/>
        <Home/>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default ConnectWallet;