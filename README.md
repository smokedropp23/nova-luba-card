Nova UI – Luba Card

A modern, responsive Home Assistant card for Mammotion robotic mowers.

Nova UI – Luba Card combines a status-based interface, live mower data, connection information and direct mower controls in one polished Lovelace card. The layout automatically adapts to the current mower state and works on both desktop and mobile dashboards.

> **Project status:** Alpha  
> The card is under active development. Features, entity names and configuration options may still change.

────────

Features

Dynamic mower views

The card automatically switches between dedicated views for the current mower state:

• Mowing
• Paused
• Returning to charging station
• Docked / charging
• Error
• Maintenance
• Firmware update
• Offline
• Unknown state

Each state has its own layout, iconography, status text, metrics and available controls.

Responsive design

• Optimized desktop layout
• Dedicated mobile layout
• Automatic two-column connection status layout on smaller screens
• Scalable mower image and controls
• Designed for dark Home Assistant dashboards

Live mower data

Depending on the current state, the card can display:

• Battery level
• Battery cycles
• Current location
• Task progress
• Remaining time
• Total task time
• Activity mode
• Task duration
• Total mileage
• Blade wear warning time
• Last error message
• Last error code
• Last error time
• Firmware information

All supported values can be opened directly in Home Assistant by tapping or clicking them.

Connection status bar

The integrated connection bar shows:

• Bluetooth RSSI
• Mobile network RSSI
• Wi-Fi RSSI
• Current connection type

Signal values are automatically color-coded:

• Green: strong signal
• Yellow: weak signal
• Red: very weak signal
• Gray: unknown or unavailable

The currently active connection is highlighted.

Direct mower controls

Available actions depend on the current mower state.

Examples:

• Start mowing
• Pause
• Resume mowing
• Return to charging station
• Cancel current task
• Undock
• Restart mower
• Relocate charging station

The error view can also provide emergency movement controls:

• Forward
• Backward
• Left
• Right

Retained last known mower state

Mammotion integrations can occasionally report the main mower entity as unknown or unavailable.

Nova UI – Luba Card can retain the last valid mower state and continue displaying the last known state view while marking the data as potentially stale.

During a stale state:

• The last valid mower state remains visible
• Other Home Assistant sensors remain displayed
• A stale-data warning can be shown
• Control buttons can be disabled
• The time of the last valid mower state can be displayed

This avoids replacing the complete card with an unknown-state page during short integration interruptions.

Visual mower lighting

The mower image can use state-dependent lighting effects and overlays to visually reflect the current mower state.

────────

Supported models

The card is designed for the Mammotion Luba family:

• Luba 1
• Luba 2
• Luba 3
• Luba Mini 1
• Luba Mini 2

Support depends on the entities exposed by the installed Mammotion Home Assistant integration.

────────

Installation

HACS

1. Open HACS in Home Assistant.
2. Go to Frontend.
3. Open the three-dot menu.
4. Select Custom repositories.
5. Add the repository URL.
6. Select Dashboard as the category.
7. Install Nova UI – Luba Card.
8. Reload Home Assistant or refresh the frontend.

Manual installation

1. Copy nova-luba-card.js from the dist folder to:

```text
/config/www/nova-luba-card/
```

2. Add the resource in Home Assistant:

```yaml
url: /local/nova-luba-card/nova-luba-card.js
type: module
```

3. Reload the browser or restart Home Assistant.

────────

Basic configuration

```yaml
type: custom:nova-luba-card
entity: lawn_mower.luba_va8tp48r
name: Luba
model: Luba 3 AWD LiDAR
```

────────

Extended configuration example

