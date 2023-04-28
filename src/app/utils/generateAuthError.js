function generateAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Invalid password";

    case "EMAIL_NOT_FOUND":
      return "Email address not found";

    case "EMAIL_EXISTS":
      return "An account with this email already exists";

    case "BAD_EMAIL_OR_PASSWORD":
      return "Invalid email or password";

    case "WALLET_NOT_FOUND":
      return "Wallet address not found";

    case "WALLET_EXISTS":
      return "An account with this wallet already exists";

    case "BAD_SIGNATURE":
      return "Failed to verify wallet signature";
    default:
      return "Something's wrong, try again later";
  }
}

export default generateAuthError;
