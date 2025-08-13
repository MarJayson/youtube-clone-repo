import video1 from "../../assets/video.mp4";
import congtv from "../../assets/congtv.jpg";
import user_profile from "../../assets/user_profile.jpg";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { useEffect, useState } from "react";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    // Fetch Video Data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchAnotherData = async () => {
    // Fetch Channel Data
    if (!apiData || !apiData.snippet) return;
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));
  };

  const fetchCommentData = async () => {
    // Fetch Comment Data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchAnotherData();
  }, [apiData]);

  useEffect(() => {
    fetchCommentData();
  }, [videoId]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "20K"}{" "}
          Views &bull;{" "}
          {apiData
            ? moment(apiData.snippet.publishedAt).fromNow()
            : "Some time ago"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 200}
          </span>
          <span>
            <img src={dislike} alt="" />5
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={
            channelData
              ? channelData.snippet.thumbnails.default.url
              : "Channel Here"
          }
          alt="Congtv"
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Channel Here"}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "1M"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Description Here"}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 1000}{" "}
          Comments
        </h4>
        {
          commentData.map((item, index) => {
            return (
              <div key={index} className="comments">
                <img
                  src={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  alt=""
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}
                    <span>1 day ago</span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="Like Icon" />
                    <span>
                      {value_converter(
                        item.snippet.topLevelComment.snippet.likeCount
                      )}
                    </span>
                    <img src={dislike} alt="Dislike Icon" />
                  </div>
                </div>
              </div>
            );
          })

          /* <div className="comments">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Cherry Ann <span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              culpa possimus, est fugit soluta eum!
            </p>
            <div className="comment-action">
              <img src={like} alt="Like Icon" />
              <span>443</span>
              <img src={dislike} alt="Dislike Icon" />
            </div>
          </div>
        </div>
        <div className="comments">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Cherry Ann <span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              culpa possimus, est fugit soluta eum!
            </p>
            <div className="comment-action">
              <img src={like} alt="Like Icon" />
              <span>443</span>
              <img src={dislike} alt="Dislike Icon" />
            </div>
          </div>
        </div>
        <div className="comments">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Cherry Ann <span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              culpa possimus, est fugit soluta eum!
            </p>
            <div className="comment-action">
              <img src={like} alt="Like Icon" />
              <span>443</span>
              <img src={dislike} alt="Dislike Icon" />
            </div>
          </div>
        </div>
        <div className="comments">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Cherry Ann <span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              culpa possimus, est fugit soluta eum!
            </p>
            <div className="comment-action">
              <img src={like} alt="Like Icon" />
              <span>443</span>
              <img src={dislike} alt="Dislike Icon" />
            </div>
          </div>
        </div>
        <div className="comments">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Cherry Ann <span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              culpa possimus, est fugit soluta eum!
            </p>
            <div className="comment-action">
              <img src={like} alt="Like Icon" />
              <span>443</span>
              <img src={dislike} alt="Dislike Icon" />
            </div>
          </div>
        </div> */
        }
      </div>
    </div>
  );
};

export default PlayVideo;
