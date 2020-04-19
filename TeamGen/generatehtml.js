const fs = require('fs');
const templatesDir = "./templates/";
const path = require('path')
const employeeCreator = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

let team = "";

const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
    var engineerHtml = ""
    engineerHtml = engineerHtml + template.replace(/{{ name }}/g, engineer.getName())
    .replace(/{{ role }}/g, engineer.getRole())
    .replace(/{{ email }}/g, engineer.getEmail())
    .replace(/{{ id }}/g, engineer.getId())
    .replace(/{{ github }}/g, engineer.getGithub())
    team = team + engineerHtml;
  };

  const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
    var internHtml = ""
    internHtml = internHtml + template.replace(/{{ name }}/g, intern.getName())
    .replace(/{{ role }}/g, intern.getRole())
    .replace(/{{ email }}/g, intern.getEmail())
    .replace(/{{ id }}/g, intern.getId())
    .replace(/{{ school }}/g, intern.getSchool())
    team = team + internHtml;
  };


  const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
    var managerHtml = ""
    managerHtml = managerHtml + template.replace(/{{ name }}/g, manager.getName())
                           .replace(/{{ role }}/g, manager.getRole())
                           .replace(/{{ email }}/g, manager.getEmail())
                           .replace(/{{ id }}/g, manager.getId())
                           .replace(/{{ officeNumber }}/g, manager.getOfficeNumber())
    console.log(managerHtml)
    team = team + managerHtml;
  };

function createManager(name, id, email, officeNumber){
    const manager = new Manager(name, id, email, officeNumber)
    renderManager(manager)
}

function createEngineer(name, id, email, github){
    const engineer = new Engineer(name, id, email, github)
    renderEngineer(engineer)
}

function createIntern(name, id, email, school){
    const intern = new Intern(name, id, email, school)
    renderIntern(intern)
}

function renderMain(){
    let masterTemplate = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8")
    var masterHtml =""
    masterHtml = masterHtml + masterTemplate.replace(/{{ team }}/g, team)
    let file = path.join(__dirname, 'output', "/index.html");
    console.log(file);
    fs.writeFileSync(file, masterHtml);
}

  module.exports = {
      createManager: createManager,
      createEngineer: createEngineer,
      createIntern: createIntern,
      renderMain: renderMain
  }