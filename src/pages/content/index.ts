switch (new URL(document.baseURI).hostname) {
  case "wallet.near.org":
    import("./components/explorers/near-wallet");
    break;
  default:
    break;
}
