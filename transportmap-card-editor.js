class TransportMapCardEditor extends LitElement {
  setConfig(config) {
    this._config = config;
  }

  static get properties() {
    return { hass: {}, _config: {} };
  }
  
  get _title() {
    return this._config.title || "";
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      ${this.renderStyle()}
        <div class="card-config">
          <div class="side-by-side">
            <paper-input
              label="Title (Optional)"
              .value="${this._title}"
              .configValue="${"title"}"
              @value-changed="${this._valueChanged}"
            ></paper-input>
          </div>
          <div class="side-by-side">
            <a href ="https://github.com/custom-components/custom_updater/issues/new?template=issue.md" target="_blank"><mwc-button style="float: right;" title="Open an issue @ GitHub">Open an issue</mwc-button></a>
          </div>
          <div>For more advanced configuration use the yaml editor</div>
        </div>
      `;
  }

  renderStyle() {
    return html`
      <style>
        paper-toggle-button {
          padding-top: 16px;
        }
        .side-by-side {
          display: flex;
        }
        .side-by-side > * {
          flex: 1;
          padding-right: 4px;
        }
      </style>
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === "") {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]:
            target.checked !== undefined ? target.checked : target.value
        };
      }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }

  configChanged(newConfig) {
    const event = new Event("config-changed", {
      bubbles: true,
      composed: true,
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }
}

customElements.define("transportmap-card-editor", TransportMapCardEditor);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "transportmap-card",
  name: "Transport Map Card",
  preview: true,
  description: "A Transport Map for Home Assistant",
});