// Engineer constructor class uses the reusable employee module to maintain dry principle
const Employee = require("./Employee.js")
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer"
    }
}

module.exports = Engineer;