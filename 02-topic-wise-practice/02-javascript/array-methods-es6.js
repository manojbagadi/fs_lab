// Array Methods ES6 Practice
const marks = [85, 90, 78, 88, 95];
console.log("Original Marks:", marks);

// 1. map() - Calculate percentage or grade
const percentages = marks.map(m => (m / 100) * 100);
console.log("Percentages:", percentages);

// 2. filter() - Filter marks above 85
const distinctions = marks.filter(m => m >= 85);
console.log("Distinctions:", distinctions);

// 3. reduce() - Calculate Total and Average
const total = marks.reduce((sum, curr) => sum + curr, 0);
const average = total / marks.length;
console.log(`Total Marks: ${total}, Average: ${average.toFixed(2)}`);

// 4. ES6 Class Implementation
class Library {
    constructor() {
        this.books = [];
    }
    addBook(title, price) {
        this.books.push({ title, price });
        console.log(`Added: ${title} - ₹${price}`);
    }
    displayBooks() {
        console.log("\nLibrary Catalog:");
        this.books.forEach((b, i) => console.log(`${i + 1}. ${b.title} (₹${b.price})`));
    }
    getTotalValue() {
        return this.books.reduce((acc, b) => acc + b.price, 0);
    }
}

const lib = new Library();
lib.addBook("Clean Code", 650);
lib.addBook("Eloquent JavaScript", 550);
lib.displayBooks();
console.log("Total Catalog Value: ₹" + lib.getTotalValue());
