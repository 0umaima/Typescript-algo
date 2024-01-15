var Employe = /** @class */ (function () {
    function Employe(idEmploye, nom, prenom) {
        this.idEmploye = idEmploye;
        this.nom = nom;
        this.prenom = prenom;
    }
    return Employe;
}());
var Salaire = /** @class */ (function () {
    function Salaire(idEmploye, annee, mois, salaireMensuel) {
        this.idEmploye = idEmploye;
        this.annee = annee;
        this.mois = mois;
        this.salaireMensuel = salaireMensuel;
    }
    return Salaire;
}());
var EmployeSalaireAnnuel = /** @class */ (function () {
    function EmployeSalaireAnnuel(idEmploye, nom, prenom, annee, salaireAnnuel) {
        this.idEmploye = idEmploye;
        this.nom = nom;
        this.prenom = prenom;
        this.annee = annee;
        this.salaireAnnuel = salaireAnnuel;
    }
    return EmployeSalaireAnnuel;
}());
function calculateAnnualSalaries(employes, salaires) {
    var annualSalaryMap = new Map();
    salaires.forEach(function (salaire) {
        var currentAnnualSalary = annualSalaryMap.get(salaire.idEmploye) || 0;
        annualSalaryMap.set(salaire.idEmploye, currentAnnualSalary + salaire.salaireMensuel);
    });
    var annualSalaries = [];
    employes.forEach(function (employe) {
        var annualSalary = annualSalaryMap.get(employe.idEmploye) || 0;
        annualSalaries.push(new EmployeSalaireAnnuel(employe.idEmploye, employe.nom, employe.prenom, new Date().getFullYear(), annualSalary));
    });
    return annualSalaries;
}
function findMinMaxSalaries(annualSalaries) {
    var min = annualSalaries[0];
    var max = annualSalaries[0];
    annualSalaries.forEach(function (salary) {
        if (salary.salaireAnnuel < min.salaireAnnuel)
            min = salary;
        if (salary.salaireAnnuel > max.salaireAnnuel)
            max = salary;
    });
    return { min: min, max: max };
}
function displayResults(annualSalaries, minMax) {
    console.log("Annual Salaries of Employees:");
    annualSalaries.forEach(function (salary) {
        console.log("".concat(salary.nom, " ").concat(salary.prenom, ": ").concat(salary.salaireAnnuel));
    });
    console.log("\nMinimum Annual Salary: ".concat(minMax.min.salaireAnnuel, " (Employee: ").concat(minMax.min.nom, " ").concat(minMax.min.prenom, ")"));
    console.log("Maximum Annual Salary: ".concat(minMax.max.salaireAnnuel, " (Employee: ").concat(minMax.max.nom, " ").concat(minMax.max.prenom, ")"));
}
// Test Data
var employes = [
    new Employe(1, "John", "Doe"),
    new Employe(2, "Jane", "Doe"),
    new Employe(3, "Bob", "Smith")
];
var salaires = [
    new Salaire(1, 2023, 1, 3000),
    new Salaire(1, 2023, 2, 3000),
    new Salaire(2, 2023, 1, 4000),
    new Salaire(3, 2023, 1, 5000),
    // ... etc.
];
// Run the test
var annualSalaries = calculateAnnualSalaries(employes, salaires);
var minMax = findMinMaxSalaries(annualSalaries);
displayResults(annualSalaries, minMax);
