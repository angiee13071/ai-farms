import { FormControl } from "@angular/forms";

export const patterns: any = {
  only_letters: /^[a-zA-Z' ]+$/,
  only_numbers: /^[0-9]+$/,
  names: /^[a-zA-Z]+\s[a-zA-Z]+(\s[a-zA-Z]+)*$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  symbols_letters: '^[A-Za-zÑñÁáÉéÍíÓóÚúäëïöüÄËÏÖÜ?!.¿# -]*$',
  space_numbers: '^[0-9 ]*$',
  all_caracters: '^[A-Za-zÑñÁáÉéÍíÓóÚú0-9.,<>;:()"°!?¿¡#$&/*+=%_ -]*$',
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
  referido: /^[a-zA-Z0-9]+$/,
  nit: /(^[0-9]+-{1}[0-9]{1})/
}
export function checkAccessFormat(control: FormControl): { [s: string]: boolean } | null {
  if (!control.value) {
    return null;
  }

  if (patterns.phone.test(control.value)) {
    return null; // Es un número de teléfono válido
  }

  if (patterns.email.test(control.value)) {
    return null; // Es una dirección de correo electrónico válida
  }

  return { invalidAccessFormat: true };
}