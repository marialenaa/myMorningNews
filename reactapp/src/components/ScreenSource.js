import React,{useState, useEffect} from 'react';
import '../App.css';
import {Link} from 'react-router-dom'
import Nav from '../components/Nav'
import { List, Avatar} from 'antd';

function ScreenSource(props) {
  const [sourceList, setsourceList] = useState([])

  useEffect(() =>{
  async function fetchData() {
var reponseApi = await fetch('https://newsapi.org/v2/sources?language=fr&country=fr&apiKey=2029b89e2d014f0ab0b04f76b694cb28')
var repjson = await reponseApi.json()
setsourceList(repjson.sources)
}fetchData()},[])
console.log(sourceList)

  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>

       <div className="HomeThemes">
          
       <List 
    itemLayout="horizontal"
    dataSource={sourceList}
    renderItem={item => (
      <List.Item  >
        <List.Item.Meta 
          avatar={<Avatar src={`../images/${item.category}.png`} />}
          title={<Link to={`articlesbysource/${item.id}`}>{item.name}</Link>}
          description={item.description}
        />
      {/* <List.Item.Meta showZero>{}</List.Item.Meta> */}
      </List.Item>
    )}
  />
          </div>
                 
      </div>
  );
}

export default ScreenSource;
