class Instruments {

    constructor() {
        var instruments = [];
        this.loadData();
    }

    loadData() {
        var self = this;
        let instrumentRequest = new Request('http://dev.ivanikolova.eu/trading-instruments/instruments.txt', { method: 'GET' });
        fetch(instrumentRequest)
            .then(response => {
                if (response && response.status === 200) return response.json();
                else throw new Error('Something went wrong on api server!');
            })
            .then(data => {
                if (data && data.hasOwnProperty('instruments')) {
                    self.instruments = data.instruments;
                    this.sortData(self.instruments);
                }
            })


    }

    showData() {
        let instrument_div = document.querySelector('#instruments_div');
        instrument_div.innerHTML = '';

        this.instruments.forEach(instrument => {
            let row = document.createElement("div");
            instrument_div.appendChild(row);
            row.classList.add('row');

            let first_column = document.createElement("div");
            let second_column = document.createElement("div");
            let container_bar = document.createElement("div");
            container_bar.classList.add('container_bar', 'ascending');


            first_column.classList.add('column', 'col-md-3', 'alphabetical');
            second_column.classList.add('progress');
            second_column.classList.add('column', 'col-md-6', 'ascending');
            let width_buy = instrument.sentiment + '%';
            let width_sell = (100 - instrument.sentiment) + '%';
            first_column.innerHTML = `${instrument.dispCode}`;
            second_column.innerHTML = ` <div class="progress-bar progress-bar-info" role="progressbar" style="width:${width_buy}"></div>
                                                      <div class="progress-bar progress-bar-danger" role="progressbar" style="width:${width_sell}"></div>`;

            let buy_label = document.createElement("div");
            buy_label.classList.add('buy-label');
            buy_label.innerHTML = 'Buy';

            let sell_label = document.createElement("div");
            sell_label.classList.add('sell-label');
            sell_label.innerHTML = 'Sell';

            container_bar.appendChild(second_column);
            container_bar.appendChild(buy_label);
            container_bar.appendChild(sell_label);

            let percentage_buy = document.createElement("div");
            percentage_buy.innerHTML = width_buy;
            percentage_buy.classList.add('buy_percentage', 'ascending');
            let percentage_sell = document.createElement("div");
            percentage_sell.innerHTML = width_sell;
            percentage_sell.classList.add('col-md-1', 'sell_percentage', 'ascending');


            let frag = document.createDocumentFragment();
            frag.appendChild(first_column);
            frag.appendChild(percentage_buy);
            frag.insertBefore(container_bar, percentage_buy);

            frag.appendChild(container_bar);
            frag.appendChild(percentage_sell);
            row.appendChild(frag);
            instrument_div.appendChild(row);


        });

        let alphabetical_elements = document.querySelectorAll(".alphabetical");
        if(alphabetical_elements) {
            alphabetical_elements.forEach(element => {
                element.addEventListener("click", () => {
                    this.sortData(this.instruments);
                });
            });
        }
        let ascending_elements = document.querySelectorAll(".ascending");
        if(ascending_elements) {
            ascending_elements.forEach(element => {
                element.addEventListener("click", () => {
                    this.sortData(this.instruments, 'ascending');
                });
            });
        }
    }

    sortData(instruments, type = 'alphabetical') {
        if (type === 'alphabetical') {
            instruments.sort(function (a, b) {
                if (a.dispCode < b.dispCode) return -1;
                if (a.dispCode > b.dispCode) return 1;
                return 0;
            });
        } else {

            instruments.sort(function(a, b) {
                return parseFloat(a.sentiment) - parseFloat(b.sentiment);
            });

        }
        this.instruments = instruments;

        this.showData();
    }
}

let app = new Instruments();