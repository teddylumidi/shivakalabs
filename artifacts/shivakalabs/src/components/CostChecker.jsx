/**
 * CostChecker.jsx — "What will it cost?" for eCitizen services.
 *
 * Pick a service and see the base government fee, the eCitizen platform fee,
 * the ShivakaLabs fee and the total payable on a receipt, then apply on WhatsApp with that exact service and total in the
 * message. Every price is also in the prerendered "All prices" table, so
 * search engines and people without JavaScript can read them.
 *
 * Deep link: /ecitizen?cost=passport-66#cost
 */
import { useEffect, useId, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FEE_GROUPS, FEES_CHECKED, feeOption, totalOf, serviceFeeOf, platformOf, ksh, totalText } from '../data/fees';
import { WA_NUMBER } from '../data/services';

/** Base government fee cell text. */
function baseText(o) {
  if (o.gov == null) return 'Shown on eCitizen';
  if (o.gov === 0) return 'Free';
  return ksh(o.gov);
}

/** eCitizen platform fee cell text. */
function platformText(o) {
  if (o.gov === 0 || !o.platform) return 'None';
  return ksh(platformOf(o));
}

/** ShivakaLabs fee cell text. */
function feeText(o) {
  const fee = serviceFeeOf(o);
  return fee == null ? 'Included in total' : `${o.from ? 'From ' : ''}${ksh(fee)}`;
}

/**
 * Receipt lines for an option: [{ label, value }] — the total is added separately.
 * Always the same four rows, in the same order, so every service reads alike.
 */
export function receiptLines(o) {
  const govLabel = o.govLabel || o.group.govLabel || 'Base government fee';
  return [
    { label: govLabel, value: baseText(o) },
    { label: 'eCitizen platform fee', value: platformText(o) },
    { label: 'ShivakaLabs fee', value: feeText(o) },
  ];
}

