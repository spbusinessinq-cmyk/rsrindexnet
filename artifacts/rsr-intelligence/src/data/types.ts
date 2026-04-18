/* ── INDEX Data Network — Type Definitions ─────────────────────────────────
   These types define the data contracts for the INDEX platform.
   Pages bind to these shapes. Live data sources must conform to these interfaces.
   ──────────────────────────────────────────────────────────────────────────── */

/* ── Record Layer ─────────────────────────────────────────────── */

export type RecordStatus = "active" | "archived" | "restricted" | "draft";
export type RecordClassification = "public" | "internal" | "restricted" | "confidential";
export type RecordConfidence = "confirmed" | "probable" | "unverified" | "disputed";
export type SourceType = "osint" | "structured-feed" | "pattern-flag" | "manual" | "derived";

export interface IndexRecord {
  id: string;
  subject: string;
  domain: DomainId;
  classification: RecordClassification;
  dateIndexed: string;           // ISO 8601
  dateUpdated: string;           // ISO 8601
  status: RecordStatus;
  source: string;                // source identifier
  sourceType: SourceType;
  confidence: RecordConfidence;
  tags?: string[];
  notes?: string;
  version: number;
}

/* ── Dataset Layer ────────────────────────────────────────────── */

export type DomainId = "POL" | "ECO" | "INF" | "ORG" | "MED" | "GEO";
export type BindingStatus = "bound" | "unbound" | "partial";
export type DatasetStatus = "active" | "defined" | "inactive" | "deprecated";
export type UpdateCadence = "realtime" | "hourly" | "daily" | "weekly" | "manual" | null;

export interface DatasetDomain {
  id: DomainId;
  label: string;
  description: string;
  schemaVersion: string;
  status: DatasetStatus;
  bindingStatus: BindingStatus;
  sourcesActive: number;
  recordCount: number;
  lastUpdated: string | null;
  updateCadence: UpdateCadence;
  fields: RecordField[];
}

export interface RecordField {
  key: string;
  label: string;
  type: "string" | "date" | "enum" | "number" | "boolean" | "ref";
  required: boolean;
  description?: string;
}

/* ── Signal Layer ─────────────────────────────────────────────── */

export type SignalCategoryId = "OPN" | "STR" | "FLG" | "MAN";
export type SignalIntakeType = "passive" | "active" | "manual" | "scheduled";
export type FeedState = "connected" | "disconnected" | "staged" | "error" | "unbound";
export type TriageOutcome = "committed" | "held" | "dismissed" | "pending";

export interface SignalCategory {
  id: SignalCategoryId;
  label: string;
  description: string;
  intakeType: SignalIntakeType;
  intakeLogic: string;
  validationRule: string;
}

export interface SignalSource {
  id: string;
  categoryId: SignalCategoryId;
  label: string;
  type: SourceType;
  feedState: FeedState;
  reliability: number | null;   // 0–1 scale
  lastSignal: string | null;    // ISO 8601
  intakeCount: number;
  boundAt: string | null;       // ISO 8601
}

/* ── Access Layer ─────────────────────────────────────────────── */

export type AccessTierId = "PUBLIC" | "RESTRICTED" | "OPERATOR";
export type TierStatus = "active" | "controlled" | "restricted";

export interface AccessTier {
  id: AccessTierId;
  label: string;
  status: TierStatus;
  statusNote: string;
  description: string;
  scope: string[];
}

/* ── Method Layer ─────────────────────────────────────────────── */

export interface MethodPhase {
  id: string;
  label: string;
  headline: string;
  body: string;
  rules: string[];
}

/* ── Platform State ───────────────────────────────────────────── */

export interface PlatformStatus {
  signalSources: number;
  activeSources: number;
  totalRecords: number;
  activeDatasets: number;
  lastIndexed: string | null;
  systemStatus: "online" | "degraded" | "maintenance";
}
