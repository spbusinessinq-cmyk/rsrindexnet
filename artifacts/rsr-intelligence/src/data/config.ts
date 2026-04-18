/* ── INDEX Data Network — Central Data Configuration ─────────────────────────
   Canonical data for all INDEX platform content.
   Replace null/empty values with live data when sources are bound.
   Pages import from this file — not from inline definitions.
   ──────────────────────────────────────────────────────────────────────────── */

import type {
  DatasetDomain,
  SignalCategory,
  AccessTier,
  MethodPhase,
  PlatformStatus,
  RecordField,
} from "./types";

/* ── Common field sets ────────────────────────────────────────── */

const BASE_RECORD_FIELDS: RecordField[] = [
  { key: "id",             label: "Record ID",        type: "string",  required: true,  description: "Unique index identifier" },
  { key: "subject",        label: "Subject",          type: "string",  required: true,  description: "Primary subject of the record" },
  { key: "domain",         label: "Domain",           type: "enum",    required: true,  description: "Dataset domain assignment" },
  { key: "classification", label: "Classification",   type: "enum",    required: true,  description: "Access classification level" },
  { key: "dateIndexed",    label: "Date Indexed",     type: "date",    required: true,  description: "Timestamp of index commitment" },
  { key: "dateUpdated",    label: "Date Updated",     type: "date",    required: true,  description: "Timestamp of last revision" },
  { key: "status",         label: "Status",           type: "enum",    required: true,  description: "Current record status" },
  { key: "source",         label: "Source",           type: "string",  required: true,  description: "Source attribution identifier" },
  { key: "sourceType",     label: "Source Type",      type: "enum",    required: true,  description: "Intake category of source" },
  { key: "confidence",     label: "Confidence",       type: "enum",    required: true,  description: "Confidence level of the record" },
  { key: "tags",           label: "Tags",             type: "string",  required: false, description: "Optional classification tags" },
  { key: "version",        label: "Version",          type: "number",  required: true,  description: "Record revision version" },
];

/* ── Dataset Domains ──────────────────────────────────────────── */

export const DATASET_DOMAINS: DatasetDomain[] = [
  {
    id: "POL",
    label: "Political & Governance",
    description: "Political events, governance structures, policy developments, regulatory activity, and institutional decisions across monitored jurisdictions.",
    schemaVersion: "1.0",
    status: "defined",
    bindingStatus: "unbound",
    sourcesActive: 0,
    recordCount: 0,
    lastUpdated: null,
    updateCadence: null,
    fields: [
      ...BASE_RECORD_FIELDS,
      { key: "jurisdiction",  label: "Jurisdiction",  type: "string",  required: true },
      { key: "entity",        label: "Entity",        type: "string",  required: true },
      { key: "event_type",    label: "Event Type",    type: "enum",    required: true },
      { key: "policy_area",   label: "Policy Area",   type: "string",  required: false },
    ],
  },
  {
    id: "ECO",
    label: "Economic & Financial",
    description: "Market signals, financial indicators, economic policy, trade activity, and capital flow patterns across tracked jurisdictions and sectors.",
    schemaVersion: "1.0",
    status: "defined",
    bindingStatus: "unbound",
    sourcesActive: 0,
    recordCount: 0,
    lastUpdated: null,
    updateCadence: null,
    fields: [
      ...BASE_RECORD_FIELDS,
      { key: "sector",        label: "Sector",        type: "string",  required: true },
      { key: "indicator",     label: "Indicator",     type: "string",  required: false },
      { key: "jurisdiction",  label: "Jurisdiction",  type: "string",  required: true },
      { key: "value",         label: "Value",         type: "number",  required: false },
    ],
  },
  {
    id: "INF",
    label: "Infrastructure & Technology",
    description: "Digital infrastructure events, technology platform activity, network architecture changes, and operational technology signals.",
    schemaVersion: "1.0",
    status: "defined",
    bindingStatus: "unbound",
    sourcesActive: 0,
    recordCount: 0,
    lastUpdated: null,
    updateCadence: null,
    fields: [
      ...BASE_RECORD_FIELDS,
      { key: "infra_type",    label: "Infrastructure Type", type: "enum",   required: true },
      { key: "platform",      label: "Platform",            type: "string", required: false },
      { key: "scope",         label: "Scope",               type: "string", required: true },
    ],
  },
  {
    id: "ORG",
    label: "Organisational Mapping",
    description: "Structural intelligence on organisations — relationships, roles, hierarchies, and operational patterns of tracked entities.",
    schemaVersion: "1.0",
    status: "defined",
    bindingStatus: "unbound",
    sourcesActive: 0,
    recordCount: 0,
    lastUpdated: null,
    updateCadence: null,
    fields: [
      ...BASE_RECORD_FIELDS,
      { key: "org_name",      label: "Organisation",  type: "string",  required: true },
      { key: "org_type",      label: "Org Type",      type: "enum",    required: true },
      { key: "relationships", label: "Relationships", type: "string",  required: false },
    ],
  },
  {
    id: "MED",
    label: "Media & Narrative",
    description: "Information environment signals — media output patterns, narrative structures, platform activity, and source behaviour.",
    schemaVersion: "1.0",
    status: "defined",
    bindingStatus: "unbound",
    sourcesActive: 0,
    recordCount: 0,
    lastUpdated: null,
    updateCadence: null,
    fields: [
      ...BASE_RECORD_FIELDS,
      { key: "outlet",        label: "Outlet",        type: "string",  required: true },
      { key: "narrative",     label: "Narrative",     type: "string",  required: false },
      { key: "platform",      label: "Platform",      type: "string",  required: true },
    ],
  },
  {
    id: "GEO",
    label: "Geographic & Regional",
    description: "Location-anchored signal collections — events, developments, and patterns organised by geographic area or regional context.",
    schemaVersion: "1.0",
    status: "defined",
    bindingStatus: "unbound",
    sourcesActive: 0,
    recordCount: 0,
    lastUpdated: null,
    updateCadence: null,
    fields: [
      ...BASE_RECORD_FIELDS,
      { key: "region",        label: "Region",        type: "string",  required: true },
      { key: "country",       label: "Country",       type: "string",  required: false },
      { key: "coordinates",   label: "Coordinates",   type: "string",  required: false },
    ],
  },
];

