function leftRectangleRuleMethod(f, a, b, error) {
  f = new Function(`x`, `return ${f};`);
  let n = 10;
  let sum = 0;
  let q;
  let x;
  let h = (b - a) / n;
  for (let i = 0; i < n; i++) {
    x = a + i * h;
    sum += f(x);
  }
  sum *= h;
  do {
    q = sum;
    n *= 2;
    h = (b - a) / n;
    sum = 0;
    for (let i = 0; i < n; i++) {
      x = a + i * h;
      sum += f(x);
    }
    sum *= h;
  } while (Math.abs(sum - q) > error);
  return sum;
}

function trapezoidolRuleMethod(f, a, b, error) {
  f = new Function(`x`, `return ${f};`);
  let n = 10;
  let p = (f(a) + f(b)) / 2, q;
  let h = (b - a) / n;
  for (let i = 0; i < n; i++) {
    x = a + i * h;
    p += f(x);
  }
  p *= h;
  do {
    q = p;
    n *= 2;
    h = (b - a) / n;
    p = (f(a) + f(b)) / 2;
    for (let i = 0; i < n; i++) {
      x = a + i * h;
      p += f(x);
    }
    p *= h;
  } while (Math.abs(p - q) > error);
  return p;
}

