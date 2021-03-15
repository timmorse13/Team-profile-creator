const Employee = require('./Employee');

class Engineer extends Employee {
    constructor (name, role, email, id, gitHub) {
        super (name, role, email, id);
        this.gitHub = gitHub;
    }
    getGithub() {
        return this.gitHub;
    }
}

module.exports = Engineer;