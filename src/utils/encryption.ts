import buffer from "buffer";
import Crypto from "crypto";

exports.audioAes256CbcDecryption = async function (
  valueToBeDecrypted,
  encryptionKey,
  encrytionIV
) {
  // Encode valueToBeDecrypted Value to BASE64
  const buffDecryptValue = buffer.Buffer.from(valueToBeDecrypted, "base64");
  const buffKeyValue = buffer.Buffer.from(encryptionKey, "base64");
  const buffIVValue = buffer.Buffer.from(encrytionIV, "base64");

  // AES-256-CBC Mode Decryption to String
  const decipher = Crypto.createDecipheriv(
    "aes-256-cbc",
    buffKeyValue,
    buffIVValue
  );
  let encrypted = decipher.update(buffDecryptValue, "base64", "utf8");
  encrypted += decipher.final();

  return encrypted.toString();
};

exports.audioPassword = async function (reqPassword) {
  // Encode Payload to Hex
  const BuffEncryptedInput = buffer.Buffer.from(reqPassword, "base64");
  const hexEncryptedInput = BuffEncryptedInput.toString("hex");
  // Extract Checksum String
  const EncryptedInputCheckSum = hexEncryptedInput.substr(
    hexEncryptedInput.length - 64,
    64
  );
  // Extract Payload
  const hexEncryptedPayload = hexEncryptedInput.substr(
    0,
    hexEncryptedInput.length - EncryptedInputCheckSum.length
  );
  // Encode Salt Value to Hex
  const EncryptedSalt = buffer.Buffer.from("DigitalLabMSRS", "utf-8");
  const hexEncryptedSalt = EncryptedSalt.toString("hex");
  // Combine Hex Payload with Hex Salt
  const HexPayloadWithSalt = hexEncryptedPayload + hexEncryptedSalt;
  // Hash Hex Payload with Salt
  const PayloadSha = Crypto.createHash("Sha256")
    .update(HexPayloadWithSalt)
    .digest("hex");

  // Compare Checksum String with Hash Hex Payload with Salt
  if (PayloadSha === EncryptedInputCheckSum) {
    // Convert PayloadIV to Base64 IV
    const PayloadIV = hexEncryptedPayload.substr(0, 32);
    const BuffIV = buffer.Buffer.from(PayloadIV, "hex");
    const Base64IV = BuffIV.toString("base64");
    // Convert PayloadValue to Base64 Value
    const PayLoadValue = hexEncryptedPayload.substr(
      32,
      hexEncryptedPayload.length - 32 - 64
    );
    const BuffValue = buffer.Buffer.from(PayLoadValue, "hex");
    const Base64Value = BuffValue.toString("base64");
    // Convert PayloadKey to Base64 Key
    const PayloadKey = hexEncryptedPayload.substr(
      PayloadIV.length + PayLoadValue.length,
      64
    );
    const BuffKey = buffer.Buffer.from(PayloadKey, "hex");
    const Base64Key = BuffKey.toString("base64");
    return {
      encrytionIV: Base64IV,
      encryptionKey: Base64Key,
      valueToBeDecrypted: Base64Value,
    };
  }
  return undefined;
};
