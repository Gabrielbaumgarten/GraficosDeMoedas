function getMoedas() {
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$format=json', false)
    httpRequest.send()

    return resposta
}

function getMoedasPorData(moeda, inicio, fim) {
    // function getMoedasPorData() {
    const httpRequest = new XMLHttpRequest()
    var resposta = ''

    inicio = inicio.split('-')
    inicio = inicio[1] + '-' + inicio[2] + '-' + inicio[0]
    fim = fim.split('-')
    fim = fim[1] + '-' + fim[2] + '-' + fim[0]

    httpRequest.onload = () => {
        resposta = JSON.parse(httpRequest.response)
    }

    httpRequest.open('GET', "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moeda + "'&@dataInicial='" + inicio + "'&@dataFinalCotacao='" + fim + "'&$top=9999&$skip=0&$filter=tipoBoletim%20eq%20'Fechamento'&$format=json", false)
    httpRequest.send()

    return resposta
}


function graficoCalendario(periodo) {
    // Load the Visualization API and the corechart package.
    google.charts.load("current", { packages: ["calendar"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ label: 'Dia:', type: 'date', id: 'Date' });
        dataTable.addColumn({ label: 'Abertura', type: 'number', id: 'Abertura' });


        periodo.value.forEach(element => {

            dataTable.addRow([new Date(element.dataHoraCotacao), element.cotacaoVenda])

        });

        var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

        var options = {
            title: "Cotação de venda no fim do dia",
            width: 1000,
            calendar: {
                // Define o tamanho das células
                // cellSize: 10
                dayOfWeekLabel: {
                    fontName: 'Poppins',
                    color: '#5D6985',
                },
                dayOfWeek: 'DSTQQSS',

                monthLabel: {
                    fontName: 'Poppins',
                    color: '#5D6985',
                },

                monthOutlineColor: {
                    stroke: 'ABB2B8',
                    strokeOpacity: 0.8,
                    strokeWidth: 2
                },

                yearLabel: {
                    fontName: 'Poppins',
                    color: '#5D6985',
                },
            },

            // Define as cores para células que não possuem valores
            noDataPattern: {
                backgroundColor: '#F1F3F4',
                color: '#F1F3F4'
            },
            // Define as variações de cores entre o mínimo e máximo
            colorAxis: { colors: ['#ABB2B8', '#5D6985'] },
        };

        chart.draw(dataTable, options);
    }
}

function graficoLinhas(periodo, moeda) {
    google.charts.load('current', { 'packages': ['line'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ label: 'Dia', type: 'date', id: 'Date' });
        dataTable.addColumn({ label: moeda, type: 'number', id: 'Fechamento' });

        periodo.value.forEach(element => {

            dataTable.addRow([new Date(element.dataHoraCotacao), element.cotacaoVenda])

        });


        var options = {
            colors: ['#5D6985', ],
            curveType: 'Function',
            fontName: 'Poppins',
            hAxi: {
                textStyle: {
                    color: '#5D6985',
                }
            },
            vAxi: {
                textStyle: {
                    color: '#5D6985',
                }
            }
        };

        var chart = new google.charts.Line(document.getElementById('linechart_material'));

        chart.draw(dataTable, google.charts.Line.convertOptions(options));
    }
}

function criarTabela(periodo) {
    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Data');
        data.addColumn('number', 'Cotação para Compra');
        data.addColumn('number', 'Cotação para Venda');
        periodo.value.forEach(element => {

            data.addRow([element.dataHoraCotacao, element.cotacaoCompra, element.cotacaoVenda])

        });

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, { 
            showRowNumber: true, 
            page: 'enable',
            pageSize: 5,
            cssClassNames: {
                headerRow: 'table-header',
                tableRow: 'table-row',
                oddTableRow: 'table-odd-row'
            }
        });
    }
}

function criarGraficoLinhas() {

    var div = document.createElement('div')

    var divTitulo = document.createElement('div')
    divTitulo.className = 'titulo'

    var titulo = document.createElement('h1')
    titulo.innerHTML = 'Variação do Câmbio'

    var imagem = new Image()
    imagem.src = 'img/grafico.png'

    divTitulo.appendChild(imagem)
    divTitulo.appendChild(titulo)

    var hr = document.createElement('hr')

    var grafico = document.createElement('div')
    grafico.setAttribute('id', 'linechart_material')

    div.setAttribute('id', 'linha')
    div.className = 'Grafico1'
    div.classList.add('entrada')
    div.appendChild(divTitulo)
    div.appendChild(hr)
    div.appendChild(grafico)

    return div
}

function criarTabelaDeValores() {

    var div = document.createElement('div')

    var divTitulo = document.createElement('div')
    divTitulo.className = 'titulo'

    var titulo = document.createElement('h1')
    titulo.innerHTML = 'Valores Mês a Mês'

    var imagem = new Image()
    imagem.src = 'img/tabela.png'

    divTitulo.appendChild(imagem)
    divTitulo.appendChild(titulo)

    var hr = document.createElement('hr')

    var grafico = document.createElement('div')
    grafico.setAttribute('id', 'table_div')

    div.setAttribute('id', 'tabela')
    div.className = 'Grafico2'
    div.classList.add('entrada')
    div.appendChild(divTitulo)
    div.appendChild(hr)
    div.appendChild(grafico)

    return div
}

