import dogGif from './gifdog.gif';
import bannerGif from './banner.gif'
import './loader.css';

export default function Loader() {
    return(
        <div className='container-loader'>    
            
            <div className="load">
             <img className='gif' src={dogGif} alt="loading"/>
             
            </div>

        </div>
    )
};