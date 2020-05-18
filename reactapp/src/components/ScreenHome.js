import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import {Input,Button} from 'antd';

function ScreenHome() {
  const [userName, setuserName] = useState('') 
  const [pw, setpw] = useState('') 


  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">
                  
                  <Input className="Login-input" placeholder="arthur@lacapsule.com" />

                  <Input.Password className="Login-input" placeholder="password" />
            
                  <Link to="/source">
            <Button href="" style={{width:'80px'}} type="primary">Sign-in</Button>
            </Link>
          </div>

          {/* SIGN-UP */}

          <div className="Sign">
                  
                  <Input className="Login-input" placeholder="Arthur G" onChange={(e)=>setuserName(e.target.value)} value={userName} />

                  <Input.Password className="Login-input" placeholder="password" onChange={(e)=>setpw(e.target.value)} value={pw} />
            
            <Link to="/source">
            <Button onClick={() =>console.log(userName)} style={{width:'80px'}} type="primary">Sign-up</Button>
            </Link>
          </div>

      </div>
  );
}

export default ScreenHome;
