export function walletAddress(address) {
  let newStr = "";
  const firstPart = address.substring(0, 4);
  const endPart = address.substring(address.length - 4, address.length);
  newStr = firstPart + "****" + endPart;
  return newStr;
}
