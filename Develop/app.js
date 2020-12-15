const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { fetchAsyncQuestionPropertyQuestionProperty } = require("inquirer/lib/utils/utils");

const employeeList = [];


// manager questions

function askUserforManagerInfo() {

    return inquirer.prompt([{
        type: "input",
        message: "What is your name?",
        name: "name",
    }, {
        type: "input",
        message: "What is your ID?",
        name: "id",
    }, {
        type: "input",
        message: "What is your email?",
        name: "email",
    }, {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
    }]).then((managerData) => {

        const newManager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
        employeeList.push(newManager);
        askUserforEmployeeType();

    });

}

//employee information
function askUserforEmployeeType() {

    return inquirer.prompt([{
        type: "list",
        name: "newEmployee",
        message: "Which type of team member would you like to add?",
        choices: [{ name: "Engineer", value: 0 }, { name: "Intern", value: 1 }, { name: "I don't want to add any more team members", value: 2 }],
    }]).then((newEmployeeType) => {
        
        if (newEmployeeType.newEmployee === 0) {
            askUserForEngineerInfo();
          
        } else if (newEmployeeType.newEmployee === 1) {
            askUserforInternInfo();
           
        } else {
            createHtmlFile();
        }
    });
}

//Engineer information
function askUserForEngineerInfo() {

    return inquirer.prompt([{
        type: "input",
        message: "What is your name?",
        name: "name",
    }, {
        type: "input",
        message: "What is your ID?",
        name: "id",
    }, {
        type: "input",
        message: "What is your email?",
        name: "email",
    }, {
        type: "input",
        message: "What is your GitHub username?",
        name: "gitHub",
    }]).then((engineerData) => {

        const newEngineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.gitHub);
        employeeList.push(newEngineer);
        askUserforEmployeeType();

    });

}
// intern information
function askUserforInternInfo() {

    return inquirer.prompt([{
        type: "input",
        message: "What is your name?",
        name: "name",
    }, {
        type: "input",
        message: "What is your ID?",
        name: "id",
    }, {
        type: "input",
        message: "What is your email?",
        name: "email",
    }, {
        type: "input",
        message: "Where did your school that you go to?",
        name: "school",
    }]).then((internData) => {

        const newIntern = new Intern(internData.name, internData.id, internData.email, internData.school);
        employeeList.push(newIntern);
        askUserforEmployeeType();
    });

}

function createHtmlFile() {

    const htmlContent = render(employeeList);

    fs.writeFile("output.html", htmlContent, (err) => {
        if (err) console.log("failed to write file");
        else console.log("File written");
    });

}

askUserforManagerInfo();


// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
