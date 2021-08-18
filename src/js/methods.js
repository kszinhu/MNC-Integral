function leftRectangleRuleMethod({ func, a, b, epsilon }) {
  let n = 10;
  let sum = 0;
  let q, x;
  let h = (b - a) / n;
  for (let i = 0; i < n; i++) {
    x = a + i * h;
    sum += mathFunction(func, [x])[0];
  }
  sum *= h;
  do {
    q = sum;
    n *= 2;
    h = (b - a) / n;
    sum = 0;
    for (let i = 0; i < n; i++) {
      x = a + i * h;
      sum += mathFunction(func, [x])[0];
    }
    sum *= h;
  } while (Math.abs(sum - q) > epsilon);
  return sum;
}

function rightRectangleRuleMethod({ func, a, b, epsilon }) {
  let n = 10;
  let sum = 0;
  let q, x;
  let h = (b - a) / n;
  for (let i = 1; i <= n; i++) {
    x = a + i * h;
    sum += mathFunction(func, [x])[0];
  }
  sum *= h;
  do {
    q = sum;
    n *= 2;
    h = (b - a) / n;
    sum = 0;
    for (let i = 1; i <= n; i++) {
      x = a + i * h;
      sum += mathFunction(func, [x])[0];
    }
    sum *= h;
  } while (Math.abs(sum - q) > epsilon);
  return sum;
}

function trapezoidolRuleMethod({ func, a, b, epsilon }) {
  let n = 10;
  let p = (mathFunction(func, [a])[0] + mathFunction(func, [b])[0]) / 2,
    q;
  let h = (b - a) / n;
  for (let i = 0; i < n; i++) {
    x = a + i * h;
    p += mathFunction(func, [x])[0];
  }
  p *= h;
  do {
    q = p;
    n *= 2;
    h = (b - a) / n;
    p = (mathFunction(func, [a])[0] + mathFunction(func, [b])[0]) / 2;
    for (let i = 0; i < n; i++) {
      x = a + i * h;
      p += mathFunction(func, [x])[0];
    }
    p *= h;
  } while (Math.abs(p - q) > epsilon);
  return p;
}

function simpson13RuleMethod({ func, a, b, epsilon }) {
  let n = 10,
    p = 0,
    q;
  let h = (b - a) / n;

  for (let i = 0; i < n; i += 2) {
    p +=
      (h / 3) *
      (mathFunction(func, [a + i * h])[0] +
        4 * mathFunction(func, [a + (i + 1) * h])[0] +
        mathFunction(func, [a + (i + 2) * h])[0]);
  }
  do {
    q = p;
    n *= 2;
    p = 0;
    for (let i = 0; i < n; i += 2) {
      p +=
        (h / 3) *
        (mathFunction(func, [a + i * h])[0] +
          4 * mathFunction(func, [a + (i + 1) * h])[0] +
          mathFunction(func, [a + (i + 2) * h])[0]);
    }
  } while (Math.abs(p - q) > epsilon);
  return p;
}

function simpson38RuleMethod({ func, a, b, epsilon }) {
  let n = 15,
    p = 0,
    q;
  let h = (b - a) / n;

  for (let i = 0; i < n; i += 3) {
    p +=
      (3 / 8) *
      h *
      (mathFunction(func, [a + i * h])[0] +
        3 * mathFunction(func, [a + (i + 1) * h])[0] +
        3 * mathFunction(func, [a + (i + 2) * h])[0] +
        mathFunction(func, [a + (i + 3) * h])[0]);
  }
  do {
    q = p;
    n *= 3;
    let h = (b - a) / n;
    p = 0;
    for (let i = 0; i < n; i += 3) {
      p +=
        (3 / 8) *
        h *
        (mathFunction(func, [a + i * h])[0] +
          3 * mathFunction(func, [a + (i + 1) * h])[0] +
          3 * mathFunction(func, [a + (i + 2) * h])[0] +
          mathFunction(func, [a + (i + 3) * h])[0]);
    }
  } while (Math.abs(p - q) > epsilon);
  return p;
}

function GaussQuadratureMethod({ func, a, b }) {
  const W = [
    0.0271524594117540948517806, 0.0622535239386478928628438,
    0.0951585116824927848099251, 0.1246289712555338720524763,
    0.1495959888165767320815017, 0.1691565193950025381893121,
    0.1826034150449235888667637, 0.1894506104550684962853967,
    0.1894506104550684962853967, 0.1826034150449235888667637,
    0.1691565193950025381893121, 0.1495959888165767320815017,
    0.1246289712555338720524763, 0.0951585116824927848099251,
    0.0622535239386478928628438, 0.0271524594117540948517806,
  ];
  const T = [
    -0.9894009349916499325961542, -0.9445750230732325760779884,
    -0.8656312023878317438804679, -0.7554044083550030338951012,
    -0.6178762444026437484466718, -0.4580167776572273863424194,
    -0.2816035507792589132304605, -0.0950125098376374401853193,
    0.0950125098376374401853193, 0.2816035507792589132304605,
    0.4580167776572273863424194, 0.6178762444026437484466718,
    0.7554044083550030338951012, 0.8656312023878317438804679,
    0.9445750230732325760779884, 0.9894009349916499325961542,
  ];

  let p = 0;
  for (let i = 0; i < W.length; i++) {
    p +=
      W[i] *
      (((b - a) / 2) *
        mathFunction(func, [a * ((1 - T[i]) / 2) + b * ((1 + T[i]) / 2)])[0]);
  }
  return p;
}
