class TransportMapCardEditor extends LitElement {
    setConfig(config) {
      this._config = config;
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