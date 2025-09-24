function calculateNetSalary(basicSalary, benefits = 0) {
  basicSalary = Number(basicSalary);
  benefits = Number(benefits);

  if (Number.isNaN(basicSalary) || basicSalary < 0 || Number.isNaN(benefits) || benefits < 0) {
    return "Invalid input";
  }

  const gross = basicSalary + benefits;

  // --- PAYE (progressive tax) ---
  function computePayee(salary) {
    let tax = 0;
    if (salary > 800000) {
      tax += (salary - 800000) * 0.35;
      salary = 800000;
    }
    if (salary > 500000) {
      tax += (salary - 500000) * 0.325;
      salary = 500000;
    }
    if (salary > 32333) {
      tax += (salary - 32333) * 0.30;
      salary = 32333;
    }
    if (salary > 24000) {
      tax += (salary - 24000) * 0.25;
      salary = 24000;
    }
    tax += salary * 0.10;
    return Math.max(0, tax - 2400); 
  }

  const payee = computePayee(gross);
  const nssf = Math.min(basicSalary * 0.06, 6000);
  const nhif = 1700;
  const net = gross - payee - nssf - nhif;

  return { gross, payee, nssf, nhif, net };
}
