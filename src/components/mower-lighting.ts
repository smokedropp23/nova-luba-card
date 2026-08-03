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

    /*
     * Gemeinsame Basis für die scharfe Lichtquelle
     * und den weichen Glow.
     */
    .light-layer {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      max-width: var(--robot-desktop-max-width);
      max-height: var(--robot-desktop-max-height);
      margin: auto;

      background: var(--light-color);

      -webkit-mask-image: var(--light-asset);
      mask-image: var(--light-asset);

      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;

      -webkit-mask-position: center;
      mask-position: center;

      -webkit-mask-size: contain;
      mask-size: contain;

      transform:
        translateX(var(--robot-desktop-x))
        translateY(var(--robot-desktop-y))
        scale(var(--robot-desktop-scale));

      transform-origin: center center;
      opacity: var(--layer-opacity);

      transition:
        opacity 220ms ease,
        filter 220ms ease;
    }

    /*
     * Weicher Lichtschein hinter der eigentlichen Lampe.
     */
    .light-glow {
      z-index: 3;

      opacity:
        calc(
          var(--layer-opacity)
          * var(--glow-strength)
        );

      filter:
        blur(var(--glow-blur))
        drop-shadow(
          0 0 var(--glow-radius)
          var(--light-color)
        )
        drop-shadow(
          0 0 calc(var(--glow-radius) * 1.8)
          var(--light-color)
        );

      transform:
        translateX(var(--robot-desktop-x))
        translateY(var(--robot-desktop-y))
        scale(
          calc(
            var(--robot-desktop-scale)
            * var(--glow-scale)
          )
        );
    }

    /*
     * Scharfe und sehr helle eigentliche Lichtquelle.
     */
    .light-core {
      z-index: 4;

      filter:
        brightness(var(--core-brightness))
        drop-shadow(
          0 0 var(--core-glow-radius)
          var(--light-color)
        )
        drop-shadow(
          0 0 calc(var(--core-glow-radius) * 1.8)
          var(--light-color)
        );
    }

    /*
     * Standardwerte.
     */
    .light-layer {
      --glow-strength: 0.95;
      --glow-blur: 8px;
      --glow-radius: 18px;
      --glow-scale: 1.02;
      --core-brightness: 1.75;
      --core-glow-radius: 10px;
    }

    /*
     * Seitenlicht:
     * bewusst sehr kräftig und dominant.
     */
    .side.light-glow {
      --glow-strength: 1;
      --glow-blur: 12px;
      --glow-radius: 28px;
      --glow-scale: 1.035;
    }

    .side.light-core {
      --core-brightness: 2;
      --core-glow-radius: 14px;
    }

    /*
     * Frontlicht:
     * kleiner, aber sehr hell und klar.
     */
    .front.light-glow {
      --glow-strength: 0.95;
      --glow-blur: 8px;
      --glow-radius: 22px;
      --glow-scale: 1.025;
    }

    .front.light-core {
      --core-brightness: 2.25;
      --core-glow-radius: 11px;
    }

    .pulse {
      animation:
        lighting-pulse
        1.45s
        ease-in-out
        infinite;
    }

    .blink {
      animation:
        lighting-blink
        0.9s
        steps(1, end)
        infinite;
    }

    .breathe {
      animation:
        lighting-breathe
        2.35s
        ease-in-out
        infinite;
    }

    @keyframes lighting-pulse {
      0%,
      100% {
        opacity:
          calc(
            var(--layer-opacity)
            * 0.7
          );
      }

      50% {
        opacity: var(--layer-opacity);
      }
    }

    @keyframes lighting-blink {
      0%,
      47% {
        opacity: var(--layer-opacity);
      }

      48%,
      100% {
        opacity: 0;
      }
    }

    @keyframes lighting-breathe {
      0%,
      100% {
        opacity:
          calc(
            var(--layer-opacity)
            * 0.76
          );
      }

      50% {
        opacity: var(--layer-opacity);
      }
    }

    @media (max-width: 600px) {
      .light-layer {
        max-width: var(--robot-mobile-max-width);
        max-height: var(--robot-mobile-max-height);

        transform:
          translateX(var(--robot-mobile-x))
          translateY(var(--robot-mobile-y))
          scale(var(--robot-mobile-scale));
      }

      .light-glow {
        transform:
          translateX(var(--robot-mobile-x))
          translateY(var(--robot-mobile-y))
          scale(
            calc(
              var(--robot-mobile-scale)
              * var(--glow-scale)
            )
          );
      }

      .side.light-glow {
        --glow-blur: 9px;
        --glow-radius: 22px;
      }

      .front.light-glow {
        --glow-blur: 6px;
        --glow-radius: 17px;
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
    /*
     * Ausgeschaltete Lichter werden gar nicht gerendert.
     * Dadurch kann bei debugLighting: "off" kein Overlay
     * die Karte beeinflussen.
     */
    if (
      !layer.asset ||
      !layer.visible ||
      layer.brightness <= 0
    ) {
      return nothing;
    }

    const animationClass =
      layer.animation !== "none"
        ? layer.animation
        : "";

    const sharedStyles = {
      "--light-asset":
        `url("${layer.asset}")`,
      "--light-color":
        layer.color,
      "--layer-opacity":
        String(layer.brightness),
    };

    const glowClasses = [
      "light-layer",
      "light-glow",
      className,
      animationClass,
    ]
      .filter(Boolean)
      .join(" ");

    const coreClasses = [
      "light-layer",
      "light-core",
      className,
      animationClass,
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <div
        class=${glowClasses}
        style=${styleMap(sharedStyles)}
        aria-hidden="true"
      ></div>

      <div
        class=${coreClasses}
        style=${styleMap(sharedStyles)}
        aria-hidden="true"
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