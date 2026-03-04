import { useState, useEffect } from "react";

const CLASSIFY_LEVELS = ["UNCLASSIFIED", "RESTRICTED", "CONFIDENTIAL", "SECRET", "TOP SECRET"];

const initialEntities = [
  {
    id: "E001", type: "PERSON", name: "Nikola Tesla", status: "DECEASED",
    dob: "1856-07-10", dod: "1943-01-07",
    notes: "Found dead Hotel New Yorker, Room 3327. No direct descendants. Naturalized US citizen 1891. Still classified as 'alien property'.",
    flags: ["PRIMARY SUBJECT", "ENERGY WEAPONS", "WIRELESS TRANSMISSION"],
    connections: ["E002", "E003", "E004", "E005", "E008"],
    degreeMap: { "E002": 1, "E003": 1, "E004": 1, "E005": 1, "E008": 1 },
    behavioral: "Refused financial help repeatedly. Pride pattern. Isolated by design or by force?",
    redactionLinks: ["R001", "R003"]
  },
  {
    id: "E002", type: "PERSON", name: "J. Edgar Hoover", status: "DECEASED",
    dob: "1895-01-01", dod: "1972-05-02",
    notes: "Personally signed Tesla surveillance memos. Dismissed concerns publicly but continued internal monitoring. Ran FBI for 48 years with unaccountable power.",
    flags: ["FBI DIRECTOR", "SURVEILLANCE", "SUPPRESSION PATTERN"],
    connections: ["E001", "E004", "E006"],
    degreeMap: { "E001": 1, "E004": 1, "E006": 2 },
    behavioral: "Classic Hoover: public denial + private escalation. The signed memos prove personal interest. WHY personal?",
    redactionLinks: ["R001", "R002"]
  },
  {
    id: "E003", type: "PERSON", name: "Sava Kosanović", status: "DECEASED",
    dob: "1894-05-29", dod: "1956-11-14",
    notes: "Tesla's nephew. Son of sister Marica. Yugoslav diplomat/ambassador. FBI suspected him of stealing papers for Germany, then Yugoslavia. Court awarded him estate. Shipped 60 of 80 trunks to Belgrade.",
    flags: ["BLOOD HEIR", "YUGOSLAVIA", "SUSPECTED THEFT", "MISSING TRUNKS"],
    connections: ["E001", "E002", "E007"],
    degreeMap: { "E001": 1, "E002": 1, "E007": 1 },
    behavioral: "The theft allegation is murky. Was he protecting the papers or selling them? He DID successfully get the Belgrade museum built. Motivation appears patriotic, not mercenary.",
    redactionLinks: ["R002", "R004"]
  },
  {
    id: "E004", type: "PERSON", name: "Dr. John G. Trump", status: "DECEASED",
    dob: "1907-01-01", dod: "1985-02-21",
    notes: "MIT electrical engineer. Uncle of Donald J. Trump. Evaluated Tesla papers Jan 8-9 1943. THREE DAYS. Declared 'nothing of significant value.' Had prior professional humiliation by Tesla (Van de Graaff vs Tesla coil incident).",
    flags: ["EVALUATOR", "CONFLICT OF INTEREST", "PRIOR GRUDGE", "MIT", "TRUMP FAMILY"],
    connections: ["E001", "E002", "E005"],
    degreeMap: { "E001": 1, "E002": 1, "E005": 2 },
    behavioral: "CRITICAL BEHAVIORAL FLAG: Man with documented professional grudge given 3 days to dismiss lifetime of work. This is not standard protocol. Who chose him specifically?",
    redactionLinks: ["R003"]
  },
  {
    id: "E005", type: "PERSON", name: "J.P. Morgan", status: "DECEASED",
    dob: "1837-04-17", dod: "1913-04-13",
    notes: "Financed Wardenclyffe Tower then pulled funding. Allegedly used influence to block all subsequent Tesla funding. Built empire on metered infrastructure - wireless free energy was existential threat to his model.",
    flags: ["FINANCIER", "FUNDING WITHDRAWAL", "MOTIVE: INFRASTRUCTURE MONOPOLY"],
    connections: ["E001", "E009"],
    degreeMap: { "E001": 1, "E009": 2 },
    behavioral: "Morgan didn't need to conspire. His financial interests and Tesla's vision were structurally incompatible. The question is whether active suppression followed passive withdrawal.",
    redactionLinks: []
  },
  {
    id: "E006", type: "PERSON", name: "Henry Wallace", status: "DECEASED",
    dob: "1888-10-07", dod: "1965-11-18",
    notes: "FDR's Vice President. FBI documents confirm he personally discussed Tesla's wireless energy and death ray with advisors. Suggests Tesla's work reached the very top of wartime government.",
    flags: ["VP USA", "CONFIRMED INTEREST", "HIGH LEVEL AWARENESS"],
    connections: ["E002", "E007"],
    degreeMap: { "E002": 1, "E007": 1 },
    behavioral: "If VP Wallace was discussing Tesla's ideas, the 'nothing of value' conclusion from Trump becomes even more suspicious. Someone at the top wanted this evaluated - then declared dead.",
    redactionLinks: ["R001"]
  },
  {
    id: "E007", type: "PERSON", name: "Vannevar Bush", status: "DECEASED",
    dob: "1890-03-11", dod: "1974-06-28",
    notes: "FDR appointed head of Manhattan Project. Also involved in evaluating Tesla's papers per declassified docs. Connection between Tesla file and Manhattan Project apparatus is documented but underexplored.",
    flags: ["MANHATTAN PROJECT", "PAPER EVALUATOR", "NDRC"],
    connections: ["E006", "E004", "E003"],
    degreeMap: { "E006": 1, "E004": 1, "E003": 2 },
    behavioral: "The Manhattan Project connection is the most under-investigated thread. If Bush reviewed Tesla's work, what did he take from it? Particle beam and nuclear research share theoretical space.",
    redactionLinks: ["R003", "R004"]
  },
  {
    id: "E008", type: "PERSON", name: "Brig. Gen. L.C. Craigee", status: "DECEASED",
    dob: "1902-01-01", dod: "1970-01-01",
    notes: "Wright Patterson AFB. First military jet pilot. Reviewed Tesla's death ray concept and concluded 'there's something to this - the particle beam weapon is real.' Directly contradicts Trump's evaluation.",
    flags: ["MILITARY", "WRIGHT PATTERSON", "CONTRADICTS OFFICIAL FINDING", "PARTICLE BEAM"],
    connections: ["E001", "E004"],
    degreeMap: { "E001": 2, "E004": 2 },
    behavioral: "Two official evaluations, two opposite conclusions. Craigee's military career gave him zero reason to exaggerate. His assessment was buried. Why was Trump's chosen over Craigee's?",
    redactionLinks: []
  },
  {
    id: "E009", type: "PERSON", name: "Thomas Edison", status: "DECEASED",
    dob: "1847-02-11", dod: "1931-10-18",
    notes: "War of Currents. Coordinated public smear campaign including animal electrocutions. DC infrastructure investment made AC/Tesla success catastrophic for his business model. Set precedent for institutional opposition.",
    flags: ["COMPETITOR", "WAR OF CURRENTS", "SMEAR CAMPAIGN", "DC INFRASTRUCTURE"],
    connections: ["E001", "E005"],
    degreeMap: { "E001": 1, "E005": 2 },
    behavioral: "Edison's campaign was overt. The more important question: did the Edison-era power infrastructure lobby persist after Edison's death and continue influencing Tesla's treatment?",
    redactionLinks: []
  }
];

