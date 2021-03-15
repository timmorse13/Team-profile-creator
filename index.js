const inquirer = require('inquirer');
const jest = require('jest');
const fs = require('fs');

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');

const team = [];

function getInfo (projectTeam) {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: "What is the employee's name?",
        validate: Input => {
            if (Input) {
                return true;
            } else {
                console.log("Please enter the employee's name")
                return false;
            }
        }
    },

    {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: ["Manager", "Intern", "Engineer", "Employee"],
        validate: Input => {
            if (Input) {
                return true;
            } else {
                console.log("Please enter a role")
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'email',
        message: "What is the employee's email?",
        validate: Input => {
            if(Input) {
                return true;
            } else {
                console.log("Please enter an email")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is their employee ID?",
        validate: Input => {
            if(Input) {
                return true;
            } else {
                console.log("Please enter an ID")
                return false;
            }
        }
    },





])
.then(ans => {
    if(ans.role === 'Manager') {
        inquirer.prompt([{
            type: 'input',
            name: 'officeNumber',
            message: "What is their office number?",
        }])
        .then (answers => {
            const projManager = new Manager(ans.name, ans.role, ans.email, ans.id, answers.officeNumber);
            team.push(projManager);
            console.log(team);
            addTeam();
            
        })

    } else if(ans.role === 'Intern') {
        inquirer.prompt([{
            type: 'input',
            name: 'school',
            message: 'What school are they currently attending?',
        }])
        .then (answers => {
            const projIntern = new Intern(ans.name, ans.role, ans.email, ans.id, answers.school);
            team.push(projIntern);
            console.log(team);
            addTeam();
            
        })
    } else if(ans.role === 'Engineer') {
        inquirer.prompt([{
            type: 'input',
            name: 'gitHub',
            message: 'What is their github username?',
        }])
        .then (answers => {
            const projEngineer = new Engineer(ans.name, ans.role, ans.email, ans.id, answers.gitHub);
            team.push(projEngineer);
            console.log(team);
            addTeam();
            
        })
    } else {
        const projEmployee = new Employee(ans.name, ans.role, ans.email, ans.id);
        team.push(projEmployee);
        addTeam();
    }


    function addTeam() {
        inquirer.prompt([{
            type: 'confirm',
            name: 'addteam',
            message: 'Would you like to add more project members?'
        }])
        .then(response => {
            if (response.addteam === true) {
                getInfo(team)
            }
            else {
                console.log(team);
                printTeam(team)
                // print team
            }
        })
    }
})
}

function printTeam(projectTeam) {

    const cards = [];

    for (var i = 0; i < projectTeam.length; i++) {
        const teamCard = `
        <div class="card" style="width: 18rem;">
  <div class="card-header">
    <h2>${projectTeam[i].role}</h2>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${projectTeam[i].name}</li>
    <li class="list-group-item">${projectTeam[i].email}</li>
    <li class="list-group-item">${projectTeam[i].id}</li>
    <li class="list-group-item">${projectTeam[i].officeNumber || projectTeam[i].gitHub || projectTeam[i].school}</li>
     
  </ul>
    </div>`    
    
    
        cards.push(teamCard);

    }

const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Project Team</title>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        </head>
        <body>
            ${cards}
        </body>
        </html>`

        fs.writeFile('results.html', html, err => {
            err ? console.log(err) : console.log('Success!');
        })   

}





getInfo();