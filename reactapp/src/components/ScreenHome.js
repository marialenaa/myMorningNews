import React, { useState } from 'react';
import '../App.css';
import {
  Input,
  Button
} 
from 'antd';
import {Redirect } from 'react-router-dom'
import { connect } from 'react-redux';


function ScreenHome(props) {
  const [pw, setpw] = useState('') 
  const [email, setemail] = useState('')

  const [userNameSup, setuserNameSup] = useState('') 
  const [pwSup, setpwSup] = useState('') 
  const [emailSup, setemailSup] = useState('')

  const [isLogin, setIsLogin] = useState(false)
  const [errSI, seterrSI] = useState([])
  const [errSU, seterrSU] = useState([])
  const [emailValidation, setEmailValidation] = useState('')
  const [nameValidation, setNameValidation] = useState('')
  const [pwValidation, setpwValidation] = useState('')


  const  handleInputValidationPw= (val) => {
    setpwSup(val)
    if(val.length < 2){
        setpwValidation("8 caractères minimum")
      }else{
        setpwValidation("")
      }
    }
    
    const  handleInputValidationUserName= (val) => {
      setuserNameSup(val)
      if(val.length < 2){
       setNameValidation("6 caractères minimum")
        }else{
          setNameValidation("")
        }
      }

      const  handleInputValidationEmail= (val) => {
        setemailSup(val)
        if(val.length < 2){
         setEmailValidation("veuillez saisir un Email valide")
          }else{
            setEmailValidation("")
          }
        }

  var handleSignUp = async () =>{

    if(!emailValidation && !pwValidation && !nameValidation){
      const reqDataUsers = await fetch('/signup',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: `userName=${userNameSup}&pw=${pwSup}&email=${emailSup}`
      })
      const body = await reqDataUsers.json()
      if(body.result === true && body.token){
        props.tokenUser(body.token)
        setIsLogin(true)
      }else{
        seterrSU(body.error)
           setemailSup('')
          setpwSup('')
          setuserNameSup('')
      }
    }else{
         setemailSup('')
        setpwSup('')
        setuserNameSup('')
    }
  }

  var handlesignin = async() =>{
    const findUser = await fetch('/signin',{
          method:'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`pw=${pw}&email=${email}`
          })
        const body = await findUser.json()
        if(body.result === true && body.token){
          setIsLogin(true)

          props.tokenUser(body.token)
        }else{
          seterrSI(body.error)
          setpw('')
        }
    }

  if(isLogin === true){
    return (<Redirect to='/source' />)
  }

  var tabERRsi = errSI.map((error,i) => {
    return(<p key={i} >{error}</p>)
  })
  var tabERRsu = errSU.map((error,i) => {
    return(<p key={i} >{error}</p>)
  })
    return (
      <div className="Login-page" >
            
  {/* SIGN-IN */}
            <div className="Sign">
                    
                    <Input 
                    className="Login-input" 
                    placeholder="me@example.org" 
                    onChange={(e)=>setemail(e.target.value)} 
                    value={email}
                    // type={'email'}   
                    required                    
                    />
  
                    <Input.Password 
                    className="Login-input" 
                    placeholder="password" 
                    onChange={(e)=>setpw(e.target.value)} 
                    value={pw} 
                    type={'password'}                       
                    minLength={8}   
                    maxLength={14}  
                    required  
                    />
              
                    {tabERRsi}
        
              <Button onClick={()=>handlesignin()} style={{width:'80px'}} type="primary" >Sign-in   </Button>
            </div>
  
{/* SIGN-UP */}
            <div className="Sign">

                    <Input 
                    className="Login-input" 
                    placeholder="UserName" 
                    onChange={(e)=>handleInputValidationUserName(e.target.value)} 
                    value={userNameSup} 
                    // minLength={6}   
                    // maxLength={14}  
                    required              
                    />

                    <Input.Password 
                    className="Login-input" 
                    placeholder="password" 
                    onChange={(e) => handleInputValidationPw(e.target.value)} 
                    value={pwSup} 
                    // minLength={8}   
                    // maxLength={14} 
                    required     
                    />
  
                    <Input 
                    className="Login-input" 
                    placeholder="email" 
                    onChange={(e)=>handleInputValidationEmail(e.target.value)} 
                    value={emailSup} 
                    type={'email'}
                    required  
                    />
                    {emailValidation} <br></br> {pwValidation} <br></br> {nameValidation}
                    {tabERRsu}

             
              <Button onClick={() => handleSignUp()} style={{width:'80px'}} type="primary">Sign-up</Button>
            </div>
  
        </div>
    )
  }
  
function mapDispatchToProps(dispatch){
  return {
    tokenUser: function(tokenAdded){
      dispatch({ type: 'addToken',
      tokenAdded : tokenAdded})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenHome);