const initialRedactions = [
  {
    id: "R001", document: "FBI Memo - Jan 11 1943", page: "3",
    context_before: "Tesla completed many experiments with radio transmissions. One involved a revolutionary torpedo design.",
    context_after: "The memo warns information may fall into enemy hands.",
    signatories: ["Hoover signed"],
    flaggedEntities: ["E001", "E002", "E006"],
    behavioralNote: "Torpedo + Hoover signature + VP Wallace awareness = this redaction protects something military, not just electrical. The gap between radio transmission and torpedo is the story.",
    suspicionLevel: 5,
    hypothesis: "The redacted content likely details specific technical parameters of the torpedo that were extracted and used. The 'revolutionary' descriptor signals it wasn't just theoretical."
  },
  {
    id: "R002", document: "FBI Memo - Mar 29 1943", page: "Multiple",
    context_before: "Theft of Tesla papers by Sava Kosanovic.",
    context_after: "Papers recovered, turned over to Alien Property Custodian.",
    signatories: ["Unknown - heavily redacted"],
    flaggedEntities: ["E003", "E002"],
    behavioralNote: "The theft narrative is too convenient. If Kosanovic was acting for Yugoslavia (Soviet-aligned post-war), that gives the FBI permanent justification to hold papers. Classic bureaucratic self-protection.",
    suspicionLevel: 4,
    hypothesis: "The redacted sections may describe what specifically was taken, meaning we could infer what was considered most valuable by cross-referencing with what WAS released."
  },
  {
    id: "R003", document: "Trump Evaluation Memo - Jan 1943", page: "2-4",
    context_before: "Dr. Trump examined material Jan 8 and 9.",
    context_after: "No new workable principles found.",
    signatories: ["John G. Trump"],
    flaggedEntities: ["E004", "E001", "E007"],
    behavioralNote: "ANOMALY: A 3-day evaluation of 80 trunks of material is physically impossible as thorough analysis. Either Trump was told what to find, selected specific documents to review, or the evaluation was performative.",
    suspicionLevel: 5,
    hypothesis: "Cross-reference what Tesla was actively working on in 1940-43 vs what Trump claims to have reviewed. Any gap = likely extracted material."
  },
  {
    id: "R004", document: "OAPC Transfer Documentation", page: "Unknown",
    context_before: "80 trunks recorded in Tesla estate.",
    context_after: "60 trunks shipped to Belgrade on ship Serbia, Sept 1951.",
    signatories: ["OAPC - specific agents unknown"],
    flaggedEntities: ["E003", "E007"],
    behavioralNote: "20 trunks unaccounted for. This is not clerical. OAPC was meticulous about enemy alien property. The discrepancy requires active decision-making, not accident.",
    suspicionLevel: 5,
    hypothesis: "The 20 missing trunks correlate temporally with early Cold War weapons research. Cross-reference Wright Patterson AFB research programs 1945-1955 for particle beam or directed energy work."
  }
];

