import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MetaMaskProvider } from '@metamask/sdk-react';
// import { WagmiConfig, createConfig } from "wagmi";
// import { sepolia } from "wagmi/chains";
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";
// import "react-dotenv";

// Choose which chains you'd like to show
// const chains = [sepolia];

// wallet connection
// const config = createConfig(
//   getDefaultConfig({
//     // Required API Keys
//     alchemyId: "BFDjfhPlVALjtpAxZl4daU0yeum3uchm", // or infuraId
//      walletConnectProjectId: "2467485bc3ba11c0f2733c4cf5d62671",
//     chains,
//     // Required
//     appName: "connectkitdemo",
//   }),
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* <WagmiConfig config={config}> */}
     {/* <ConnectKitProvider> */}
    <MetaMaskProvider debug={false} sdkOptions={{
      checkInstallationImmediately: false,
      dappMetadata: {
        name: "GHOround",
        url: window.location.host,
      }
    }}>
      <App />
    </MetaMaskProvider>
    {/* </ConnectKitProvider> */}
    {/* </WagmiConfig> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
