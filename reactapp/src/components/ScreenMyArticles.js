import React from 'react';
import '../App.css';
import Nav from '../components/Nav'
import { Card, Result, Button} from 'antd';
import { connect } from 'react-redux';
import { ReadOutlined , DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card;

function ScreenMyArticles(props) {

    const handleClickCancel = async (title) => {
      props.handleCancel(title)
      const fetchDelete = await fetch('/delete',{
        method:'DELETE',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.token}&title=${title}`
      })
    }

    const handleRead = () => {
      console.log('reaaaaaaaaaaaaad')
    }

  return (
    <div>
         
        <Nav/>
                
            <div className="Card" >
                  {props.wishlist.length === 0 ? 
                  <Result
                    title=" No articles in wishlist "
                    extra={ <Button type="primary" href='javascript:history.go(-1)' key="console"> Back to articles </Button>}
                    /> 
                  : props.wishlist.map((obj, i) => (
                    <div className="Card" key={i} style={{display:'flex',justifyContent:'center'}}>
                    <Card
                      style={{ 
                      width: 320, 
                      height: 410,
                      margin:'15px', 
                      display:'flex',
                      flexDirection: 'column',
                      justifyContent:'space-between',
                      }}
                      cover={
                      <img
                          alt="example"
                          src={obj.urlToImage}
                      />
                      }
                      actions={[
                        <ReadOutlined key="ellipsis2" style={{ fontSize: 25, color: '#08c' }} onClick={()=>handleRead()} />,
                        <DeleteOutlined   key="ellipsis" style={{ fontSize: 25, color: '#08c' }} onClick={()=>handleClickCancel(obj.title)} />
                      ]}
                      >
  
                      <Meta
                        style={{fontSize: '0.8em'}}
                        title={obj.title}
                        description={obj.description}
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
  return {
    wishlist : state.wishlist, 
    token: state.token
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleCancel: function(title){
      dispatch( {type: 'deleteArticle',
      articleCanceled : title
    } )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);