console.info(
    `%c  Transport Map Card  %c ${'v0.0.8'} `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray',
);

const sampleData = {
    "travelDate": "2023-10-16",
    "departureStation": "Viana do Castelo",
    "arrivalStation": "Porto - Campanha",
    "outwardTrips": [
        {
            "service": "R|U",
            "departure": "05:11",
            "arrival": "07:10",
            "duration": "01h59",
            "train": null,
            "nextStation": ""
        },
        {
            "service": "R|U",
            "departure": "06:00",
            "arrival": "08:10",
            "duration": "02h10",
            "train": null,
            "nextStation": ""
        },
        {
            "service": "R",
            "departure": "06:42",
            "arrival": "08:20",
            "duration": "01h38",
            "train": null,
            "nextStation": ""
        },
        {
            "service": "IR-A",
            "departure": "18:49",
            "arrival": "20:10",
            "duration": "01h21",
            "train": 830,
            "nextStation": "Alvaraes (19:01)"
        }
    ]
}

class TransportMapCard extends HTMLElement {
    
    setConfig(config) {
        if (!config.entity) {
        throw new Error("You need to define an entity");
        }
        this.config = config;
    }

    set hass(hass) {
        // Initialize the content if it's not there yet.
        if (!this.content) {
        this.innerHTML = `
            <ha-card header="Transport Card">
            <div class="card-content"></div>
            </ha-card>
        `;
        this.content = this.querySelector("div");
        }

        const entityId = this.config.entity;
        const state = hass.states[entityId];
        const stateStr = state ? state.state : "unavailable";

        this.content.innerHTML = `
            with sampleData
            <br><br>
            The state of ${entityId} is ${stateStr}!
            <br><br>
            travelDate: ${sampleData.travelDate} <br>
            departureStation: ${sampleData.departureStation} <br>
            arrivalStation: ${sampleData.arrivalStation}
        `;
    }

    getCardSize() {
        return 3;
    }

    static getConfigElement() {
        return document.createElement("transportmap-card-editor");
    }

    static getStubConfig() {
        return { entity: "sun.sun" }
    }    
}
  
customElements.define("transportmap-card", TransportMapCard);