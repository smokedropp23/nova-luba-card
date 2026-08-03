import {
  LitElement,
  css,
  html,
  nothing,
  unsafeCSS,
} from "lit";

import {
  customElement,
  property,
  state,
} from "lit/decorators.js";

import { styleMap } from "lit/directives/style-map.js";

import "./components/mower-lighting";

import { getMowerPresentation } from "./constants/mower-presentation";
import { theme } from "./constants/theme";
import { getMowerImage } from "./helpers/get-mower-image";
import { getMowerLightingAssets } from "./helpers/get-mower-lighting-assets";
import { resolveMowerLighting } from "./helpers/resolve-mower-lighting";
import { resolveMowerModel } from "./helpers/resolve-mower-model";
import { resolveMowerState } from "./helpers/resolve-mower-state";

import type { NovaMowerState } from "./types/mower-state";

interface HomeAssistantState {
  state: string;
  attributes: Record<string, unknown>;
}

interface HomeAssistant {
  states: Record<string, HomeAssistantState>;
}

interface NovaLubaCardConfig {
  type: string;
  entity: string;
  name?: string;
  model?: string;

  battery_entity?: string;
  battery_cycles_entity?: string;
  location_entity?: string;
  progress_entity?: string;
  remaining_time_entity?: string;
  total_time_entity?: string;

  last_error_message_entity?: string;
  last_error_time_entity?: string;
  last_error_code_entity?: string;
  activity_mode_entity?: string;
}

interface MowerViewData {
  name: string;
  novaState: NovaMowerState;
  rawState: string;

  progress: number;
  progressLabel: string;

  battery: number;
  batteryLabel: string;
  batteryCyclesLabel: string;

  locationLabel: string;
  remainingTimeLabel: string;
  totalTimeLabel: string;

  lastErrorMessageLabel: string;
  lastErrorTimeLabel: string;
  lastErrorCodeLabel: string;
  activityModeLabel: string;
}

const DEFAULT_BATTERY_ENTITY =
  "sensor.luba_va8tp48r_batterie";

const DEFAULT_BATTERY_CYCLES_ENTITY =
  "sensor.luba_va8tp48r_batteriezyklen";

const DEFAULT_LOCATION_ENTITY =
  "sensor.luba_va8tp48r_aktueller_standort";

const DEFAULT_PROGRESS_ENTITY =
  "sensor.luba_va8tp48r_fortschritt";

const DEFAULT_REMAINING_TIME_ENTITY =
  "sensor.luba_va8tp48r_verbleibende_zeit";

const DEFAULT_TOTAL_TIME_ENTITY =
  "sensor.luba_va8tp48r_gesamtzeit";

const DEFAULT_LAST_ERROR_MESSAGE_ENTITY =
  "sensor.luba_va8tp48r_letzte_fehlermeldung";

const DEFAULT_LAST_ERROR_TIME_ENTITY =
  "sensor.luba_va8tp48r_letzter_fehlerzeitpunkt";

const DEFAULT_LAST_ERROR_CODE_ENTITY =
  "sensor.luba_va8tp48r_letzter_fehlercode";

const DEFAULT_ACTIVITY_MODE_ENTITY =
  "sensor.luba_va8tp48r_aktivitatsmodus";

const stateLabels: Record<NovaMowerState, string> = {
  mowing: "Mäht",
  docked: "Im Dock",
  returning: "Rückkehr zur Ladestation",
  error: "Fehler",
  maintenance: "Wartungsmodus",
  update: "Update verfügbar",
  offline: "Offline",
  unknown: "Unbekannt",
};

