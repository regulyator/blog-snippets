import { encrypt } from "npm:octagonal-wheels@0.1.30/encryption/encryption";

const uri_passphrase = Deno.env.get("uri_passphrase") ?? crypto.randomUUID();
const URIBASE = "obsidian://setuplivesync?settings=";

async function main() {
  const conf = {
    couchDB_URI: Deno.env.get("hostname"),
    couchDB_USER: Deno.env.get("username"),
    couchDB_PASSWORD: Deno.env.get("password"),
    couchDB_DBNAME: Deno.env.get("database"),
    syncOnStart: true,
    gcDelay: 0,
    periodicReplication: true,
    syncOnFileOpen: true,
    encrypt: true,
    passphrase: Deno.env.get("passphrase"),
    usePathObfuscation: true,
    batchSave: true,
    batch_size: 50,
    batches_limit: 50,
    useHistory: true,
    disableRequestURI: true,
    customChunkSize: 50,
    syncAfterMerge: false,
    concurrencyOfReadChunksOnline: 100,
    minimumIntervalOfReadChunksOnline: 100,
    handleFilenameCaseSensitive: false,
    doNotUseFixedRevisionForChunks: false,
    settingVersion: 10,
    notifyThresholdOfRemoteStorageSize: 800,
  };

  const encryptedConf = encodeURIComponent(
    await encrypt(JSON.stringify(conf), uri_passphrase, false),
  );

  console.log("\nYour passphrase of Setup-URI is:", uri_passphrase);
  console.log("This passphrase is never shown again, so please note it in a safe place.");
  console.log(`${URIBASE}${encryptedConf}`);
}

await main();
