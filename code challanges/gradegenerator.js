function gradeGenerator(marks){
    if(marks > 79 && marks <= 100){
        return "A";
    }else if(marks>=60 && marks <=79){
        return "B";
    }else if(marks>=49 && marks <=59){
        return "C";
    }else if(marks>=40 && marks <=49){
        return "D";
    }else if(marks>=0 && marks <=40){
        return "E";
    }
    
}
// calling the function gradeGenerator
console.log(gradeGenerator(85));
console.log(gradeGenerator(70));
console.log(gradeGenerator(52));
console.log(gradeGenerator(45));
console.log(gradeGenerator(30));
