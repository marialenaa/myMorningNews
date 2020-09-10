import React from 'react';
import '../App.css';
import Nav from '../components/Nav'
import { Card, Icon, Result, Button} from 'antd';
import { connect } from 'react-redux';


const { Meta } = Card;

function ScreenMyArticles(props) {
    
    const handleRead = () => {

    }

  return (
    <div>
         
            <Nav/>
            <div className = "HomeThemes" />

            <div className="Card" >
                  {props.articlesLiked.length === 0 ? 
                  <Result
                    title=" No articles in wishlist "
                    extra={ <Button type="primary" href='javascript:history.go(-1)' key="console"> Back to articles </Button>}
                    /> 
                  : props.articlesLiked.map((article, i) => (
                    <div key={i} style={{display:'flex',justifyContent:'center'}}>

                    <Card
                      
                      style={{ 
                      width: 300, 
                      margin:'15px', 
                      display:'flex',
                      flexDirection: 'column',
                      justifyContent:'space-between' }}
                      cover={
                      <img
                          alt="example"
                          src={article.urlToImage}
                      />
                      }
                      actions={[
                        <Icon type="read" key="ellipsis2" onClick={()=>handleRead()} />,
                        <Icon type="delete" key="ellipsis" onClick={()=>props.handleCancel(article)} />
                      ]}
                      >
  
                      <Meta
                        title={article.title}
                        description={article.description}
                      />
  
                    </Card>
                    {/* <Modal
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
                      </Modal> */}
  
                  </div>
  
                  ))}
       
             </div>
 
      </div>
  );
}
function mapStateToProps(state){
  return {articlesLiked : state.wishlist}
}

function mapDispatchToProps(dispatch){
  return {
    handleCancel: function(article){
      dispatch( {type: 'deleteArticle',
      articleCanceled : article
    } )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);