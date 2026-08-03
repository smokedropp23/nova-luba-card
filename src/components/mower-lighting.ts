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
      display: grid;
      place-items: center;
      pointer-events: none;
    }

    .overlay {
      position: absolute;
      z-index: 3;
      display: block;

      width: var(--robot-desktop-max-height);
      height: var(--robot-desktop-max-height);

      max-width: 100%;
      max-height: 100%;

      background-color: var(--light-color);

      -webkit-mask-image: var(--light-asset);
      mask-image: var(--light-asset);

      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;

      -webkit-mask-position: center;
      mask-position: center;

      -webkit-mask-size: contain;
      mask-size: contain;

      opacity: var(--light-brightness);

      transform:
        translateX(var(--robot-desktop-x))
        translateY(var(--robot-desktop-y))
        scale(var(--robot-desktop-scale));

      transform-origin: center center;

      transition:
        opacity 220ms ease,
        filter 220ms ease;
    }

    .overlay.front {
      filter:
        brightness(1.6)
        drop-shadow(
          0 0 7px
          var(--light-color)
        )
        drop-shadow(
          0 0 14px
          var(--light-color)
        );
    }

    .overlay.side {
      filter:
        brightness(1.45)
        drop-shadow(
          0 0 9px
          var(--light-color)
        )
        drop-shadow(
          0 0 18px
          var(--light-color)
        );
    }

    .pulse {
      animation:
        lighting-pulse
        1.5s
        ease-in-out
        infinite;
    }

    .blink {
      animation:
        lighting-blink
        1s
        steps(1, end)
        infinite;
    }

    .breathe {
      animation:
        lighting-breathe
        2.4s
        ease-in-out
        infinite;
    }

    @keyframes lighting-pulse {
      0%,
      100% {
        opacity:
          calc(
            var(--light-brightness)
            * 0.65
          );
      }

      50% {
        opacity: var(--light-brightness);
      }
    }

    @keyframes lighting-blink {
      0%,
      49% {
        opacity: var(--light-brightness);
      }

      50%,
      100% {
        opacity: 0;
      }
    }

    @keyframes lighting-breathe {
      0%,
      100% {
        opacity:
          calc(
            var(--light-brightness)
            * 0.65
          );
      }

      50% {
        opacity: var(--light-brightness);
      }
    }

    @media (max-width: 600px) {
      .overlay {
        width: var(--robot-mobile-max-height);
        height: var(--robot-mobile-max-height);

        transform:
          translateX(var(--robot-mobile-x))
          translateY(var(--robot-mobile-y))
          scale(var(--robot-mobile-scale));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .pulse,
      .blink,
      .breathe {
        animation: none;
      }
    }
  `;

  private renderOverlay(
    layer: MowerLightLayer,
    className: "front" | "side",
  ) {
    if (
      !layer.asset ||
      !layer.visible ||
      layer.brightness <= 0
    ) {
      return nothing;
    }

    const classes = [
      "overlay",
      className,
      layer.animation !== "none"
        ? layer.animation
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <div
        class=${classes}
        aria-hidden="true"
        style=${styleMap({
          "--light-color": layer.color,
          "--light-brightness":
            String(layer.brightness),
          "--light-asset":
            `url("${layer.asset}")`,
        })}
      ></div>
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