/* ── Signal Categories ────────────────────────────────────────── */

export const SIGNAL_CATEGORIES: SignalCategory[] = [
  {
    id: "OPN",
    label: "Open Source",
    description: "Publicly available information from monitored platforms, publications, and feeds. OSINT signals are classified by source type and recency before entering the intake queue.",
    intakeType: "passive",
    intakeLogic: "Volume-filtered — relevance scoring applied before logging",
    validationRule: "Relevance threshold must be met before log entry",
  },
  {
    id: "STR",
    label: "Structured Feeds",
    description: "Machine-readable data streams from defined endpoints — APIs, data exports, and standardised feeds. Structured feeds are ingested on schedule and validated on receipt.",
    intakeType: "scheduled",
    intakeLogic: "Schema-validated on intake — malformed records held for review",
    validationRule: "Schema conformance required on every ingestion run",
  },
  {
    id: "FLG",
    label: "Flagged Patterns",
    description: "Signals generated by pattern detection logic — recurring observations across sources that meet defined threshold criteria for analytical attention.",
    intakeType: "active",
    intakeLogic: "Pattern threshold required — single-observation flags are not logged",
    validationRule: "Cross-source pattern match required before flag is raised",
  },
  {
    id: "MAN",
    label: "Manual Intake",
    description: "Signals submitted through operator-controlled channels. Manual intake requires classification at submission — unclassified submissions are held in the staging queue.",
    intakeType: "manual",
    intakeLogic: "Operator-classified before commit — no auto-routing on manual intake",
    validationRule: "Classification must be complete before commit is allowed",
  },
];

/* ── Triage Criteria ──────────────────────────────────────────── */

export const TRIAGE_CRITERIA: string[] = [
  "Source reliability score meets defined intake threshold",
  "Signal type matches a monitored category",
  "Temporal relevance within defined observation window",
  "No duplicate record exists in the index for this signal",
  "Classification can be determined at intake",
];

/* ── Access Tiers ─────────────────────────────────────────────── */

