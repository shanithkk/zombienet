import { KurtosisContext, StarlarkRunConfig } from "kurtosis-sdk";
import { getKurtosisConfig } from "./conversion";
import { KurtosisClient, initClient } from "./kurtosisClient";

export const provider = {
  KurtosisRun,
  getKurtosisConfig,
  initClient,
};

async function KurtosisRun(param: string) {
  const newKurtosisContextResult =
    await KurtosisContext.newKurtosisContextFromLocalEngine();
  if (newKurtosisContextResult.isErr()) {
    console.log(newKurtosisContextResult.error);
  }

  const starlarkRunConfig = new StarlarkRunConfig(
    StarlarkRunConfig.WithRelativePathToMainFile("./main.star"),
    StarlarkRunConfig.WithDryRun(false),
    StarlarkRunConfig.WithMainFunctionName("run"),
    StarlarkRunConfig.WithSerializedParams(param),
  );
  const kurtosisContext = newKurtosisContextResult.match(
    async (sdk) => {
      const enclaveName = "kurtosis";
      let enclave = await sdk.createEnclave(enclaveName);
      enclave.mapErr((w) => console.log("error"));
      const result = await enclave
        ._unsafeUnwrap()
        .runStarlarkRemotePackage(
          "github.com/shanithkk/polkadot-kurtosis-package",
          starlarkRunConfig,
        );
      console.log(result);
    },
    async (error) => console.log("Error: " + error),
  );
}
