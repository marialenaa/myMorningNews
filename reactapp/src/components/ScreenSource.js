import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { List, Avatar} from 'antd';
import { connect } from 'react-redux';

function ScreenSource(props) {
    const [sourceList, setsourceList] = useState()
    
    useEffect(() => {
        const fetchData = async() => {   
            var reponseApi = await fetch(`https://newsapi.org/v2/sources?language=${props.language}&apiKey=2029b89e2d014f0ab0b04f76b694cb28`)
            var repjson = await reponseApi.json()
            setsourceList(repjson.sources)
        }
        fetchData()
    },[props.language])


    return ( 
    <div>
        <Nav />

        <div className = "HomeThemes">
        <List itemLayout = "horizontal"
        dataSource = { sourceList }
        renderItem = {
            item => ( 
            <List.Item >
                <List.Item.Meta 
                    avatar = { <Avatar src = { `../images/${item.category}.png` } />}
                    title = { < Link to = { `articlesbysource/${item.id}` } > { item.name } </Link>}
                    description = { item.description }
                /> 
                        {/* < List.Item.Meta showZero > {} < /List.Item.Meta> */}
            </List.Item>
                )
            }
            />  
            </div> 
            </div >
        );
    }

    // function mapDispatchToProps(dispatch){
    //     return{
    //         getWishlistFunc: function(wishlist){
    //             console.log(wishlist)
    //             dispatch({type: 'getWishlist',
    //             wishlist: wishlist})
    //         }
    //     }
    // }

    

    function mapStateToProps(state){
        return{language:state.language ,
            token : state.token
        }
    }

    export default connect(
        mapStateToProps,
        null,
        
    )(ScreenSource);