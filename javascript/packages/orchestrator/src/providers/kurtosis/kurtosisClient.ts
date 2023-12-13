import { DEFAULT_DATA_DIR, DEFAULT_REMOTE_DIR } from "../../constants";
import { fileMap } from "../../types";
import {
  Client,
  RunCommandOptions,
  RunCommandResponse,
  setClient,
} from "../client";

export function initClient(
  configPath: string,
  namespace: string,
  tmpDir: string,
): KurtosisClient {
  const client = new KurtosisClient(configPath, namespace, tmpDir);
  setClient(client);
  return client;
}

export class KurtosisClient extends Client {
  namespace: string;
  chainId?: string;
  configPath: string;
  debug: boolean;
  timeout: number;
  tmpDir: string;
  localMagicFilepath: string;
  remoteDir: string;
  dataDir: string;

  constructor(configPath: string, namespace: string, tmpDir: string) {
    super(configPath, namespace, tmpDir, "kurtosis", "kurtosis");
    this.configPath = configPath;
    this.namespace = namespace;
    this.debug = true;
    this.timeout = 30; // secs
    this.tmpDir = tmpDir;
    this.localMagicFilepath = `${tmpDir}/finished.txt`;
    this.remoteDir = DEFAULT_REMOTE_DIR;
    this.dataDir = DEFAULT_DATA_DIR;
  }

  createNamespace(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  staticSetup(settings: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  destroyNamespace(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getNodeLogs(
    podName: string,
    since?: number | undefined,
    withTimestamp?: boolean | undefined,
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
  dumpLogs(path: string, podName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  upsertCronJob(minutes: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  startPortForwarding(
    port: number,
    identifier: string,
    namespace?: string | undefined,
  ): Promise<number> {
    throw new Error("Method not implemented.");
  }
  runCommand(
    args: string[],
    opts?: RunCommandOptions | undefined,
  ): Promise<RunCommandResponse> {
    throw new Error("Method not implemented.");
  }
  runScript(
    identifier: string,
    scriptPath: string,
    args: string[],
  ): Promise<RunCommandResponse> {
    throw new Error("Method not implemented.");
  }
  spawnFromDef(
    podDef: any,
    filesToCopy?: fileMap[] | undefined,
    keystore?: string | undefined,
    chainSpecId?: string | undefined,
    dbSnapshot?: string | undefined,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  copyFileFromPod(
    identifier: string,
    podFilePath: string,
    localFilePath: string,
    container?: string | undefined,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  putLocalMagicFile(
    name: string,
    container?: string | undefined,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createResource(
    resourseDef: any,
    scoped: boolean,
    waitReady: boolean,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createPodMonitor(filename: string, chain: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  setupCleaner(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  isPodMonitorAvailable(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getPauseArgs(name: string): string[] {
    throw new Error("Method not implemented.");
  }
  getResumeArgs(name: string): string[] {
    throw new Error("Method not implemented.");
  }
  restartNode(name: string, timeout: number | null): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getNodeInfo(
    identifier: string,
    port?: number | undefined,
  ): Promise<[string, number]> {
    throw new Error("Method not implemented.");
  }
  getNodeIP(identifier: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  spawnIntrospector(wsUri: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  validateAccess(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getLogsCommand(name: string): string {
    throw new Error("Method not implemented.");
  }
  injectChaos(chaosSpecs: any[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
