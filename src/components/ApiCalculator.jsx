import { useMemo, useState } from 'react';
import { Plus, Trash2, RotateCcw } from 'lucide-react';
import {
  API_ON_DEMAND_FAIR_USE,
  createCalculatorRow,
  formatApiCount,
  getBillableUserTypeOptions,
  getLicenseTierOptions,
  normalizeCalculatorRow,
  summarizeCalculatorRows,
} from '../lib/apiOnDemandFairUse.js';

const SUBSCRIPTION_SKUS_WITHOUT_API_POOL = [
  'Genesys Cloud Collaborate User',
  'CX Cloud from Genesys and Salesforce Concurrent',
  'Genesys Cloud for Salesforce Concurrent Add-on',
  'Unified Experience from Genesys and ServiceNow Concurrent',
  'DEV Genesys Cloud Customer Bundle (and other lab/dev bundles)',
  'WEM, Digital, Agent Assist, Work Automation, Agent Copilot, and Speech and Text Analytics add-ons',
];

function createDefaultCalculatorRows() {
  return [createCalculatorRow()];
}

function CalculatorTableRow({ lineItem, onChange, onRemove }) {
  const billableUserTypeOptions = getBillableUserTypeOptions();
  const licenseTierOptions = getLicenseTierOptions(lineItem.billableUserType);
  const showsFullTierList = lineItem.billableUserType === 'named';

  function update(patch) {
    onChange(normalizeCalculatorRow({ ...lineItem, ...patch }));
  }

  return (
    <tr>
      <td>
        <select
          className="filter-builder-select"
          aria-label="Billable user type"
          value={lineItem.billableUserType}
          onChange={event => update({
            billableUserType: event.target.value,
            licenseTier: getLicenseTierOptions(event.target.value)[0]?.id,
          })}
        >
          {billableUserTypeOptions.map(option => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
      </td>
      <td>
        <select
          className="filter-builder-select"
          aria-label="License tier"
          value={lineItem.licenseTier}
          onChange={event => update({ licenseTier: event.target.value })}
          title={showsFullTierList
            ? 'All eight base tiers from the Named fair use table'
            : 'Tiers available for this user type in the fair use policy'}
        >
          {licenseTierOptions.map(option => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
        {!showsFullTierList && (
          <span className="apiTierHint">
            {licenseTierOptions.length} tiers for this user type
          </span>
        )}
      </td>
      <td>
        <input
          className="filter-builder-input"
          aria-label="User count"
          type="number"
          min={0}
          step={1}
          inputMode="numeric"
          value={lineItem.quantity}
          onChange={event => update({ quantity: event.target.value })}
        />
      </td>
      <td className="apiNumeric apiReadonly">{formatApiCount(lineItem.allocationPerUser)}</td>
      <td className="apiNumeric apiReadonly"><strong>{formatApiCount(lineItem.rowTotal)}</strong></td>
      <td>
        <button
          type="button"
          className="export-action export-action--destructive"
          onClick={onRemove}
          title="Remove row"
          aria-label="Remove row"
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}

export default function ApiCalculator() {
  const [rows, setRows] = useState(createDefaultCalculatorRows);
  const summary = useMemo(() => summarizeCalculatorRows(rows), [rows]);

  function updateRow(id, nextRow) {
    setRows(current => current.map(row => (row.id === id ? nextRow : row)));
  }

  function removeRow(id) {
    setRows(current => current.filter(row => row.id !== id));
  }

  function addRow() {
    setRows(current => [...current, createCalculatorRow()]);
  }

  function resetCalculator() {
    setRows(createDefaultCalculatorRows());
  }

  return (
    <>
      <div className="stats-grid apiStatsGrid">
        <div className="stat-card mini-stat">
          <div className="mini-stat-heading">
            <p className="eyebrow">Billable users</p>
            <strong>{formatApiCount(summary.billableUserCount)}</strong>
          </div>
          <span>Across all rows</span>
        </div>
        <div className="stat-card mini-stat apiStatPrimary">
          <div className="mini-stat-heading">
            <p className="eyebrow">Monthly API on-demand allocation</p>
            <strong>{formatApiCount(summary.monthlyAllocation)}</strong>
          </div>
          <span>{API_ON_DEMAND_FAIR_USE.unit}</span>
        </div>
      </div>

      <section className="gcCard apiCalculatorCard">
        <div className="section-title">
          <div>
            <h2>License rows</h2>
            <p>
              Per-user allocations from the{' '}
              <a href={API_ON_DEMAND_FAIR_USE.sourceUrl} target="_blank" rel="noreferrer">
                Genesys Cloud fair use policy
              </a>
              . Base license tiers are Communicate, CX 1–4 (including Digital), and EX for
              Named users; Concurrent and Hourly user types include only the tiers listed for that type.
            </p>
          </div>
          <div className="export-nav-actions">
            <button type="button" className="gcHeaderLink" onClick={addRow}>
              <Plus size={14} aria-hidden="true" /> Add row
            </button>
            <button type="button" className="gcClearButton" onClick={resetCalculator}>
              <RotateCcw size={14} aria-hidden="true" /> Reset
            </button>
          </div>
        </div>

        <div className="filter-builder-table-wrap">
          <table className="filter-builder-table">
            <thead>
              <tr>
                <th>User type</th>
                <th>License tier</th>
                <th>Users</th>
                <th className="apiNumeric">Per user / month</th>
                <th className="apiNumeric">Row total</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {summary.lineItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="apiEmpty">
                    No rows yet. Use Add row to begin.
                  </td>
                </tr>
              )}
              {summary.lineItems.map(lineItem => (
                <CalculatorTableRow
                  key={lineItem.id}
                  lineItem={lineItem}
                  onChange={nextRow => updateRow(lineItem.id, nextRow)}
                  onRemove={() => removeRow(lineItem.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <details className="apiNoPool">
          <summary>Common subscriptions with no API on-demand</summary>
          <div className="apiNoPoolBody">
            <p>
              This calculator follows the fair use <strong>API on-demand</strong> table only (Communicate,
              CX, EX by user type). Lines on your subscription overview that are not in that table do not
              increase prepay allocation — the tool is not missing them.
            </p>
            <ul>
              {SUBSCRIPTION_SKUS_WITHOUT_API_POOL.map(label => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        </details>
      </section>
    </>
  );
}
