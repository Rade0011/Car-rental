
count = 1;
const today = new Date();

const week = new Date(today);
week.setDate(week.getDate() + count);

console.log(today);
console.log(week);