const initialLeads = [
  {
    id: "L001", title: "Wright Patterson AFB Particle Beam Research 1945-1960",
    degree: 2, status: "OPEN",
    origin: "E008",
    rationale: "Craigee's confirmation of particle beam viability + Wright Patterson's known role as repository for advanced weapons research + timing of missing trunks. FOIA request to WPAFB directed energy research programs would be specific enough to get past generic denials.",
    nextStep: "File FOIA: Wright Patterson AFB research logs 1944-1960, specifically any programs referencing Tesla, directed energy, or teleforce.",
    connectedRedactions: ["R004"]
  },
  {
    id: "L002", title: "Who Selected Trump as Evaluator?",
    degree: 2, status: "OPEN",
    origin: "E004",
    rationale: "Standard protocol would involve multiple evaluators for material of this classification level. A single evaluator with a documented grudge in 3 days is procedurally anomalous. Someone chose him. That choosing is documented somewhere in NDRC records.",
    nextStep: "FOIA: NDRC personnel assignment records January 1943. Who authorized the Tesla paper evaluation and why Trump specifically.",
    connectedRedactions: ["R003"]
  },
  {
    id: "L003", title: "Vannevar Bush - Tesla File Crossover",
    degree: 2, status: "OPEN",
    origin: "E007",
    rationale: "Bush ran both the NDRC (which Trump reported to) AND the Manhattan Project apparatus. His involvement in Tesla paper evaluation while simultaneously overseeing nuclear research is too close for coincidence. His personal papers are at MIT.",
    nextStep: "MIT Archives: Vannevar Bush personal papers. Look for any Tesla references 1942-1945.",
    connectedRedactions: ["R003", "R004"]
  },
  {
    id: "L004", title: "The Kenneth [Redacted] Hoover Connection",
    degree: 3, status: "OPEN",
    origin: "E002",
    rationale: "FBI files reference Hoover signed a memo connecting Tesla to a speech at Orange Hall, Springfield MA, 1922, Friends of Russia - cross-referencing to a 'Kenneth [redacted]' file. This named connection was important enough to link to Tesla's file AND redact. Cold War political targeting?",
    nextStep: "Cross-reference Tesla's known associates named Kenneth with FBI targets of that era. Kenneth Swezey is a known Tesla associate - does he have his own FBI file?",
    connectedRedactions: ["R001"]
  },
  {
    id: "L005", title: "The 20 Missing Trunks - Physical Chain of Custody",
    degree: 1, status: "CRITICAL",
    origin: "R004",
    rationale: "80 trunks in. 60 trunks out. 8 years in between. OAPC had to physically move this material. There are storage facility records, shipping manifests, inventory logs. The paper trail for the missing 20 exists somewhere in the federal records system.",
    nextStep: "National Archives: OAPC records for Tesla estate 1943-1951. Specifically inventory reconciliation documents. This is the most concrete physical lead.",
    connectedRedactions: ["R004"]
  }
];

