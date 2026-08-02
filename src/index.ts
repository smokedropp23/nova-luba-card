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

import { theme } from "./constants/theme";
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
}

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
      overflow: hidden;
      padding: ${unsafeCSS(theme.spacing.lg)};
      border: 1px solid var(--nova-state-color);
      border-radius: ${unsafeCSS(theme.radius.large)};
      color: ${unsafeCSS(theme.colors.text)};
      background:
        radial-gradient(
          circle at 15% 10%,
          var(--nova-state-soft),
          transparent 45%
        ),
        linear-gradient(
          145deg,
          ${unsafeCSS(theme.colors.surface)},
          ${unsafeCSS(theme.colors.backgroundDeep)}
        );
      box-shadow:
        ${unsafeCSS(theme.shadow.card)},
        0 0 28px var(--nova-state-glow);
      transition:
        border-color ${unsafeCSS(theme.animation.normal)} ease,
        box-shadow ${unsafeCSS(theme.animation.normal)} ease,
        background ${unsafeCSS(theme.animation.normal)} ease;
    }

    .eyebrow {
      margin-bottom: ${unsafeCSS(theme.spacing.sm)};
      color: var(--nova-state-color);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
    }

    h2 {
      margin: 0;
      font-size: 26px;
      line-height: 1.2;
    }

    .model {
      margin-top: ${unsafeCSS(theme.spacing.sm)};
      color: ${unsafeCSS(theme.colors.textSecondary)};
      font-size: 14px;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      margin-top: ${unsafeCSS(theme.spacing.lg)};
      padding: 10px 14px;
      border: 1px solid var(--nova-state-color);
      border-radius: ${unsafeCSS(theme.radius.pill)};
      background: var(--nova-state-soft);
      transition: all ${unsafeCSS(theme.animation.normal)} ease;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--nova-state-color);
      box-shadow: 0 0 12px var(--nova-state-glow);
    }

    .raw-state {
      margin-top: ${unsafeCSS(theme.spacing.sm)};
      color: ${unsafeCSS(theme.colors.textMuted)};
      font-size: 12px;
    }

    .error {
      margin-top: ${unsafeCSS(theme.spacing.lg)};
      padding: ${unsafeCSS(theme.spacing.md)};
      border: 1px solid ${unsafeCSS(theme.states.error.color)};
      border-radius: ${unsafeCSS(theme.radius.medium)};
      color: ${unsafeCSS(theme.states.error.color)};
      background: ${unsafeCSS(theme.states.error.soft)};
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

  protected render() {
    if (!this.config) {
      return nothing;
    }

    const mower = this.mowerState;
    const name = this.config.name ?? "Luba";
    const model =
      this.config.model ?? "Luba 3 AWD LiDAR";

    if (!mower) {
      return html`
        <ha-card>
          <div class="eyebrow">Nova UI</div>

          <h2>${name}</h2>

          <div class="model">${model}</div>

          <div class="error">
            Entität „${this.config.entity}“ wurde in
            Home Assistant nicht gefunden.
          </div>
        </ha-card>
      `;
    }

    const novaState = resolveMowerState(mower.state);
    const stateTheme = theme.states[novaState];

    const dynamicStyles = {
      "--nova-state-color": stateTheme.color,
      "--nova-state-soft": stateTheme.soft,
      "--nova-state-glow": stateTheme.glow,
    };

    return html`
      <ha-card style=${styleMap(dynamicStyles)}>
        <div class="eyebrow">Nova UI</div>

        <h2>${name}</h2>

        <div class="model">${model}</div>

        <div class="status">
          <span class="dot"></span>

          <span>${stateLabels[novaState]}</span>
        </div>

        <div class="raw-state">
          Rohstatus: ${mower.state}
        </div>
      </ha-card>
    `;
  }

  public getCardSize(): number {
    return 3;
  }

  public static getStubConfig(): NovaLubaCardConfig {
    return {
      type: "custom:nova-luba-card",
      entity: "lawn_mower.luba_va8tp48r",
      name: "Luba",
      model: "Luba 3 AWD LiDAR",
    };
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];

window.customCards.push({
  type: "nova-luba-card",
  name: "Nova UI - Luba Card",
  description:
    "A dynamic Mammotion mower card for Home Assistant.",
  preview: true,
});