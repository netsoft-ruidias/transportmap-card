console.log(`%ctransportemap-card\n%cVersion: ${'0.0.1'}`, 'color: rebeccapurple; font-weight: bold;', '');

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
            .timeline-container {
                display: flex;
                flex-direction: column;
                position: relative;
                margin: 40px 0;
            }
            .timeline-container::after {
                background-color: #e17b77;
                content: '';
                position: absolute;
                left: calc(50% - 2px);
                width: 4px;
                height: 100%;
            }
            .timeline-item {
                display: flex;
                justify-content: flex-end;
                padding-right: 30px;
                position: relative;
                margin: 10px 0;
                width: 50%;
            }
            .timeline-item:nth-child(odd) {
                align-self: flex-end;
                justify-content: flex-start;
                padding-left: 30px;
                padding-right: 0;
            }
            .timeline-item-content {
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                border-radius: 5px;
                background-color: #fff;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                padding: 15px;
                position: relative;
                width: 400px;
                max-width: 70%;
                text-align: right;
            }
            .timeline-item-content::after {
                content: ' ';
                background-color: #fff;
                box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.2);
                position: absolute;
                right: -7.5px;
                top: calc(50% - 7.5px);
                transform: rotate(45deg);
                width: 15px;
                height: 15px;
            }
            .timeline-item:nth-child(odd) .timeline-item-content {
                text-align: left;
                align-items: flex-start;
            }
            .timeline-item:nth-child(odd) .timeline-item-content::after {
                right: auto;
                left: -7.5px;
                box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
            }
        `;

        content.id = "container";
        cardConfig.title ? card.header = cardConfig.title : null;
        card.appendChild(content);
        card.appendChild(style);
        root.appendChild(card);
        this.config = cardConfig;        
    }

    // TimelineItem = ({ data }) => (
    //     <div className="timeline-item">
    //         <div className="timeline-item-content">
    //             <span className="tag" style={{ background: data.category.color }}>
    //                 {data.category.tag}
    //             </span>
    //             <time>{data.date}</time>
    //             <p>{data.text}</p>
    //             {data.link && (
    //                 <a
    //                     href={data.link.url}
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     {data.link.text}
    //                 </a>
    //             )}
    //             <span className="circle" />
    //         </div>
    //     </div>
    // );

    // Timeline = (timelineData) =>
    //     timelineData.length > 0 && (
    //     <div className="timeline-container">
    //         {timelineData.map((data, idx) => (
    //             <TimelineItem data={data} key={idx} />
    //         ))}
    //     </div>
    // );

    set hass(hass) {
      if (!this.content) {
        this.innerHTML = `
          <ha-card header="transportmap-card">
            <div class="card-content"></div>
          </ha-card>
        `;
        this.content = this.querySelector("div");
      }
  
      const entityId = this.config.entity;
      const state = hass.states[entityId];
      const stateStr = state ? state.state : "unavailable";
  
      this.content.innerHTML = `
        The state of ${entityId} is ${stateStr}!
        <br><br>
        travelDate: ${sampleData.travelDate} <br>
        departureStation: ${sampleData.departureStation} <br>
        arrivalStation: ${sampleData.arrivalStation} <br>
        outwardTrips: ${sampleData.outwardTrips} <br>
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