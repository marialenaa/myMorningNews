import React , {useState,useEffect} from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import Nav from '../components/Nav'
import {List, Modal,Button,Card} from 'antd';
import { connect } from 'react-redux';
import { EyeOutlined , PaperClipOutlined } from '@ant-design/icons';

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articlesList, setarticlesList] = useState([])
  const [visible, setvisible] = useState(false)
  const [loading, setloading] = useState(false)
  const [read, setread] = useState('')
  const [jailu, setjailu] = useState('')
  const [color, setColor] = useState('')

  useEffect(() =>{
    const findarticles = async() =>{
    var reponseApi = await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=2029b89e2d014f0ab0b04f76b694cb28`)
    var repjson = await reponseApi.json()
    setarticlesList(repjson.articles)
    }
    findarticles()
    },[])
    
  const addWishlist = async (article) =>{ 
      props.addToWishList(article)
    const postArticle = await fetch('/add-article',{
    method : 'POST',
    headers : {'Content-Type':'application/x-www-form-urlencoded'},
    body : `title=${article.title}&description=${article.description}&content=${article.content}&urlToImage=${article.urlToImage}&token=${props.token}`
      }
    )
  }

  
  const showModal=(articleToRead)=>{
    setvisible(true)
    setread({name:articleToRead.title, content:articleToRead.content})
    }
    const handleOk = (jailu) => {
    setjailu('blue')
    setloading(true)
    setTimeout(()=> {
      setloading(false)
      setvisible(false)
    }, 700);
    };

  const handleCancel = e => {
      setvisible(false)
    };

  return (
    <div >
         
        <Nav/>
            <div className = "HomeThemes">

              <List
              grid={{
                gutter: 12,
                xs: 1,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 4,
              }}
                  itemLayout="horizotal"
                  dataSource={articlesList}
                  renderItem={(article,i) => (
                    <List.Item>
                    <Card 
                      key={i}
                      item={article}
                      style={{ 
                        width: 320,
                        height:410,
                        margin:'10px', 
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent:'space-between' }}
                      cover={
                        <img
                        style={{height: 190}}
                            alt="example"
                            src={article.urlToImage}
                        />
                      }
                      actions={[
                        <EyeOutlined style={{color:jailu, fontSize: 20}} key="ellipsis2" onClick={()=>showModal({title:article.title, content:article.content})}  />,
                        <PaperClipOutlined  style={{fontSize: 20, color:`${color}`}} onClick={() =>{addWishlist(article)}} key="ellipsis"/>
                      ]}
                    >                  

                  <Meta
                    style={{fontSize: '0.8em'}}
                    title={article.title}
                    description={article.description}
                    />
                </Card>
                </List.Item>
                  )}
                />
                <Modal
                    title={read.name}
                    visible={visible}
                    onOk={()=>handleOk(jailu)}
                    onCancel={()=>handleCancel()}
                    footer={[
                      <Button key="back" onClick={()=>handleCancel()}> Retour </Button>,
                      <Button key='submit' type="default" loading={loading} onClick={()=>handleOk()}> J'ai lu </Button>
                    ]}
                  >
                    <div>
                      <p style={{height:'auto'}}>{read.content}</p>
                      </div>
                  </Modal>
              </div>
          </div> 
  );
}

function mapDispatchToProps(dispatch){
  return{
    addToWishList: function(article){
      dispatch({ type: 'addArticle',
      articleLiked: article })
    },
  }
}

function mapStateToProps(state){
  return{token:state.token,
    wishlist : state.wishlist
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenArticlesBySource);