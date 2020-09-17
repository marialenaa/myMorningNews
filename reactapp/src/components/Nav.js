import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import '../App.css';
import {Menu, Avatar, List, Badge} from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { LeftSquareOutlined, MenuOutlined, PoweroffOutlined, PaperClipOutlined } from '@ant-design/icons';

function Nav(props) {

  const language = ['en','fr','it', 'es' ]
  const [returnSource, setReturnSource] = useState(false)
  const [show, setIsShown] = useState(false)
  
  const handleLanguage = (lang)=>{
    props.changeLanguage(lang)  
    setReturnSource(true)
  }

  if(show){
  }
  if(!props.token){
    return  (<Redirect to='/' />)  
}
  if(returnSource && window.location.pathname != '/source'){
    return <Redirect to='/source' />
  }
 
  return (
    <nav >
        <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

            <Menu.Item key="source">
                <a href='javascript:history.go(-1)'> <LeftSquareOutlined style={{ fontSize: 25, color: '#08c' }} /> Précédent </a>
              </Menu.Item>

              <Menu.Item key="mail">
                <Link to='/source'> <MenuOutlined style={{ fontSize: 25, color: '#08c' }} /> Sources</Link>
              </Menu.Item>

              <Menu.Item key="test">
                <Link to='/myarticles'>  <Badge count={ props.wishlist.length }> <PaperClipOutlined style={{ fontSize: 25, color: '#08c' }} /> </Badge>   My favorites</Link>
              </Menu.Item>
              
              <Menu.Item key="app">
                   <Link to='/'><PoweroffOutlined onClick={()=>props.resetToken()} style={{ fontSize: 25, color: '#08c' }} /> Logout </Link>
              </Menu.Item>



        </Menu>
       
        <div className = "Banner" style={{textAlign: 'center', padding:20}}>
            <List 
            grid={{ gutter: 16, column: 4 }}
            dataSource = {language}
            renderItem = {
                (item, i) => ( 
                <List.Item >
                  {<Link onMouseOver={setIsShown(true)} style={{margin:10, }} onClick={()=> handleLanguage(language[i])}><Avatar  size={60} src={`/images/${item}.png`} /></Link>}
                </List.Item>
            )
          }
          />  

        </div>
        
    </nav>
  );
}
function mapStateToProps(state){
  return {wishlist : state.wishlist,
    token : state.token
  }
}

function mapDispatchToProps(dispatch){
  return{
   
    changeLanguage: function(language){
      dispatch({type:'changeLgg',
    language:language})
    },
    resetToken: function(){
      dispatch({type: 'resetTokenType'})
    },
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
