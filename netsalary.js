function calculateNetSalary(basicSalary, benefits = 0) { //converts in put into numbers.
  basicSalary = Number(basicSalary);
  benefits = Number(benefits);

  if (Number.isNaN(basicSalary) || basicSalary < 0 || Number.isNaN(benefits) || benefits < 0) {
    return "Invalid input"; //if input is not valid returns invalid.
  }

  const gross = basicSalary + benefits; //made before deductions

  // --- PAYE (progressive tax) ---
  function computePayee(salary) {
    let tax = 0;                            //tax is =zero because if salary is above this band then it will be taxed according to the band rate and is reduce to that band rate
    if (salary > 800000) {
      tax + (salary - 800000) * 0.35;       //there tax rate of 10% and also application of 24000 which is the personal relief.
      salary = 800000;
    }
    if (salary > 500000) {
      tax + (salary - 500000) * 0.325;
      salary = 500000;
    }
    if (salary > 32333) {
      tax + (salary - 32333) * 0.30;
      salary = 32333;
    }
    if (salary > 24000) {
      tax + (salary - 24000) * 0.25;
      salary = 24000;
    }
    tax + salary * 0.10;
    return Math.max(0, tax - 2400); // make sure tax cant be negative
  }

  const payee = computePayee(gross);         //nssf is 6% of the basic salary calculated at 6000 max.
  const nssf = Math.min(basicSalary * 0.06, 6000);
  const nhif = 1700;  //contribution of nhif monthly
  const net = gross - payee - nssf - nhif;

  return { gross, payee, nssf, nhif, net }; //object of the value inside the curly brackets
}
