export function obtenerAdultoEquivalente(sexo, edad) {
  edad = parseInt(edad);
  if (isNaN(edad) || edad < 0) return 0;
  if (edad < 1) return 0.35;
  if (edad === 1) return 0.37;
  if (edad === 2) return 0.46;
  if (edad === 3) return 0.51;
  if (edad === 4) return 0.55;
  if (edad === 5) return 0.60;
  if (edad === 6) return 0.64;
  if (edad === 7) return 0.66;
  if (edad === 8) return 0.68;
  if (edad === 9) return 0.69;
  if (sexo === 'M') {
    if (edad === 10) return 0.79;
    if (edad === 11) return 0.82;
    if (edad === 12) return 0.85;
    if (edad === 13) return 0.90;
    if (edad === 14) return 0.96;
    if (edad === 15) return 1.00;
    if (edad === 16) return 1.03;
    if (edad === 17) return 1.04;
    if (edad >= 18 && edad <= 29) return 1.02;
    if (edad >= 30 && edad <= 49) return 1.00;
    if (edad >= 50 && edad <= 60) return 0.86;
    if (edad >= 61) return 0.74;
  } else {
    if (edad === 10) return 0.70;
    if (edad === 11) return 0.72;
    if (edad === 12) return 0.74;
    if (edad === 13) return 0.76;
    if (edad === 14) return 0.76;
    if (edad === 15) return 0.77;
    if (edad === 16) return 0.77;
    if (edad === 17) return 0.77;
    if (edad >= 18 && edad <= 29) return 0.76;
    if (edad >= 30 && edad <= 49) return 0.77;
    if (edad >= 50 && edad <= 60) return 0.76;
    if (edad >= 61 && edad <= 75) return 0.67;
    if (edad > 75) return 0.63;
  }
  return 1.0;
}