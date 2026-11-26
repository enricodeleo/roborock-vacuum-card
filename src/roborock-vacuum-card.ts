import { LitElement, css, html, nothing, svg, type PropertyValues, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import iconCharging from "../assets/states/charging.svg";
import iconCleaning from "../assets/states/cleaning.svg";
import iconDocked from "../assets/states/docked.svg";
import iconDrying from "../assets/states/drying.svg";
import iconEmptying from "../assets/states/emptying.svg";
import iconError from "../assets/states/error.svg";
import iconIdle from "../assets/states/idle.svg";
import iconMopping from "../assets/states/mopping.svg";
import iconPaused from "../assets/states/paused.svg";
import iconReturning from "../assets/states/returning.svg";
import iconWashing from "../assets/states/washing.svg";

declare const __VERSION__: string;

// The few Home Assistant frontend types this card uses.
interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
}

interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string;
  platform: string;
  translation_key?: string;
}

interface HassDevice {
  id: string;
  name?: string | null;
  config_entries: string[];
}

interface Hass {
  states: Record<string, HassEntityState>;
  entities: Record<string, HassEntityRegistryEntry>;
  devices: Record<string, HassDevice>;
  areas: Record<string, { area_id: string; name: string }>;
  locale: { language: string };
  callService(domain: string, service: string, data: Record<string, unknown>): Promise<unknown>;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  formatEntityState?(stateObj: HassEntityState, state?: string): string;
  formatEntityAttributeValue?(stateObj: HassEntityState, attribute: string, value?: unknown): string;
}

type Role =
  | "status"
  | "battery"
  | "vacuum_error"
  | "dock_error"
  | "current_room"
  | "progress"
  | "cleaning_time"
  | "cleaning_area"
  | "last_clean_end"
  | "total_count"
  | "total_area"
  | "cleaning_mode"
  | "selected_map"
  | "mop_attached"
  | "mop_drying"
  | "mop_drying_remaining"
  | "clean_water"
  | "dirty_water"
  | "water_shortage"
  | "resolve_dock_error"
  | "empty_bin"
  | "map";

interface CardConfig extends Partial<Record<Role, string>> {
  type: string;
  entity: string;
  name?: string;
  hide_controls?: boolean;
  hide_maintenance?: boolean;
}

// The Roborock integration's translation keys. Dock entities live on a second device
// ("<name> Dock"), so both devices are searched.
const DISCOVERY: Record<Role, { domain: string; keys: string[]; match?: RegExp }> = {
  status: { domain: "sensor", keys: ["status", "q7_status"] },
  battery: { domain: "sensor", keys: [], match: /_battery$/ },
  vacuum_error: { domain: "sensor", keys: ["vacuum_error"] },
  dock_error: { domain: "sensor", keys: ["dock_error"] },
  current_room: { domain: "sensor", keys: ["current_room"] },
  progress: { domain: "sensor", keys: ["clean_percent"] },
  cleaning_time: { domain: "sensor", keys: ["cleaning_time"] },
  cleaning_area: { domain: "sensor", keys: ["cleaning_area"] },
  last_clean_end: { domain: "sensor", keys: ["last_clean_end"] },
  total_count: { domain: "sensor", keys: ["total_cleaning_count"] },
  total_area: { domain: "sensor", keys: ["total_cleaning_area"] },
  cleaning_mode: { domain: "select", keys: ["cleaning_mode"] },
  selected_map: { domain: "select", keys: ["selected_map"] },
  mop_attached: { domain: "binary_sensor", keys: ["mop_attached"] },
  mop_drying: { domain: "binary_sensor", keys: ["mop_drying_status"] },
  mop_drying_remaining: { domain: "sensor", keys: ["mop_drying_remaining_time"] },
  clean_water: { domain: "binary_sensor", keys: ["clean_box_empty"] },
  dirty_water: { domain: "binary_sensor", keys: ["dirty_box_full"] },
  water_shortage: { domain: "binary_sensor", keys: ["water_shortage"] },
  resolve_dock_error: { domain: "button", keys: ["resolve_dock_error"] },
  empty_bin: { domain: "button", keys: ["empty_dustbin"] },
  map: { domain: "image", keys: [] },
};

// Consumables, in the order they are listed. Not every model has all of them.
const MAINTENANCE: Array<{ key: string; soon: number }> = [
  { key: "main_brush_time_left", soon: 10 },
  { key: "side_brush_time_left", soon: 10 },
  { key: "filter_time_left", soon: 10 },
  { key: "sensor_time_left", soon: 3 },
  { key: "strainer_time_left", soon: 5 },
  { key: "mop_life_time_left", soon: 10 },
  { key: "cleaning_brush_time_left", soon: 10 },
];

