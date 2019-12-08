const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Manager = require("./lib/Manager.js");
const Intern = require("./lib/Intern.js");
const render  = require("./lib/render.js");
const path = require('path');
const process = require('process');
const fs = require('fs');
const inquirer = require("inquirer");
var managerFirst = false;
var teamMembers = [];
const outputFile = path.resolve(__dirname, "output", "team.html");
const questions = [
{
    type: 'list',
    message: "Select the employee's role",
    name: "title",
    choices: ['Manager', 'Engineer', 'Intern', "I don't want to add more team members"]
},    
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
},
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


function start() {
    inquirer
        .prompt(questions)
        .then(answers => {
            console.log(answers.name);
            let name = answers.name;
            let id = answers.id;
            let title = answers.title;
            let email = answers.email;
            if (title == "Manager" && managerFirst == false) {
                managerFirst = true;
                inquirer
                    .prompt(officeQuestion)
                    .then(answer => {
                        let officeNumber = answer.officeNumber;
                        var boss = new Manager(name, id, email, officeNumber);
                        teamMembers.push(boss);
                        start();
                    });
            }
            else if (title == "Manager" && managerFirst == true) {
                console.log("Manager info can be added only once")
                start();
            }
            else
                if (title == "Engineer") {
                    inquirer
                        .prompt(gitQuestion)
                        .then(answer => {
                            let github = answer.github;
                            var engineers = new Engineer(name, id, email, github);
                            teamMembers.push(engineers);
                            start();
                        });
                }
                else
                    if (title == "Intern") {
                        inquirer
                            .prompt(schoolQuestion)
                            .then(answer => {
                               const school = answer.school;
                               var interns = new Intern(name, id, email, school);
                                teamMembers.push(interns);
                                start();
                            });
                    }
                    else if(title == "I don't wish to continue (select me and continue to press enter until finish)"){
                        buildTeam();
                    }

        }); // end of inquirer

        function buildTeam(){
            fs.writeFileSync(outputFile, render(teamMembers), "utf-8")
        }
}
start();


