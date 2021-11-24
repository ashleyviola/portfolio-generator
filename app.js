const inquirer = require('inquirer');
const { findLastKey } = require('lodash');


const promptUser = () => {

    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide information about yourself:',
            when: ({confirmAbout}) => {
                if(confirmAbout){
                    return true;
                } else {
                    return false;
                }
            }
        },
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
            message: 'Enter your GitHub Username',
            validate: gitHubInput => {
                if(gitHubInput){
                    return true;
                } else {
                    console.log("Please enter your GitHub Username!")
                    return false;
                }
            }
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
            message: 'What is the name of your project',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log("Please enter your project name!")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if(descriptionInput){
                    return true;
                } else {
                    console.log("Please enter a description for your project!")
                    return false;
                }
            }
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
            message: 'Enter the GitHub link to your project. (Required)',
            validate: githubLinkInput => {
                if(githubLinkInput){
                    return true;
                } else {
                    console.log("Please enter your name!")
                    return false;
                }
            }
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