const TABS = ["ENTITIES", "REDACTIONS", "LEADS", "TIMELINE", "PATTERNS"];

const suspicionBar = (level) => {
  const colors = ["#333", "#553", "#663", "#883", "#a33"];
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          width: 16, height: 8,
          background: i <= level ? colors[level-1] : "#1a1a1a",
          border: `1px solid ${i <= level ? colors[level-1] : "#333"}`
        }} />
      ))}
      <span style={{ fontSize: 10, color: "#555", marginLeft: 4 }}>
        {["","LOW","MODERATE","ELEVATED","HIGH","CRITICAL"][level]}
      </span>
    </div>
  );
};

export default function TeslaInvestigation() {
  const [tab, setTab] = useState("ENTITIES");
  const [selected, setSelected] = useState(null);
  const [entities] = useState(initialEntities);
  const [redactions] = useState(initialRedactions);
  const [leads] = useState(initialLeads);
  const [filter, setFilter] = useState("");
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 800);
    return () => clearInterval(t);
  }, []);

  const mono = "'Courier New', 'Lucida Console', monospace";
  const accent = "#c8a84b";
  const dimAccent = "#6b5a28";
  const bg = "#0a0a08";
  const panel = "#0f0f0b";
  const border = "#1e1e16";
  const textPrimary = "#d4cdb8";
  const textDim = "#6b6655";

  const stamp = (text, color = "#8b1a1a") => (
    <span style={{
      border: `2px solid ${color}`, color, padding: "1px 6px",
      fontSize: 9, fontFamily: mono, fontWeight: "bold",
      letterSpacing: 2, opacity: 0.85, textTransform: "uppercase"
    }}>{text}</span>
  );

  const renderEntities = () => {
    const filtered = entities.filter(e =>
      e.name.toLowerCase().includes(filter.toLowerCase()) ||
      e.flags.some(f => f.toLowerCase().includes(filter.toLowerCase()))
    );
    return (
      <div style={{ display: "flex", gap: 0, height: "100%" }}>
        <div style={{ width: 280, borderRight: `1px solid ${border}`, overflowY: "auto" }}>
          {filtered.map(e => (
            <div key={e.id}
              onClick={() => setSelected(e)}
              style={{
                padding: "10px 14px", borderBottom: `1px solid ${border}`,
                cursor: "pointer", background: selected?.id === e.id ? "#15150f" : "transparent",
                borderLeft: selected?.id === e.id ? `2px solid ${accent}` : "2px solid transparent"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: dimAccent, fontFamily: mono }}>{e.id}</span>
                <span style={{ fontSize: 8, color: "#4a3", background: "#0f1f0f", padding: "1px 5px", border: "1px solid #1f3f1f" }}>{e.type}</span>
              </div>
              <div style={{ fontFamily: mono, color: textPrimary, fontSize: 12, marginTop: 4 }}>{e.name}</div>
              <div style={{ fontSize: 9, color: textDim, marginTop: 3 }}>{e.status}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 6 }}>
                {e.flags.slice(0,2).map(f => (
                  <span key={f} style={{ fontSize: 8, color: dimAccent, background: "#0f0f0b", border: `1px solid ${border}`, padding: "1px 4px", fontFamily: mono }}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {selected && selected.type === "PERSON" ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono, marginBottom: 4 }}>{selected.id} // ENTITY FILE</div>
                  <div style={{ fontSize: 22, color: accent, fontFamily: mono, fontWeight: "bold" }}>{selected.name}</div>
                  <div style={{ fontSize: 10, color: textDim, fontFamily: mono, marginTop: 4 }}>
                    {selected.dob} — {selected.dod || "LIVING"}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  {stamp("PERSON OF INTEREST", "#8b4513")}
                </div>
              </div>

              <div style={{ background: "#0f0f0b", border: `1px solid ${border}`, padding: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono, marginBottom: 8 }}>// DOCUMENTED RECORD</div>
                <div style={{ fontSize: 12, color: textPrimary, lineHeight: 1.7 }}>{selected.notes}</div>
              </div>

              <div style={{ background: "#110f0b", border: `1px solid #2a1f0f`, padding: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 9, color: "#6b4a20", fontFamily: mono, marginBottom: 8 }}>// BEHAVIORAL ANALYSIS</div>
                <div style={{ fontSize: 12, color: "#c4a870", lineHeight: 1.7, fontStyle: "italic" }}>{selected.behavioral}</div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono, marginBottom: 8 }}>// FLAGS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selected.flags.map(f => (
                    <span key={f} style={{ fontSize: 10, color: accent, background: "#0f0d08", border: `1px solid ${dimAccent}`, padding: "3px 8px", fontFamily: mono }}>{f}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono, marginBottom: 8 }}>// CONNECTIONS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {selected.connections.map(cid => {
                    const c = entities.find(e => e.id === cid);
                    return c ? (
                      <div key={cid} onClick={() => setSelected(c)}
                        style={{ cursor: "pointer", background: "#0f0f0b", border: `1px solid ${border}`, padding: "6px 10px" }}>
                        <div style={{ fontSize: 8, color: dimAccent, fontFamily: mono }}>{cid} // DEG-{selected.degreeMap[cid]}</div>
                        <div style={{ fontSize: 11, color: textPrimary, fontFamily: mono, marginTop: 2 }}>{c.name}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: textDim, fontFamily: mono, fontSize: 12, paddingTop: 40, textAlign: "center" }}>
              SELECT AN ENTITY TO VIEW FILE
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderRedactions = () => (
    <div style={{ overflowY: "auto", padding: 20 }}>
      <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono, marginBottom: 16 }}>
        // REDACTION ANALYSIS FRAMEWORK — {redactions.length} DOCUMENTED GAPS
      </div>
      {redactions.map(r => (
        <div key={r.id} style={{ background: panel, border: `1px solid ${border}`, marginBottom: 16, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: 9, color: dimAccent, fontFamily: mono }}>{r.id}</span>
              <div style={{ fontSize: 13, color: textPrimary, fontFamily: mono, marginTop: 3 }}>{r.document} // PAGE {r.page}</div>
            </div>
            <div>{suspicionBar(r.suspicionLevel)}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, marginBottom: 12, alignItems: "center" }}>
            <div style={{ background: "#0f0f0b", border: `1px solid ${border}`, padding: 10 }}>
              <div style={{ fontSize: 8, color: "#4a8", fontFamily: mono, marginBottom: 4 }}>BEFORE GAP</div>
              <div style={{ fontSize: 11, color: textPrimary, fontStyle: "italic" }}>"{r.context_before}"</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                background: "#111",
                border: "2px solid #8b1a1a",
                padding: "8px 12px",
                fontFamily: mono, fontSize: 11,
                color: "#8b1a1a",
                letterSpacing: 1
              }}>▓▓▓▓▓<br/>REDACTED<br/>▓▓▓▓▓</div>
            </div>
            <div style={{ background: "#0f0f0b", border: `1px solid ${border}`, padding: 10 }}>
              <div style={{ fontSize: 8, color: "#a84", fontFamily: mono, marginBottom: 4 }}>AFTER GAP</div>
              <div style={{ fontSize: 11, color: textPrimary, fontStyle: "italic" }}>"{r.context_after}"</div>
            </div>
          </div>

          <div style={{ background: "#110f0a", border: `1px solid #2a1a0a`, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 8, color: "#6b4a20", fontFamily: mono, marginBottom: 6 }}>// BEHAVIORAL READ</div>
            <div style={{ fontSize: 11, color: "#c4a870", lineHeight: 1.7 }}>{r.behavioralNote}</div>
          </div>

          <div style={{ background: "#0a0f0a", border: `1px solid #1a2a1a`, padding: 12 }}>
            <div style={{ fontSize: 8, color: "#3a6a3a", fontFamily: mono, marginBottom: 6 }}>// WORKING HYPOTHESIS</div>
            <div style={{ fontSize: 11, color: "#8ab88a", lineHeight: 1.7 }}>{r.hypothesis}</div>
          </div>

          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {r.flaggedEntities.map(eid => {
              const e = entities.find(x => x.id === eid);
              return e ? (
                <span key={eid} onClick={() => { setSelected(e); setTab("ENTITIES"); }}
                  style={{ cursor: "pointer", fontSize: 9, color: accent, border: `1px solid ${dimAccent}`, padding: "2px 6px", fontFamily: mono }}>
                  → {e.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderLeads = () => (
    <div style={{ overflowY: "auto", padding: 20 }}>
      <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono, marginBottom: 16 }}>
        // ACTIVE LEADS — {leads.length} THREADS — SORTED BY DEGREE OF SEPARATION
      </div>
      {[...leads].sort((a,b) => a.degree - b.degree).map(l => (
        <div key={l.id} style={{ background: panel, border: `1px solid ${l.status === "CRITICAL" ? "#8b1a1a" : border}`, marginBottom: 16, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <span style={{ fontSize: 9, color: dimAccent, fontFamily: mono }}>{l.id}</span>
              <div style={{ fontSize: 14, color: l.status === "CRITICAL" ? "#e05050" : accent, fontFamily: mono, marginTop: 3 }}>{l.title}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              {stamp(l.status, l.status === "CRITICAL" ? "#8b1a1a" : "#2a5a2a")}
              <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono, marginTop: 6 }}>DEGREE-{l.degree} SEPARATION</div>
            </div>
          </div>

          <div style={{ background: "#0f0f0b", border: `1px solid ${border}`, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 8, color: dimAccent, fontFamily: mono, marginBottom: 6 }}>// INVESTIGATIVE RATIONALE</div>
            <div style={{ fontSize: 11, color: textPrimary, lineHeight: 1.7 }}>{l.rationale}</div>
          </div>

          <div style={{ background: "#0a0f14", border: `1px solid #1a2a3a`, padding: 12 }}>
            <div style={{ fontSize: 8, color: "#3a5a7a", fontFamily: mono, marginBottom: 6 }}>// RECOMMENDED NEXT ACTION</div>
            <div style={{ fontSize: 11, color: "#8ab0d8", lineHeight: 1.7 }}>{l.nextStep}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimeline = () => {
    const events = [
      { year: "1891", event: "Tesla becomes US citizen", flag: "LEGAL STATUS", significance: 3 },
      { year: "1893", event: "Wardenclyffe Tower funded by Morgan", flag: "FINANCIAL", significance: 4 },
      { year: "1904", event: "Morgan pulls Wardenclyffe funding", flag: "SUPPRESSION", significance: 5 },
      { year: "1917", event: "Wardenclyffe demolished. Tesla begins financial collapse.", flag: "CRITICAL LOSS", significance: 5 },
      { year: "1922", event: "Tesla speech, Friends of Russia, Springfield MA. Hoover memo generated. Kenneth [REDACTED] referenced.", flag: "FBI TARGET", significance: 4 },
      { year: "1934", event: "Tesla claims to have Death Ray teleforce device. Attempts to sell to US military.", flag: "WEAPONS", significance: 5 },
      { year: "1940", event: "Hoover receives NYT Tesla interview from concerned citizen. FBI file begins actively.", flag: "SURVEILLANCE ESCALATES", significance: 4 },
      { year: "1943 JAN 7", event: "Tesla found dead, Room 3327, Hotel New Yorker.", flag: "DEATH", significance: 5 },
      { year: "1943 JAN 8-9", event: "John G. Trump evaluates papers in 3 days. Declares nothing of value.", flag: "ANOMALY", significance: 5 },
      { year: "1943 JAN 11", event: "FBI memo details torpedo technology. Hoover signs personally.", flag: "CLASSIFIED", significance: 5 },
      { year: "1943 MAR", event: "Kosanovic theft allegation. Papers recovered to OAPC.", flag: "CUSTODY DISPUTE", significance: 4 },
      { year: "1944", event: "Biography 'Prodigal Genius' published. Claims FBI has Tesla papers. Hoover begins denial campaign.", flag: "COVER NARRATIVE", significance: 3 },
      { year: "1943-1951", event: "80 trunks held by OAPC. Location of trunks unknown even to OAPC itself.", flag: "MISSING MATERIAL", significance: 5 },
      { year: "1951 SEPT", event: "60 trunks shipped to Belgrade on ship Serbia. 20 trunks unaccounted for.", flag: "CRITICAL GAP", significance: 5 },
      { year: "1955", event: "Nikola Tesla Museum opens Belgrade.", flag: "ARCHIVE", significance: 3 },
      { year: "1984", event: "Death ray technical papers found at Belgrade museum. Do not contradict Trump evaluation (officially).", flag: "DISCOVERY", significance: 4 },
      { year: "2016", event: "FBI releases 250 pages via FOIA.", flag: "PARTIAL RELEASE", significance: 3 },
      { year: "2018", event: "Additional FBI release. Significant redactions remain.", flag: "PARTIAL RELEASE", significance: 3 },
    ];

    const sigColors = ["", "#2a3a2a", "#3a4a2a", "#5a6a2a", "#8a6a20", "#8b1a1a"];

    return (
      <div style={{ overflowY: "auto", padding: 20 }}>
        <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono, marginBottom: 20 }}>
          // MASTER TIMELINE — FLAG ANOMALIES AND PATTERN BREAKS
        </div>
        <div style={{ position: "relative", paddingLeft: 120 }}>
          <div style={{ position: "absolute", left: 110, top: 0, bottom: 0, width: 1, background: border }} />
          {events.map((e, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 14 }}>
              <div style={{
                position: "absolute", left: -110, width: 100, textAlign: "right",
                fontSize: 9, color: textDim, fontFamily: mono, paddingTop: 2
              }}>{e.year}</div>
              <div style={{ position: "absolute", left: -5, top: 6, width: 10, height: 10, borderRadius: "50%", background: sigColors[e.significance], border: `1px solid ${sigColors[e.significance]}` }} />
              <div style={{
                background: panel, border: `1px solid ${e.significance >= 5 ? "#2a1a0a" : border}`,
                padding: "8px 14px", marginLeft: 10
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 11, color: textPrimary, fontFamily: mono }}>{e.event}</div>
                  <span style={{ fontSize: 8, color: sigColors[e.significance], border: `1px solid ${sigColors[e.significance]}`, padding: "1px 5px", fontFamily: mono, marginLeft: 10, whiteSpace: "nowrap" }}>{e.flag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPatterns = () => {
    const patterns = [
      {
        name: "THE 3-DAY DISPOSAL PATTERN",
        category: "INSTITUTIONAL BEHAVIOR",
        description: "When a government entity needs to officially close a file on something it actually wants to retain, it performs a brief, documented 'evaluation' that produces a negative finding. This gives plausible deniability while allowing continued classified use. 3 days for Tesla's lifetime of work is consistent with this pattern, not with genuine assessment.",
        evidence: ["Trump evaluation speed", "Single evaluator", "Conflicting Craigee assessment buried"],
        strength: 5
      },
      {
        name: "THE GRUDGE SELECTOR PATTERN",
        category: "HUMAN NATURE",
        description: "When powerful institutions need a specific outcome from an evaluation, they select evaluators whose personal biases align with the desired conclusion. Trump's Tesla humiliation gave him motive to minimize Tesla's work. This is not conspiracy - it is basic institutional management of outcomes.",
        evidence: ["Van de Graaff vs Tesla coil incident", "Trump's single negative report", "No second opinion commissioned"],
        strength: 4
      },
      {
        name: "THE CONVENIENT THEFT NARRATIVE",
        category: "BUREAUCRATIC PATTERN",
        description: "Accusing the heir of theft, even if ultimately unproven, accomplishes two things: it discredits the heir's account of what papers existed, and it gives the agency justification for extended custody. The Kosanovic 'theft' allegation appears precisely when OAPC needed to justify retaining papers.",
        evidence: ["Theft allegation timing", "Heavily redacted resolution", "OAPC retaining materials afterward"],
        strength: 3
      },
      {
        name: "THE INVENTORY DISAPPEARANCE PATTERN",
        category: "MATERIAL SUPPRESSION",
        description: "20 trunks do not vanish by accident from a federal agency mandated to track enemy alien property. Physical inventory reconciliation requires active decisions. The 8-year gap between seizure and shipment provides ample time for selective extraction under wartime secrecy.",
        evidence: ["80 trunks in, 60 out", "8 year custody gap", "No official reconciliation"],
        strength: 5
      },
      {
        name: "THE FRAMING CAMPAIGN PATTERN",
        category: "REPUTATIONAL SUPPRESSION",
        description: "The shift from 'genius' to 'eccentric' in Tesla's press coverage follows the War of Currents period precisely. Institutional actors do not need to coordinate press campaigns - they simply need to withdraw positive framing and allow the 'eccentric' narrative to fill the vacuum. Once a man is labeled a crank, everything he says is pre-dismissed.",
        evidence: ["Press shift post-Wardenclyffe", "Eccentric label timing", "Later work dismissed without evaluation"],
        strength: 4
      }
    ];

    return (
      <div style={{ overflowY: "auto", padding: 20 }}>
        <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono, marginBottom: 16 }}>
          // BEHAVIORAL PATTERN REGISTRY — ABSTRACT LEADS — HUMAN NATURE ANALYSIS
        </div>
        {patterns.map((p, i) => (
          <div key={i} style={{ background: panel, border: `1px solid ${border}`, marginBottom: 16, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 9, color: dimAccent, fontFamily: mono }}>{p.category}</div>
                <div style={{ fontSize: 14, color: accent, fontFamily: mono, marginTop: 3 }}>{p.name}</div>
              </div>
              <div>{suspicionBar(p.strength)}</div>
            </div>
            <div style={{ fontSize: 12, color: textPrimary, lineHeight: 1.8, marginBottom: 12 }}>{p.description}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.evidence.map(e => (
                <span key={e} style={{ fontSize: 9, color: "#6a8a6a", border: "1px solid #1a3a1a", padding: "2px 8px", fontFamily: mono }}>✓ {e}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ background: bg, color: textPrimary, height: "100vh", display: "flex", flexDirection: "column", fontFamily: mono }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${border}`, padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#09090700" }}>
        <div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {stamp("DECLASSIFIED", "#2a5a2a")}
            {stamp("FOIA RELEASE", "#2a3a5a")}
            <span style={{ fontSize: 9, color: dimAccent }}>PARTIAL — ONGOING REDACTIONS</span>
          </div>
          <div style={{ fontSize: 16, color: accent, marginTop: 6, letterSpacing: 2 }}>OPERATION WARDENCLYFFE</div>
          <div style={{ fontSize: 9, color: textDim, marginTop: 2 }}>NIKOLA TESLA // FBI FILES ANALYSIS // INDEPENDENT INVESTIGATION</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 9, color: dimAccent }}>STATUS</div>
          <div style={{ fontSize: 11, color: "#e05050" }}>
            {blink ? "● ACTIVE" : "○ ACTIVE"}
          </div>
          <div style={{ fontSize: 8, color: textDim, marginTop: 4 }}>ENTITIES: {entities.length} // LEADS: {leads.length} // REDACTIONS: {redactions.length}</div>
        </div>
      </div>

      {/* Tabs + Filter */}
      <div style={{ borderBottom: `1px solid ${border}`, padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0b0b09" }}>
        <div style={{ display: "flex" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: "none", border: "none", borderBottom: t === tab ? `2px solid ${accent}` : "2px solid transparent",
              color: t === tab ? accent : textDim, cursor: "pointer", padding: "10px 18px",
              fontSize: 10, fontFamily: mono, letterSpacing: 1
            }}>{t}</button>
          ))}
        </div>
        {(tab === "ENTITIES") && (
          <input
            value={filter} onChange={e => setFilter(e.target.value)}
            placeholder="FILTER..."
            style={{ background: "#0f0f0b", border: `1px solid ${border}`, color: textPrimary, padding: "4px 10px", fontSize: 10, fontFamily: mono, outline: "none", width: 160 }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {tab === "ENTITIES" && renderEntities()}
        {tab === "REDACTIONS" && renderRedactions()}
        {tab === "LEADS" && renderLeads()}
        {tab === "TIMELINE" && renderTimeline()}
        {tab === "PATTERNS" && renderPatterns()}
      </div>
    </div>
  );
}