const LABELS: Record<string, string> = {
  entity: "Roborock vacuum",
  name: "Name",
  hide_controls: "Hide controls",
  hide_maintenance: "Hide maintenance",
  status: "Status",
  battery: "Battery",
  vacuum_error: "Vacuum error",
  dock_error: "Dock error",
  current_room: "Current room",
  progress: "Cleaning progress",
  cleaning_time: "Cleaning time",
  cleaning_area: "Cleaning area",
  last_clean_end: "Last clean end",
  total_count: "Total cleaning count",
  total_area: "Total cleaning area",
  cleaning_mode: "Cleaning mode",
  selected_map: "Selected map",
  mop_attached: "Mop attached",
  mop_drying: "Mop drying",
  mop_drying_remaining: "Mop drying remaining time",
  clean_water: "Clean water box",
  dirty_water: "Dirty water box",
  water_shortage: "Water shortage",
  resolve_dock_error: "Resolve dock error button",
  empty_bin: "Empty dustbin button",
  map: "Map image",
};

type Icon =
  | "idle"
  | "cleaning"
  | "mopping"
  | "returning"
  | "charging"
  | "docked"
  | "emptying"
  | "washing"
  | "drying"
  | "paused"
  | "error";
const ICONS: Record<Icon, string> = {
  idle: iconIdle,
  cleaning: iconCleaning,
  mopping: iconMopping,
  returning: iconReturning,
  charging: iconCharging,
  docked: iconDocked,
  emptying: iconEmptying,
  washing: iconWashing,
  drying: iconDrying,
  paused: iconPaused,
  error: iconError,
};

type Tone = "grey" | "blue" | "teal" | "green" | "amber" | "orange";

// Status sensor values (most models' "status", the Q7's "q7_status") grouped by what the
// card shows. "work" is cleaning: the icon then depends on whether it mops.
type Kind = "work" | "mop-work" | "returning" | "mop-trip" | "charging" | "docked" | "emptying" | "washing" | "drying" | "paused" | "error" | "idle";
const STATUS_KIND: Record<string, Kind> = {
  cleaning: "work",
  segment_cleaning: "work",
  zoned_cleaning: "work",
  spot_cleaning: "work",
  manual_mode: "work",
  remote_control_active: "work",
  going_to_target: "work",
  mapping: "work",
  relocating: "work",
  sweeping: "work",
  mopping: "mop-work",
  sweep_and_mop: "mop-work",
  moping: "mop-work",
  sweep_moping: "mop-work",
  sweep_moping_2: "mop-work",
  returning_home: "returning",
  docking: "returning",
  going_to_wash_the_mop: "mop-trip",
  charging: "charging",
  charging_complete: "docked",
  waiting_to_charge: "docked",
  attaching_the_mop: "docked",
  detaching_the_mop: "docked",
  updating: "docked",
  saving_map: "docked",
  emptying_the_bin: "emptying",
  washing_the_mop: "washing",
  mop_cleaning: "washing",
  mop_airdrying: "drying",
  air_drying_stopping: "drying",
  paused: "paused",
  working_sleep: "paused",
  error: "error",
  charging_problem: "error",
  idle: "idle",
  sleeping: "idle",
  waiting_for_orders: "idle",
  starting: "idle",
  charger_disconnected: "idle",
  shutting_down: "idle",
  transitioning: "idle",
  locked: "idle",
  egg_attack: "idle",
  device_offline: "idle",
};
// The vacuum entity's own state, for statuses the card doesn't know.
const ACTIVITY_KIND: Record<string, Kind> = {
  cleaning: "work",
  returning: "returning",
  docked: "docked",
  paused: "paused",
  error: "error",
  idle: "idle",
};

const OFF = new Set(["unavailable", "unknown"]);

