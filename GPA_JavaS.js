// Lists to store class names and grades
const classes = [];
const grades = [];
const credits = []; // New list to store credits for each class

// Function to collect class names, grades, and credits (improved clarity)
function collectData() {
  const numClasses = parseInt(prompt("Enter the number of classes: "));

  for (let i = 0; i < numClasses; i++) {
    const className = prompt(`Enter Class Name #${i + 1}: `);
    classes.push(className);

    const grade = prompt(`Enter Your Grade For '${className}' (Letter Form): `).toUpperCase();
    grades.push(grade);

    const courseCredits = parseInt(prompt(`Enter the number of credits for '${className}': `));
    credits.push(courseCredits);
  }
}

// Function to calculate weighted GPA (enhanced)
function calculateWeightedGpa() {
  let totalWeightedQualityPoints = 0;
  for (let i = 0; i < grades.length; i++) {
    switch (grades[i]) {
      case "A+":
        totalWeightedQualityPoints += credits[i] * 4.0;
        break;
      case "A":
        totalWeightedQualityPoints += credits[i] * 4.0;
        break;
      case "A-":
        totalWeightedQualityPoints += credits[i] * 3.7;
        break;
      case "B+":
        totalWeightedQualityPoints += credits[i] * 3.3;
        break;
      case "B":
        totalWeightedQualityPoints += credits[i] * 3.0;
        break;
      case "B-":
        totalWeightedQualityPoints += credits[i] * 2.7;
        break;
      case "C+":
        totalWeightedQualityPoints += credits[i] * 2.3;
        break;
      case "C":
        totalWeightedQualityPoints += credits[i] * 2.0;
        break;
      case "C-":
        totalWeightedQualityPoints += credits[i] * 1.7;
        break;
      case "D":
        totalWeightedQualityPoints += credits[i] * 1.0;
        break;
      default:
        console.error(`Invalid grade '${grades[i]}' entered. Please enter a valid letter grade.`);
    }
  }

  const totalCourseCredits = credits.reduce((acc, curr) => acc + curr, 0); // Calculate total credits
  const weightedGpa = totalWeightedQualityPoints / totalCourseCredits;
  return weightedGpa;
}

// Function to calculate target grade needed (adjusted for weighted credits)
function calculateTargetGrade(desiredGpa) {
  let totalWeightedQualityPoints = 0;
  for (let i = 0; i < grades.length; i++) {
    switch (grades[i]) {
      case "A+":
        totalWeightedQualityPoints += credits[i] * 4.0;
        break;
      case "A":
        totalWeightedQualityPoints += credits[i] * 4.0;
        break;
      // ... (same logic for other grades)
      default:
        console.error(`Invalid grade '${grades[i]}' entered. Please enter a valid letter grade.`);
    }
    const requiredWeightedQualityPoints = desiredGpa * credits.reduce((acc, curr) => acc + curr, 0);

  // Calculate average GPA needed for remaining courses (if applicable)
  if (credits.reduce((acc, curr) => acc + curr, 0) > grades.length) {
    const remainingCredits = credits.reduce((acc, curr) => acc + curr, 0) - grades.length;
    const averageGpaNeeded = requiredWeightedQualityPoints / remainingCredits;
    console.log(`You need an average GPA of ${averageGpaNeeded.toFixed(2)} for the remaining ${remainingCredits} credits.`);
  } else {
    console.log(`Unfortunately, it is not possible to determine specific target grades for each class to achieve a GPA of ${desiredGpa} with incomplete grades.`);
  }
  }

  const requiredWeightedQualityPoints = desiredGpa * credits.reduce((acc, curr) => acc + curr, 0); // Consider total weighted credits

  // Calculate average GPA needed for remaining courses (if applicable)
  if (credits.reduce((acc, curr) => acc + curr, 0) > grades.length) {
    const remainingCredits = credits.reduce((acc, curr) => acc + curr, 0) - grades.length;
    const averageGpaNeeded = requiredWeightedQualityPoints / remainingCredits;
    console.log(`You need an average GPA of ${averageGpaNeeded.toFixed(2)} for the remaining ${remainingCredits} credits.`);
  }

// Determine target grade for the next course (if applicable)
else if (credits.reduce((acc, curr) => acc + curr, 0) === grades.length) {
  let targetGrade = null;
  for (const [gradeValue, gradeLetter] of [
    [4.0, "A+"],
    [4.0, "A"],
    [3.7, "A-"],
    [3.3, "B+"],
    [3.0, "B"],
    [2.7, "B-"],
    [2.3, "C+"],
    [2.0, "C"],
    [1.7, "C-"],
    [1.0, "D"],
  ]) {
    if (requiredWeightedQualityPoints / credits.reduce((acc, curr) => acc + curr, 0) >= gradeValue) {
      targetGrade = gradeLetter;
      break;
    }
  }

  if (targetGrade) {
    console.log(`To achieve a GPA of ${desiredGpa}, you would need a '${targetGrade}' in your next course.`);
  } else {
    console.log(`Unfortunately, it is not possible to achieve a GPA of ${desiredGpa} with only one more course.`);
  }
}
}

// Call the functions
collectData();
const gpa = calculateWeightedGpa();
console.log(`Your current weighted GPA is: ${gpa.toFixed(2)}`);

const desiredGpa = parseFloat(prompt("Enter your desired GPA: "));
calculateTargetGrade(desiredGpa);