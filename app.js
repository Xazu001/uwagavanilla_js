document.addEventListener('DOMContentLoaded', function () {
    let excelCols = [];
    let excelRows = [];

    const SHEET_ID = "1j99r6BewdVJZ_X9C2AhaqMFwlWBc_ZphQfYC6-eGRSY";
    const SHEET_TITLE = "REPERTUAR_API";
    const SHEET_RANGE = "A:K";

    const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

    function updateData() {
        console.log("elo");
        fetch(FULL_URL)
            .then((res) => res.text())
            .then((rep) => {
                const data = JSON.parse(rep.substr(47).slice(0, -2));
                excelCols = data.table.cols
                excelRows = data.table.rows
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function mainUwaga(el) {
        if (el.includes("Uwaga")) {
            let secondPart = el.split(" ");
            return (
                '<div style="display: flex; align-items: flex-end;">' +
                '<img src="/img/LOGO_UWAGA_WHITE.svg" style="height: 6.4rem; margin-left: -2.2rem;" alt="" />' +
                '<p>' +
                secondPart[1] +
                '</p>' +
                '</div>'
            );
        } else {
            return el;
        }
    }

    function secondUwaga(el) {
        if (el.includes("Uwaga Piwo")) {
            return (
                '<img class="uwagaBrowar" src="/img/LOGO_UWAGA_BROWAR.svg" style="height: 4.4rem; object-fit: cover;" />'
            );
        } else {
            return el;
        }
    }

    function renderData() {
        const beersList = document.querySelector('.beersList');
        beersList.innerHTML = '';

        if (excelRows) {
            excelRows.forEach((el) => {
                if (el.c[6].v === "kran") {
                    const beerItem = document.createElement('div');
                    beerItem.classList.add('beerItem');

                    const leftDiv = document.createElement('div');
                    leftDiv.classList.add('leftDiv');

                    const divFlex = document.createElement('div');
                    divFlex.style.display = 'flex';

                    const p1 = document.createElement('p');
                    p1.textContent = el.c[0] && el.c[0].v + '.';

                    const p2 = document.createElement('p');
                    p2.innerHTML = el.c[3] && mainUwaga(el.c[3].v);

                    divFlex.appendChild(p1);
                    divFlex.appendChild(p2);

                    const span = document.createElement('span');
                    span.innerHTML = '<p style="padding-left: 6rem;">' +
                        (el.c[1] && el.c[1].v) + '  ' +
                        (el.c[5] && Math.round(el.c[5].v * 1000) / 10) + '%' +
                        '</p>' +
                        '<p>' + (el.c[4] && secondUwaga(el.c[4].v)) + '</p>';

                    leftDiv.appendChild(divFlex);
                    leftDiv.appendChild(span);

                    const divFlex2 = document.createElement('div');
                    divFlex2.style.display = 'flex';
                    divFlex2.style.gap = '1.4rem';

                    const p3 = document.createElement('p');
                    p3.textContent = el.c[8] && el.c[8].v;

                    const p4 = document.createElement('p');
                    p4.textContent = '/';

                    const p5 = document.createElement('p');
                    p5.textContent = el.c[9] && el.c[9].v;

                    const p6 = document.createElement('p');
                    p6.textContent = '/';

                    const p7 = document.createElement('p');
                    p7.textContent = el.c[10] && el.c[10].v;

                    divFlex2.appendChild(p3);
                    divFlex2.appendChild(p4);
                    divFlex2.appendChild(p5);
                    divFlex2.appendChild(p6);
                    divFlex2.appendChild(p7);

                    beerItem.appendChild(leftDiv);
                    beerItem.appendChild(divFlex2);

                    beersList.appendChild(beerItem);
                }
            });
        }
    }

    function init() {


        // 
        // prices.innerHTML = `<p>0.5</p>`
        const leftLogo = document.createElement('img');
        leftLogo.src = '/img/leftLogo.svg';
        leftLogo.alt = 'logo';
        leftLogo.classList.add('leftLogo');

        const rightLogo = document.createElement('img');
        rightLogo.src = '/img/rightLogo.svg';
        rightLogo.alt = '';
        rightLogo.classList.add('rightLogo');

        const logoContainer = document.createElement('div');
        logoContainer.style.display = 'flex';
        logoContainer.style.justifyContent = 'center';
        logoContainer.style.padding = '1.4rem 0';
        logoContainer.appendChild(leftLogo);
        logoContainer.appendChild(rightLogo);

        document.body.insertBefore(logoContainer, document.body.firstChild);

        const beersListSection = document.createElement('section');
        document.body.innerHTML += "<span class='prices'></span>"
        beersListSection.classList.add('beersList');
        document.body.appendChild(beersListSection);

        const prices = document.querySelector('.prices');
        prices.innerHTML = '<p>0,5</p><p>/</p><p>0,35</p><p>/</p><p>0,2</p>';

        setInterval(() => {
            updateData();
            renderData();
        }, 5000);

        updateData();
        renderData();
    }

    init();
});