const TEXT = {
  en: {
    title: "Robot vacuum",
    unavailable: "Unavailable",
    noData: "No data from the vacuum",
    lastClean: (t: string) => `Last clean ended ${t}`,
    done: (p: number) => `${p}% done`,
    cleaningTime: "Cleaning time",
    area: "Area",
    suction: "Suction",
    lastCleanStat: "Last clean",
    cleans: "Cleans",
    totalArea: "Total area",
    dock: "Dock",
    cleanWaterOk: "Clean water OK",
    cleanWaterEmpty: "Clean water empty",
    dirtyWaterOk: "Dirty water OK",
    dirtyWaterFull: "Dirty water full",
    waterShortage: "Water shortage",
    mopDrying: (d: string) => (d ? `Mop drying · ${d} left` : "Mop drying"),
    dryingMop: "Drying the mop",
    error: "Error",
    emptyBin: "Empty bin",
    resolve: "Resolve",
    robot: "Robot",
    mapTab: "Map",
    robotError: (e: string) => `Robot: ${e}`,
    dockError: (e: string) => `Dock: ${e}`,
    maintenance: "Maintenance",
    overdue: "Overdue",
    hoursLeft: (h: number) => `${h} h left`,
    room: "Room",
    allRooms: "All rooms",
    mode: "Mode",
    start: "Start",
    resume: "Resume",
    pause: "Pause",
    stop: "Stop",
    home: "Dock",
    locate: "Locate",
    duration: (m: number) =>
      m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`,
    missing: "Entity not found",
  },
  it: {
    title: "Robot aspirapolvere",
    unavailable: "Non disponibile",
    noData: "Nessun dato dal robot",
    lastClean: (t: string) => `Ultima pulizia finita alle ${t}`,
    done: (p: number) => `${p}% fatto`,
    cleaningTime: "Tempo",
    area: "Area",
    suction: "Aspirazione",
    lastCleanStat: "Ultima pulizia",
    cleans: "Pulizie",
    totalArea: "Area totale",
    dock: "Base",
    cleanWaterOk: "Acqua pulita OK",
    cleanWaterEmpty: "Acqua pulita finita",
    dirtyWaterOk: "Acqua sporca OK",
    dirtyWaterFull: "Acqua sporca piena",
    waterShortage: "Manca acqua",
    mopDrying: (d: string) => (d ? `Asciugatura mop · ${d}` : "Asciugatura mop"),
    dryingMop: "Asciuga il mop",
    error: "Errore",
    emptyBin: "Svuota contenitore",
    resolve: "Risolvi",
    robot: "Robot",
    mapTab: "Mappa",
    robotError: (e: string) => `Robot: ${e}`,
    dockError: (e: string) => `Base: ${e}`,
    maintenance: "Manutenzione",
    overdue: "Da sostituire",
    hoursLeft: (h: number) => `${h} h rimaste`,
    room: "Stanza",
    allRooms: "Tutte",
    mode: "Modalità",
    start: "Avvia",
    resume: "Riprendi",
    pause: "Pausa",
    stop: "Ferma",
    home: "Base",
    locate: "Trova",
    duration: (m: number) =>
      m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`,
    missing: "Entità non trovata",
  },
};

// Material Design Icons paths for the toolbar, so the buttons don't depend on ha-icon sizing.
const TOOL_ICON = {
  play: "M8 5.14v14l11-7-11-7z",
  pause: "M14 19h4V5h-4M6 19h4V5H6v14z",
  stop: "M18 18H6V6h12v12z",
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z",
  locate:
    "M12 8a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m-8.95 5H1v-2h2.05C3.5 6.83 6.83 3.5 11 3.05V1h2v2.05c4.17.45 7.5 3.78 7.95 7.95H23v2h-2.05c-.45 4.17-3.78 7.5-7.95 7.95V23h-2v-2.05C6.83 20.5 3.5 17.17 3.05 13M12 5a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7z",
};

interface Pill {
  text: string;
  entity?: HassEntityState;
  kind: "ok" | "bad" | "info";
}

