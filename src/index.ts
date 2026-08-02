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
import { getMowerImage } from "./helpers/get-mower-image";
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
      position: relative;
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
      grid-template-rows: auto 1fr auto;
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

    .hero {
      display: grid;
      align-items: center;
      justify-items: center;
      padding:
        ${unsafeCSS(theme.spacing.lg)}
        0;
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
          ellipse at 50% 62%,
          var(--nova-state-soft),
          transparent 58%
        );
    }

    .robot-stage::after {
      position: absolute;
      z-index: 0;
      right: 15%;
      bottom: 5%;
      left: 15%;
      height: 20px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.48);
      filter: blur(15px);
      content: "";
    }

    .robot-image {
      position: relative;
      z-index: 2;
      display: block;
      width: 100%;
      max-width: 520px;
      max-height: 330px;
      object-fit: contain;
      transform: translateY(42px) scale(1.38);
      transform-origin: center center;
      filter:
        drop-shadow(0 20px 22px rgba(0, 0, 0, 0.38))
        drop-shadow(0 0 12px var(--nova-state-glow));
      transition:
        transform ${unsafeCSS(theme.animation.normal)} ease,
        filter ${unsafeCSS(theme.animation.normal)} ease;
    }

    .robot-image:hover {
      transform: translateY(20px) scale(1.48);
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

    /*
     * Home Assistant kann Karten auch auf einem Desktop schmaler
     * als 600 Pixel darstellen. Deshalb erhält auch dieser Bereich
     * die vergrößerten Bildwerte.
     */
    @media (max-width: 600px) {
      ha-card {
        min-height: 440px;
        padding: ${unsafeCSS(theme.spacing.md)};
      }

      .card-layout {
        min-height: 440px;
      }

      .led-placeholder {
        width: 44px;
        height: 44px;
      }

      .robot-stage {
        min-height: 260px;
      }

      .robot-image {
        width: 100%;
        max-width: 430px;
        max-height: 285px;
        transform: translateY(34px) scale(1.38);
      }

      .robot-image:hover {
        transform: translateY(38px) scale(1.41);
      }

      .footer {
        align-items: flex-start;
        flex-direction: column;
      }

      .layout-note {
        text-align: left;
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

  private handleImageError(event: Event): void {
    const image = event.currentTarget as HTMLImageElement;

    image.style.display = "none";

    const fallback =
      image.nextElementSibling as HTMLElement | null;

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

    const resolvedModel = resolveMowerModel(model);
    const mowerImage = getMowerImage(resolvedModel);

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

    const novaState = resolveMowerState(mower.state);
    const stateTheme = theme.states[novaState];

    const dynamicStyles = {
      "--nova-state-color": stateTheme.color,
      "--nova-state-soft": stateTheme.soft,
      "--nova-state-glow": stateTheme.glow,
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
              title="LED-Platzhalter"
            >
              <span class="led-core"></span>
            </div>
          </header>

          <main class="hero">
            <div class="robot-stage">
              <img
                class="robot-image"
                src=${mowerImage}
                alt=${model}
                loading="eager"
                @error=${this.handleImageError}
              />

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
    return 7;
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