function waQuote(option) {
  const breakdown = receiptLines(option).map(l => `${l.label}: ${l.value}`).join('; ');
  const lines = [
    `Hello ShivakaLabs, I'd like help with: ${option.name} (${option.detail}).`,
    `Your site shows a total of ${totalText(option)} (${breakdown}).`,
  ];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function CostChecker() {
  const { search } = useLocation();
  const uid = useId();
  const [groupId, setGroupId] = useState(FEE_GROUPS[0].id);
  const [optionId, setOptionId] = useState(FEE_GROUPS[0].options[0].id);

  // Open a specific service from a link (?cost=…), e.g. from the homepage price list.
  useEffect(() => {
    const wanted = feeOption(new URLSearchParams(search).get('cost') || '');
    if (wanted) {
      setGroupId(wanted.group.id);
      setOptionId(wanted.id);
    }
  }, [search]);

  const group = FEE_GROUPS.find(g => g.id === groupId);
  const option = feeOption(optionId) || { ...group.options[0], group };

  function pickGroup(id) {
    const g = FEE_GROUPS.find(x => x.id === id);
    setGroupId(id);
    setOptionId(g.options[0].id);
  }

  function onTabKey(e, index) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = FEE_GROUPS[(index + (e.key === 'ArrowRight' ? 1 : -1) + FEE_GROUPS.length) % FEE_GROUPS.length];
    pickGroup(next.id);
    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
  }

  return (
    <section className="cost" id="cost" aria-labelledby={`${uid}-title`}>
      <div className="container">
        <div className="section-title">
          <h2 id={`${uid}-title`}>What will it cost?</h2>
          <p className="subtitle">Pick a service to see the base government fee, the eCitizen platform fee, our fee and the total payable before you message us.</p>
        </div>

        <div className="cost-tabs" role="tablist" aria-label="Service type">
          {FEE_GROUPS.map((g, i) => (
            <button
              key={g.id}
              id={`${uid}-tab-${g.id}`}
              type="button"
              role="tab"
              aria-selected={g.id === groupId}
              aria-controls={`${uid}-panel`}
              tabIndex={g.id === groupId ? 0 : -1}
              className={`cost-tab${g.id === groupId ? ' active' : ''}`}
              onClick={() => pickGroup(g.id)}
              onKeyDown={e => onTabKey(e, i)}
            >
              {g.name}
            </button>
          ))}
        </div>

        <div className="cost-body" id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${groupId}`}>
          <fieldset className="cost-options">
            <legend className="sr-only">Choose a {group.name} service</legend>
            {group.options.map(o => (
              <label key={o.id} className={`cost-option${o.id === option.id ? ' selected' : ''}`}>
                <input type="radio" name={`${uid}-option`} value={o.id} checked={o.id === option.id} onChange={() => setOptionId(o.id)} />
                <span className="cost-option-name">{o.name}</span>
                <span className="cost-option-detail">{o.detail}</span>
                <span className="cost-option-total">{totalText(o)}</span>
              </label>
            ))}
          </fieldset>

          {/* Phones: the total stays in view while choosing; tap to see the breakdown */}
          <div className="cost-bar">
            <span className="cost-bar-text"><span className="cost-bar-name">{option.name}</span> <strong>{totalText(option)}</strong></span>
            <a href={`#${uid}-receipt`} className="cost-bar-link" onClick={e => { e.preventDefault(); document.getElementById(`${uid}-receipt`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
              See breakdown
            </a>
          </div>

          <div className="receipt" id={`${uid}-receipt`} aria-live="polite">
            <p className="receipt-title">{option.name}</p>
            <p className="receipt-sub">{option.detail}</p>
            <dl className="receipt-lines">
              {receiptLines(option).map(l => (
                <div key={l.label} className="receipt-line">
                  <dt>{l.label}</dt>
                  <dd>{l.value}</dd>
                </div>
              ))}
              <div className="receipt-line receipt-total">
                <dt>Total payable</dt>
                <dd>{totalText(option)}</dd>
              </div>
            </dl>

            <p className="receipt-need-title">What you’ll need</p>
            <ul className="receipt-needs">
              {option.needs.map(n => <li key={n}>{n}</li>)}
            </ul>
            <p className="receipt-note">{group.note}</p>

            <a className="btn-wa receipt-cta" href={waQuote(option)} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-whatsapp" aria-hidden="true" /> Apply on WhatsApp for {totalText(option)}
            </a>
            <p className="receipt-fine">
              {group.source
                ? <>Government and platform fees checked {FEES_CHECKED} on{' '}
                    <a href={group.source.url} target="_blank" rel="noopener noreferrer">{group.source.label}</a>.{' '}</>
                : null}
              Fees can change, and we confirm the total before you pay.
            </p>
          </div>
        </div>

        <details className="cost-all">
          <summary>See all prices</summary>
          {FEE_GROUPS.map(g => (
            <table key={g.id} className="cost-table">
              <caption>{g.name}</caption>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Base Government Fee (KSh)</th>
                  <th scope="col">eCitizen Platform Fee (KSh)</th>
                  <th scope="col">ShivakaLabs Fee (KSh)</th>
                  <th scope="col">Total Payable (KSh)</th>
                </tr>
              </thead>
              <tbody>
                {g.options.map(o => (
                  <tr key={o.id}>
                    <th scope="row">{o.name}</th>
                    <td data-label="Base Government Fee">{o.gov == null ? 'On eCitizen' : o.gov === 0 ? 'Free' : o.gov.toLocaleString('en-KE')}</td>
                    <td data-label="eCitizen Platform Fee">{o.gov === 0 || !o.platform ? '–' : platformOf(o).toLocaleString('en-KE')}</td>
                    <td data-label="ShivakaLabs Fee">{serviceFeeOf(o) == null ? 'Incl.' : serviceFeeOf(o).toLocaleString('en-KE')}</td>
                    <td data-label="Total Payable">{o.from ? 'From ' : ''}{totalOf(o).toLocaleString('en-KE')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </details>
      </div>
    </section>
  );
}