```yaml
type: custom:nova-luba-card
entity: lawn_mower.luba_va8tp48r

name: Luba
model: Luba 3 AWD LiDAR

battery_entity: sensor.luba_va8tp48r_batterie
battery_cycles_entity: sensor.luba_va8tp48r_batteriezyklen
location_entity: sensor.luba_va8tp48r_aktueller_standort
progress_entity: sensor.luba_va8tp48r_fortschritt
remaining_time_entity: sensor.luba_va8tp48r_verbleibende_zeit
total_time_entity: sensor.luba_va8tp48r_gesamtzeit

activity_mode_entity: sensor.luba_va8tp48r_aktivitatsmodus
task_duration_entity: sensor.luba_va8tp48r_aufgabendauer
total_mileage_entity: sensor.luba_va8tp48r_gesamtkilometerstand
blade_wear_warning_time_entity: sensor.luba_va8tp48r_messerverschleiss_warnzeit

last_error_message_entity: sensor.luba_va8tp48r_letzte_fehlermeldung
last_error_time_entity: sensor.luba_va8tp48r_letzter_fehlerzeitpunkt
last_error_code_entity: sensor.luba_va8tp48r_letzter_fehlercode

firmware_update_entity: update.luba_va8tp48r_firmware

ble_rssi_entity: sensor.luba_va8tp48r_ble_rssi
mobile_rssi_entity: sensor.luba_va8tp48r_mobilfunk_rssi
wifi_rssi_entity: sensor.luba_va8tp48r_wi_fi_rssi
connection_type_entity: sensor.luba_va8tp48r_verbindungsart

cancel_current_task_entity: button.luba_va8tp48r_aktuelle_aufgabe_abbrechen
undock_entity: button.luba_va8tp48r_abdocken
relocate_charging_station_entity: button.luba_va8tp48r_ladestation_umsetzen
restart_mower_entity: button.luba_va8tp48r_restart_mower

emergency_push_left_entity: button.luba_va8tp48r_notfall_schub_links
emergency_push_right_entity: button.luba_va8tp48r_notfall_schub_rechts
emergency_push_backward_entity: button.luba_va8tp48r_notfall_schub_ruckwarts
emergency_push_forward_entity: button.luba_va8tp48r_notfall_schub_vorwarts

retain_last_state: true
show_stale_warning: true
disable_controls_when_stale: true
stale_after: 120
stale_text: Keine aktuellen Mammotion-Daten
```

────────

Retained state options

|Option                       |Type   |Default                          |Description                                                                               |
|-----------------------------|------:|--------------------------------:|------------------------------------------------------------------------------------------|
|`retain_last_state`          |boolean|`true`                           |Keeps the last valid mower state when the main mower entity becomes unknown or unavailable|
|`show_stale_warning`         |boolean|`true`                           |Shows a warning when the displayed mower state is no longer confirmed                     |
|`disable_controls_when_stale`|boolean|`true`                           |Disables mower controls while stale data is being displayed                               |
|`stale_after`                |number |`120`                            |Time in seconds before the stronger stale-data warning is shown                           |
|`stale_text`                 |string |`Keine aktuellen Mammotion-Daten`|Custom stale warning text                                                                 |

The retained state is stored locally in the browser. A valid mower state must be received at least once before the card can restore it later.

────────

Entity configuration

Most entities can be configured manually. This is useful because entity names may differ depending on:

• Mower model
• Mammotion integration version
• Home Assistant language
• Custom entity naming
• Enabled integration features

The card should not require every optional entity. Missing or unavailable values are displayed as unknown or hidden where appropriate.

────────

State-based controls

|Mower state    |Available controls                             |
|---------------|-----------------------------------------------|
|Mowing         |Pause, return to charging station, cancel task |
|Paused         |Resume, return to charging station, cancel task|
|Returning      |Resume mowing, cancel task                     |
|Docked         |Start mowing, undock                           |
|Maintenance    |Restart mower, relocate charging station       |
|Error          |Emergency movement controls                    |
|Stale / unknown|Controls disabled                              |

Available services and buttons depend on the Mammotion integration and the connected mower model.

────────

Notes

• The card does not replace the Mammotion integration.
• All mower data and actions come from Home Assistant entities and services.
• Some features may not be available on every mower model.
• Entity states and service names can change between integration versions.
• The retained-state feature does not make stale controls available. Old values may be shown, but control actions can remain disabled for safety.

────────

Roadmap

☑ Nova UI framework
☑ State-based Luba card
☑ Desktop layout
☑ Mobile layout
☑ Connection status bar
☑ State-specific mower controls
☑ Error and maintenance views
☑ Firmware update view
☑ Retained last valid mower state
☐ Visual editor
☐ Additional Mammotion models
☐ More user-configurable styling options
☐ Translations
☐ Stable HACS release

────────

Development

Install dependencies:

```bash
npm install
```

Run the production build:

```bash
npm run build
```

The compiled card is written to:

```text
dist/nova-luba-card.js
```

────────

Contributing

Feedback, bug reports and feature requests are welcome.

When reporting an issue, please include:

• Home Assistant version
• Mammotion integration version
• Mower model
• Card configuration
• Relevant entity states
• Browser console errors
• Screenshot, when useful

────────

License

MIT