import axios from "axios";

const chainId = 11155111;
const username = "ef0fa188fdb74d849fad7ccaa1d1dcc3";
const password = "Ben3v543E6jmjsDljDe9yiFIdVkYaKvowRNAHtHeL7i5MnBcEssfBA";
console.log(username, password);
const basicAuth = "Basic " + btoa(username + ":" + password);

export const handleFetchGasData = async () => {
  try {
    const { data } = await axios.get(
      `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
      {
        headers: {
          Authorization: `${basicAuth}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Server responded with:", error);
  }
};
