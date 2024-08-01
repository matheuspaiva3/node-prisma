import { Router } from "express";
import {  createPost, createUser, createUsers, deleteUser, getAllUser, getUserByEmail, updateUser } from "../services/user";
export const mainRouter = Router();

mainRouter.get("/ping", (req, res) => {
  res.json({ pong: true });
});
//Route to create a user, in this version I'm creating a user with post
mainRouter.post("/user", async (req, res) => {
  const user = await createUser({
   name: 'Thurigo',
   email: 'thurigo@gmail.com',
   posts:{
    create:{
      title : 'blalbla',
      body: "adsadasd"
    }
   }
  });
  // This was to check a code before the upsert
  if(user){
    res.status(201).json({ user });
  }else{
    res.status(500).json({erro: 'Ocorreu um erro'})
  }
});
//To create many users
mainRouter.post('/users', async(req,res)=>{
  const users = await createUsers([
    {name:'Matheus',email:'matheus@protonmail.me'},
    {name:'Cesar',email:'Cesar@gmail.com'},
    {name:'Thurigo', email:'Thurigo@gmail.com'},
    {name:'Dango',email:'Dango@protonmail.com'}
])
  res.json({ok:true, users})
})
//To get All users
mainRouter.get('/users',async(req,res) => {
  const users = await getAllUser()
  res.json({users})
})
//To get user by email
mainRouter.get('/user', async(req,res) => {
  const email = 'matheus@gmail.com'
  const user = await getUserByEmail(email)
  res.json({user})
})
//To create a post
mainRouter.post('/post', async(req,res) => {
  const {title, body, authorId} = req.body
  const post = await createPost({title,body,authorId})
  res.json({post})
})
//To update a data from a user
mainRouter.put('/user',async(req,res) =>{
  const update = await updateUser()
  res.json({update})
 })
 //To delete the user
 mainRouter.delete('/user',async(req,res) => {
  const deletedUser = await deleteUser('thurigo@gmail.com')
  res.json({deletedUser})
 })