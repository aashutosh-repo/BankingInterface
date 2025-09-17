// token-service.js
import express from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();
app.use(cors()); // allow frontend localhost calls
app.use(express.json());

app.post("/tokenize", (req, res) => {
  const { cardNumber, expiry, cvv } = req.body;

  if (!cardNumber) {
    return res.status(400).json({ error: "Card number required" });
  }

  // fake token generator
  const token = crypto
    .createHmac("sha256", "local-secret-key")
    .update(cardNumber)
    .digest("hex")
    .slice(0, 16);

  res.json({
    token,
    last4: cardNumber.slice(-4),
    scheme: detectScheme(cardNumber),
    expiry,
  });
});

function detectScheme(num) {
  if (num.startsWith("4")) return "VISA";
  if (num.startsWith("5")) return "MASTERCARD";
  if (num.startsWith("6")) return "RUPAY";
  return "UNKNOWN";
}

app.listen(4000, () => console.log("Mock Token Service running on :4000"));
