function calculateNetSalary(basicSalary, benefits = 0) {
  
  basicSalary = Number(basicSalary);
  benefits = Number(benefits);

   if (Number.isNaN(basicSalary) || basicSalary < 0 || Number.isNaN(benefits) || benefits < 0) {
    return "Invalid input: basicSalary and benefits must be non-negative numbers.";
  }

  let grossSalary = basicSalary + benefits;
  
  let payee = 0;
  if (grossSalary <= 24000) {
    payee = grossSalary * 0.10;
  } else if (grossSalary <= 32333) {
    // first 24,000 @10% + remainder @25%
    payee = 24000 * 0.10 + (grossSalary - 24000) * 0.25;
  } else if (grossSalary <= 500000) {
    // first 24,000 @10% + next 8,333 @25% + remainder @30%
    payee = 24000 * 0.10 + 8333 * 0.25 + (grossSalary - 32333) * 0.30;
  } else if (grossSalary <= 800000) {
    // add the 32.5% band for the portion above 500,000
    payee = 24000 * 0.10 + 8333 * 0.25 + 467667 * 0.30 + (grossSalary - 500000) * 0.325;
  } else {
   
    payee = 24000 * 0.10
          + 8333 * 0.25
          + 467667 * 0.30
          + 300000 * 0.325
          + (grossSalary - 800000) * 0.35;
  }

  
  payee = payee - 2400;
  if (payee < 0) payee = 0;

  
  let nssf = Math.min(basicSalary * 0.06, 6000);

  
  let nhif = 1700;

  
  let netSalary = grossSalary - payee - nssf - nhif;

  
  return {
    grossSalary: Number(grossSalary.toFixed(2)),
    payee: Number(payee.toFixed(2)),
    nssf: Number(nssf.toFixed(2)),
    nhif: Number(nhif.toFixed(2)),
    netSalary: Number(netSalary.toFixed(2))
  };
}


console.log(calculateNetSalary(100000, 0));
console.log(calculateNetSalary(30000, 5000));
console.log(calculateNetSalary(20000, 0));
console.log(calculateNetSalary("75000", "0")); 
