const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const Task = require('./models/task')

// BD Configuration
const app = express()
const sequelize = new Sequelize({ 
  dialect: 'sqlite', 
  storage: './todo-list.db' })

  // Conection BD 
const tasks = Task(sequelize, DataTypes)

app.use(express.json())

// Create Task
app.post('/tasks', async (req, res) => { 
  const tasksCreate = await tasks.create({             
    description: req.body.description,
    ready: req.body.ready
})
res.json({ action: 'Task Create ', tasksCreate: tasksCreate})
  
  var errors=[]
  if (!req.body.description){
      errors.push("Descrição não enviada");
  }
  if (!req.body.ready){
      errors.push("Status não enviada");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
})

// Update Task
app.put('/tasks/:id', async (req, res) =>{
  try{
      const taskId = req.params.id
      const body = req.body
      const taskList = await tasks.findByPk(taskId)
      taskList.update({
          description: body.description,
          ready: body.ready
      });        
      res.send({ action: 'Task Modify ', taskList:taskList })
  } catch (e) {
      console.log(e);
      return res.send({ error: e})
  }
})

// Delete Task
app.delete('/tasks/:id', async (req, res) => {
  try{
      const taskId = req.params.id
      const taskRemove = await tasks.destroy({ where: { id: taskId  } })
      res.send({ action: 'Task Remove ', taskRemove: taskRemove })
  } catch (e) {
      console.log(e);
      return res.send({ error: e})
  }
})                                                                                
// Get All tasks 
app.get('/tasks', async (req, res) => {
  const taskList =  await tasks.findAll();
  res.json({ action: 'Show Tasks ', tasks: taskList                                                                                          })
})

// Show task by ID
app.get('/tasks/:id', async  (req, res) => {
  const taskId = req.params.id
  const taskList =  await tasks.findByPk(taskId);
  res.json({ action: 'Show Task for ID ', tasks: taskList })
})


app.listen(9090, () => {
console.log('Iniciando o ExpressJS na porta 9090')
})