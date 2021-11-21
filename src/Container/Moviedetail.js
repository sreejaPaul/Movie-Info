import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Uppernavbar from '../Component/Uppernavbar';
import Content from '../Component/Content';
require("dotenv").config();



const Moviedetail = ()=>{

    
    const[genresname,setgenre] = useState([]);
    const[genresid,setgenresid] = useState([]);
    const[visitlink,setvisitlink] = useState("");
    const[imdblink,setimdblink] = useState("");
    const[title,settitle] = useState("");
    const[overview,setoverview] = useState("");
    const[releasedate,setdate] = useState("");
    const[runtime,setruntime] = useState("");
    const[vote,setvote] = useState(0);
    const [poster_path,setpath] = useState("");
    const[statewidth,setwidth] = useState(0);
    const[tagline,settag] = useState("");
    const[stateid,setstateid] = useState(0);
    const [videos, setVideos] = useState([]);

   
    const id= parseInt(useParams().MovieID);
    useEffect(()=>{
        try{
            setTimeout(()=>{
                
                axios.get(process.env.REACT_APP_MOVIEDETAIL_FIRSTPART_PUBLIC_URL 
                            + id 
                            + process.env.REACT_APP_MOVIEDETAIL_SECONDPART_PUBLIC_URL 
                            + process.env.REACT_APP_API_KEY
                             + process.env.REACT_APP_MOVIEDETAIL_THIRDPART_PUBLIC_URL)
                .then((datas)=>{
                    console.log(datas.data.videos)
                    setgenre(
                        datas.data.genres.map((genre)=>{
                            return genre.name+" ";
                        })
                    );
                    setgenresid(
                        datas.data.genres.map((genre)=>{
                            return genre.id;
                        })
                    );
                    
                    setvisitlink(datas.data.homepage);
                    setimdblink(datas.data.imdb_id);
                    settitle(datas.data.title);
                    setoverview(datas.data.overview);
                    setdate(datas.data.release_date);
                    setruntime(datas.data.runtime);
                    setvote(datas.data.vote_average);
                    setpath(datas.data.poster_path);
                    setwidth((datas.data.vote_average * 10));
                    settag(datas.data.tagline);
                    setstateid(datas.data.id);
                })
                
            },1000);
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }
            
    },[id]);

    useEffect(()=>{
        axios.get("https://api.themoviedb.org/3/movie/"+id+"/videos?api_key=9d6c10bbddeab2458cd6f37eb6d21b85&language=en-US")
        .then((datas)=>{
            console.log(datas)
            setVideos(datas)
        })
    },[id])

    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);
    

    const style={marginTop: "45vh",marginLeft: "45vw"}
        return(
            
            <div >
                <Uppernavbar/>
                
                {id !== stateid ? <Loader type="ThreeDots" color="#4C4C4E" height="100" width="100" style={style}/>
                : (<Content genresname={genresname} genresid = {genresid} visitlink={visitlink} imdblink={imdblink} 
                    title={title} overview={overview} releasedate={releasedate} runtime={runtime} vote={vote} poster_path={poster_path} 
                    statewidth={statewidth} id={id} tagline={tagline} videos={videos}/>)
                }

            </div>
        );
}



export default Moviedetail;