export const ACCESS_TIERS: AccessTier[] = [
  {
    id: "PUBLIC",
    label: "Public Layer",
    status: "active",
    statusNote: "You are here",
    description: "The INDEX Data Network public interface — this site. Documents the platform's structure, sector architecture, methodology, and analytical approach. No account. No restrictions. No gating.",
    scope: [
      "Platform overview and sector documentation",
      "Signal category definitions and intake structure",
      "Dataset domain descriptions and coverage map",
      "Methodology — collection, classification, synthesis architecture",
      "Access tier boundaries and access model documentation",
    ],
  },
  {
    id: "RESTRICTED",
    label: "Restricted Data Layer",
    status: "controlled",
    statusNote: "Not publicly available",
    description: "Curated datasets, live signal feeds, and expanded record access beyond the public index. Restricted data requires verification and is not available via sign-up. Access is granted individually after review.",
    scope: [
      "Expanded dataset coverage across all analytical domains",
      "Live signal feed visibility and intake log access",
      "Full record index — active, archived, and flagged",
      "Cross-dataset query and structured export",
    ],
  },
  {
    id: "OPERATOR",
    label: "Operator Layer",
    status: "restricted",
    statusNote: "Manually provisioned",
    description: "Direct access to operational environments — live dashboards, analytical tools, data pipeline management, and system-level interaction. Operator access is not applied for. It is provisioned.",
    scope: [
      "Live operational monitoring and signal dashboards",
      "Analytical tooling and inference environments",
      "Data pipeline configuration and source management",
      "Index administration — commit, archive, version, restrict",
    ],
  },
];

/* ── Method Phases ────────────────────────────────────────────── */

export const METHOD_PHASES: MethodPhase[] = [
  {
    id: "01",
    label: "Collection Discipline",
    headline: "Source selection is a decision, not a default.",
    body: "INDEX does not monitor everything available. Collection discipline means defining which source categories are worth monitoring before monitoring begins. Sources are evaluated for reliability, recency, and relevance to defined analytical domains.",
    rules: [
      "Source inclusion requires a documented rationale",
      "Source reliability is scored and reviewed — not assumed",
      "Collection scope is bounded — domains are defined before sources are added",
    ],
  },
  {
    id: "02",
    label: "Signal Classification",
    headline: "Every signal must be classified before it enters the record.",
    body: "Classification routes a signal into the INDEX architecture. It determines the signal's type, source category, domain assignment, and triage outcome. Unclassified signals are held in the staging queue — they do not auto-route.",
    rules: [
      "Signals are not auto-committed without classification",
      "Classification includes source type, domain, and triage outcome",
      "Dismissal is a logged outcome — signals are not silently discarded",
    ],
  },
  {
    id: "03",
    label: "Data Structuring",
    headline: "Structuring converts a classified signal into a usable data entry.",
    body: "Structuring is the translation layer between raw classified signal and committed dataset record. A signal that passes triage is given scope, source attribution, and a domain assignment.",
    rules: [
      "Structured entries have defined scope — no open-ended records",
      "Source attribution is applied at structuring, not inferred later",
      "Structured entries are validated before dataset assignment",
    ],
  },
  {
    id: "04",
    label: "Dataset Assignment",
    headline: "Structured data is assigned to a bounded domain collection.",
    body: "Datasets are not storage buckets. They are bounded collections with defined analytical scope. When a structured entry is assigned to a dataset, it must fit the domain definition.",
    rules: [
      "Dataset boundaries are enforced — no catch-all collections",
      "Cross-domain signals require explicit classification before assignment",
      "Dataset scope is reviewed when new signal types emerge",
    ],
  },
  {
    id: "05",
    label: "Index Commitment",
    headline: "Committed records are fixed entries in the searchable data layer.",
    body: "When a structured, dataset-assigned entry meets all criteria, it is committed to the INDEX layer. Committed records are discrete, searchable entries with defined status. Once committed, records are not overwritten — revisions are versioned.",
    rules: [
      "Committed records are not overwritten — revisions are versioned",
      "Each record carries a commit timestamp and source attribution",
      "Records with expired sources are flagged, not deleted",
    ],
  },
  {
    id: "06",
    label: "Synthesis Layer",
    headline: "Synthesis flows from indexed records outward — not from raw signals.",
    body: "Synthesis is not part of the intake pipeline. It is the output layer — analysis drawn from indexed records, across datasets, with stated confidence. Synthesis products reference their record sources explicitly.",
    rules: [
      "Synthesis references indexed records — not raw signal logs",
      "Analytical confidence is stated, not implied",
      "Inference and sourced observation are kept in separate layers",
    ],
  },
];

/* ── Platform Status (live values injected here) ──────────────── */

export const PLATFORM_STATUS: PlatformStatus = {
  signalSources: 0,
  activeSources: 0,
  totalRecords: 0,
  activeDatasets: 0,
  lastIndexed: null,
  systemStatus: "online",
};
