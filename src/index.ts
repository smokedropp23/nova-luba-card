import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("nova-luba-card")
export class NovaLubaCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      padding: 24px;
      border-radius: 24px;
      background:
        linear-gradient(
          145deg,
          rgba(28, 32, 40, 0.98),
          rgba(11, 14, 19, 0.98)
        );
      color: var(--primary-text-color);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .eyebrow {
      color: #ff9f2f;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
    }

    h2 {
      margin: 8px 0 0;
      font-size: 26px;
    }

    p {
      margin: 14px 0 0;
      color: var(--secondary-text-color);
    }
  `;

  setConfig(): void {
    // Die richtige Kartenkonfiguration bauen wir im nächsten Issue ein.
  }

  render() {
    return html`
      <ha-card>
        <div class="eyebrow">Nova UI</div>

        <h2>Luba Card</h2>

        <p>
          Das technische Grundgerüst wurde erfolgreich geladen.
        </p>
      </ha-card>
    `;
  }

  getCardSize(): number {
    return 3;
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