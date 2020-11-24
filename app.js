//Install and setup mongoose:
require('./src/connectDB')();//inVoke the module connectDB()
const mongoose = require('mongoose');
const personModel = require('./src/models/person')
const arrayOfPeople = require('./const');
const chalk = require('chalk');
//Saving data to our mongo db for the person collection
//*************************Saving data to our mongo db for the person collection*******************************************
//Create a person having this prototype:
let DataOfFirstDocument = {
      name: "hamza",
      age: 26,
      favoriteFoods: ['couscous', 'Pizza', 'Hamburger']
}
//*************************END Saving data to our mongo db for the person collection*******************************************
//*************************END instance of the class model*******************************************************

let personDocument = new personModel(DataOfFirstDocument)//instance of the class model
//*************************END instance of the class model*******************************************************
//Save the document
//*************************Save the document***********************************************************************************
//Create and Save a Record of a Model:
personDocument.save(function (err, data) {
      if (err) {
            console.log('Oops somthing going wrong')
      } else {
            console.log('Data has been saved successfully ')
      }

})
//*************************Save the document***********************************************************************************

//Create Many people list using Model.create()
//*************************C**reate Many people list using Model.create()***********************************************************************************
//Create Many Records with model.create()
personModel.create(arrayOfPeople)
      .then(console.log('list of person added successfully'))
      .catch(err => console.log('Somthing going wrong when added person using create fn'))
//****************END Create Many people list using Model.create()***************************
//*************************R***Read all the documents of the collection using Model(NB:in our case:personModel).find()
//Use model.find() to Search Your Database
personModel.find({})
      .then(result => console.log(result))
      .catch(err => console.log("Somthing wrong when retrieving data from the person collections "))
//*************************End R***Read all the documents fo the collection using Model(NB:in our case:personModel).find()
//*************************End R***Read one of the document fo the collection using Model(NB:in our case:personModel).findOne()
//Use model.findOne() to Return a Single Matching Document from Your Database
personModel.findOne()
      .then(result => console.log(result))
      .catch(err => console.log("Somthing wrong when retrieving one of the data from the person collections "))



//*************************End R***Read one of the document fo the collection using Model(NB:in our case:personModel).findOne()
//*****************************Find by ID******************************************* */
//Use model.findById() to Search Your Database By _id
let personId = { _id: "5fbcecd888613235cc3be83e" }//example

personModel.findById(personId)
      .then(reslut => console.log(reslut))
      .catch(err => console.log(err));






//*****************************END Find by ID******************************************* */
//**************************Find by ID and update ************************************ */
//Perform Classic Updates by Running Find, Edit, then Save
let personIdToAddHumburger = { _id: "5fbcecd888613235cc3be802" }
let x = '';
personModel.findById(personIdToAddHumburger)   //NB:we can wrapp all this part in single Function 
      .then(reslut => {
            x = reslut;
            console.log(x)
            x.favoriteFoods.push('Salllllad')
            console.log('update successfully')
            x.save()

      }

      )
      .catch(err => console.log(err))

//************************** END Find by ID and update ************************************

//*********************************Perform New Updates on a Document Using model.findOneAndUpdate() */

//we are going to use Await ot replace the .then
const personName = { name: "hamza" }//example
const updatePersonAge = { age: 20 };

// `doc` is the document _before_ `update` was applied
async function update() {
      let doc = await personModel.findByIdAndRemove(personName, updatePersonAge);
      console.log(chalk.blue(`Your name is ${doc.name},and Your updated age is ${doc.age}`)) // hamza'// 20 
}

update()





//*********************************Perform New Updates on a Document Using model.findOneAndUpdate() */
//*******************************************************Delete One Document Using model.findByIdAndRemove */

let personId = "5fbcecd888613235cc3be863"


personModel.findByIdAndRemove(personId, function (err, docs) {
      if (err) {
            console.log(err)
      }
      else {
            console.log(chalk.yellow("Removed User definitely : ", docs));
      }
});






//*******************************************************Delete One Document Using model.findByIdAndRemove */
//****************************MongoDB and Mongoose - Delete Many Documents with model.remove() */
personModel.remove({ name: 'Mary' }, function (err, result) {
      if (err) {
            console.log(err)
      } else {
            console.log("Result :", result)
      }
});
//*****************MongoDB and Mongoose - Delete Many Documents with model.remove()******* */
//******************Chain Search Query Helpers to Narrow Search Results */

personModel.find({ favoriteFoods: { $in: ["Pizza"] } })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: false })
      .exec()
      .then(reslut => console.log(reslut))
      .catch(err => console.log(err))






//******************Chain Search Query Helpers to Narrow Search Results */