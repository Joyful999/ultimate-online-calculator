/* =========================================================
   Central data registry: categories + calculators + guides.
   Every other script (search, listings, favorites, related
   links) reads from this single source of truth.
   ========================================================= */

const SITE = {
  name: "Ultimate Online Calculator",
  shortName: "UOC",
  baseUrl: "https://ultimate-online-calculator.vercel.app"
};

const CATEGORIES = [
  { id: "math", name: "Math", slug: "math", tagline: "Percentages, averages, roots and everyday arithmetic.", icon: "sigma" },
  { id: "financial", name: "Financial", slug: "financial", tagline: "Loans, interest, tax and money decisions.", icon: "coin" },
  { id: "date-time", name: "Date & Time", slug: "date-time", tagline: "Ages, durations and working-day counts.", icon: "clock" },
  { id: "health", name: "Health & Fitness", slug: "health", tagline: "BMI, calories and everyday body metrics.", icon: "heart" },
  { id: "education", name: "Education", slug: "education", tagline: "Grades, GPA and academic scoring.", icon: "cap" },
  { id: "everyday", name: "Everyday", slug: "everyday", tagline: "Tips, bills and small daily calculations.", icon: "bag" },
  { id: "measurement", name: "Measurement", slug: "measurement", tagline: "Convert length, temperature and more.", icon: "ruler" }
];

// slug is also the filename (without .html) inside /calculators/
const CALCULATORS = [
  { slug: "percentage", name: "Percentage Calculator", category: "math", desc: "Find a percentage of a number, or what percentage one number is of another.", keywords: "percent percentage of ratio", popular: true },
  { slug: "average", name: "Average Calculator", category: "math", desc: "Calculate the mean of any list of numbers instantly.", keywords: "mean average numbers list" },
  { slug: "square-root", name: "Square Root Calculator", category: "math", desc: "Find the square root (and nth root) of any number.", keywords: "square root radical sqrt" },

  { slug: "loan", name: "Loan Calculator", category: "financial", desc: "Estimate your monthly payment, total interest and payoff schedule.", keywords: "loan payment amortization emi", popular: true },
  { slug: "compound-interest", name: "Compound Interest Calculator", category: "financial", desc: "See how your savings or investment grows with compounding.", keywords: "compound interest investment growth", popular: true },
  { slug: "simple-interest", name: "Simple Interest Calculator", category: "financial", desc: "Calculate interest earned or owed using the simple interest formula.", keywords: "simple interest principal rate", popular: true },
  { slug: "discount", name: "Discount Calculator", category: "financial", desc: "Work out the sale price and amount saved on any discount.", keywords: "discount sale price off percent", popular: true },
  { slug: "profit-margin", name: "Profit Margin Calculator", category: "financial", desc: "Calculate gross profit margin and markup from cost and revenue.", keywords: "profit margin markup revenue cost", popular: true },
  { slug: "tax", name: "Sales Tax Calculator", category: "financial", desc: "Add or remove sales tax / VAT from a price in seconds.", keywords: "tax vat sales price" },

  { slug: "age", name: "Age Calculator", category: "date-time", desc: "Calculate exact age in years, months and days from a birth date.", keywords: "age birthday years old", popular: true },
  { slug: "date-difference", name: "Date Difference Calculator", category: "date-time", desc: "Find the number of days, weeks or months between two dates.", keywords: "days between dates difference duration", popular: true },
  { slug: "working-days", name: "Working Days Calculator", category: "date-time", desc: "Count business days between two dates, excluding weekends.", keywords: "business days weekdays working" },

  { slug: "bmi", name: "BMI Calculator", category: "health", desc: "Calculate your Body Mass Index from height and weight.", keywords: "bmi body mass index weight height", popular: true },
  { slug: "bmr", name: "BMR Calculator", category: "health", desc: "Estimate your Basal Metabolic Rate — calories burned at rest.", keywords: "bmr metabolic rate calories" },
  { slug: "calorie", name: "Calorie Calculator", category: "health", desc: "Estimate daily calorie needs for maintaining, losing or gaining weight.", keywords: "calories tdee maintenance diet" },

  { slug: "gpa", name: "GPA Calculator", category: "education", desc: "Calculate your Grade Point Average from course grades and credits.", keywords: "gpa grade point average college", popular: true },
  { slug: "grade", name: "Grade Calculator", category: "education", desc: "Work out the grade needed on a final exam to hit a target score.", keywords: "grade exam score final needed" },

  { slug: "tip", name: "Tip Calculator", category: "everyday", desc: "Calculate a tip and split the total bill between any number of people.", keywords: "tip gratuity split bill restaurant" },
  { slug: "split-bill", name: "Split Bill Calculator", category: "everyday", desc: "Divide a shared bill evenly (or unevenly) between friends.", keywords: "split bill share divide group" },
  { slug: "fuel-cost", name: "Fuel Cost Calculator", category: "everyday", desc: "Estimate the fuel cost of a trip from distance and efficiency.", keywords: "fuel gas cost trip mileage" },

  { slug: "length-converter", name: "Length Converter", category: "measurement", desc: "Convert between metres, feet, inches, miles and more.", keywords: "length convert metres feet inches miles" },
  { slug: "temperature-converter", name: "Temperature Converter", category: "measurement", desc: "Convert between Celsius, Fahrenheit and Kelvin.", keywords: "temperature celsius fahrenheit kelvin convert" }
];

