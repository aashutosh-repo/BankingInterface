export async function tokenizeCard(card: {
  cardNumber: string;
  expiry: string;
  cvv: string;
}): Promise<{ token: string; last4: string; scheme: string; expiry: string }> {
  const res = await fetch('http://localhost:4000/tokenize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });
  return res.json();
}