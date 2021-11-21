import axios from "axios";
import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import Card from '../Component/Card';
import "./genre.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft ,faArrowRight,faHome} from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
require("dotenv").config();

const Genredetail = ()=>{
    const[movie,setmovie] = useState([]);
    const[pageNumber,setpageno] = useState(1);
    const [filterType, setFilter] = useState(null);
    const [popular, setPopular] = useState([]);
    const [vote, setVote] = useState([]);
    const [title, setTitle] = useState([]);
    const [date, setDate] = useState([]);
    const genreid = useParams().GenreID;
    const genrename = useParams().Genrename;

    useEffect(()=>{
        try{
            axios.get(process.env.REACT_APP_GENRE_FIRSTPART
                + process.env.REACT_APP_API_KEY
                + process.env.REACT_APP_GENRE_SECOND_PART
                + genreid
                + process.env.REACT_APP_GENRE_THIRD_PART
                +pageNumber)
            .then((datas)=>{
                console.log(datas.data)
                if(filterType===null){
                    setmovie(datas.data.results);
                }else{
                    const res = datas.data.results;
                    if(filterType.value === 'popularity'){
                        let popularArr = res.sort((a,b) => (a.popularity > b.popularity) ? 1 : ((b.popularity > a.popularity) ? -1 : 0))
                        popularArr.reverse();
                        setPopular(popularArr)
                        setmovie(popularArr)
                        
                    }
                    else if(filterType.value === 'vote_average'){
                        let voteArr = res.sort((a,b) => (a.vote_average > b.vote_average) ? 1 : ((b.vote_average > a.vote_average) ? -1 : 0))
                    voteArr.reverse();
                    setmovie(voteArr)
                    
                    }
                    else if(filterType.value === 'original_title'){
                        let titleArr = res.sort((a,b) => (a.original_title > b.original_title) ? 1 : ((b.original_title > a.original_title) ? -1 : 0))
                    
                    setmovie(titleArr)
                
                    }
                    else if(filterType.value === 'release_date'){
                        let dateArr = res.sort((a,b) => (a.release_date > b.release_date) ? 1 : ((b.release_date > a.release_date) ? -1 : 0))
                    dateArr.reverse();
                    setmovie(dateArr)
                    
                    }
                
                }
            })
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }
    },[pageNumber,genreid,filterType]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pageNumber])

    

    
    const onbtnclick = (event)=>{
        (event.target.id === "nextbtn") ? setpageno(pageNumber+1) : setpageno(pageNumber-1); 
    }

    const handleChange=(selectedOption)=> {
    
        setFilter(selectedOption);
    }


    return(
        <div>
           
            <div>
                <div style={{display:"flex"}}>
                    <div style={{flex:"1"}}><h1>{genrename + " Movies"}</h1></div>
                    <div>
                        <Link to="/Movie-Library" style={{textDecoration:"none",color:"inherit"}}>
                            <button style={{border:"none",backgroundColor:"white",marginTop:"25px"}}>
                                <FontAwesomeIcon icon={faHome} size="2x" id="homebutton"/>
                            </button>
                        </Link>
                    </div>
                </div>
                <div id="filterSearch">
                <Select
                    placeholder="Filter By"
                    value={filterType}
                    onChange={handleChange}
                    options={options}
                    isSearchable={false}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                        ...theme.colors,
                          
                          primary25: '#B8B8B8',
                          primary: '#4C4C4E',
                        }
                    })}
                    />
                    </div>
                
                <div className="movie">
                {movie.map((movie)=>{
                    return(
                    

                            <Link to = {"/Movie-Library/MovieDetail/"+ movie.id} style={{textDecoration: "none",color:"inherit"}} key={movie.id} >
                                <Card 
                                    key={movie.id} 
                                    imagelinks={process.env.REACT_APP_IMAGE_WIDTH200  + movie.poster_path}
                                    alternatelinks={movie.title}
                                    linkvalid={movie.poster_path === null ? "Not" : "Yes"}
                                                
                                />
                            </Link>
                            
                        
                    );
                })}
                </div>
                {(pageNumber > 1) ?                
                    <button id="prevbtn" onClick={onbtnclick}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        {" page " + (pageNumber-1) + "  "}
                        
                    </button>
                    : ""}
                <button id="nextbtn" onClick={onbtnclick}>
                    {" page " + (pageNumber+1) + "  "}
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </div>
        </div>
    );
}

const options = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'vote_average', label: 'Votes Average' },
    { value: 'original_title', label: 'Title' },
    { value: 'release_date', label: 'Release Date' },
  ];

export default Genredetail;