@customElement("nova-luba-card")
export class NovaLubaCard extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private config?: NovaLubaCardConfig;

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      position: relative;
      container-type: inline-size;
      overflow: hidden;
      min-height: 520px;
      padding: ${unsafeCSS(theme.spacing.lg)};
      border: 1px solid var(--nova-state-color);
      border-radius: ${unsafeCSS(theme.radius.large)};
      color: ${unsafeCSS(theme.colors.text)};
      background:
        radial-gradient(
          circle at 78% 20%,
          var(--nova-state-soft),
          transparent 38%
        ),
        linear-gradient(
          145deg,
          ${unsafeCSS(theme.colors.surface)},
          ${unsafeCSS(theme.colors.backgroundDeep)}
        );
      box-shadow:
        ${unsafeCSS(theme.shadow.card)},
        0 0 30px var(--nova-state-glow);
      transition:
        border-color ${unsafeCSS(theme.animation.normal)} ease,
        box-shadow ${unsafeCSS(theme.animation.normal)} ease,
        background ${unsafeCSS(theme.animation.normal)} ease;
    }

    .card-layout {
      position: relative;
      z-index: 1;
      display: grid;
      gap: ${unsafeCSS(theme.spacing.lg)};
      min-height: 520px;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: ${unsafeCSS(theme.spacing.md)};
    }

    .brand {
      min-width: 0;
    }

    .eyebrow {
      margin-bottom: ${unsafeCSS(theme.spacing.sm)};
      color: var(--nova-state-color);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1.4px;
      text-transform: uppercase;
    }

    h2 {
      margin: 0;
      font-size: clamp(28px, 5vw, 40px);
      line-height: 1.05;
    }

    .model {
      margin-top: ${unsafeCSS(theme.spacing.sm)};
      color: ${unsafeCSS(theme.colors.textSecondary)};
      font-size: 15px;
    }

    .led-placeholder {
      display: grid;
      flex: 0 0 auto;
      width: 54px;
      height: 54px;
      place-items: center;
      border: 1px solid var(--nova-state-color);
      border-radius: 50%;
      background: var(--nova-state-soft);
      box-shadow: 0 0 20px var(--nova-state-glow);
    }

    .led-core {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--nova-state-color);
      box-shadow: 0 0 14px var(--nova-state-glow);
    }

    .content-grid {
      display: grid;
      gap: ${unsafeCSS(theme.spacing.lg)};
      align-items: stretch;
    }

    .hero {
      display: grid;
      min-width: 0;
      align-items: center;
      justify-items: center;
    }

    .robot-stage {
      position: relative;
      display: grid;
      width: 100%;
      min-height: 330px;
      place-items: center;
      overflow: visible;
      border-radius: ${unsafeCSS(theme.radius.large)};
      background:
        radial-gradient(
          ellipse at 50% 65%,
          var(--nova-state-soft),
          transparent 58%
        );
    }

    .robot-stage::after {
      position: absolute;
      z-index: 0;
      right: 15%;
      bottom: 0;
      left: 15%;
      height: 28px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.48);
      filter: blur(20px);
      content: "";
    }

    .robot-image {
      position: relative;
      z-index: 2;
      display: block;
      width: 100%;
      max-width: var(--robot-desktop-max-width);
      max-height: var(--robot-desktop-max-height);
      object-fit: contain;
      transform:
        translateX(var(--robot-desktop-x))
        translateY(var(--robot-desktop-y))
        scale(var(--robot-desktop-scale));
      transform-origin: center center;
      filter:
        drop-shadow(0 18px 20px rgba(0, 0, 0, 0.42))
        drop-shadow(0 0 10px var(--nova-state-glow));
      transition:
        transform ${unsafeCSS(theme.animation.normal)} ease,
        filter ${unsafeCSS(theme.animation.normal)} ease;
    }

    .robot-image:hover {
      transform:
        translateX(var(--robot-desktop-x))
        translateY(calc(var(--robot-desktop-y) - 3px))
        scale(calc(var(--robot-desktop-scale) + 0.03));
    }

    .robot-fallback {
      position: relative;
      z-index: 1;
      display: grid;
      gap: ${unsafeCSS(theme.spacing.sm)};
      justify-items: center;
      color: ${unsafeCSS(theme.colors.textMuted)};
      text-align: center;
    }

    .robot-fallback[hidden] {
      display: none;
    }

    .robot-fallback-symbol {
      color: var(--nova-state-color);
      font-size: 56px;
      line-height: 1;
      text-shadow: 0 0 20px var(--nova-state-glow);
    }

    .robot-fallback-title {
      color: ${unsafeCSS(theme.colors.textSecondary)};
      font-size: 15px;
      font-weight: 600;
    }

    .robot-fallback-path {
      max-width: 320px;
      overflow-wrap: anywhere;
      font-size: 11px;
      line-height: 1.5;
    }

    .overview {
      display: grid;
      min-width: 0;
      gap: ${unsafeCSS(theme.spacing.md)};
      align-content: center;
    }

    .overview-heading {
      display: grid;
      gap: 8px;
      justify-items: center;
      padding:
        ${unsafeCSS(theme.spacing.sm)}
        ${unsafeCSS(theme.spacing.md)};
      text-align: center;
    }

    .overview-icon {
      color: var(--nova-state-color);
      filter: drop-shadow(0 0 10px var(--nova-state-glow));
      --mdc-icon-size: 46px;
    }

    .overview-title {
      margin: 0;
      font-size: clamp(23px, 4vw, 32px);
      line-height: 1.15;
    }

    .overview-description {
      display: grid;
      gap: 3px;
      color: ${unsafeCSS(theme.colors.textSecondary)};
      font-size: 15px;
      line-height: 1.45;
    }

    .glass-panel {
      display: grid;
      gap: ${unsafeCSS(theme.spacing.md)};
      padding: ${unsafeCSS(theme.spacing.md)};
      border: 1px solid ${unsafeCSS(theme.colors.borderSoft)};
      border-radius: ${unsafeCSS(theme.radius.medium)};
      background:
        linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.045),
          rgba(255, 255, 255, 0.015)
        );
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.035),
        0 12px 35px rgba(0, 0, 0, 0.22);
      backdrop-filter: blur(12px);
    }

    .progress-panel {
      grid-template-columns:
        minmax(130px, 0.75fr)
        minmax(0, 1.25fr);
      align-items: center;
    }

    .progress-ring,
    .battery-ring {
      position: relative;
      display: grid;
      width: min(160px, 100%);
      aspect-ratio: 1;
      place-items: center;
      justify-self: center;
      border-radius: 50%;
      box-shadow:
        0 0 18px var(--nova-state-glow),
        inset 0 0 20px rgba(0, 0, 0, 0.25);
    }

    .progress-ring {
      background:
        conic-gradient(
          var(--nova-state-color)
          0deg
          var(--progress-angle),
          rgba(255, 255, 255, 0.09)
          var(--progress-angle)
          360deg
        );
    }

    .battery-ring {
      background:
        conic-gradient(
          var(--nova-state-color)
          0deg
          var(--battery-angle),
          rgba(255, 255, 255, 0.09)
          var(--battery-angle)
          360deg
        );
    }

    .progress-ring::before,
    .battery-ring::before {
      position: absolute;
      inset: 12px;
      border-radius: 50%;
      background:
        radial-gradient(
          circle at 50% 35%,
          rgba(255, 255, 255, 0.06),
          transparent 52%
        ),
        ${unsafeCSS(theme.colors.backgroundDeep)};
      box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.45);
      content: "";
    }

    .ring-content {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 2px;
      justify-items: center;
      text-align: center;
    }

    .ring-value {
      font-size: clamp(30px, 6vw, 46px);
      font-weight: 750;
      line-height: 1;
    }

    .ring-label {
      color: ${unsafeCSS(theme.colors.textSecondary)};
      font-size: 13px;
    }

    .metric-list {
      display: grid;
      min-width: 0;
    }

    .metric-row {
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr) auto;
      gap: 10px;
      align-items: center;
      min-height: 49px;
      padding: 8px 0;
      border-bottom: 1px solid ${unsafeCSS(theme.colors.borderSoft)};
    }

    .metric-row:last-child {
      border-bottom: 0;
    }

    .metric-icon {
      color: var(--nova-state-color);
      filter: drop-shadow(0 0 7px var(--nova-state-glow));
      --mdc-icon-size: 24px;
    }

    .metric-label {
      min-width: 0;
      color: ${unsafeCSS(theme.colors.textSecondary)};
      font-size: 13px;
    }

    .metric-value {
      max-width: 180px;
      overflow: hidden;
      color: ${unsafeCSS(theme.colors.text)};
      font-size: 14px;
      font-weight: 650;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .battery-track {
      grid-column: 2 / -1;
      height: 4px;
      margin-top: -4px;
      overflow: hidden;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
    }

    .battery-fill {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--nova-state-color);
      box-shadow: 0 0 8px var(--nova-state-glow);
    }

    .state-panel {
      align-content: center;
      justify-items: center;
      min-height: 280px;
      text-align: center;
    }

    .state-symbol {
      display: grid;
      width: 92px;
      height: 92px;
      place-items: center;
      border: 1px solid var(--nova-state-color);
      border-radius: 50%;
      background: var(--nova-state-soft);
      box-shadow:
        0 0 24px var(--nova-state-glow),
        inset 0 0 18px rgba(255, 255, 255, 0.035);
    }

    .state-symbol ha-icon {
      color: var(--nova-state-color);
      filter: drop-shadow(0 0 10px var(--nova-state-glow));
      --mdc-icon-size: 46px;
    }

    .state-message {
      max-width: 430px;
      color: ${unsafeCSS(theme.colors.textSecondary)};
      font-size: 15px;
      line-height: 1.55;
    }

    .state-detail {
      color: ${unsafeCSS(theme.colors.textMuted)};
      font-size: 12px;
    }

    .footer {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: ${unsafeCSS(theme.spacing.md)};
      padding-top: ${unsafeCSS(theme.spacing.md)};
      border-top: 1px solid ${unsafeCSS(theme.colors.borderSoft)};
    }

    .status-group {
      display: grid;
      gap: ${unsafeCSS(theme.spacing.sm)};
    }

    .status {
      display: inline-flex;
      width: fit-content;
      align-items: center;
      gap: 9px;
      padding: 10px 15px;
      border: 1px solid var(--nova-state-color);
      border-radius: ${unsafeCSS(theme.radius.pill)};
      background: var(--nova-state-soft);
      font-weight: 600;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--nova-state-color);
      box-shadow: 0 0 12px var(--nova-state-glow);
    }

    .raw-state {
      color: ${unsafeCSS(theme.colors.textMuted)};
      font-size: 12px;
    }

    .layout-note {
      color: ${unsafeCSS(theme.colors.textMuted)};
      font-size: 11px;
      letter-spacing: 0.8px;
      text-align: right;
      text-transform: uppercase;
    }

    .entity-error {
      display: grid;
      min-height: 240px;
      place-items: center;
      padding: ${unsafeCSS(theme.spacing.lg)};
      border: 1px solid ${unsafeCSS(theme.states.error.color)};
      border-radius: ${unsafeCSS(theme.radius.medium)};
      color: ${unsafeCSS(theme.states.error.color)};
      background: ${unsafeCSS(theme.states.error.soft)};
      text-align: center;
    }

    @container (min-width: 760px) {
      .content-grid {
        grid-template-columns:
          minmax(0, 1.15fr)
          minmax(340px, 0.85fr);
      }

      .robot-stage {
        min-height: 390px;
      }
    }

    @container (max-width: 759px) {
      ha-card {
        padding: ${unsafeCSS(theme.spacing.md)};
      }

      .card-layout {
        gap: ${unsafeCSS(theme.spacing.md)};
      }

      .led-placeholder {
        width: 44px;
        height: 44px;
      }

      .robot-stage {
        min-height: 260px;
      }

      .robot-image {
        max-width: var(--robot-mobile-max-width);
        max-height: var(--robot-mobile-max-height);
        transform:
          translateX(var(--robot-mobile-x))
          translateY(var(--robot-mobile-y))
          scale(var(--robot-mobile-scale));
      }

      .robot-image:hover {
        transform:
          translateX(var(--robot-mobile-x))
          translateY(calc(var(--robot-mobile-y) - 3px))
          scale(calc(var(--robot-mobile-scale) + 0.03));
      }

      .progress-panel {
        grid-template-columns:
          minmax(115px, 0.7fr)
          minmax(0, 1.3fr);
        padding: 14px;
      }

      .metric-row {
        grid-template-columns: 29px minmax(0, 1fr) auto;
        gap: 8px;
      }

      .metric-value {
        max-width: 130px;
      }

      .footer {
        align-items: flex-start;
        flex-direction: column;
      }

      .layout-note {
        text-align: left;
      }
    }

    @container (max-width: 430px) {
      .progress-panel {
        grid-template-columns: 1fr;
      }

      .progress-ring,
      .battery-ring {
        width: 145px;
      }

      .metric-value {
        max-width: 160px;
      }
    }
  `;

  public setConfig(config: NovaLubaCardConfig): void {
    if (!config) {
      throw new Error(
        "Nova UI: Kartenkonfiguration fehlt.",
      );
    }

    if (!config.entity) {
      throw new Error(
        "Nova UI: Bitte eine lawn_mower-Entität unter 'entity' eintragen.",
      );
    }

    this.config = config;
  }

  private get mowerState(): HomeAssistantState | undefined {
    if (!this.hass || !this.config) {
      return undefined;
    }

    return this.hass.states[this.config.entity];
  }

  private getState(
    entityId: string | undefined,
  ): HomeAssistantState | undefined {
    if (!this.hass || !entityId) {
      return undefined;
    }

    return this.hass.states[entityId];
  }

  private getNumericValue(
    entityId: string | undefined,
  ): number | null {
    const entity = this.getState(entityId);

    if (!entity) {
      return null;
    }

    const value = Number.parseFloat(
      entity.state.trim().replace(",", "."),
    );

    return Number.isFinite(value)
      ? value
      : null;
  }

  private formatEntityValue(
    entityId: string | undefined,
    fallbackUnit = "",
  ): string {
    const entity = this.getState(entityId);

    if (
      !entity ||
      entity.state === "unknown" ||
      entity.state === "unavailable"
    ) {
      return "—";
    }

    const unit =
      typeof entity.attributes.unit_of_measurement === "string"
        ? entity.attributes.unit_of_measurement
        : fallbackUnit;

    return unit
      ? `${entity.state} ${unit}`
      : entity.state;
  }

  private clampPercentage(
    value: number | null,
  ): number {
    if (value === null) {
      return 0;
    }

    return Math.min(100, Math.max(0, value));
  }

  private renderMetricRow(
    icon: string,
    label: string,
    value: string,
  ) {
    return html`
      <div class="metric-row">
        <ha-icon
          class="metric-icon"
          icon=${icon}
        ></ha-icon>

        <span class="metric-label">
          ${label}
        </span>

        <span
          class="metric-value"
          title=${value}
        >
          ${value}
        </span>
      </div>
    `;
  }

  private renderMowingView(
    data: MowerViewData,
  ) {
    return html`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:grass"
          ></ha-icon>

          <h3 class="overview-title">
            ${data.name} mäht
          </h3>

          <div class="overview-description">
            <span>Mähvorgang läuft.</span>
            <span>Der Mäher arbeitet autonom.</span>
          </div>
        </div>

        <div class="glass-panel progress-panel">
          <div
            class="progress-ring"
            style=${styleMap({
              "--progress-angle":
                `${data.progress * 3.6}deg`,
            })}
          >
            <div class="ring-content">
              <span class="ring-value">
                ${data.progressLabel}
              </span>

              <span class="ring-label">
                Fortschritt
              </span>
            </div>
          </div>

          <div class="metric-list">
            ${this.renderMetricRow(
              "mdi:clock-outline",
              "Verbleibende Zeit",
              data.remainingTimeLabel,
            )}

            ${this.renderMetricRow(
              "mdi:map-marker-outline",
              "Aktuelle Zone",
              data.locationLabel,
            )}

            ${this.renderMetricRow(
              "mdi:timer-outline",
              "Gesamtzeit",
              data.totalTimeLabel,
            )}

            <div class="metric-row">
              <ha-icon
                class="metric-icon"
                icon="mdi:battery"
              ></ha-icon>

              <span class="metric-label">
                Akkustand
              </span>

              <span class="metric-value">
                ${data.batteryLabel}
              </span>

              <div class="battery-track">
                <span
                  class="battery-fill"
                  style=${styleMap({
                    width: `${data.battery}%`,
                  })}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderDockedView(
    data: MowerViewData,
  ) {
    return html`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:home-battery-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${data.name} ist in der Ladestation
          </h3>

          <div class="overview-description">
            <span>Der Mäher befindet sich sicher in der Basis.</span>
            <span>Er ist bereit für die nächste Aufgabe.</span>
          </div>
        </div>

        <div class="glass-panel progress-panel">
          <div
            class="battery-ring"
            style=${styleMap({
              "--battery-angle":
                `${data.battery * 3.6}deg`,
            })}
          >
            <div class="ring-content">
              <span class="ring-value">
                ${data.batteryLabel}
              </span>

              <span class="ring-label">
                Akkustand
              </span>
            </div>
          </div>

          <div class="metric-list">
            ${this.renderMetricRow(
              "mdi:map-marker-outline",
              "Aktueller Standort",
              data.locationLabel,
            )}

            ${this.renderMetricRow(
              "mdi:battery-charging",
              "Ladezustand",
              data.battery >= 100
                ? "Vollständig geladen"
                : "Wird geladen",
            )}

            ${this.renderMetricRow(
              "mdi:battery-sync-outline",
              "Batteriezyklen",
              data.batteryCyclesLabel,
            )}

            ${this.renderMetricRow(
              "mdi:check-circle-outline",
              "Bereitschaft",
              "Bereit",
            )}
          </div>
        </div>
      </section>
    `;
  }

  private renderReturningView(
    data: MowerViewData,
  ) {
    return html`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:home-import-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${data.name} fährt zur Ladestation
          </h3>

          <div class="overview-description">
            <span>Die aktuelle Aufgabe wird beendet.</span>
            <span>Der Mäher kehrt selbstständig zur Basis zurück.</span>
          </div>
        </div>

        <div class="glass-panel progress-panel">
          <div
            class="battery-ring"
            style=${styleMap({
              "--battery-angle":
                `${data.battery * 3.6}deg`,
            })}
          >
            <div class="ring-content">
              <span class="ring-value">
                ${data.batteryLabel}
              </span>

              <span class="ring-label">
                Akkustand
              </span>
            </div>
          </div>

          <div class="metric-list">
            ${this.renderMetricRow(
              "mdi:map-marker-outline",
              "Aktueller Standort",
              data.locationLabel,
            )}

            ${this.renderMetricRow(
              "mdi:clock-outline",
              "Verbleibende Zeit",
              data.remainingTimeLabel,
            )}

            ${this.renderMetricRow(
              "mdi:progress-clock",
              "Aufgabenfortschritt",
              data.progressLabel,
            )}

            ${this.renderMetricRow(
              "mdi:home-outline",
              "Ziel",
              "Ladestation",
            )}
          </div>
        </div>
      </section>
    `;
  }

  private renderOfflineView(
    data: MowerViewData,
  ) {
    return html`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:power-plug-off-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${data.name} ist offline
          </h3>

          <div class="overview-description">
            <span>Der Mäher ist momentan nicht erreichbar.</span>
            <span>Es werden keine aktuellen Daten übertragen.</span>
          </div>
        </div>

        <div class="glass-panel state-panel">
          <div class="state-symbol">
            <ha-icon
              icon="mdi:robot-mower-outline"
            ></ha-icon>
          </div>

          <div class="state-message">
            Bitte schalten Sie den Mäher ein und
            überprüfen Sie anschließend die Verbindung
            zur Mammotion-Integration.
          </div>

          <div class="metric-list">
            ${this.renderMetricRow(
              "mdi:power",
              "Gerätestatus",
              "Ausgeschaltet oder nicht erreichbar",
            )}

            ${this.renderMetricRow(
              "mdi:access-point-off",
              "Verbindung",
              "Nicht verfügbar",
            )}

            ${this.renderMetricRow(
              "mdi:information-outline",
              "Empfehlung",
              "Mäher einschalten",
            )}
          </div>

          <div class="state-detail">
            Gemeldeter Rohstatus: ${data.rawState}
          </div>
        </div>
      </section>
    `;
  }

  private renderErrorView(
    data: MowerViewData,
  ) {
    return html`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:alert-circle-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${data.name} benötigt Aufmerksamkeit
          </h3>

          <div class="overview-description">
            <span>Der Mäher meldet eine Störung.</span>
            <span>Die zuletzt gemeldeten Fehlerdaten werden angezeigt.</span>
          </div>
        </div>

        <div class="glass-panel">
          <div class="metric-list">
            ${this.renderMetricRow(
              "mdi:message-alert-outline",
              "Fehlermeldung",
              data.lastErrorMessageLabel,
            )}

            ${this.renderMetricRow(
              "mdi:numeric",
              "Fehlercode",
              data.lastErrorCodeLabel,
            )}

            ${this.renderMetricRow(
              "mdi:clock-alert-outline",
              "Fehlerzeitpunkt",
              data.lastErrorTimeLabel,
            )}

            ${this.renderMetricRow(
              "mdi:robot-mower-outline",
              "Aktivitätsmodus",
              data.activityModeLabel,
            )}
          </div>
        </div>
      </section>
    `;
  }

  private renderUpdateView(
    data: MowerViewData,
  ) {
    return html`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:update"
          ></ha-icon>

          <h3 class="overview-title">
            Software-Update wird verarbeitet
          </h3>

          <div class="overview-description">
            <span>${data.name} wird aktualisiert.</span>
            <span>Bitte Gerät währenddessen nicht ausschalten.</span>
          </div>
        </div>

        <div class="glass-panel state-panel">
          <div class="state-symbol">
            <ha-icon
              icon="mdi:download"
            ></ha-icon>
          </div>

          <div class="state-message">
            Der Mäher ist während des Updates
            vorübergehend nicht einsatzbereit.
          </div>

          <div class="state-detail">
            Akkustand: ${data.batteryLabel}
          </div>
        </div>
      </section>
    `;
  }

  private renderMaintenanceView(
    data: MowerViewData,
  ) {
    return html`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:tools"
          ></ha-icon>

          <h3 class="overview-title">
            Wartungsmodus ist aktiv
          </h3>

          <div class="overview-description">
            <span>Automatische Aufgaben sind pausiert.</span>
            <span>${data.name} kann sicher gewartet werden.</span>
          </div>
        </div>

        <div class="glass-panel">
          <div class="metric-list">
            ${this.renderMetricRow(
              "mdi:map-marker-outline",
              "Aktueller Standort",
              data.locationLabel,
            )}

            ${this.renderMetricRow(
              "mdi:battery",
              "Akkustand",
              data.batteryLabel,
            )}

            ${this.renderMetricRow(
              "mdi:timer-outline",
              "Gesamtzeit",
              data.totalTimeLabel,
            )}

            ${this.renderMetricRow(
              "mdi:pause-circle-outline",
              "Automatik",
              "Pausiert",
            )}
          </div>
        </div>
      </section>
    `;
  }

  private renderUnknownView(
    data: MowerViewData,
  ) {
    return html`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:help-circle-outline"
          ></ha-icon>

          <h3 class="overview-title">
            Status konnte nicht erkannt werden
          </h3>
        </div>

        <div class="glass-panel state-panel">
          <div class="state-symbol">
            <ha-icon
              icon="mdi:help"
            ></ha-icon>
          </div>

          <div class="state-message">
            Der aktuelle Zustand des Mähers kann noch
            keiner bekannten Ansicht zugeordnet werden.
          </div>

          <div class="state-detail">
            Rohstatus: ${data.rawState}
          </div>
        </div>
      </section>
    `;
  }

  private renderStateContent(
    data: MowerViewData,
  ) {
    switch (data.novaState) {
      case "mowing":
        return this.renderMowingView(data);

      case "docked":
        return this.renderDockedView(data);

      case "returning":
        return this.renderReturningView(data);

      case "error":
        return this.renderErrorView(data);

      case "maintenance":
        return this.renderMaintenanceView(data);

      case "update":
        return this.renderUpdateView(data);

      case "offline":
        return this.renderOfflineView(data);

      case "unknown":
      default:
        return this.renderUnknownView(data);
    }
  }

  private handleImageError(
    event: Event,
  ): void {
    const image =
      event.currentTarget as HTMLImageElement;

    image.style.display = "none";

    const fallback =
      image.parentElement?.querySelector<HTMLElement>(
        ".robot-fallback",
      );

    if (fallback) {
      fallback.hidden = false;
    }
  }

  protected render() {
    if (!this.config) {
      return nothing;
    }

    const mower = this.mowerState;
    const name = this.config.name ?? "Luba";
    const model =
      this.config.model ?? "Luba 3 AWD LiDAR";

    const batteryEntity =
      this.config.battery_entity ??
      DEFAULT_BATTERY_ENTITY;

    const batteryCyclesEntity =
      this.config.battery_cycles_entity ??
      DEFAULT_BATTERY_CYCLES_ENTITY;

    const locationEntity =
      this.config.location_entity ??
      DEFAULT_LOCATION_ENTITY;

    const progressEntity =
      this.config.progress_entity ??
      DEFAULT_PROGRESS_ENTITY;

    const remainingTimeEntity =
      this.config.remaining_time_entity ??
      DEFAULT_REMAINING_TIME_ENTITY;

    const totalTimeEntity =
      this.config.total_time_entity ??
      DEFAULT_TOTAL_TIME_ENTITY;

    const lastErrorMessageEntity =
      this.config.last_error_message_entity ??
      DEFAULT_LAST_ERROR_MESSAGE_ENTITY;

    const lastErrorTimeEntity =
      this.config.last_error_time_entity ??
      DEFAULT_LAST_ERROR_TIME_ENTITY;

    const lastErrorCodeEntity =
      this.config.last_error_code_entity ??
      DEFAULT_LAST_ERROR_CODE_ENTITY;

    const activityModeEntity =
      this.config.activity_mode_entity ??
      DEFAULT_ACTIVITY_MODE_ENTITY;

    const resolvedModel =
      resolveMowerModel(model);

    const mowerImage =
      getMowerImage(resolvedModel);

    const presentation =
      getMowerPresentation(resolvedModel);

    if (!mower) {
      const errorTheme = theme.states.error;

      return html`
        <ha-card
          style=${styleMap({
            "--nova-state-color": errorTheme.color,
            "--nova-state-soft": errorTheme.soft,
            "--nova-state-glow": errorTheme.glow,
          })}
        >
          <div class="entity-error">
            <div>
              <strong>Entität nicht gefunden</strong>

              <p>
                „${this.config.entity}“ ist in
                Home Assistant nicht vorhanden.
              </p>
            </div>
          </div>
        </ha-card>
      `;
    }

    const novaState =
      resolveMowerState(mower.state);

    const stateTheme =
      theme.states[novaState];

    const lighting =
      resolveMowerLighting(novaState);

    const lightingAssets =
      getMowerLightingAssets(resolvedModel);

    const lightingWithAssets = {
      ...lighting,

      front: {
        ...lighting.front,
        asset: lightingAssets.front,
      },

      side: {
        ...lighting.side,
        asset: lightingAssets.side,
      },
    };

    const progressRaw =
      this.getNumericValue(progressEntity);

    const progress =
      this.clampPercentage(progressRaw);

    const progressLabel =
      progressRaw === null
        ? "—"
        : `${Math.round(progress)} %`;

    const batteryRaw =
      this.getNumericValue(batteryEntity);

    const battery =
      this.clampPercentage(batteryRaw);

    const viewData: MowerViewData = {
      name,
      novaState,
      rawState: mower.state,

      progress,
      progressLabel,

      battery,
      batteryLabel:
        this.formatEntityValue(
          batteryEntity,
          "%",
        ),

      batteryCyclesLabel:
        this.formatEntityValue(
          batteryCyclesEntity,
        ),

      locationLabel:
        this.formatEntityValue(
          locationEntity,
        ),

      remainingTimeLabel:
        this.formatEntityValue(
          remainingTimeEntity,
        ),

      totalTimeLabel:
        this.formatEntityValue(
          totalTimeEntity,
        ),

      lastErrorMessageLabel:
        this.formatEntityValue(
          lastErrorMessageEntity,
        ),

      lastErrorTimeLabel:
        this.formatEntityValue(
          lastErrorTimeEntity,
        ),

      lastErrorCodeLabel:
        this.formatEntityValue(
          lastErrorCodeEntity,
        ),

      activityModeLabel:
        this.formatEntityValue(
          activityModeEntity,
        ),
    };

    const dynamicStyles = {
      "--nova-state-color":
        stateTheme.color,

      "--nova-state-soft":
        stateTheme.soft,

      "--nova-state-glow":
        stateTheme.glow,

      "--robot-desktop-scale":
        String(presentation.desktop.scale),

      "--robot-desktop-x":
        `${presentation.desktop.translateX}px`,

      "--robot-desktop-y":
        `${presentation.desktop.translateY}px`,

      "--robot-desktop-max-width":
        `${presentation.desktop.maxWidth}px`,

      "--robot-desktop-max-height":
        `${presentation.desktop.maxHeight}px`,

      "--robot-mobile-scale":
        String(presentation.mobile.scale),

      "--robot-mobile-x":
        `${presentation.mobile.translateX}px`,

      "--robot-mobile-y":
        `${presentation.mobile.translateY}px`,

      "--robot-mobile-max-width":
        `${presentation.mobile.maxWidth}px`,

      "--robot-mobile-max-height":
        `${presentation.mobile.maxHeight}px`,
    };

    return html`
      <ha-card style=${styleMap(dynamicStyles)}>
        <div class="card-layout">
          <header class="header">
            <div class="brand">
              <div class="eyebrow">
                Nova UI
              </div>

              <h2>${name}</h2>

              <div class="model">
                ${model}
              </div>
            </div>

            <div
              class="led-placeholder"
              title="Statusanzeige"
            >
              <span class="led-core"></span>
            </div>
          </header>

          <main class="content-grid">
            <section class="hero">
              <div class="robot-stage">
                <img
                  class="robot-image"
                  src=${mowerImage}
                  alt=${model}
                  loading="eager"
                  @error=${this.handleImageError}
                />

                <mower-lighting
                  .lighting=${lightingWithAssets}
                ></mower-lighting>

                <div
                  class="robot-fallback"
                  hidden
                >
                  <div class="robot-fallback-symbol">
                    ◆
                  </div>

                  <div class="robot-fallback-title">
                    Gerätebild konnte nicht geladen werden
                  </div>

                  <div class="robot-fallback-path">
                    ${mowerImage}
                  </div>
                </div>
              </div>
            </section>

            ${this.renderStateContent(viewData)}
          </main>

          <footer class="footer">
            <div class="status-group">
              <div class="status">
                <span class="dot"></span>

                <span>
                  ${stateLabels[novaState]}
                </span>
              </div>

              <div class="raw-state">
                Rohstatus: ${mower.state}
              </div>
            </div>

            <div class="layout-note">
              ${resolvedModel}
            </div>
          </footer>
        </div>
      </ha-card>
    `;
  }

  public getCardSize(): number {
    return 10;
  }

  public static getStubConfig():
    NovaLubaCardConfig {
    return {
      type: "custom:nova-luba-card",

      entity:
        "lawn_mower.luba_va8tp48r",

      name: "Luba",

      model:
        "Luba 3 AWD LiDAR",

      battery_entity:
        DEFAULT_BATTERY_ENTITY,

      battery_cycles_entity:
        DEFAULT_BATTERY_CYCLES_ENTITY,

      location_entity:
        DEFAULT_LOCATION_ENTITY,

      progress_entity:
        DEFAULT_PROGRESS_ENTITY,

      remaining_time_entity:
        DEFAULT_REMAINING_TIME_ENTITY,

      total_time_entity:
        DEFAULT_TOTAL_TIME_ENTITY,

      last_error_message_entity:
        DEFAULT_LAST_ERROR_MESSAGE_ENTITY,

      last_error_time_entity:
        DEFAULT_LAST_ERROR_TIME_ENTITY,

      last_error_code_entity:
        DEFAULT_LAST_ERROR_CODE_ENTITY,

      activity_mode_entity:
        DEFAULT_ACTIVITY_MODE_ENTITY,
    };
  }
}

declare global {
  interface Window {
    customCards?: Array<
      Record<string, unknown>
    >;
  }
}

window.customCards =
  window.customCards || [];

window.customCards.push({
  type: "nova-luba-card",
  name: "Nova UI - Luba Card",
  description:
    "A dynamic Mammotion mower card for Home Assistant.",
  preview: true,
});
