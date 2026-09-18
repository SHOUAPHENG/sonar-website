"use client";
import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { djPlans, djComparison } from "./djPlans";
import { Reveal } from "./Reveal";
const euros = (value: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: value % 1 ? 2 : 0 }).format(value);

export function Plans() {
  const [annual, setAnnual] = useState(false);
  return <section id="plans" className="sonar-section sonar-plans" aria-labelledby="plans-title">
    <Reveal><div className="sonar-section-heading"><p className="sonar-eyebrow">SONAR DJ / FIND YOUR LEVEL</p><h2 id="plans-title">Explore. Prepare.<br />Perform.</h2><p>One library. A continuous journey.<br />Choose how far you want to take it.</p></div></Reveal>
    <div className="sonar-billing-bar"><div className="sonar-billing-switch" role="group" aria-label="Billing period"><button aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button><button aria-pressed={annual} onClick={() => setAnnual(true)}>Yearly</button></div></div>
    <p className="sonar-pricing-status">PLANNED LAUNCH OFFERS · BETA ACCESS IS SEPARATE</p>
    <div className="sonar-dj-editions">{djPlans.map((plan, index) => <article key={plan.name} className={`sonar-edition ${index === 2 ? 'sonar-edition-featured' : ''}`}>
      <div className="sonar-edition-top"><span>0{index + 1} / {['DISCOVER', 'ORGANIZE', 'PREPARE', 'PERFORM'][index]}</span>{index === 2 && <span className="sonar-plan-badge">RECOMMENDED</span>}</div>
      <h3>{plan.name}</h3><p className="sonar-edition-purpose">{plan.purpose}</p>
      <div className="sonar-edition-price" aria-live="polite"><strong>{euros(annual ? plan.annual : plan.monthly)}</strong><span>/{annual ? 'year' : 'month'}</span><small>{plan.monthly === 0 ? 'Free tier' : annual ? `${euros(plan.annual)} billed yearly` : `${euros(plan.monthly)} billed monthly`}</small></div>
      <a href="#beta" className={`sonar-button ${index === 2 ? '' : 'sonar-button-outline'}`}>Explore beta access <ArrowUpRight size={13} /></a>
      <ul>{plan.features.map(feature => <li key={feature}><Check size={12} /><span>{feature}</span></li>)}</ul>
    </article>)}</div>
    <p className="sonar-plans-note">Proposed launch pricing and feature allocation. Availability and usage limits will be confirmed at launch.<br />These previews do not activate a subscription or take payment.</p>
    <details className="sonar-comparison"><summary>Compare every feature <ChevronDown size={17} /></summary><div className="sonar-comparison-scroll" tabIndex={0} role="region" aria-label="Scrollable SONAR DJ plan comparison"><table><caption>Planned SONAR DJ feature allocation</caption><thead><tr><th scope="col">Feature</th>{djPlans.map(p => <th scope="col" key={p.name}>{p.name}</th>)}</tr></thead><tbody>{djComparison.map(([feature, ...values]) => <tr key={feature}><th scope="row">{feature}</th>{values.map((value, i) => <td key={i}>{value === 'Included' ? <><Check size={14} aria-hidden="true" /><span className="sr-only">Included</span></> : value}</td>)}</tr>)}</tbody></table></div></details>
    <div className="sonar-plan-journey"><p className="sonar-eyebrow">ONE CONNECTED WORKFLOW</p><h3>From your collection<br />to your next track.</h3><ol>{['Import Rekordbox', 'Visual Map', 'MATCHES', 'AI Playlists', 'Transition Planner', 'AI Sets', 'Metadata / Cues', 'Review & Sync', 'Live DJ HUD', 'Next Track'].map((step, i) => <li key={step}><small>{String(i + 1).padStart(2, '0')}</small>{step}<span aria-hidden="true">→</span></li>)}</ol><p>The SONAR product direction: exploration, preparation and performance in one continuous workflow.</p></div>
    <div className="sonar-plan-faq">{[
      ['Does SONAR replace Rekordbox?', 'No. SONAR adds visual exploration and musical context around your library. You review changes before synchronizing them back to Rekordbox.'],
      ['Which plan is designed for set preparation?', 'DJ Pro is the proposed preparation tier, combining AI playlists, AI sets, Transition Planner and Cue Editor. DJ Live extends that workflow into performance.'],
      ['Are all listed features available today?', 'This is the planned launch lineup. The website uses demonstration data; access, release readiness and exact limits will be confirmed before subscriptions open.'],
      ['How does yearly billing work?', 'Core is 89 € per year, Pro 139 € per year and Live 189 € per year. These are total annual prices, not monthly amounts. No payment is taken here.'],
    ].map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={16} /></summary><p>{answer}</p></details>)}</div>
  </section>;
}
