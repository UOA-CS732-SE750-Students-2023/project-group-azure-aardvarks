import React from "react";
import { useState } from "react";
import {BACKEND_API} from "../../utils/env.js";
import axios from "axios";
import PlaylistCover from "./PlaylistCover.jsx";

    class AllPlayList extends React.Component{
        state = {
            playList:{}
        }
    
        // has to use an async method once Mounting a component
        async componentDidMount(props) {
            try{
                // const componentId = props.id;
                console.log(props._id)
                const getPlayList = async () => {
                    const playListDetail = await axios.get(`${BACKEND_API}/api/playList/searchPlayListByOwnerId/${componentId}`)
                    if (playListDetail.data.status === 1){
                        this.setState({playList:playListDetail.data.data})
                    }
                }
                await getPlayList()
            }catch (e) {
                console.log(e);
    
            }
    
    
    
        }
    
        componentWillUnmount() {
            this.setState({playList:{}})
        }
    
        render() {
            return (
                <>
                    
                            {/* 一行四个 */}
                            <div className={"container-content-recommendation"}>  
                                {Object.values(this.state.playList).map((playlist) => (
                                    <PlaylistCover key={playlist._id} playList={playlist} showMiniInfo={true}/>
                                    // <AlbumCover key={playlist._id} playList={playlist}/>
                                ))}
                            </div>
                        
                    
                </>
            )
        }
    }


export default AllPlayList;