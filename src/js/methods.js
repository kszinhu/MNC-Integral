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

