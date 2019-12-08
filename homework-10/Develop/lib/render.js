const path = require("path");
const fs = require("fs");

const templateDir = path.resolve(__dirname, "../templates");

const render = employees => {
    const html = [];
    html.push(employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))
        )
    html.push(employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderEngineer(engineer))
        )
    html.push(employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => renderIntern(intern))
        )
    return renderMain(html.join(""));
};

const renderManager = manager => {
    let temp = fs.readFileSync(path.resolve(templateDir, "manager.html"), "utf8")
    temp = replacePlaceHolder(temp, "name", manager.getName());
    temp = replacePlaceHolder(temp, "role", manager.getRole());
    temp = replacePlaceHolder(temp, "id", manager.getId());
    temp = replacePlaceHolder(temp, "email", manager.getEmail());
    temp = replacePlaceHolder(temp, "officeNumber", manager.getOfficeNumber());
    return temp;
}
const renderEngineer = engineer => {
    let temp = fs.readFileSync(path.resolve(templateDir, "engineer.html"), "utf8")
    temp = replacePlaceHolder(temp, "name", engineer.getName());
    temp = replacePlaceHolder(temp, "role", engineer.getRole());
    temp = replacePlaceHolder(temp, "id", engineer.getId());
    temp = replacePlaceHolder(temp, "email", engineer.getEmail());
    temp = replacePlaceHolder(temp, "Github", engineer.getGithub());
    return temp;
}

const renderIntern = intern => {
    let temp = fs.readFileSync(path.resolve(templateDir, "intern.html"), "utf8")
    temp = replacePlaceHolder(temp, "name", intern.getName());
    temp = replacePlaceHolder(temp, "role", intern.getRole());
    temp = replacePlaceHolder(temp, "id", intern.getId());
    temp = replacePlaceHolder(temp, "email", intern.getEmail());
    temp = replacePlaceHolder(temp, "school", intern.getSchool());
    return temp;
}

const replacePlaceHolder =(temp, placeholder,value) => {
    const regex = new RegExp("{{" +placeholder +"}}", "gm");
    return temp.replace(regex, value);
}
const renderMain = html => {
    let temp = fs.readFileSync(path.resolve(templateDir, "main.html"), "utf8");
    return replacePlaceHolder(temp, "team", html)

}

module.exports = render;