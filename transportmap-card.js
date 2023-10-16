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
            .timeline-content {
                display: flex;
                flex-direction: row;
            }            
            .timeline {
                display: flex;
                flex-direction: column;
                position: relative;
                width: 20px;
                margin: 10px;
            }
            .timeline::after {
                background-color: #e17b77;
                content: '';
                position: absolute;
                left: calc(50% - 2px);
                width: 4px;
                height: 100%;
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
            timelineContent += `<div class="timeline">${idx}: ${data.service} | ${data.departure} | ${data.arrival} | ${data.duration} </div>`
        )

        return timelineContent;
    }

    set hass(hass) {
        const config = this.config;
        const root = this.shadowRoot;
        //const card = root.lastChild;

        const entityId = this.config.entity;
        const state = hass.states[entityId];
        const stateStr = state ? state.state : "unavailable";

        // let cardContent = `
        //     <div class="timeline"></div>
        //     <div class="timeline"></div>
        //     <div class="timeline"></div>

        //     <div>The state of ${entityId} is ${stateStr}!</div>
            
        //     <div>travelDate: ${sampleData.travelDate} </div>
        //     <div>departureStation: ${sampleData.departureStation} </div>
        //     <div>arrivalStation: ${sampleData.arrivalStation} </div>
        //     <div>
        //     ${sampleData.outwardTrips.map((data, idx) => 
        //         `<div>${idx}: ${data.service} | ${data.departure} | ${data.arrival} | ${data.duration} </div>`
        //     )}
        //     </div>         
        // `;
        //
        // root.getElementById('container').innerHTML = cardContent;
        root.getElementById('container').innerHTML = `
            <div class="stats">
                ${this.renderStats(sampleData)}
            </div>
            <div class="timeline-content">
                ${this.renderTimeline(sampleData.outwardTrips)}
            </div>
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