export class RoborockVacuumCard extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private config?: CardConfig;
  @state() private view: "robot" | "map" = "robot";
  @state() private room = "";
  // Area ids the vacuum can clean, from its room mapping (Settings → the vacuum → Rooms).
  @state() private areaIds?: string[];
  private areasFor?: string;
  private readonly reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  private readonly onMotionChange = () => this.requestUpdate();

  static getConfigForm() {
    const optional = (name: string, domain: string) => ({
      name,
      selector: { entity: { filter: { domain } } },
    });
    return {
      schema: [
        {
          name: "entity",
          required: true,
          selector: { entity: { filter: { domain: "vacuum", integration: "roborock" } } },
        },
        { name: "name", selector: { text: {} } },
        { name: "hide_controls", selector: { boolean: {} } },
        { name: "hide_maintenance", selector: { boolean: {} } },
        {
          type: "expandable",
          name: "",
          title: "Entities (found automatically on the vacuum and its dock)",
          schema: (Object.keys(DISCOVERY) as Role[]).map((r) => optional(r, DISCOVERY[r].domain)),
        },
      ],
      computeLabel: (field: { name: string }) => LABELS[field.name],
    };
  }

  static getStubConfig(hass: Hass): Partial<CardConfig> {
    const vacuum = Object.values(hass.entities).find(
      (e) => e.platform === "roborock" && e.entity_id.startsWith("vacuum."),
    );
    return { entity: vacuum?.entity_id ?? "vacuum.roborock" };
  }

  setConfig(config: CardConfig): void {
    if (!config.entity) {
      throw new Error("entity is required: the Roborock vacuum entity");
    }
    this.config = config;
  }

  getCardSize(): number {
    return 12;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.reducedMotion.addEventListener("change", this.onMotionChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.reducedMotion.removeEventListener("change", this.onMotionChange);
  }

  private get t() {
    const lang = this.hass?.locale.language.split("-")[0] ?? "en";
    return lang === "it" ? TEXT.it : TEXT.en;
  }

  // The vacuum's device plus its dock: the Roborock integration adds the dock as a
  // separate device named "<vacuum> Dock" under the same account.
  private deviceIds(): Set<string> {
    const hass = this.hass!;
    const deviceId = hass.entities[this.config!.entity]?.device_id;
    const ids = new Set<string>();
    if (!deviceId) return ids;
    ids.add(deviceId);
    const device = hass.devices?.[deviceId];
    if (device?.name) {
      for (const d of Object.values(hass.devices)) {
        if (
          d.name === `${device.name} Dock` &&
          d.config_entries.some((c) => device.config_entries.includes(c))
        ) {
          ids.add(d.id);
        }
      }
    }
    return ids;
  }

  private onDevices(): HassEntityRegistryEntry[] {
    const devices = this.deviceIds();
    return Object.values(this.hass!.entities).filter(
      (e) => e.platform === "roborock" && e.device_id !== undefined && devices.has(e.device_id),
    );
  }

  // Configured entities first, then the Roborock entities on the vacuum and its dock.
  private entities(): Partial<Record<Role, HassEntityState>> {
    const hass = this.hass!;
    const config = this.config!;
    const onDevices = this.onDevices();
    const out: Partial<Record<Role, HassEntityState>> = {};
    for (const role of Object.keys(DISCOVERY) as Role[]) {
      const { domain, keys, match } = DISCOVERY[role];
      const inDomain = onDevices.filter((e) => e.entity_id.startsWith(`${domain}.`));
      let id = config[role];
      if (!id) {
        if (role === "map") {
          id = this.mapImage(inDomain.map((e) => e.entity_id), out.selected_map);
        } else {
          id = (
            inDomain.find((e) => e.translation_key && keys.includes(e.translation_key)) ??
            (match ? inDomain.find((e) => match.test(e.entity_id)) : undefined)
          )?.entity_id;
        }
      }
      if (id && hass.states[id]) out[role] = hass.states[id];
    }
    return out;
  }

  // One image per map; prefer the one named like the selected map.
  private mapImage(ids: string[], selected?: HassEntityState): string | undefined {
    const name = selected?.state;
    const named = name
      ? ids.find((id) => String(this.hass!.states[id]?.attributes.friendly_name ?? "").endsWith(name))
      : undefined;
    return named ?? ids[0];
  }

  private maintenance(): HassEntityState[] {
    const onDevices = this.onDevices();
    return MAINTENANCE.map(({ key }) => onDevices.find((e) => e.translation_key === key))
      .filter((e): e is HassEntityRegistryEntry => Boolean(e))
      .map((e) => this.hass!.states[e.entity_id])
      .filter((s): s is HassEntityState => Boolean(s));
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!changed.has("hass") || changed.size > 1) return true;
    const before = changed.get("hass") as Hass | undefined;
    if (!before || !this.hass || !this.config) return true;
    if (
      before.locale !== this.hass.locale ||
      before.entities !== this.hass.entities ||
      before.areas !== this.hass.areas
    ) {
      return true;
    }
    const ids = [
      this.config.entity,
      ...Object.values(this.entities()).map((s) => s.entity_id),
      ...this.maintenance().map((s) => s.entity_id),
    ];
    return ids.some((id) => before.states[id] !== this.hass!.states[id]);
  }

  protected updated(): void {
    this.loadAreas();
    // The icons animate with SMIL; hold them still when the user asks for reduced motion.
    const svgEl = this.renderRoot.querySelector<SVGSVGElement>(".art svg");
    if (!svgEl) return;
    if (this.reducedMotion.matches) {
      svgEl.pauseAnimations();
      svgEl.setCurrentTime(0);
    } else {
      svgEl.unpauseAnimations();
    }
  }

  // The vacuum entity's room mapping lives in its registry options; reading one entry
  // doesn't need admin rights. Without a mapping the room list stays hidden.
  private loadAreas(): void {
    const entity = this.config?.entity;
    if (!this.hass || !entity || this.areasFor === entity) return;
    this.areasFor = entity;
    this.hass
      .callWS<{ options?: { vacuum?: { area_mapping?: Record<string, string[]> } } }>({
        type: "config/entity_registry/get",
        entity_id: entity,
      })
      .then((entry) => {
        const mapping = entry.options?.vacuum?.area_mapping ?? {};
        this.areaIds = Object.keys(mapping).filter((a) => (mapping[a] ?? []).length > 0);
      })
      .catch(() => {
        this.areaIds = [];
      });
  }

  private call(ev: Event, domain: string, service: string, data: Record<string, unknown>): void {
    ev.stopPropagation();
    // Home Assistant shows its own toast when an action fails.
    Promise.resolve(this.hass!.callService(domain, service, data)).catch(() => {});
  }

  private moreInfo(ev: Event, entityId: string): void {
    ev.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }),
    );
  }

  private format(entity: HassEntityState | undefined): string {
    if (!entity) return "";
    return this.hass!.formatEntityState?.(entity) ?? entity.state;
  }

  // A duration sensor in minutes, whatever unit it reports in.
  private minutes(entity: HassEntityState | undefined): number | undefined {
    if (!entity || OFF.has(entity.state)) return undefined;
    const v = Number(entity.state);
    if (Number.isNaN(v)) return undefined;
    const unit = String(entity.attributes.unit_of_measurement ?? "s");
    const factor = unit === "h" ? 60 : unit === "min" ? 1 : unit === "d" ? 1440 : 1 / 60;
    return v * factor;
  }

  private time(date: Date): string {
    const lang = this.hass?.locale.language;
    const today = new Date().toDateString() === date.toDateString();
    return today
      ? date.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString(lang, { day: "numeric", month: "short" });
  }

  private pill(p: Pill): TemplateResult {
    return html`<span
      class="pill ${p.kind} ${p.entity ? "link" : ""}"
      @click=${p.entity ? (e: Event) => this.moreInfo(e, p.entity!.entity_id) : undefined}
      ><i></i>${p.text}</span
    >`;
  }

  private tool(label: string, path: string, onClick: (e: Event) => void): TemplateResult {
    return html`<button class="tool" @click=${onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">${svg`<path d=${path}></path>`}</svg>${label}
    </button>`;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) return nothing;
    const hass = this.hass;
    const t = this.t;
    const config = this.config;
    const vacuum = hass.states[config.entity];
    if (!vacuum) {
      return html`<ha-card><div class="missing">${t.missing}: ${config.entity}</div></ha-card>`;
    }
    const ents = this.entities();
    const offline = OFF.has(vacuum.state);
    const on = (role: Role) => ents[role]?.state === "on";
    const value = (role: Role) => {
      const s = ents[role]?.state;
      return s === undefined || OFF.has(s) ? undefined : s;
    };
    const num = (role: Role) => {
      const v = Number(value(role));
      return value(role) === undefined || Number.isNaN(v) ? undefined : v;
    };

    const status = value("status");
    let kind: Kind = (status && STATUS_KIND[status]) || ACTIVITY_KIND[vacuum.state] || "idle";
    if (kind === "idle" && vacuum.state === "docked") kind = "docked";
    // The dock dries the mop after washing while the robot charges.
    if (on("mop_drying") && (kind === "charging" || kind === "docked" || kind === "idle")) kind = "drying";

    const vacuumError = value("vacuum_error");
    const dockError = value("dock_error");
    const hasRobotError = vacuumError !== undefined && vacuumError !== "none";
    const hasDockError = dockError !== undefined && dockError !== "ok";
    if (hasRobotError) kind = "error";

    const modeValue = value("cleaning_mode");
    const mops =
      kind === "mop-work" ||
      (kind === "work" &&
        (modeValue === "mop" || modeValue === "vac_and_mop" || (modeValue !== "vacuum" && on("mop_attached"))));

    const KIND: Record<Kind, [Icon, Tone]> = {
      work: [mops ? "mopping" : "cleaning", "blue"],
      "mop-work": ["mopping", "blue"],
      returning: ["returning", "blue"],
      "mop-trip": ["returning", "teal"],
      charging: ["charging", "green"],
      docked: ["docked", "grey"],
      emptying: ["emptying", "teal"],
      washing: ["washing", "teal"],
      drying: ["drying", "teal"],
      paused: ["paused", "amber"],
      error: ["error", "orange"],
      idle: ["idle", "grey"],
    };
    const [icon, tone] = offline ? (["idle", "grey"] as [Icon, Tone]) : KIND[kind];
    // The integration's own translation of the status, in the user's language.
    const label = offline
      ? t.unavailable
      : kind === "drying" && status !== "mop_airdrying"
        ? t.dryingMop
        : kind === "error" && hasRobotError
          ? t.error
          : status
            ? this.format(ents.status)
            : this.format(vacuum);

    const working = kind === "work" || kind === "mop-work" || kind === "paused";
    const room = value("current_room");
    const mode = ents.cleaning_mode && modeValue ? this.format(ents.cleaning_mode) : "";
    const lastEnd = value("last_clean_end");
    const sub = offline
      ? t.noData
      : working || kind === "returning" || kind === "mop-trip"
        ? [room, mode].filter(Boolean).join(" · ") || this.format(vacuum)
        : lastEnd
          ? t.lastClean(this.time(new Date(lastEnd)))
          : this.format(vacuum);

    const battery = num("battery") ?? (vacuum.attributes.battery_level as number | undefined);
    const errorText = offline
      ? ""
      : hasRobotError
        ? t.robotError(this.format(ents.vacuum_error))
        : hasDockError
          ? t.dockError(this.format(ents.dock_error))
          : "";
    const resolve = !hasRobotError && hasDockError ? ents.resolve_dock_error : undefined;

    const progress = num("progress");
    const showProgress = working && progress !== undefined;

    const fanSpeed = vacuum.attributes.fan_speed as string | undefined;
    const fanLabel = fanSpeed
      ? (hass.formatEntityAttributeValue?.(vacuum, "fan_speed") ?? fanSpeed)
      : "—";
    const cleaningMinutes = this.minutes(ents.cleaning_time);
    const stats: Array<[string, string, string]> = working
      ? [
          [t.cleaningTime, cleaningMinutes === undefined ? "—" : String(Math.round(cleaningMinutes)), cleaningMinutes === undefined ? "" : "min"],
          [t.area, num("cleaning_area") === undefined ? "—" : String(num("cleaning_area")), num("cleaning_area") === undefined ? "" : "m²"],
          [t.suction, fanLabel, ""],
        ]
      : [
          [t.lastCleanStat, lastEnd ? this.time(new Date(lastEnd)) : "—", ""],
          [t.cleans, value("total_count") ?? "—", ""],
          [t.totalArea, num("total_area") === undefined ? "—" : String(Math.round(num("total_area")!)), num("total_area") === undefined ? "" : "m²"],
        ];

    const dockPills: Pill[] = [];
    if (!offline) {
      if (ents.clean_water) {
        dockPills.push({ text: on("clean_water") ? t.cleanWaterEmpty : t.cleanWaterOk, entity: ents.clean_water, kind: on("clean_water") ? "bad" : "ok" });
      }
      if (ents.dirty_water) {
        dockPills.push({ text: on("dirty_water") ? t.dirtyWaterFull : t.dirtyWaterOk, entity: ents.dirty_water, kind: on("dirty_water") ? "bad" : "ok" });
      }
      if (on("water_shortage")) dockPills.push({ text: t.waterShortage, entity: ents.water_shortage, kind: "bad" });
      if (on("mop_drying")) {
        const left = this.minutes(ents.mop_drying_remaining);
        dockPills.push({ text: t.mopDrying(left ? t.duration(Math.round(left)) : ""), entity: ents.mop_drying, kind: "info" });
      }
    }
    // Only real button entities: most models have none for emptying or washing on demand.
    const emptyBin = ents.empty_bin && ents.empty_bin.state !== "unavailable" ? ents.empty_bin : undefined;

    const maint = config.hide_maintenance
      ? []
      : this.maintenance().map((e, i) => {
          const minutes = this.minutes(e);
          const soon = MAINTENANCE.find((m) => m.key === hass.entities[e.entity_id]?.translation_key)?.soon ?? 10;
          const hours = minutes === undefined ? undefined : Math.floor(minutes / 60);
          const name = String(e.attributes.friendly_name ?? "")
            .replace(String(hass.devices?.[hass.entities[e.entity_id]?.device_id ?? ""]?.name ?? ""), "")
            .replace(/ time left$/i, "")
            .trim();
          const cls = hours === undefined ? "" : hours <= 0 ? "bad" : hours <= soon ? "soon" : "";
          return { e, i, name, text: hours === undefined ? "—" : hours <= 0 ? t.overdue : t.hoursLeft(hours), cls };
        });

    const running = kind === "work" || kind === "mop-work" || kind === "returning" || kind === "mop-trip";
    const paused = kind === "paused";
    const id = { entity_id: config.entity };
    const areas = (this.areaIds ?? []).filter((a) => hass.areas?.[a]);
    const fanSpeeds = (vacuum.attributes.fan_speed_list as string[] | undefined) ?? [];
    const modeOptions = (ents.cleaning_mode?.attributes.options as string[] | undefined) ?? [];
    const start = (e: Event) =>
      this.room && !paused
        ? this.call(e, "vacuum", "clean_area", { ...id, cleaning_area_id: [this.room] })
        : this.call(e, "vacuum", "start", id);

    const showMap = this.view === "map" && ents.map;
    const mapUrl = ents.map?.attributes.entity_picture as string | undefined;

    return html`
      <ha-card class="tone-${tone}" @click=${(e: Event) => this.moreInfo(e, config.entity)}>
        <div class="head">
          <div class="titles">
            <div class="name">${config.name ?? (vacuum.attributes.friendly_name as string | undefined) ?? t.title}</div>
            <div class="muted">${sub}</div>
          </div>
          ${battery !== undefined
            ? html`<span
                class="battery ${battery <= 20 ? "low" : ""} ${ents.battery ? "link" : ""}"
                @click=${ents.battery ? (e: Event) => this.moreInfo(e, ents.battery!.entity_id) : undefined}
              >
                <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true">
                  <rect x="1" y="1" width="17" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"></rect>
                  <rect x="19" y="4" width="2" height="4" rx="1" fill="currentColor"></rect>
                  <rect x="3" y="3" width=${Math.max(1, Math.round((13 * battery) / 100))} height="6" rx="1" fill="currentColor"></rect></svg
                >${Math.round(battery)}%</span
              >`
            : nothing}
        </div>
        ${errorText
          ? html`<div class="alert">
              <span>${errorText}</span>
              ${resolve
                ? html`<button class="outline" @click=${(e: Event) => this.call(e, "button", "press", { entity_id: resolve.entity_id })}>
                    ${t.resolve}
                  </button>`
                : nothing}
            </div>`
          : nothing}
        <div class="hero">
          ${ents.map
            ? html`<div class="tabs" role="group">
                <button aria-pressed=${this.view === "robot"} @click=${(e: Event) => { e.stopPropagation(); this.view = "robot"; }}>${t.robot}</button>
                <button aria-pressed=${this.view === "map"} @click=${(e: Event) => { e.stopPropagation(); this.view = "map"; }}>${t.mapTab}</button>
              </div>`
            : nothing}
          ${showMap && mapUrl
            ? html`<img class="map" src=${mapUrl} alt=${String(ents.map!.attributes.friendly_name ?? t.mapTab)} @click=${(e: Event) => this.moreInfo(e, ents.map!.entity_id)} />`
            : html`<div class="art">${unsafeHTML(ICONS[icon])}</div>`}
          <span class="chip">${label}</span>
        </div>
        ${showProgress
          ? html`<div class="progress">
              <div class="progress-row"><span>${room ?? ""}</span><span class="muted">${t.done(progress!)}</span></div>
              <div class="bar"><div style="width:${Math.min(100, Math.max(0, progress!))}%"></div></div>
            </div>`
          : nothing}
        <div class="stats">
          ${stats.map(([k, v, u]) => html`<div class="stat"><span class="v">${v}${u ? html`<small> ${u}</small>` : nothing}</span><span class="muted">${k}</span></div>`)}
        </div>
        ${dockPills.length || emptyBin
          ? html`<div class="section">
              <div class="heading">${t.dock}</div>
              ${dockPills.length ? html`<div class="pills">${dockPills.map((p) => this.pill(p))}</div>` : nothing}
              ${emptyBin && !config.hide_controls
                ? html`<div class="row"><button class="outline" @click=${(e: Event) => this.call(e, "button", "press", { entity_id: emptyBin.entity_id })}>${t.emptyBin}</button></div>`
                : nothing}
            </div>`
          : nothing}
        ${maint.length
          ? html`<div class="section">
              <div class="heading">${t.maintenance}</div>
              <div class="maint">
                ${maint.map((m) => html`<div class="link" @click=${(ev: Event) => this.moreInfo(ev, m.e.entity_id)}><span class="muted">${m.name}</span><span class=${m.cls}>${m.text}</span></div>`)}
              </div>
            </div>`
          : nothing}
        ${config.hide_controls || offline
          ? nothing
          : html`
              ${areas.length || fanSpeeds.length || modeOptions.length
                ? html`<div class="selects">
                    ${areas.length
                      ? html`<label>${t.room}
                          <select @click=${(e: Event) => e.stopPropagation()} @change=${(e: Event) => (this.room = (e.target as HTMLSelectElement).value)}>
                            <option value="" ?selected=${this.room === ""}>${t.allRooms}</option>
                            ${areas.map((a) => html`<option value=${a} ?selected=${this.room === a}>${hass.areas[a].name}</option>`)}
                          </select></label>`
                      : nothing}
                    ${fanSpeeds.length
                      ? html`<label>${t.suction}
                          <select
                            @click=${(e: Event) => e.stopPropagation()}
                            @change=${(e: Event) => this.call(e, "vacuum", "set_fan_speed", { ...id, fan_speed: (e.target as HTMLSelectElement).value })}
                          >
                            ${fanSpeeds.map((f) => html`<option value=${f} ?selected=${f === fanSpeed}>${hass.formatEntityAttributeValue?.(vacuum, "fan_speed", f) ?? f}</option>`)}
                          </select></label>`
                      : nothing}
                    ${modeOptions.length
                      ? html`<label>${t.mode}
                          <select
                            @click=${(e: Event) => e.stopPropagation()}
                            @change=${(e: Event) => this.call(e, "select", "select_option", { entity_id: ents.cleaning_mode!.entity_id, option: (e.target as HTMLSelectElement).value })}
                          >
                            ${modeOptions.map((o) => html`<option value=${o} ?selected=${o === modeValue}>${hass.formatEntityState?.(ents.cleaning_mode!, o) ?? o}</option>`)}
                          </select></label>`
                      : nothing}
                  </div>`
                : nothing}
              <div class="tools">
                ${running
                  ? this.tool(t.pause, TOOL_ICON.pause, (e) => this.call(e, "vacuum", "pause", id))
                  : this.tool(paused ? t.resume : t.start, TOOL_ICON.play, start)}
                ${this.tool(t.stop, TOOL_ICON.stop, (e) => this.call(e, "vacuum", "stop", id))}
                ${this.tool(t.home, TOOL_ICON.home, (e) => this.call(e, "vacuum", "return_to_base", id))}
                ${this.tool(t.locate, TOOL_ICON.locate, (e) => this.call(e, "vacuum", "locate", id))}
              </div>
            `}
      </ha-card>`;
  }

  static styles = css`
    ha-card {
      --rvc-blue: var(--blue-color, #2196f3);
      --rvc-ok: var(--success-color, #43a047);
      --rvc-warn: var(--warning-color, #fb8c00);
      --rvc-amber: var(--amber-color, #ffc107);
      --rvc-tone: var(--secondary-text-color);
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tone-blue {
      --rvc-tone: var(--rvc-blue);
    }
    .tone-teal {
      --rvc-tone: var(--teal-color, #009688);
    }
    .tone-green {
      --rvc-tone: var(--rvc-ok);
    }
    .tone-amber {
      --rvc-tone: var(--rvc-amber);
    }
    .tone-orange {
      --rvc-tone: var(--rvc-warn);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .titles {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .name {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .muted,
    .missing {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .battery {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .battery.low {
      color: var(--rvc-warn);
    }
    .link {
      cursor: pointer;
    }
    .alert {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 13px;
      color: color-mix(in srgb, var(--rvc-warn) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--rvc-warn) 16%, transparent);
    }
    .alert span {
      flex: 1;
    }
    button {
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }
    .outline {
      min-height: 32px;
      padding: 0 12px;
      border-radius: 16px;
      border: 1px solid currentColor;
      background: transparent;
      color: inherit;
    }
    .section .outline {
      color: var(--primary-color);
      border-color: var(--divider-color);
    }
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .tabs {
      display: inline-flex;
      padding: 3px;
      border-radius: 18px;
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .tabs button {
      min-height: 30px;
      padding: 0 14px;
      border: none;
      border-radius: 15px;
      background: transparent;
      color: var(--secondary-text-color);
    }
    .tabs button[aria-pressed="true"] {
      background: var(--card-background-color, var(--ha-card-background, #fff));
      color: var(--primary-text-color);
    }
    .art {
      width: 168px;
      height: 168px;
      color: var(--primary-text-color);
    }
    .art svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .art .paper {
      fill: var(--card-background-color, var(--ha-card-background, #fff));
    }
    .art .paper-stroke {
      stroke: var(--card-background-color, var(--ha-card-background, #fff));
    }
    .art .dust {
      fill: var(--secondary-text-color);
    }
    .map {
      display: block;
      width: 100%;
      max-height: 320px;
      object-fit: contain;
      border-radius: 8px;
    }
    .chip {
      padding: 5px 14px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 500;
      text-align: center;
      color: color-mix(in srgb, var(--rvc-tone) 65%, var(--primary-text-color));
      background: color-mix(in srgb, var(--rvc-tone) 16%, transparent);
    }
    .progress {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .progress-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .progress-row .muted {
      font-weight: 400;
    }
    .bar {
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color);
    }
    .bar div {
      height: 6px;
      border-radius: 3px;
      background: var(--primary-color);
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      border-top: 1px solid var(--divider-color);
      border-bottom: 1px solid var(--divider-color);
      padding: 10px 0;
    }
    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      min-width: 0;
    }
    .stat + .stat {
      border-left: 1px solid var(--divider-color);
    }
    .stat .v {
      font-size: 18px;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .stat small {
      font-size: 12px;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .stat .muted {
      font-size: 12px;
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .heading {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .pills,
    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .pill i {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: var(--rvc-ok);
    }
    .pill.bad {
      color: color-mix(in srgb, var(--rvc-warn) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--rvc-warn) 16%, transparent);
    }
    .pill.bad i {
      background: var(--rvc-warn);
    }
    .pill.info i {
      background: var(--rvc-blue);
    }
    .maint {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px 16px;
    }
    .maint div {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 13px;
      color: var(--primary-text-color);
    }
    .maint .soon {
      font-weight: 500;
      color: color-mix(in srgb, var(--rvc-amber) 60%, var(--primary-text-color));
    }
    .maint .bad {
      font-weight: 500;
      color: color-mix(in srgb, var(--rvc-warn) 70%, var(--primary-text-color));
    }
    .selects {
      margin-top: 4px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
      gap: 8px;
    }
    .selects label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
      min-width: 0;
    }
    .selects select {
      min-height: 36px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--ha-card-background, #fff));
      color: var(--primary-text-color);
      padding: 0 6px;
      font: inherit;
      font-size: 13px;
      min-width: 0;
    }
    .tools {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 4px;
      border-top: 1px solid var(--divider-color);
      padding-top: 10px;
    }
    .tool {
      min-height: 48px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--primary-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }
    .tool:hover {
      background: color-mix(in srgb, var(--primary-color) 8%, transparent);
    }
    .tool svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
  `;
}

if (!customElements.get("roborock-vacuum-card")) {
  customElements.define("roborock-vacuum-card", RoborockVacuumCard);
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((c) => c.type === "roborock-vacuum-card")) window.customCards.push({
  type: "roborock-vacuum-card",
  name: "Roborock Vacuum Card",
  description: "Status, map, progress, dock, maintenance and controls for any Roborock vacuum.",
  preview: true,
  documentationURL: "https://github.com/enricodeleo/roborock-vacuum-card",
});

console.info(`%c roborock-vacuum-card ${__VERSION__} `, "background:#55bbf8;color:#111");
