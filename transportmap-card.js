console.info(
    `%c  Transport Map Card  %c ${'v0.0.11'} `,
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
            "service": "IC",
            "departure": "07:26",
            "arrival": "08:34",
            "duration": "01h08",
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
        },
        {
            "service": "IN",
            "departure": "20:14",
            "arrival": "21:18",
            "duration": "01h04",
            "train": null,
            "nextStation": ""
        },
        {
            "service": "IR-A",
            "departure": "21:08",
            "arrival": "22:30",
            "duration": "01h22",
            "train": null,
            "nextStation": ""
        }  
    ]
}

class TransportMapCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error("You need to define an entity");
        }

        const root = this.shadowRoot;
        if (root.lastChild) root.removeChild(root.lastChild);

        const cardConfig = Object.assign({}, config);

        const card = document.createElement('ha-card');
        const content = document.createElement('div');
        const style = document.createElement('style');
        style.textContent = `
            ha-card {
                /* sample css */
            }
            .card-content {
                display: flex;
                flex-direction: column;
            }
            .timeline {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }            
            .travel {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                position: relative;
                margin: 10px;
            }
            .travel-stat {

            }
            .stops {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                position: relative;
            }
            .stops::after {
                background-color: var(--primary-color);
                content: '';
                position: absolute;
                left: calc(50% - 2px);
                width: 4px;
                height: 100%;
            }            
            .stop {
                height: 30px;
                text-align: center;
            }
            .stop-info {
                height: 30px;
                text-wrap: nowrap;
            }            
        `;

        content.id = "container";
        content.className = "card-content";

        cardConfig.title ? card.header = cardConfig.title : null;
        card.appendChild(content);
        card.appendChild(style);
        root.appendChild(card);

        this.config = cardConfig;
    }

    renderStats = (data) =>  `
        <div>travelDate: ${data.travelDate}</div>
        <div>departureStation: ${data.departureStation} </div>
        <div>arrivalStation: ${data.arrivalStation}</div>
    `;

    renderTimeline = (data) => {
        let timelineContent = ``;

        sampleData.outwardTrips.map((data, idx) => 
            //timelineContent += `<div class="timeline">${idx}: ${data.service} | ${data.departure} | ${data.arrival} | ${data.duration} </div>`
            timelineContent += `
            <div class="travel">
                <div class="travel-stat">${data.arrival}</div>
                <div class="stops">
                    <div class="stop"><ha-icon icon="mdi:train"></ha-icon></div>
                    <div class="stop"><ha-icon icon="mdi:train"></ha-icon></div>
                    <div class="stop"><ha-icon icon="mdi:train"></ha-icon></div>
                </div>
                <div class="travel-stat"> ${data.departure}</div>
            </div>`
        )

        timelineContent += `
            <div class="travel">
                <div class="travel-stat"></div>
                <div class="stop-info">estação final</div>
                <div class="stop-info">estação</div>
                <div class="stop-info">origem</div>
                <div class="travel-stat"></div>
            </div>`

        return timelineContent;
    }

    set hass(hass) {
        const config = this.config;
        const root = this.shadowRoot;

        const entityId = this.config.entity;
        const state = hass.states[entityId];
        const stateStr = state ? state.state : "unavailable";

        root.getElementById('container').innerHTML = `
            <div class="stats">
                ${this.renderStats(sampleData)}
            </div>
            <div class="timeline">
                ${this.renderTimeline(sampleData.outwardTrips)}
            </div>
        `;
    }

    getCardSize() {
        return 7;
    }

    static getConfigElement() {
        return document.createElement("transportmap-card-editor");
    }

    static getStubConfig() {
        return { entity: "sun.sun" }
    }    
}
  
customElements.define("transportmap-card", TransportMapCard);