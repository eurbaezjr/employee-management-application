const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Manager = require("./lib/Manager.js");
const Intern = require("./lib/Intern.js");
const render = require("./lib/render.js");
const path = require('path');
const process = require('process');
const fs = require('fs'); // require fs to read and write files based on user input
const inquirer = require("inquirer"); // require inquirer node package for terminal functionality
var managerFirst = false;
var teamMembers = [];
const outputFile = path.resolve(__dirname, "output", "team.html");

// list of questions for terminal application
const questions = [
    {
        type: 'list',
        message: "Select the employee's role",
        name: "title",
        choices: ['Manager', 'Engineer', 'Intern', "I don't want to add more team members"]
    }];

const employeeQuestions = [
    {
        message: "Enter employee's full name",
        name: "name"
    },
    {
        message: "Enter employee's id",
        name: "id"
    },
    {
        message: "Enter employee's email",
        name: "email"
    }
];

const officeQuestion = {
    message: "Enter the manager's office number",
    name: "officeNumber"
};

const gitQuestion = {
    message: "Enter the engineer's GitHub username",
    name: "github"
};

const schoolQuestion = {
    message: "Enter the intern's school name",
    name: "school"
};
// end of questions

function employeeInfo() {
    return inquirer
        .prompt(employeeQuestions)
        .then(answers => {
       return arr = [{email: answers.email, name: answers.name, id: answers.id}];
        })
};

// inquires user to input their responses
function start() {
    inquirer
        .prompt(questions)
        .then(answers => {
            let title = answers.title
           try {
            if (title == "Manager" && managerFirst == false) {
                managerFirst = true
                employeeInfo().then((arr) => {
                    inquirer
                        .prompt(officeQuestion)
                        .then(answer => {
                            var boss = new Manager(arr[0].name, arr[0].id, arr[0].email, answer.officeNumber);
                            teamMembers.push(boss);
                            start();
                        });
                })
            }
            else
                if (title == "Manager" && managerFirst == true) {
                    console.log("Manager info can be added only once")
                    start();
                }
                else
                    if (title == "Engineer") {
                        employeeInfo().then((arr) => {
                            inquirer
                                .prompt(gitQuestion)
                                .then(answer => {
                                    var engineers = new Engineer(arr[0].name, arr[0].id, arr[0].email, answer.github);
                                    teamMembers.push(engineers);
                                    start();
                                });
                        })
                    }
                    else
                        if (title == "Intern") {
                            employeeInfo().then((arr) => {
                                inquirer
                                    .prompt(schoolQuestion)
                                    .then(answer => {
                                        var interns = new Intern(arr[0].name, arr[0].id, arr[0].email, answer.school);
                                        teamMembers.push(interns);
                                        start();
                                    });
                            })
                        }
                        else if (title === "I don't want to add more team members") {
                            buildTeam();
                        }
                    }
                        catch(err) {
                            console.log(err)
                          }

        }); // end of inquirer

    function buildTeam() {
        fs.writeFileSync(outputFile, render(teamMembers), "utf-8")
    }
}
start();


