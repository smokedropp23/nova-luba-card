import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

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
      padding: 24px;
      border-radius: 24px;
      color: var(--primary-text-color);
      background:
        linear-gradient(
          145deg,
          rgba(28, 32, 40, 0.98),
          rgba(11, 14, 19, 0.98)
        );
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .eyebrow {
      margin-bottom: 8px;
      color: #ff9f2f;
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
      margin-top: 7px;
      color: var(--secondary-text-color);
      font-size: 14px;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      margin-top: 22px;
      padding: 10px 14px;
      border: 1px solid rgba(255, 159, 47, 0.22);
      border-radius: 999px;
      background: rgba(255, 159, 47, 0.09);
      font-size: 14px;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #ff9f2f;
      box-shadow: 0 0 12px rgba(255, 159, 47, 0.85);
    }

    .error {
      margin-top: 18px;
      padding: 14px;
      border: 1px solid rgba(255, 70, 70, 0.28);
      border-radius: 14px;
      background: rgba(255, 70, 70, 0.1);
      color: #ff8c8c;
    }
  `;

  public setConfig(config: NovaLubaCardConfig): void {
    if (!config) {
      throw new Error("Nova UI: Kartenkonfiguration fehlt.");
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
    const model = this.config.model ?? "Luba 3 AWD LiDAR";

    return html`
      <ha-card>
        <div class="eyebrow">Nova UI</div>

        <h2>${name}</h2>

        <div class="model">${model}</div>

        ${
          mower
            ? html`
                <div class="status">
                  <span class="dot"></span>
                  <span>Status: ${mower.state}</span>
                </div>
              `
            : html`
                <div class="error">
                  Entität „${this.config.entity}“ wurde in Home Assistant
                  nicht gefunden.
                </div>
              `
        }
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
  name: "Nova UI – Luba Card",
  description: "A dynamic Mammotion mower card for Home Assistant.",
  preview: true,
});