function criarGraficoCotacao() {

    var div = document.createElement('div')

    var divTitulo = document.createElement('div')
    divTitulo.className = 'titulo'

    var titulo = document.createElement('h1')
    titulo.innerHTML = 'Cotação por dia'

    var imagem = new Image()
    imagem.src = 'img/calendario.png'

    divTitulo.appendChild(imagem)
    divTitulo.appendChild(titulo)

    var hr = document.createElement('hr')

    var grafico = document.createElement('div')
    grafico.setAttribute('id', 'calendar_basic')

    div.setAttribute('id', 'calendario')
    div.className = 'Grafico3'
    div.classList.add('entrada')
    div.appendChild(divTitulo)
    div.appendChild(hr)
    div.appendChild(grafico)

    return div
}

async function Pesquisar() {
    var dataInicio = document.getElementById('inicio').value
    var dataFim = document.getElementById('fim').value
    var moeda = document.getElementById('nomeMoeda').firstChild.nodeValue


    if (dataFim < dataInicio) {
        alert('Você não pode escolher uma data final anterior a data de início!')
    }

    if (moeda == 'Dolar') {
        moeda = 'USD'
    } else if (moeda == 'Euro') {
        moeda = 'EUR'
    } else if (moeda == 'Libra') {
        moeda = 'GBP'
    }

    const dadosPorPeriodo = getMoedasPorData(moeda, dataInicio, dataFim)

    tirarGraficos()

    await new Promise(r => setTimeout(r, 2000))

    graficoCalendario(dadosPorPeriodo)
    graficoLinhas(dadosPorPeriodo, moeda)
    criarTabela(dadosPorPeriodo)

    colocarGraficos()

}

function start() {
    var inicio = getDate(-2)
    var fim = getDate(-1)

    var periodo = getMoedasPorData('USD', inicio, fim)

    var divGraficos = document.getElementById('graficos')


    divGraficos.appendChild(criarGraficoLinhas())

    divGraficos.appendChild(criarTabelaDeValores())

    divGraficos.appendChild(criarGraficoCotacao())


    graficoCalendario(periodo)
    graficoLinhas(periodo, 'USD')
    criarTabela(periodo)


    document.getElementById('graficos').style.display = 'flex'
    document.getElementById('sobre').style.display = 'none'
    document.getElementById('ajuda').style.display = 'none'
}

async function Dolar() {
    var dolar = document.getElementById('nomeMoeda')
    dolar.innerHTML = "Dolar"

    var button = document.getElementById('buttonDolar')
    var h3 = button.childNodes[3]
    h3.style.color = '#5D6985'

    button = document.getElementById('buttonEuro')
    h3 = button.childNodes[3]
    h3.style.color = '#ABB2B8'
    
    button = document.getElementById('buttonLibra')
    h3 = button.childNodes[3]
    h3.style.color = '#ABB2B8'

    tirarGraficos()

    dolar.classList.add('entrada')
    
    Pesquisar()
    
    await new Promise(r => setTimeout(r, 2000))
    
    colocarGraficos()
    dolar.classList.remove('entrada')
}

async function Euro() {
    var euro = document.getElementById('nomeMoeda')
    euro.innerHTML = "Euro"
    
    var button = document.getElementById('buttonEuro')
    var h3 = button.childNodes[3]
    h3.style.color = '#5D6985'
    
    button = document.getElementById('buttonDolar')
    h3 = button.childNodes[3]
    h3.style.color = '#ABB2B8'
    
    button = document.getElementById('buttonLibra')
    h3 = button.childNodes[3]
    h3.style.color = '#ABB2B8'
    
    tirarGraficos()
    
    euro.classList.add('entrada')
    
    Pesquisar()
    
    await new Promise(r => setTimeout(r, 2000))
    
    colocarGraficos()
    euro.classList.remove('entrada')
}

async function Libra() {
    var libra = document.getElementById('nomeMoeda')
    libra.innerHTML = "Libra"

    var button = document.getElementById('buttonLibra')
    var h3 = button.childNodes[3]
    h3.style.color = '#5D6985'

    button = document.getElementById('buttonDolar')
    h3 = button.childNodes[3]
    h3.style.color = '#ABB2B8'

    button = document.getElementById('buttonEuro')
    h3 = button.childNodes[3]
    h3.style.color = '#ABB2B8'

    tirarGraficos()

    libra.classList.add('entrada')
    
    Pesquisar()
    
    await new Promise(r => setTimeout(r, 2000))
    
    colocarGraficos()
    libra.classList.remove('entrada')
}

function tirarGraficos(){
    var calendar = document.getElementById('calendario')
    var line = document.getElementById('linha')
    var table = document.getElementById('tabela')

    calendar.classList.remove('entrada')
    line.classList.remove('entrada')
    table.classList.remove('entrada')

    calendar.classList.add('saida')
    line.classList.add('saida')
    table.classList.add('saida')
}

function colocarGraficos(){
    var calendar = document.getElementById('calendario')
    var line = document.getElementById('linha')
    var table = document.getElementById('tabela')

    calendar.classList.remove('saida')
    line.classList.remove('saida')
    table.classList.remove('saida')

    calendar.classList.add('entrada')
    line.classList.add('entrada')
    table.classList.add('entrada')
}

//dias = 0 para hoje
function getDate(dias){
    var data = new Date()
    
    return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + (data.getDate()+dias)
}