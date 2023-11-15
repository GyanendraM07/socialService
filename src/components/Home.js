import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import "./Post.css";
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { border } from '@mui/system';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';


export default function CreatePost() {
  const [open, setOpen] = React.useState(false);
  const [commentopen, setCommentOpen] = React.useState(false);
  const [likeuseropen, setLikeuseropen] = React.useState(false);
  const [nestedcomopen, setNestedcomopen] = React.useState(false);
  const [followuser, setFollowUser] = React.useState(false);
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [comment, setComment] = useState([]);
  const [likeusers, setLikeusers] = useState([]);
  const [data, setdata] = useState({
    file: "",
    caption: "",
    comment: ""
  });
  const [commentid, setCommentid] = useState("");
  const [userfullname,setUserfullname] = useState("");
  const [userprofilePic,setUserprofilepic] = useState("");

  //for open followUser dialouge box 
  const followUserOpen = () => {
    setFollowUser(true);
  }
  const followUserClose = () => {
    setFollowUser(false);
  }
  const commentOpen = async (event, param) => {
    event.preventDefault();
    setNestedcomopen(false);
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
    const fd = new FormData();
    fd.append("id", param);
    const login = await Axios.post("create/fetchComment", fd, config);
    // console.log(login)
    // console.log(login.data)
    setComment(login.data.comment);
    setCommentOpen(true);

  }
  const commentClose = () => {
    setCommentOpen(false);
  }

  // for likeUser
  const likeuserOpen = async (event, param) => {
    event.preventDefault();
    setNestedcomopen(false);
    setLikeuseropen(true);
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
    const fd = new FormData();
    fd.append("postId", param);
    fd.append("loginUserName", localStorage.getItem("realusername"));
    const login = await Axios.post("create/fetchlikeusers", fd, config);
    setLikeusers(login.data.users);
   

  }

  const likeuserClose = () => {
    setLikeuseropen(false);
  }
  // for adding  nested comment
  const nestedcommentClick = async (event, param) => {
    event.preventDefault();
    console.log(param)
    try {
      const config = {

        headers: {

          Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf8",

        }
      };
      const body = {
        postId: param,
        comment: data.comment,
        commentedUser: localStorage.getItem("realusername"),
        commentId: commentid
      };
      const login = await Axios.post("create/addComment", JSON.stringify(body), config);
      console.log(login.status);
      if (login.status == 200) {
        alert("Account Created Succesfully pls Login ")
      }
    } catch (error) {
      console.log(error);
    }
  }
  //for adding comment
  const commentClick = async (event, param) => {
    event.preventDefault();
    console.log(param)
    try {
      const config = {

        headers: {

          Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf8",

        }
      };
      const body = {
        postId: param,
        comment: data.comment,
        commentedUser:localStorage.getItem("realusername")

        // commentedUser: localStorage.getItem("realusername"),
      };
      const login = await Axios.post("create/addComment", JSON.stringify(body), config);
      console.log(login.status);
      if (login.status == 200) {
        alert("Account Created Succesfully pls Login ")
        setdata({ ...data, ["comment"]: "" });
        commentOpen(event, param);


      }
    } catch (error) {
      console.log(error);
    }
  };

  // for add like 
  const likeClick = async (event, param) => {
    event.preventDefault();
    console.log(param);
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
    const fd = new FormData();
    fd.append("likeUser", localStorage.getItem("realusername"));
    fd.append("postId", param);
    const login = await Axios.post("create/addLike", fd, config);
    showdata()
  }
  useEffect(() => {
    showdata()
  }, []);

  // fetch the posts
  const showdata = async () => {
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
      const login = await Axios.post("/create/showpost", fd, config);
      const { data } = login
      console.log(data)
      setImage(data.image);
      setVideo(data.video);
      setUserfullname(data.userfullname);
      setUserprofilepic(data.userprofilepic);
      console.log("check" + image.check);
      console.log("check" + image.postId);
      console.log(data.video);


    }
    catch (error) {
      console.log(error);
    }
  }
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setdata({ ...data, [name]: value });
    console.log(data.comment)
  }
  const replyComment = (event, param, param1) => {
    event.preventDefault();
    setNestedcomopen(true);
    console.log(param + " " + param1);
    setdata({ ...data, ["comment"]: param });
    console.log(data.comment);
    setCommentid(param1);
    console.log(commentid);
    // setCon([param]);
    // console.log(con);
  }
  const followUser = async(event, postid)=>{
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
      fd.append("followerUser", localStorage.getItem("realusername"));
      fd.append("followingUserId", postid);
      const login = await Axios.post("api/followUser", fd, config);
      }  catch (error) {
    console.log(error);
  }
  }
  const unfollowUser = async(event,postid) =>{
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
      fd.append("followerUser", localStorage.getItem("realusername"));
      fd.append("followingUserId", postid);
      const login = await Axios.post("api/unfollow", fd, config);
      }  catch (error) {
    console.log(error);
  }
  }

  return (
    <div className='maindiv'>
       {/* for profile */}
       
       <div  className='profile'>
        <div className='profileh'>
        <div style={{gridArea:'a'}}>
        <Avatar alt="Remy Sharp" src= {userprofilePic} sx={{ height: '70px', width: '70px' }}/>
        </div>
        <div className='name'> <p style={{gridArea:'x'}}>{localStorage.getItem("realusername")}</p> <p style={{gridArea:'y'}}>{userfullname}</p></div>
        <div style={{gridArea:'k',color:'blue',paddingLeft:'3cm'}}><p id="switch">switch</p></div>
       </div><br></br><br></br><br></br>
       <div style={{display:'flex'}}><p>Suggestions for you</p><p style={{marginLeft:'4cm'}}>see all</p></div>
       <br></br>
       <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          gap: '50px'
        }} >
       
        {
          image.map(img => <div className='profileh'>
            <div style={{gridArea:'a'}}>
        <Avatar alt="Remy Sharp" src={img.dpurl} sx={{ height: '35px', width: '35px' }}/>
        </div>
        <div className='name1'> <p style={{gridArea:'x'}}>{img.user}</p> <p style={{gridArea:'y'}}>{img.user}</p></div>
        <div style={{gridArea:'k',color:'blue',paddingLeft:'3cm'}}><p id="switch" style={{fontSize:'small'}}>Follow</p></div>
        </div>
            )
        }
       {/* <div className='profileh'>
        <div style={{gridArea:'a'}}>
        <Avatar alt="Remy Sharp" src= {userprofilePic} sx={{ height: '50px', width: '50px' }}/>
        </div>
        <div className='name1'> <p style={{gridArea:'x'}}>{localStorage.getItem("realusername")}</p> <p style={{gridArea:'y'}}>{userfullname}</p></div>
        <div style={{gridArea:'k',color:'blue',paddingLeft:'3cm'}}><p id="switch" style={{fontSize:'small'}}>Follow</p></div>
       </div> */}
       </div>
      </div>
      <div className='firstDiv'>
    <div style={{ marginLeft: '6cm', bgcolor: '	#FFC0CB' }}>
      <div></div><br /><br />
      <div id='story'>

      </div>
   
      <div id='div1'>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          gap: '20px'
        }} >
          {
            //for showing posts imge 
            image.map(img => <div id="div3" >
              <form>
                <div className='di2'>
                  <div style={{ width:'30%',float:'left',display:'inline-flex'}}>
                  <span> <Avatar alt="Remy Sharp" src={img.dpurl} /></span>
                  <span className="d1">{img.user}</span >
                  {img.checkFollow ? 
                  (<span></span> )
                   :
                  (<span className="d1" onClick={event =>followUser(event, img.userId)} style={{color:'blue',cursor: 'pointer'}} >Follow</span>)
                }
                </div>
                <div style={{ width:'8%',float:'right'}}>
                <MoreHorizIcon onClick={followUserOpen} style={{ marginTop: '0.2cm' }} ></MoreHorizIcon>
                </div>
                {/* {img.checkFollow ? 
                 ( <MoreHorizIcon style={{ marginLeft: '9cm', marginTop: '0.2cm' }} onClick={followUserOpen}  ></MoreHorizIcon>)
                 :
                 (<MoreHorizIcon style={{ marginLeft: '8cm', marginTop: '0.2cm' }} onClick={followUserOpen}  ></MoreHorizIcon>)
                } */}
                </div>
                <img src={img.fileurl} width="491" height="600" id="img" style={{marginTop:'0.2cm' }}/><br />
                {img.checkLike ?
                  (<FavoriteBorderOutlinedIcon onClick={event => likeClick(event, img.postid)}
                    className="like" id={img.postId} style={{ color: 'red', height: '1cm', width: '1cm' }}
                  />) :
                  (<FavoriteBorderOutlinedIcon onClick={event => likeClick(event, img.postid)}
                    className="like" id={img.postId}
                  />)
                }
                <CommentTwoToneIcon id="comment" onClick={event => commentOpen(event, img.postid)}></CommentTwoToneIcon>
                <ShareTwoToneIcon id="share" />
                <p style={{ marginLeft: '0.4cm', marginTop: '0.1cm' }} onClick={event => likeuserOpen(event, img.postid)}>{img.like} likes</p>
                <p style={{ marginLeft: '0.4cm', marginTop: '0.1cm' }}>{img.caption}</p>
                <p style={{ marginLeft: '0.4cm', marginTop: '0.1cm' }}>view All Comments</p>
              </form><br /><br />
              {/* comment dialouge box */}
              <Dialog
                PaperProps={{
                  sx: {
                    width: '12cm',
                    height: '18cm',
                  }
                }}
                BackdropProps={{
                  invisible: true ,
                }}
                open={commentopen} onClose={commentClose}>
                <div id='comdiv1'>
                  <div className='di2'>
                  <div style={{ width:'30%',float:'left',display:'inline-flex'}}>
                  <span> <Avatar alt="Remy Sharp" src={img.dpurl} /></span>
                  <span className="d1">{img.user}</span >
                  {img.checkFollow ? 
                  (<span></span> )
                   :
                  (<span className="d1" onClick={event =>followUser(event, img.userId)} style={{color:'blue',cursor: 'pointer'}} >Follow</span>)
                }
                </div>
                <div style={{ width:'8%',float:'right'}}>
                <CloseIcon onClick={commentClose}  style={{ marginTop: '-0.5cm',marginLeft:'0.3cm' }} ></CloseIcon>
                <MoreHorizIcon onClick={followUserOpen} style={{  }} ></MoreHorizIcon>
                </div>
                  </div>
                </div>

                {/* <Divider /> */}
                <DialogContent id='comdiv2'>
                  {comment.map(com => <div>
                    <span> <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" id="logo1" /></span>
                    <span style={{ marginLeft: '0.2cm' }}>{com.commentedUser}</span>
                    <span style={{ marginLeft: '0.4cm' }}>{com.comment}</span><br></br>
                    <Button onClick={event => replyComment(event, com.commentedUser, com.commentId)}>reply</Button>
                    <br /><br />
                  </div>)}
                </DialogContent>
                <div id='comdiv3'>
                  {img.checkLike ?
                    (<FavoriteBorderOutlinedIcon onClick={event => likeClick(event, img.postid)}
                      className="like" id={img.postId} style={{ color: 'red', height: '1cm', width: '1cm' }}
                    />) :
                    (<FavoriteBorderOutlinedIcon onClick={event => likeClick(event, img.postid)}
                      className="like" id={img.postId}
                    />)
                  }
                  <CommentTwoToneIcon id="comment" onClick={event => commentOpen(event, img.postid)}></CommentTwoToneIcon>
                  <ShareTwoToneIcon id="share" />
                  <p style={{ marginLeft: '0.3cm', marginTop: '-0.2cm' }}>{img.like} Likes</p>
                </div>

                {nestedcomopen ?
                  // nestedcomment
                  <DialogActions >
                    <TextField
                      id='input'
                      autoComplete="off"
                      fullWidth
                      size="small"
                      name="comment"
                      label="Add a comment"
                      value={data.comment}
                      onChange={handleChange}
                      required
                    />
                    <Button onClick={event => nestedcommentClick(event, img.postid)}>Nes
                      Post</Button>
                  </DialogActions> :

                  <DialogActions >
                    <TextField
                      id='input'
                      autoComplete="off"
                      fullWidth
                      size="small"
                      name="comment"
                      label="Add a comment"
                      value={data.comment}
                      onChange={handleChange}
                      required
                    />
                    <Button onClick={event => commentClick(event, img.postid)}>Post</Button>
                  </DialogActions>}

              </Dialog>
              {/* likeusers dialouge  start */}
              <Dialog
                PaperProps={{
                  sx: {
                    width: '12cm',
                    height: '12cm',
                    borderRadius: '8px'
                  }
                }}
                BackdropProps={{
                  invisible: true ,
                }}
                open={likeuseropen} onClose={likeuserClose}>
                <div id='comdiv1' style={{ backgroundColor: 'white', height: '1.5cm' }}>
                  <div >
                    <span style={{ marginLeft: '5cm', fontSize: '0.6cm', marginTop: '0.2cm' }}>likes</span>
                    <CloseIcon onClick={likeuserClose} style={{ marginLeft: '5cm', marginTop: '0.15cm' }} ></CloseIcon>
                  </div>
                </div>
                <DialogContent id='comdiv2'>
                  {likeusers.map(luser => <div className='di2'>
                    <span> <Avatar alt="Remy Sharp" src={luser.likeuserProfile} id="logo1" /></span>
                    <span style={{marginLeft:'0.4cm',marginTop:'0.2cm'}}>{luser.likeUser}</span>
                    {luser.checkFollower ?
                     (<Button id='btn3'>Following</Button>)
                     :
                     (<Button id='btn3'>Follow</Button>)
                  }
                    <br /><br />
                  </div>)}
                </DialogContent>
              </Dialog>
                {/* likeusers dialouge  end  */}

              {/* Dialouge box to follower user */}
              <Dialog
                PaperProps={{
                  sx: {
                    width: '12cm',
                    height: '6.88cm',
                    borderRadius: '10px',
                  }
                }}
                BackdropProps={{
                  invisible: true ,
                }}
                open={followuser} onClose={followUserClose}>
                 <div>
                <div style={{ borderBottom: '1px solid black', height:'0.95cm',textAlign:'center',cursor:'pointer' }}>
                  <p style={{color:'red'}}>Report</p>
                </div>
                {img.checkFollow ?
                (<div style={{ borderBottom: '1px solid black' ,height:'0.95cm',textAlign:'center',cursor:'pointer'}}>
                <p style={{color:'red'}} onClick={event => unfollowUser(event,img.userId)}>Unfollow</p>
                </div>) :
                (<div style={{ borderBottom: '1px solid black' ,height:'0.95cm',textAlign:'center',cursor:'pointer'}}>
                <p style={{color:'red'}} onClick={event =>followUser(event, img.userId)}  >Follow</p>
                </div>)
              }
          
                <div style={{ borderBottom: '1px solid black' ,height:'0.95cm',textAlign:'center',cursor:'pointer' }}>
                <p>Go to post</p>
                </div>
                <div style={{ borderBottom: '1px solid black' ,height:'0.95cm',textAlign:'center',cursor:'pointer'}}>
                <p>Add to favorite</p>
                </div>
                <div style={{ borderBottom: '1px solid black',height:'0.95cm',textAlign:'center',cursor:'pointer' }}>
                <p onClick={followUserClose}>Cancel</p>
                </div>
                </div>
              </Dialog>
              {/* Dialouge box close  follower user */}
            </div>)
          }
        </div><br />
        <div >
          {
            video.map(vid => <div id="div2">
              <form>
                <div className='di2'>
                  <span> <Avatar alt="Remy Sharp" src={vid.fileurl} /></span>
                  <span className="d1">{vid.user}</span>
                  <MoreHorizIcon style={{ marginLeft: '9cm', marginTop: '0.2cm' }}></MoreHorizIcon>
                </div>
                <video src={vid.fileurl} width="491" height="600" controls id='img' /><br />
                {vid.check ?
                  (<FavoriteBorderOutlinedIcon onClick={event => likeClick(event, vid.postid)}
                    className="like" id={vid.postId} style={{ color: 'red', height: '1cm', width: '1cm' }}
                  />) :
                  (<FavoriteBorderOutlinedIcon onClick={event => likeClick(event, vid.postid)}
                    className="like" id={vid.postId}
                  />)
                }
                <CommentTwoToneIcon id="comment" onClick={event => commentOpen(event, vid.postid)}></CommentTwoToneIcon>
                <ShareTwoToneIcon id="share" />
                <p style={{ marginLeft: '0.4cm', marginTop: '0.1cm' }}>{vid.like} likes</p>
                <p style={{ marginLeft: '0.4cm', marginTop: '0.1cm' }}>{vid.caption}</p>
                <p style={{ marginLeft: '0.4cm', marginTop: '0.1cm' }}>view All Comments</p>
              </form><br /><br />
            </div>)
          }
        </div>
      </div>
    </div>
    </div>
    </div>

  );
}