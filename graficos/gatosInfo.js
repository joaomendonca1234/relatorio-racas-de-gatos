const apiKey = 'live_FdP0EWVSpxEHcJAEBYW5iGb3kW7U6NsKPUfJVsy3Wz886l1YzzDnBETxkYsBp5kt';
const url = `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`;

async function obterDadosDeGatos() {
    const res = await fetch(url);
    const dados = await res.json();
    
    // Calcular o número de raças e a expectativa de vida média
    const numeroDeRacas = dados.length;
    const expectativaTotal = dados.reduce((soma, gato) => soma + parseFloat(gato.life_span.split(" ")[0]), 0);
    const expectativaMedia = (expectativaTotal / numeroDeRacas).toFixed(1);

    // Exibir uma mensagem compacta em um espaço retangular estilizado
    const container = document.getElementById('info-container');
    const divInfo = document.createElement('div');
    divInfo.classList.add('info-box'); // Adiciona a classe para estilização
    divInfo.innerHTML = `
        <p>Existem <span>${numeroDeRacas}</span> raças de gatos no mundo, e a maioria vive cerca de <span>${expectativaMedia}</span> anos.</p>
    `;
    container.appendChild(divInfo);

    criarGraficoDeExpectativaDeVida(dados);
}

// Função para criar o gráfico com expectativa de vida por raça
function criarGraficoDeExpectativaDeVida(gatos) {
    const nomes = gatos.map(gato => gato.name);
    const expectativas = gatos.map(gato => parseFloat(gato.life_span.split(" ")[0]));

    const data = [
        {
            x: nomes,
            y: expectativas,
            type: 'bar',
            marker: {
                color: '#61dafb'
            }
        }
    ];

    const layout = {
        title: {
            text: 'Expectativa de Vida das Raças de Gatos',
            font: {
                size: 24,
                color: '#ffffff'
            }
        },
        plot_bgcolor: '#282c34',
        paper_bgcolor: '#282c34',
        xaxis: {
            tickfont: {
                color: '#ffffff'
            },
            title: {
                text: 'Raças de Gatos',
                font: {
                    color: '#ffffff'
                }
            }
        },
        yaxis: {
            tickfont: {
                color: '#ffffff'
            },
            title: {
                text: 'Expectativa de Vida (anos)',
                font: {
                    color: '#ffffff'
                }
            }
        }
    };

    const graficoDiv = document.createElement('div');
    graficoDiv.className = 'grafico';
    document.getElementById('graficos-container').appendChild(graficoDiv);
    Plotly.newPlot(graficoDiv, data, layout);
}

obterDadosDeGatos();
