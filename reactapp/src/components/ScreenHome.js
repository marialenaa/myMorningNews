import React, { useState } from 'react';
import '../App.css';
import {Input,Button} from 'antd';
import {Redirect } from 'react-router-dom'


function ScreenHome() {
  const [userName, setuserName] = useState('') 
  const [pw, setpw] = useState('') 
  const [email, setemail] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [err, seterr] = useState('')

  var handleSignUp = async () =>{
      const reqDataUsers = await fetch('/signup',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: `userName=${userName}&pw=${pw}&email=${email}`
      })
      const body = await reqDataUsers.json()
      if(body.result === true){
        setIsLogin(true)
      }
  }

  var handlesignin = async() =>{
    const findUser = await fetch('/signin',{
          method:'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`pw=${pw}&email=${email}`
          })
        const body = await findUser.json()
        if(body.result === true){
          setIsLogin(true)
        }
    }


  if(isLogin === true){
    return (<Redirect to='/source' />)
  }

    return (
      <div className="Login-page" >
            <p>{err}</p>
            {/* SIGN-IN */}

            <div className="Sign">
                    
                    <Input className="Login-input" placeholder="arthur@lacapsule.com" onChange={(e)=>setemail(e.target.value)} value={email}/>
  
                    <Input.Password className="Login-input" placeholder="password" onChange={(e)=>setpw(e.target.value)} value={pw} />
              
              <Button onClick={()=>handlesignin()} style={{width:'80px'}} type="primary" >Sign-in   </Button>
            </div>
  
            {/* SIGN-UP */}
  
            <div className="Sign">
                    
                    <Input className="Login-input" placeholder="UserName" onChange={(e)=>setuserName(e.target.value)} value={userName} />
  
                    <Input.Password className="Login-input" placeholder="password" onChange={(e)=>setpw(e.target.value)} value={pw} />
  
                    <Input className="Login-input" placeholder="email" onChange={(e)=>setemail(e.target.value)} value={email} />
              
              <Button onClick={() => handleSignUp()} style={{width:'80px'}} type="primary">Sign-up</Button>
            </div>
  
        </div>
    )
  }
  

export default ScreenHome;
