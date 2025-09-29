// src/utils/settlement.js

// Round to 2 decimal places
export function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Calculate balances for each member.
 * - Positive = this member should receive money
 * - Negative = this member owes money
 */
export function calculateBalances(members, expenses, settlements = []) {
  const net = {};

  // Start everyone at 0
  members.forEach((m) => (net[m.id] = 0));

  // Go through each expense
  expenses.forEach((e) => {
    const share = e.participants.length ? e.amount / e.participants.length : 0;

    // Person who paid gets full credit
    net[e.paidBy] += e.amount;

    // Each participant owes their share
    e.participants.forEach((pid) => {
      net[pid] -= share;
    });
  });

  // Apply settlements (manual payments between members)
  settlements.forEach((s) => {
    const amt = Number(s.amount) || 0;
    // FromMember pays → they move closer to 0
    net[s.fromMember] += amt;
    // ToMember receives → they move closer to 0
    net[s.toMember] -= amt;
  });

  return net;
}

/**
 * Suggest who should pay whom (debt simplification)
 * Using a greedy algorithm:
 * - Match biggest debtor with biggest creditor
 */
export function optimizeSettlements(balances) {
  const creditors = []; // people owed money
  const debtors = [];   // people who owe money

  // Split into creditors and debtors
  Object.entries(balances).forEach(([id, amt]) => {
    if (amt > 0) creditors.push({ id, amount: amt });
    else if (amt < 0) debtors.push({ id, amount: -amt }); // store as positive
  });

  // Sort so biggest amounts come first
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const txns = [];
  let i = 0, j = 0;

  // Match debtor → creditor until both lists are settled
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);

    txns.push({
      from: debtors[i].id,
      to: creditors[j].id,
      amount: round2(pay),
    });

    // Update remaining amounts
    debtors[i].amount -= pay;
    creditors[j].amount -= pay;

    if (debtors[i].amount <= 0) i++;
    if (creditors[j].amount <= 0) j++;
  }

  return txns;
}
