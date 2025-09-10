// netSalaryCalculator.js
// Monthly Net Salary Calculator (Kenya - 2025 assumptions)

function calculateNetSalary(basicSalary, benefits = 0) {
  //Validate and coerce inputs
  basicSalary = Number(basicSalary);
  benefits = Number(benefits);
  if (Number.isNaN(basicSalary) || basicSalary < 0 || Number.isNaN(benefits) || benefits < 0) {
     return Error("Invalid input: basicSalary and benefits must be non-negative numbers.");
  }

  // Gross salary
  const grossSalary = basicSalary + benefits;

  // NSSF (employee share): 6% of pensionable pay, capped at KES 72,000
  const NSSF_RATE = 0.06;
  const NSSF_CAP = 72000;
  const nssfEmployee = +(NSSF_RATE * Math.min(grossSalary, NSSF_CAP)).toFixed(2); // e.g., max ~4320

  //SHIF (replaces NHIF): 2.75% of gross
  const SHIF_RATE = 0.0275;
  const shif = +(grossSalary * SHIF_RATE).toFixed(2);

  //Housing Levy (employee): 1.5% of gross
  const HOUSING_RATE = 0.015;
  const housingLevy = +(grossSalary * HOUSING_RATE).toFixed(2);

  //Taxable income = gross - deductible pre-tax contributions
  const taxableIncome = +(grossSalary - nssfEmployee - shif - housingLevy).toFixed(2);

  //PAYE calculation using monthly bands
  let remaining = Math.max(0, taxableIncome);
  let payeBeforeRelief = 0;

  // Band 1: up to 24,000 @10%
  let band = Math.min(remaining, 24000);
  payeBeforeRelief += band * 0.10;
  remaining -= band;

  // Band 2: next 8,333 @25%
  if (remaining > 0) {
    band = Math.min(remaining, 8333);
    payeBeforeRelief += band * 0.25;
    remaining -= band;
  }

  // Band 3: next 467,667 @30%
  if (remaining > 0) {
    band = Math.min(remaining, 467667);
    payeBeforeRelief += band * 0.30;
    remaining -= band;
  }

  // Band 4: next 300,000 @32.5%
  if (remaining > 0) {
    band = Math.min(remaining, 300000);
    payeBeforeRelief += band * 0.325;
    remaining -= band;
  }

  // Band 5: remainder @35%
  if (remaining > 0) {
    payeBeforeRelief += remaining * 0.35;
    remaining = 0;
  }

  payeBeforeRelief = +payeBeforeRelief.toFixed(2);

  //Reliefs (personal relief)
  const personalRelief = 2400; // monthly
  let paye = Math.max(0, payeBeforeRelief - personalRelief);
  paye = +paye.toFixed(2);

  // Net salary
  const netSalary = +(grossSalary - nssfEmployee - shif - housingLevy - paye).toFixed(2);

  // Return breakdown
  return {
    grossSalary: +grossSalary.toFixed(2),
    nssfEmployee,
    shif,
    housingLevy,
    taxableIncome,
    payeBeforeRelief,
    personalRelief,
    paye,
    netSalary
  };
}

// Example usage / tests
console.log(calculateNetSalary(100000, 0));
console.log(calculateNetSalary(30000, 5000));
console.log(calculateNetSalary("75000", "0")); 
