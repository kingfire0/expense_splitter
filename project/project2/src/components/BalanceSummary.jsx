import React from "react";

export default function BalanceSummary({
  balances = [],
  suggestions = [],
  members = [],
  onSettle,
}) {
  if (!balances.length && !suggestions.length) {
    return <p className="muted">No balances yet. Add expenses first!</p>;
  }

  const getName = (id) => members.find((m) => m.id === id)?.name || "Unknown";

  return (
    <div className="card">
      <h3>Balance Summary</h3>

      {/* Member balances */}
      {balances.length > 0 && (
        <div className="vstack gap">
          {balances.map(([id, amount]) => (
            <div
              key={id}
              className={`balance-item ${amount > 0 ? "balance-positive" : "balance-negative"}`}
            >
              <strong>{getName(id)}</strong> {amount > 0 ? "is owed" : "owes"} ₹{Math.abs(amount).toFixed(2)}
            </div>
          ))}
        </div>
      )}

      {/* Suggested settlements */}
      {suggestions.length > 0 && (
        <>
          <h4 style={{ marginTop: "12px" }}>Suggested Settlements</h4>
          <div className="vstack gap">
            {suggestions.map((s, idx) => (
              <div key={idx} className="list-item row space-between">
                <span>
                  <strong>{getName(s.from)}</strong> pays <strong>{getName(s.to)}</strong> ₹{s.amount.toFixed(2)}
                </span>
                {onSettle && (
                  <button className="btn btn-success" onClick={() => onSettle(s.from, s.to, s.amount)}>
                    Record Payment
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
