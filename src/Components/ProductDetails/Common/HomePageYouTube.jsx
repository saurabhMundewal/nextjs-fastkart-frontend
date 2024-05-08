import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import CustomHeading from "@/Components/Common/CustomHeading";

const HomePageYouTube = ( dataAPI,

  svgUrl,
  noCustomClass,
  customClass,) => {
    const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
      const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
  return (
    <div className="container-fluid bg-light mt-4">
       <CustomHeading
        title={dataAPI?.dataAPI?.title}
        svgUrl={dataAPI?.svgUrl}
        subTitle={''}
        customClass={
          customClass
            ? customClass
            : noCustomClass
            ? ""
            : "section-t-space title"
        }
      />
  
    <div className="container-fluid">
            <div className="row gx-5">
              <div className="col-sm-6 hidden-on-mobile">
               <p className='text-justify'>{dataAPI?.dataAPI?.description}</p> 
              </div>
              <div className="col-sm-6">
                <div className="p-3 mt-2 border bg-light">
                <YouTube videoId={dataAPI?.dataAPI?.youtubeID} opts={opts} onReady={onPlayerReady} />
       
                </div>
              </div>
            </div>           
          </div>
  
    </div>

  );
};

export default HomePageYouTube;
