import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import {Menu, Icon, Avatar, List} from 'antd'
import { connect } from 'react-redux';

function Nav(props) {

  const language = ['en','fr','it', 'es' ]
  // const handleLanguage = ()=>{
  //     let language
  //     fetch(`https://newsapi.org/v2/sources?language=${language}&country=fr&apiKey=2029b89e2d014f0ab0b04f76b694cb28`)
  // }

  return (
    <nav >
        <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

            <Menu.Item key="source">
                <a href='javascript:history.go(-1)'><Icon type="left-square" style={{ fontSize: 25, color: '#08c' }} />Précédent </a>
              </Menu.Item>

              <Menu.Item key="mail">
                <Link to='/source'><Icon type="bars"  style={{ fontSize: 20, color: '#f9ae75' }} />Sources</Link>
              </Menu.Item>

              <Menu.Item key="test">
                <Link to='/myarticles'><Icon  style={{ fontSize: 20, color: '#f9ae75' }} type="paper-clip" />My favorites</Link>
              </Menu.Item>
              
              <Menu.Item key="app">
                <Link to='/'><Icon type="logout" style={{ fontSize: 20, color: '#f9ae75' }} />Logout</Link>
              </Menu.Item>

        </Menu>
       
        <div className = "Banner" style={{textAlign: 'center', padding:20}}>
            <List 
            grid={{ gutter: 16, column: 4 }}
            dataSource = {language}
            renderItem = {
                (item, i) => ( 
                <List.Item >
                    <List.Item.Meta 
                        avatar = {<Link onClick={()=>props.changeLanguage(language[i])}><Avatar style={{margin:10}} size={60} src={`/images/${item}.png`} /></Link>}
                    /> 
            </List.Item>
            )
          }
          />  

        </div>
        
    </nav>
  );
}

function mapDispatchToProps(dispatch){
  return{
    changeLanguage: function(language){
      dispatch({type:'changeLgg',
    language:language})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Nav);
