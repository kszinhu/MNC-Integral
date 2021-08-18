/**
 * Function to create popup for the information button.
 */
const infoButton = () => {
  const body = document.querySelector("body");
  const elem = document.createElement("details");
  body.appendChild(elem);
  elem.outerHTML = `
    <div id="modal-info" open>
      <div class="details-modal-overlay"></div>
      <div class='details-modal'>
        <div class='details-modal-close' onclick='document.querySelector("#modal-info").remove()' style="cursor: pointer">
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z'
              fill='black'
            />
          </svg>
        </div>
        <div class='details-modal-title'>
          <h1>Criado por:</h1>
        </div>
        <div class='details-modal-content'>
          <p>
            Matheus Ribeiro e Cassiano Rodrigues
          </p>
        </div>
      </div>
    </div>
    `;
};

/**
 * Function that calculates a mathematical function.
 * @param { Input } string mathematics.
 * @param { x } array of x points.
 */
const mathFunction = (input, x) => {
  return x.map((el) => math.evaluate(input, { x: el }));
};

/**
 * Function to clear all point inputs of the points table.
 */
const clearInputs = () => {
  [...document.querySelectorAll("input")].map((el) => (el.value = ""));
};

/**
 * Function to select all Toggle from curved lists.
 */
const selectAll = () =>
  [...document.querySelectorAll(".toggles li .toggle-control input")].map(
    (el) => !el.disabled && (el.checked = !el.checked)
  );

/**
 * Function that generates graphs.
 * @param { info } object of the chart data.
 */
const genChart = (info) => {
  const chartDiv = document.querySelector("#chart-div");
  const chartCanvas = document.createElement("canvas");
  chartCanvas.id = "chart";
  chartDiv.innerHTML = "";
  chartDiv.appendChild(chartCanvas);
  chartDiv.style.display = "block";

  const data = {
    labels: info.x,
    datasets: [
      {
        type: "scatter",
        label: "Pontos da Amostra",
        backgroundColor: "#D12A2A",
        borderColor: "#B01717",
        borderWidth: 3,
        data: info.sample,
      },
      {
        type: "line",
        label: `P${info.degree}(x)`,
        borderColor: "#2196F3",
        backgroundColor: "#2196F3",
        borderWidth: 2,
        cubicInterpolationMode: "monotone",
        data: info.polynomial,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
      plugins: {
        title: {
          display: true,
          text: "Adjustment chart",
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scale: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  new Chart(chartCanvas, config);
};

/**
 * Function that captures user input data.
 * @return { object } Object with input data.
 */
const getInput = () => ({
  func: document.querySelector("#function").value,
  a: Number(document.querySelector("#a").value),
  b: Number(document.querySelector("#b").value),
  epsilon: Number(document.querySelector("#epsilon").value),
});

/**
 * Função encaminha a chamada dos métodos conforme a seleção do Usuário.
 * @returns { Object } Object with the results of the integrals obtained by the methods.
 */
const whichSelected = () => {
  const result = {};
  const onlySelects = [...document.querySelectorAll(".toggle-control input")]
    .map((el) => el.checked && Number(el.value))
    .filter(Boolean);

  onlySelects.length != 0 &&
    onlySelects.forEach((el) => {
      switch (el) {
        case 1:
          // Retângulos à esquerda
          // ------------------------
          // result.leftRectangles = {methodName: 'Retângulos à esquerda', value: methodHere()}
          break;

        case 2:
          // Retângulos à direita
          // ------------------------
          // result.rightRectangles = {methodName: 'Retângulos à direita', value: methodHere()}
          break;

        case 3:
          // Regra dos Trapézios
          // ------------------------
          // result.trapezoids = {methodName: 'Regra dos Trapézios', value: methodHere()}
          break;

        case 4:
          // Regra 1/3 de Simpson
          // ------------------------
          // result.simpson13 = {methodName: 'Regra 1/3 de Simpson', value: methodHere()}
          break;

        case 5:
          // Regra 3/8 de Simpson
          // ------------------------
          // result.simpson38 = {methodName: 'Regra 3/8 de Simpson', value: methodHere()}
          break;

        case 6:
          // Quadratura de Gauss
          // ------------------------
          // result.quadrature = {methodName: 'Quadratura de Gauss', value: methodHere()}
          break;
      }
    });
  return result;
};

/**
 * Função que possibilita a visualizaçào na aplicação.
 * @param { Object } Object with the results of the integrals obtained by the methods.
 */
const showResult = (objectResult) => {
  const resultDiv = document.querySelector("#result-div");
  resultDiv.innerHTML = "";
  let content = "";

  /*
   * Creates table contents, from the results object.
   */
  Object.entries(objectResult).forEach(([key, value]) => {
    content += `<tr>
            <td>${value.methodName}</td>
            <td>${value.value}</td>
          </tr>`;
  });

  const resultTable = document.createElement("table");
  resultTable.className = "result-table";
  resultTable.innerHTML = `
    <thead>
      <tr>
        <th>Método</th>
        <th>Resultado</th>
      </tr>
    </thead>
    <tbody>
      ${content}
    </tbody>
  `;
  resultDiv.appendChild(resultTable);
  resultDiv.style.display = "block";
};
