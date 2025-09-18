function speedGenerator(speed) {
  speed = Number(speed);              
  if (Number.isNaN(speed)) {
    return "Invalid input: speed must be a number.";
  }

  const speedLimit = 70;
  const kmPerDemerit = 5;

  if (speed <= speedLimit) return "Ok";

  const points = Math.floor((speed - speedLimit) / kmPerDemerit);
  if (points > 12) return "License suspended";
  return `Points: ${points}`;
}
console.log(speedGenerator(70));      
console.log(speedGenerator(75));      
console.log(speedGenerator(80));      
console.log(speedGenerator(135));    
console.log(speedGenerator("hello")); 
