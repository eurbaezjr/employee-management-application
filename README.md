# Employee Management Application

![Example 1](./app-demo.gif) 

A Node CLI application that takes information about employees and generates an HTML webpage that displays summaries for each person. The application's core focus is to keep track of a software engineering team. 

## Functionality

The application will prompt the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. When the user has completed building the team, the application creates an HTML file that displays a nicely formatted team roster based on the information provided by the user. 

* Uses the [Inquirer npm package](https://github.com/SBoudrias/Inquirer.js/) to prompt the user for their email, id, and specific information based on their role with the company. 

* App runs as a Node CLI to gather information about each employee.

* Below are more examples of how the application looks like. 

![Example 2](./Media/demo-2.png)
![Example 3](./Media/demo-3.png)

## Installing Instructions

* In the `Develop` folder, there is a `package.json`, so make sure to `npm install`.

* The dependencies are, [jest](https://jestjs.io/) for running the provided tests, and [inquirer](https://www.npmjs.com/package/inquirer) for collecting input from the user.


### User input

Prompts user to build an engineering team. An engineering
team consists of a manager, and any number of engineers and interns.

### Roster output

The application generates a `team.html` page in the `output` directory, that displays a nicely formatted team roster. Each team member gets the following parameters. 

  * Name

  * Role

  * ID

  * Role-specific property (School, link to GitHub profile, etc.)

