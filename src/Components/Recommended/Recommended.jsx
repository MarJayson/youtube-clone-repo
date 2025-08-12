import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const recommendedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(recommendedVideo_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="recommended">
      {apiData.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="side-video-list"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="Island" />
            <div className="video-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

/* <div className="side-video-list">
        <img src={thumbnail2} alt="Biking" />
        <div className="video-info">
          <h4>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, ducimus.
          </h4>
          <p>Congtv</p>
          <p>500K Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail3} alt="Escalator" />
        <div className="video-info">
          <h4>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, ducimus.
          </h4>
          <p>Congtv</p>
          <p>500K Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail4} alt="Island" />
        <div className="video-info">
          <h4>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, ducimus.
          </h4>
          <p>Congtv</p>
          <p>500K Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail5} alt="Group of People Walking Together" />
        <div className="video-info">
          <h4>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, ducimus.
          </h4>
          <p>Congtv</p>
          <p>500K Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail6} alt="Sports Car" />
        <div className="video-info">
          <h4>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, ducimus.
          </h4>
          <p>Congtv</p>
          <p>500K Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail7} alt="Building" />
        <div className="video-info">
          <h4>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, ducimus.
          </h4>
          <p>Congtv</p>
          <p>500K Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail8} alt="Sports Car" />
        <div className="video-info">
          <h4>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, ducimus.
          </h4>
          <p>Congtv</p>
          <p>500K Views</p>
        </div>
      </div> */

export default Recommended;