const GUIDES = [
  {
    slug: "how-compound-interest-works",
    title: "How Compound Interest Works",
    category: "financial",
    excerpt: "Why compounding is often called the most powerful force in personal finance, explained with real numbers.",
    date: "2026-02-03",
    updated: "2026-06-14",
    readMins: 7,
    featured: true,
    relatedCalcs: ["compound-interest", "simple-interest", "loan"]
  },
  {
    slug: "simple-interest-vs-compound-interest",
    title: "Simple Interest vs Compound Interest",
    category: "financial",
    excerpt: "The difference between the two comes down to one question: does interest earn interest? Here's what that means for your money.",
    date: "2026-02-10",
    readMins: 6,
    relatedCalcs: ["simple-interest", "compound-interest"]
  },
  {
    slug: "how-to-calculate-a-discount",
    title: "How to Calculate a Discount",
    category: "financial",
    excerpt: "A quick, reliable method for working out sale prices and how much you're really saving.",
    date: "2026-01-22",
    readMins: 4,
    relatedCalcs: ["discount", "profit-margin", "percentage"]
  },
  {
    slug: "how-to-calculate-percentages",
    title: "How to Calculate Percentages",
    category: "math",
    excerpt: "The three percentage problems everyone runs into — and the simple formulas that solve each one.",
    date: "2026-01-10",
    readMins: 5,
    relatedCalcs: ["percentage", "discount", "average"]
  },
  {
    slug: "how-to-calculate-gpa",
    title: "How to Calculate GPA",
    category: "education",
    excerpt: "A step-by-step walkthrough of converting letter grades and credit hours into a single GPA figure.",
    date: "2026-03-01",
    readMins: 6,
    relatedCalcs: ["gpa", "grade"]
  },
  {
    slug: "how-to-calculate-your-age",
    title: "How to Calculate Your Age",
    category: "date-time",
    excerpt: "It looks trivial until leap years and month lengths get involved. Here's the exact method.",
    date: "2026-01-29",
    readMins: 4,
    relatedCalcs: ["age", "date-difference"]
  },
  {
    slug: "how-to-calculate-working-days",
    title: "How to Calculate Working Days",
    category: "date-time",
    excerpt: "How to count business days between two dates by hand — and when to let a calculator do it.",
    date: "2026-02-18",
    readMins: 5,
    relatedCalcs: ["working-days", "date-difference"]
  },
  {
    slug: "understanding-bmi",
    title: "Understanding BMI",
    category: "health",
    excerpt: "What Body Mass Index actually measures, where it's useful, and where it falls short.",
    date: "2026-02-25",
    readMins: 6,
    relatedCalcs: ["bmi", "bmr", "calorie"]
  }
];

function calcUrl(c){ return `/calculators/${c.slug}.html`; }
function catUrl(cat){ return `/categories/${cat.slug}.html`; }
function guideUrl(g){ return `/guides/${g.slug}.html`; }
function getCategory(id){ return CATEGORIES.find(c => c.id === id); }
function getCalculator(slug){ return CALCULATORS.find(c => c.slug === slug); }
function calculatorsInCategory(id){ return CALCULATORS.filter(c => c.category === id); }
