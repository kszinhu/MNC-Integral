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
  let p = (mathFunction(func, [a])[0] + mathFunction(func, [b])[0]) / 2, q;
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

function simpson13RuleMethod(func, a, b, erro) {
  let n = 10, p = 0, q;
  let h = (b - a) / n;

  for (let i = 0; i < n; i += 2) {
    p += (h / 3) * (mathFunction(func, [a + i * h])[0] + 4 * mathFunction(func, [a + (i + 1) * h])[0] + mathFunction(func, [a + (i + 2) * h])[0]);
  }
  do {
    q = p;
    n *= 2;
    p = 0;
    for (let i = 0; i < n; i += 2) {
      p += (h / 3) * (mathFunction(func, [a + i * h])[0] + 4 * mathFunction(func, [a + (i + 1) * h])[0] + mathFunction(func, [a + (i + 2) * h])[0]);
    }
  } while (Math.abs(p - q) > erro);
  return p;
}

function simpson38RuleMethod({ func, a, b, epsilon }) {
  let n = 15, p = 0, q;
  let h = (b - a) / n;

  for (let i = 0; i < n; i += 3) {
    p += (3 / 8) * h * (mathFunction(func, [a + i * h])[0] + 3 * mathFunction(func, [a + (i + 1) * h])[0] + 3 * mathFunction(func, [a + (i + 2) * h])[0] + mathFunction(func, [a + (i + 3) * h])[0]);
  }
  do {
    q = p;
    n *= 3;
    let h = (b - a) / n;
    p = 0;
    for (let i = 0; i < n; i += 3) {
      p += (3 / 8) * h * (mathFunction(func, [a + i * h])[0] + 3 * mathFunction(func, [a + (i + 1) * h])[0] + 3 * mathFunction(func, [a + (i + 2) * h])[0] + mathFunction(func, [a + (i + 3) * h])[0]);
    }
  } while (Math.abs(p - q) > epsilon);
  return p;
}

function GaussQuadratureMethod(func, a, b) {
  let p = 0;
  for (let i = 0; i < 20; i++) {
    p += w[i] * (((b - a) / 2) * mathFunction(func, [a * ((1 - X[i]) / 2) + b * ((1 + X[i]) / 2)])[0]);
  }
  return p;
}
