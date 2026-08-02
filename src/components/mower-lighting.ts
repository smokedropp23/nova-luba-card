import {
  LitElement,
  css,
  html,
  nothing,
} from "lit";

import {
  customElement,
  property,
} from "lit/decorators.js";

import { styleMap } from "lit/directives/style-map.js";

import type {
  MowerLightLayer,
  MowerLighting,
} from "../types/mower-lighting";

@customElement("mower-lighting")
export class MowerLightingComponent extends LitElement {
  @property({ attribute: false })
  public lighting?: MowerLighting;

  static styles = css`
    :host {
      position: absolute;
      inset: 0;
      z-index: 3;
      display: block;
      pointer-events: none;
    }

    .overlay {
      position: absolute;
      z-index: 3;
      top: 50%;
      left: 50%;
      display: block;
      width: 100%;
      max-width: var(--robot-desktop-max-width);
      max-height: var(--robot-desktop-max-height);
      object-fit: contain;
      opacity: 0;

      transform:
        translate(-50%, -50%)
        translateX(var(--robot-desktop-x))
        translateY(var(--robot-desktop-y))
        scale(var(--robot-desktop-scale));

      transform-origin: center center;

      transition:
        opacity 220ms ease,
        filter 220ms ease;
    }

    .overlay.visible {
      opacity: var(--light-brightness);

      filter:
        brightness(
          calc(
            0.7
            + var(--light-brightness)
          )
        )
        drop-shadow(
          0 0 12px
          var(--light-color)
        );
    }

    .pulse {
      animation: pulse 1.5s ease-in-out infinite;
    }

    .blink {
      animation: blink 1s steps(1, end) infinite;
    }

    .breathe {
      animation: breathe 2.4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity:
          calc(
            var(--light-brightness)
            * 0.45
          );
      }

      50% {
        opacity: var(--light-brightness);
      }
    }

    @keyframes blink {
      0%,
      49% {
        opacity: var(--light-brightness);
      }

      50%,
      100% {
        opacity: 0;
      }
    }

    @keyframes breathe {
      0%,
      100% {
        opacity:
          calc(
            var(--light-brightness)
            * 0.5
          );
      }

      50% {
        opacity: var(--light-brightness);
      }
    }

    @media (max-width: 600px) {
      .overlay {
        max-width: var(--robot-mobile-max-width);
        max-height: var(--robot-mobile-max-height);

        transform:
          translate(-50%, -50%)
          translateX(var(--robot-mobile-x))
          translateY(var(--robot-mobile-y))
          scale(var(--robot-mobile-scale));
      }
    }
  `;

  private renderOverlay(
    layer: MowerLightLayer,
    className: string,
  ) {
    if (!layer.asset) {
      return nothing;
    }

    const classes = [
      "overlay",
      className,
      layer.visible ? "visible" : "",
      layer.animation !== "none"
        ? layer.animation
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <img
        class=${classes}
        src=${layer.asset}
        alt=""
        aria-hidden="true"
        style=${styleMap({
          "--light-color": layer.color,
          "--light-brightness":
            String(layer.brightness),

          opacity: "1",
          outline: "3px solid red",
          background:
            "rgba(255, 0, 0, 0.15)",
        })}
      />
    `;
  }

  protected render() {
    if (!this.lighting) {
      return nothing;
    }

    return html`
      ${this.renderOverlay(
        this.lighting.front,
        "front",
      )}

      ${this.renderOverlay(
        this.lighting.side,
        "side",
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mower-lighting": MowerLightingComponent;
  }
}