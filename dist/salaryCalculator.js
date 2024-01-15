class Employe {
    constructor(idEmploye, nom, prenom) {
        this.idEmploye = idEmploye;
        this.nom = nom;
        this.prenom = prenom;
    }
}
class Salaire {
    constructor(idEmploye, annee, mois, salaireMensuel) {
        this.idEmploye = idEmploye;
        this.annee = annee;
        this.mois = mois;
        this.salaireMensuel = salaireMensuel;
    }
}
class EmployeSalaireAnnuel {
    constructor(idEmploye, nom, prenom, annee, salaireAnnuel) {
        this.idEmploye = idEmploye;
        this.nom = nom;
        this.prenom = prenom;
        this.annee = annee;
        this.salaireAnnuel = salaireAnnuel;
    }
}
function calculateAnnualSalaries(employes, salaires) {
    let annualSalaryMap = new Map();
    salaires.forEach(salaire => {
        let currentAnnualSalary = annualSalaryMap.get(salaire.idEmploye) || 0;
        annualSalaryMap.set(salaire.idEmploye, currentAnnualSalary + salaire.salaireMensuel);
    });
    let annualSalaries = [];
    employes.forEach(employe => {
        let annualSalary = annualSalaryMap.get(employe.idEmploye) || 0;
        annualSalaries.push(new EmployeSalaireAnnuel(employe.idEmploye, employe.nom, employe.prenom, new Date().getFullYear(), annualSalary));
    });
    return annualSalaries;
}
function findMinMaxSalaries(annualSalaries) {
    let min = annualSalaries[0];
    let max = annualSalaries[0];
    annualSalaries.forEach(salary => {
        if (salary.salaireAnnuel < min.salaireAnnuel)
            min = salary;
        if (salary.salaireAnnuel > max.salaireAnnuel)
            max = salary;
    });
    return { min, max };
}
function displayResults(annualSalaries, minMax) {
    console.log("Annual Salaries of Employees:");
    annualSalaries.forEach(salary => {
        console.log(`${salary.nom} ${salary.prenom}: ${salary.salaireAnnuel}`);
    });
    console.log(`\nMinimum Annual Salary: ${minMax.min.salaireAnnuel} (Employee: ${minMax.min.nom} ${minMax.min.prenom})`);
    console.log(`Maximum Annual Salary: ${minMax.max.salaireAnnuel} (Employee: ${minMax.max.nom} ${minMax.max.prenom})`);
}
// Test Data
let employes = [
    new Employe(1, "John", "Doe"),
    new Employe(2, "Jane", "Doe"),
    new Employe(3, "Bob", "Smith")
];
let salaires = [
    new Salaire(1, 2023, 1, 3000),
    new Salaire(1, 2023, 2, 3000),
    new Salaire(2, 2023, 1, 4000),
    new Salaire(3, 2023, 1, 5000),
    // ... etc.
];
// Run the test
let annualSalaries = calculateAnnualSalaries(employes, salaires);
let minMax = findMinMaxSalaries(annualSalaries);
displayResults(annualSalaries, minMax);
