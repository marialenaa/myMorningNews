import React , {useState,useEffect} from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import 'antd/dist/antd.css';
import Nav from '../components/Nav'
import { Card, Icon, List, Modal,Button} from 'antd';


const { Meta } = Card;

function ScreenArticlesBySource(props) {
  const [articlesList, setarticlesList] = useState([])
  const [visible, setvisible] = useState(false)
  const [loading, setloading] = useState(false)
  const [isLike, setIslike] = useState([])
  const [read, setread] = useState('')
  const [jailu, setjailu] = useState('')

  useEffect(() =>{
    const findarticles = async() =>{
    var reponseApi = await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=2029b89e2d014f0ab0b04f76b694cb28`)
    var repjson = await reponseApi.json()
    setarticlesList(repjson.articles)
    }
    findarticles()
    },[])

  var color= {}

  const addlike = (x) =>{
    
    setIslike([...isLike,articlesList[x]])
  }

  const showModal=(articleToRead)=>{
    console.log(articleToRead)
    setvisible(true)
    setread({name:articleToRead.title, content:articleToRead.content})
    }
    const handleOk = (jailu) => {
    console.log(jailu)
    setjailu('blue')
    setloading(true)
    setTimeout(()=> {
      setloading(false)
      setvisible(false)
    }, 700);
    };

  const handleCancel = e => {
      console.log(e);
      setvisible(false)
    };

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
    
              <div  style={{display:'flex',justifyContent:'center'}}>
              <List
              grid={{
                gutter: 12,
                xs: 1,
                md: 2,
                lg: 3,
                xl: 4,
              }}
                  itemLayout="horizotal"
                  dataSource={articlesList}
                  renderItem={(article, i) => (
                    <List.Item >
                <Card key={i} item={article}
                  style={{ 
                  width: 300,
                  height:370,
                  margin:'25px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                  style={{height: 160}}
                      alt="example"
                      src={`${article.urlToImage}`}
                  />
                  }
                  actions={[
                      <Icon style={{color:jailu}} onClick={()=>showModal({title:article.title, content:article.content})} type="read" key="read" />,
                      <Icon style={color} onClick={() =>addlike(i)} type="like" key="like"/>
                  ]}
                  >
                  <Meta
                    title={article.title}
                    description={article.description.substring(0, 150) + "..."}
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
          <p>{read.content}</p>
        </Modal>
              </div>

           </div> 

      </div>
  );
}

export default ScreenArticlesBySource;
