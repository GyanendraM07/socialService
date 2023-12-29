import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Stories from 'react-insta-stories';
import "./profile.css";
import GridOnIcon from '@mui/icons-material/GridOn';
import MovieIcon from '@mui/icons-material/Movie';
import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Profile() {

    const [postImage1, setPostImage1] = useState([]);
    const [postImage2, setPostImage2] = useState([]);
    const [postImage3, setPostImage3] = useState([]);
    const [postVideo, setPostVideo] = useState([]);

    const [hover, setHover] = useState(false); // initial false

    const HoverData = "Click or pinch to Zoom Image";

    const onHover = (e) => {
        e.preventDefault();
        setHover(true); // turn true
        console.log("hovered");
    };

    const onHoverOver = (e) => {
        e.preventDefault(); // turn false
        setHover(false);
    };
    // const stories = [
    //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',

    // ];
    useEffect(() => {
        console.log("data")
        profileData()
        console.log("data")
    }, []);

    // fetch the postsData
    const profileData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            const fd = new FormData();
            // fd.append("caption",data.caption);
            fd.append("user", localStorage.getItem("realusername"));
            const login = await Axios.post("/profile/profiledata", fd, config);
            const { data } = login
            console.log(data)
            setPostImage1(data.postUrl1);
            setPostImage2(data.postUrl2);
            setPostImage3(data.postUrl3);
            //   setVideo(data.video);
            //   setUserfullname(data.userfullname);
            //   setUserprofilepic(data.userprofilepic);
            console.log("check" + postImage1);
            console.log("check" + postImage2);
            console.log("check" + postImage3);
            //   console.log("check" + image.postId);
            //   console.log(data.video);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ marginLeft: '6.5cm' }}>
            <div id='profiledive'>
                <div id='profiledive1' >
                    <span> <Avatar alt="Remy Sharp" src='http://127.0.0.1:9000/socialmedia/users/profileimage/1124/yash (1).jpg' sx={{ height: '160px', width: '160px' }} /></span>
                </div>
                <div id='profiledive2' >

                    <p class="child">its_testing 007</p>&nbsp;&nbsp;&nbsp;
                    <Button class="child">Edit Profile</Button>&nbsp;&nbsp;
                    <div style={{ whiteSpace: 'nowrap' }}>
                        <p style={{ display: 'inline-block' }}>12</p>&nbsp;
                        <p style={{ display: 'inline-block' }}>Posts</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p style={{ display: 'inline-block' }}>12</p>&nbsp;
                        <p style={{ display: 'inline-block' }}>followers</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p style={{ display: 'inline-block' }}>13</p>&nbsp;
                        <p style={{ display: 'inline-block' }}>Following</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div ><b>Demo Name </b></div>
                    <div>
                        <p style={{ marginTop: '-0.1cm' }}>iam don </p>
                        <p class="bio">Iam weak</p>
                        <p class="bio">Iam Strong</p>
                        <p class="bio">Iam not weak</p>
                    </div>
                </div>
                <div id='storydiv'>
                    <ul style={{ overflow: 'hidden' }}>
                        <li style={{ float: 'left' }}>
                            <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' width="100" height="100" controls className='ved' />
                            <p style={{ marginTop: '-0.2cm' }}>hello story</p>
                        </li>
                        <li style={{ float: 'left' }}>
                            <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' width="100" height="100" controls className='ved' />
                            <p style={{ marginTop: '-0.2cm' }}>hello story</p>
                        </li>
                    </ul>
                    {/* <Stories
                        stories={stories}
                        defaultInterval={1500}
                        width={432}
                        height={768}
                    /> */}
                </div>
            </div><br></br>
            <div id='datadiv' >
                <div style={{ display: 'flex', marginLeft: '8cm' }}>
                    <GridOnIcon ></GridOnIcon>&nbsp;&nbsp;&nbsp;
                    <p style={{ marginTop: '-4px' }}>post </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MovieIcon></MovieIcon>&nbsp;&nbsp;&nbsp;
                    <p style={{ marginTop: '-4px' }}>Reel</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <GridOnIcon ></GridOnIcon>&nbsp;&nbsp;&nbsp;
                    <p style={{ marginTop: '-4px' }}>Saved </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MovieIcon></MovieIcon>&nbsp;&nbsp;&nbsp;
                    <p style={{ marginTop: '-4px' }}>Tag</p>
                </div>
                <div id="postMaindiv">
                    <div id="divcol1" >
                        <div style={{ marginLeft: '1.5cm' }}>
                            {
                                postImage1.map(img =>
                                    <div id="postdiv1">
                                        {/* if hover is true then only show the text */}
                                        {hover && <p className={hover}>{img}</p>}
                                        <img onMouseEnter={(e) => onHover(e)}
                                            onMouseLeave={(e) => onHoverOver(e)} src={img} width="300" height="300" id="img1" />
                                    </div>
                                )}
                        </div>
                    </div>
                    <div id="divcol2">
                        <div style={{ marginLeft: '1.5cm' }}>
                            {
                                postImage2.map(img =>
                                    <div id="postdiv3">
                                        <img src={img} width="300" height="300" id="img1" />

                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div id="divcol3">
                        <div style={{ marginLeft: '1.5cm' }}>
                            {
                                postImage3.map(img =>
                                    <div id="postdiv2">
                                        <img src={img} width="300" height="300" id="img1" />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div><br></br>
            <div id='postdiv'>

            </div>
        </div>

    );
}