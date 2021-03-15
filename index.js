const inquirer = require('inquirer');
const jest = require('jest');
const fs = require('fs');

const Employee = require('./lib/Employee');

function getInfo () {
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
        choices: ["Manager", "Intern", "Engineer"],
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
}