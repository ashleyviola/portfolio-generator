const inquirer = require('inquirer');
const { findLastKey } = require('lodash');


const promptUser = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log("Please enter your name!")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'
        }
    ]);
};

const promptProject = portfoilioData => {

    // if there's no 'projects' array property, create one 
    if(!portfoilioData.projects){
        portfoilioData.projects = [];
    }
    
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project'
            
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfoilioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promptProject(portfoilioData);
        } else {
            return portfoilioData;
        }
    });
}
promptUser()
    .then(promptProject)
    .then(portfoilioData => {
        console.log(portfoilioData);
    });


// const fs = require('fs');
// const generatePage = require('./src/page-template');
// const [name, github] = profileDataArgs;

// fs.writeFile('index.html',generatePage(name,github), err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio Complete! Check out index.html to see the output!');
// });