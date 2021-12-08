import StarRatings from 'react-star-ratings';

import React, { useState, useEffect } from "react";

// for getting data from REDUX store
import { useStateValue } from '../../Store/StateProvider';

// for accessing params, if any, from react route
import { useParams } from 'react-router-dom';

// @material-ui/core components
import Slider from '@material-ui/core/Slider';
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";

import GridContainer from "../Grid/GridContainer/GridContainer";
import GridItem from "../Grid/GridItem/GridItem";
import NavPills from "../NavPills/NavPills";
import Parallax from "../Parallax/Parallax";
import CustomButton from '../utilities/customs/CustomButton/CustomButton';
import CustomDropdown from "../utilities/customs/CustomDropdown/CustomDropdown";
import CustomModal from '../utilities/customs/CustomModal/CustomModal';
import Loader from '../utilities/Loader';
import Badge from "../Badge/Badge";

// config.js has base URL for hitting APIs
import configuration from '../../config.js';

// SCSS for styling
import "./UserProfile.scss"


export default function ProfilePage(props) {
  const [{ userCredentials }, dispatch] = useStateValue();
  const params = useParams();
  const [loading, setloading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [experience, setExperience] = useState('');
  const [daysOfWorking, setDaysOfWorking] = useState([]);
  const [hourlyWage, setHourlyWage] = useState('');
  const [location, setLocation] = useState('');
  const [allLocations, setAllLocations] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [tagLine, setTagLine] = useState('');
  const [introductoryStatement, setIntroductoryStatement] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [userDomains, setUserDomains] = useState([]);
  const [skillset, setSkillSet] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allDomains, setAllDomains] = useState([]);
  const [allDomainsWithSkills, setAllDomainsWithSkills] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState('');
  const [selectedSkills, setSelectedSkills] = useState('');
  const [temporaryDomainSkills, setTemporaryDomainSkills] = useState([]);
  const [displayModal, setDisplayModal] = useState("hide");
  const [viewSelfProfile, setViewSelfProfile] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const years = ['< 1 year', ' 1-2 years', '3-4 years', '> 5 years']


  const containerFluid = {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  };
  const mainContainer = {
    container : {
      ...containerFluid,
      "@media (min-width: 576px)": {
        maxWidth: "540px",
      },
      "@media (min-width: 768px)": {
        maxWidth: "720px",
      },
      "@media (min-width: 992px)": {
        maxWidth: "960px",
      },
      "@media (min-width: 1200px)": {
        maxWidth: "1140px",
      }
    }
  }

  const useStyles = makeStyles(mainContainer);
  const classes = useStyles();

  /** 
* description of the getGeneralUserInfo function.
* @summary fetches the user's information and sets the component state with corresponding attributes received in the data response.
* @param {String} userId - user id of the loggedin user if user lands on view self profile page, 
    otherwise user id of helper whose profile the loggedin user would like to see
*/  
  const getGeneralUserInfo = (userId) => {
    if(userCredentials.loggedIn) {
    fetch(`${configuration.URL}/users/${userId}`)
      .then((response) => {
        return response.json()})
      .then((jsonResponse) => {
        let data = jsonResponse.data;

        // state is set only if it's corresponding attribute is received in the response from server
        if(data.hasOwnProperty('firstName') && data.firstName != "") {
          setFirstName(data.firstName);
        }
        if(data.hasOwnProperty('lastName') && data.lastName != "") {
          setLastName(data.lastName);
        }
        if(data.hasOwnProperty('experience') && data.experience != "") {
          setExperience(data.experience);
        }
        if(data.hasOwnProperty('days') && data.days != []) {
          setDaysOfWorking(data.days);
        }
        if(data.hasOwnProperty('wage') && data.wage != "") {
          setHourlyWage(data.wage);
        }
        if(data.hasOwnProperty('location') && data.location != "") {
          setLocation(data.location);
        }
        if(data.hasOwnProperty('profileImage') && data.profileImage != "") {
          setProfileImage(data.profileImage);
        }
        if(data.hasOwnProperty('tagLine') && data.tagLine != "") {
          setTagLine(data.tagLine);
        }
        if(data.hasOwnProperty('introductoryStatement') && data.introductoryStatement != "") {
          setIntroductoryStatement(data.introductoryStatement);
        }
        if(data.hasOwnProperty('skillset') && data.skillset != []) {
          setSkillSet(data.skillset);
        }
        if(data.hasOwnProperty('domains') && data.domains != []) {
          setUserDomains(data.domains);
        }
      })
    }
  }

  /** 
* description of the getProfileImageOfUser function.
* @summary fetches the user's profile image by hitting /upload API with GET method and sets the corresponding component state.
* @param {String} userId - user id of the loggedin user if user lands on view self profile page, 
    otherwise user id of helper whose profile the loggedin user would like to see
*/
  const getProfileImageOfUser = (userId) => {
    if(userCredentials.loggedIn) {
    fetch(`${configuration.URL}/upload/${userId}`, {
        method: 'GET',
    }).then((response) => {
        if(response.status === 200) {
            response.blob().then(blobResponse => {
                let data = URL.createObjectURL(blobResponse);
                console.log(data);
                setProfileImage(data);
                setloading(false);
            })
        } else {
            setProfileImage(null);
            setloading(false);
        }
    })
    }
  }

  /** 
* description of the getReviewsOfUser function.
* @summary fetches the helper's reviews and average rating by hitting /helperreviews API with GET method and sets the corresponding component state.
* @param {String} userId - user id of the loggedin user if user lands on view self profile page, 
    otherwise user id of helper whose profile the loggedin user would like to see
*/
  const getReviewsOfUser = (userId) => {
    fetch(`${configuration.URL}/helperreviews/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
      })
  }

  /** 
* description of the getAllDomainsAndSkills function.
* @summary fetches all the domains and skills available in the database by hitting /domains API with GET method 
    in order to populate the drop down in user profile where the user can add, update and delete his skills/domains
*/
  const getAllDomainsAndSkills = () => {
    let allSkillsArray = [];
    let allDomainsWithSkillsArray = [];
    fetch(`${configuration.URL}/domains`)
      .then((response) => response.json())
      .then((domains) => {

        // domains have domain name along with a list of skills part of the domain
        /** example of response: {
              "name": "Programming & Tech",
              "imagePath": "https://i.ytimg.com/vi/kX0tq3qsY_U/maxresdefault.jpg",
              "skills": [
                  {"skillName": "Wordpress", "imagePath": "https://www.inmotionhosting.com/support/wp-content/uploads/2019/06/WordPress-logotype-alternative.png?w=640"}, 
                  {"skillName": "Web Programming", "imagePath": "http://www.tekshapers.com/uploads/blog_image/15362384091533896513blog-sco2.jpg"}, 
                  {"skillName": "Mobile Apps", "imagePath": "http://www.smartinsights.com/wp-content/uploads/2014/07/Screen-Shot-2014-07-07-at-16.27.15-550x395.png"}
                  ]
              } */
        domains.map((domain) => {
          allDomainsWithSkillsArray.push(domain);
          domain.skills.map((skillItem) => {
            allSkillsArray.push(skillItem.skillName);
          })
        })
        return [allDomainsWithSkillsArray, allSkillsArray];
      })
      .then((data) => {
        let allDomainsArray = []
        const [allDomainsWithSkillsArray, allSkillsArray] = data;
        setAllDomainsWithSkills(allDomainsWithSkillsArray);
        setAllSkills(allSkillsArray);
        allDomainsWithSkillsArray.map((domainItem) => {
          allDomainsArray.push(domainItem.name);
        })
        setAllDomains(allDomainsArray);
      })
  }

  // fetches all the available locations from backend database in order to populate dropdown in user profile 
  // from where user can select his location
  const getAllLocations = () => {
    fetch(`${configuration.URL}/locations`, {
        method: 'GET'
    }).then((response) => response.json())
        .then((data) => {
            console.log("LOCATIONS -- ", data);
            setAllLocations(data.data[0].places);
        }).catch((err) => {
            console.log(err);
        })
  }

  // gets called when user selects a domain from dropdown and populates the list of skills dropdown with the list of 
  // skills in the selected domain
  const handleDomainChange = (e) => {
    let temporary = [];
    allDomainsWithSkills.map((item, index) => {
        if (e.target.value.includes(item.name)) {

            item.skills.map((itemSkill, index) => {
                temporary.push(itemSkill.skillName);
            })
        }
    })

    setSelectedDomains(e.target.value);
    setTemporaryDomainSkills(temporary);
  }

  const handleSkillChange = (e) => {
    setSelectedSkills(e.target.value);
  } 

  /** 
* description of the updateUser function.
* @summary updates the user information at backend database with formData by hitting /users/:userId with PUT method
* @param {Object} formData - updated user information which the user updated on profile page and now needs to be sent 
    to backend for updating database
*/
  const updateUser = (formData) => {
    fetch(`${configuration.URL}/users/${userCredentials.userDetails.id}`, {
      method: 'PUT',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
  }).then((response) => response.json())
      .then((data) => {
          console.log(data);

          // once the update is done and success response is recieved, user info is fetched again 
          // in order to show the updated data at frontend (user profile)
          getGeneralUserInfo();
      }).catch((err) => {
          console.log(err);
      })
  }

  // gets called when user selects domain and skill and presses update button
  const saveDomainsAndSkills = () => {

    // update will happen only if user has selected both, domain and a corresponding skill within that domain
    if(selectedDomains != '' && selectedSkills != '') {
      let formData = {
        skillset: [...new Set([...skillset,selectedSkills])],
        domains: [...new Set([...userDomains,selectedDomains])],
      }
      updateUser(formData);
      setSelectedDomains('');
      setSelectedSkills('');
    }
  }

  /** 
* description of the deleteUserDomain function. 
* @summary gets called when user presses cross icon in the domain, removes that particular domain
    and skills within that domain from user's skill and domain array
* @param {String} domainName - selected domain which gets removed from user's domain array, 
    which is then sent to backend for updating same in the database
*/
  const deleteUserDomain = (domainName) => {
    let skillsArrayOfUserDomain = [];
    allDomainsWithSkills.map((item) => {
      if(item.name === domainName) {
        skillsArrayOfUserDomain = item.skills;
      }
    })
    let skillNamesUnderUserDomain = [];
    skillsArrayOfUserDomain.map((skillItem) => {
      skillNamesUnderUserDomain.push(skillItem.skillName);
    })
    let updatedUserDomainsArray = userDomains.filter((item) => {
      return item != domainName;
    })
    let updatedUserSkillsArray = skillset.filter((item) => {
      return !skillNamesUnderUserDomain.includes(item);
    })
    let formData = {
      skillset: updatedUserSkillsArray,
      domains: updatedUserDomainsArray
    }
    updateUser(formData);
  }

  /** 
* description of the deleteUserSkill function. 
* @summary gets called when user presses cross icon in the skill, removes that particular skill user's skills array
* @param {String} domainName - selected skill which gets removed from user's skills array, 
    which is then sent to backend for updating same in the database
*/
  const deleteUserSkill = (skillName) => {
    let updatedUserSkillsArray = skillset.filter((item) => {
      return item != skillName;
    }) 
    let formData = {
      skillset: updatedUserSkillsArray
    }
    updateUser(formData);
  }

  // gets called when user presses submit button in the update modal. 
  // It further calls updateUser with formData in order to update the changed information at the database.
  // Once update is done at backend database, modal component goes off
  const submitUserInfo = () => {
    let formData = {
        tagLine: tagLine,
        introductoryStatement: introductoryStatement,
        experience: experience,
        days: daysOfWorking,
        location: location
    }
    updateUser(formData);
    setDisplayModal("hide");
  }

  // used to control the display of update info Modal form
  const changeDisplayStyle = (str) => {
    if(str == "view") {
      setDisplayModal("display");
    }
    else if(str == "close"){
      getGeneralUserInfo();
      setDisplayModal("hide");
    }
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }

  const handleDaysChange = (e) => {
    setDaysOfWorking(e.target.value);
  }

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  }

  const handleTagLineChange = (e) => {
    setTagLine(e.target.value);
  }

  const handleIntroductoryStatementChange = (e) => {
    setIntroductoryStatement(e.target.value);
  }

  const handleWageChange = (value) => {
    setHourlyWage(value);
  }

  useEffect(() => {
    let userId = '';
    if(params.hasOwnProperty("helperId")) {
      userId = params.helperId;
    }
    else {
      userId = userCredentials.userDetails.id;
      setViewSelfProfile(true);
    }
    getGeneralUserInfo(userId);
    getProfileImageOfUser(userId);
    getReviewsOfUser(userId);
    getAllDomainsAndSkills();
    getAllLocations();

  }, [userCredentials])

  if(userCredentials.loggedIn) {

    if(!loading) {
        return (
          <div>
            <Parallax
              small
              filter
              image={require("./bg.jpg").default}
            />
            <div className="main mainRaised">
              <div>
                <div className={classes.container}>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                      <div className="profile">
                        <div>
                          <img src={profileImage} alt="..." className="profileImage" />
                        </div>
                        <div className="name">
                          <h3 className="title">{firstName} {lastName}</h3>
                          <h6>{tagLine}</h6>
                          <dl>
                            {
                              <div className="m-top10">
                                {
                                  experience != '' ? (
                                    <diV>
                                      <dt>Experience</dt>
                                      <dd>{experience}</dd>
                                    </diV>
                                  ) : ''
                                }
                                {
                                  hourlyWage != '' ? (
                                    <diV>
                                      <dt>Hourly Wage</dt>
                                      <dd>{`$${hourlyWage}`}</dd>
                                    </diV>
                                  ) : ''
                                }
                                {
                                  daysOfWorking != [] ? (
                                    <diV>
                                      <dt>Days of Working</dt>
                                      <dd>{daysOfWorking.toString()}</dd>
                                    </diV>
                                  ) : ''
                                }
                                {
                                  location != [] ? (
                                    <diV>
                                      <dt>Location</dt>
                                      <dd>{location}</dd>
                                    </diV>
                                  ) : ''
                                }
                              </div>
                            }
                          </dl>
                          {/* <Button justIcon link className={classes.margin5}>
                            Edit
                          </Button> */}
                        </div>
                      </div>
                    </GridItem>
                    <GridItem>
                      <div className="profile">
                        {averageRating !== '' ? 
                        <div>
                        <StarRatings
                        className="m-top0"
                        starDimension={20}
                        starSpacing={5}
                        rating={averageRating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name='rating'
                        />
                        <span>{`(${reviews.length})`}</span>
                        </div>
                        : 
                        ''}
                      </div>
                    </GridItem>
                    <br></br>
                    <br></br>
                  </GridContainer>
                  
                  <div className="description">
                    <p>
                      {introductoryStatement}
                    </p>
                  </div>
                  <div className="description">
                    {
                      viewSelfProfile ? 
                      <CustomButton 
                      variant="lightOpaqueButton roundedButton m-bottom20 btnHover" 
                      text="UPDATE" 
                      clickFn={() => changeDisplayStyle("view")}/>
                      :
                      ''
                    }
                  </div>
                  <CustomModal displayStyle={displayModal} heading="UPDATE PROFILE" changeDisplayStyle={changeDisplayStyle}>
                  <div className="w-500">
                          {/* <form> */}
                              <label for="username">Username: </label>
                              <input className="m-bottom20" type="text" id="username" name="username" defaultValue={userCredentials.username} readOnly></input><br></br>
                              <label for="tagline">Tag Line: </label>
                              <input className="m-bottom20" type="text" id="tagline" name="tagline" placeholder="Enter your Tag line" defaultValue={tagLine} onChange={handleTagLineChange}></input><br></br>
                              <label for="desc">Description: </label>
                              <textarea className="m-bottom20" type="text" id="desc" name="desc" placeholder="Something about yourself" cols="50" rows="4" defaultValue={introductoryStatement} onChange={handleIntroductoryStatementChange}></textarea><br></br>
                              <CustomDropdown datalist={allLocations} title="Choose location"
                                      selectedItem={location} multiple={false} handleChange={handleLocationChange} /> <br/>
                              <CustomDropdown datalist={years} title="Choose Years of Experience"
                                      selectedItem={experience} multiple={false} handleChange={handleExperienceChange} /> <br/>
                              <CustomDropdown datalist={days} title="Choose Days of Working"
                                      selectedItem={daysOfWorking} multiple={true} handleChange={handleDaysChange} /> <br/>
                              <label>Wage per hour: </label>
                              <Slider
                                      className={classes.root}
                                      defaultValue={hourlyWage}
                                      getAriaValueText={handleWageChange}
                                      aria-labelledby="discrete-slider"
                                      valueLabelDisplay="auto"
                                      step={5}
                                      min={10}
                                      max={90}
                                      marks
                              />
                              <button name="submit" onClick={submitUserInfo} className="p-10 btnHover">Submit</button>
                          {/* </form> */}
                      </div>
                  </CustomModal>
                  <GridContainer justify="center" className="m-left20 m-top20">
                    <GridItem xs={12} sm={12} md={8} className="navWrapper">
                      <NavPills
                        alignCenter
                        color="primary"
                        tabs={[
                          {
                            tabButton: "Skills",
                            tabIcon: Camera,
                            tabContent: (
                              <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={10}>
                                  <h4>DOMAINS</h4>
                                  {
                                    userDomains.map((domainName) => {
                                      return <Badge><a onClick={() => deleteUserDomain(domainName)}><span className="close">&times;</span></a>{domainName}</Badge>
                                    })
                                  }
                                  <h4 className="m-top40">SKILLS</h4>
                                  {
                                    skillset.map((skillName) => {
                                      return <Badge><a onClick={() => deleteUserSkill(skillName)}><span className="close">&times;</span></a>{skillName}</Badge>
                                    })
                                  }
                                  {
                                    viewSelfProfile ?
                                    <div>
                                      <CustomDropdown title={"Add Domains"}
                                          selectedItem={selectedDomains} datalist={allDomains} handleChange={handleDomainChange}/>
                                      <CustomDropdown title={"Add Skills"}
                                          datalist={temporaryDomainSkills} handleChange={handleSkillChange}/>
                                    </div>
                                    : ''
                                  }
                                </GridItem>
                                <GridItem xs={12} sm={12} md={10}>
                                  {
                                    viewSelfProfile ?
                                    <CustomButton 
                                    text="ADD SKILLS" 
                                    variant="lightOpaqueButton roundedButton m-bottom20 btnHover" 
                                    clickFn={saveDomainsAndSkills}/>
                                    : ''
                                  }
                                </GridItem>
                              </GridContainer>
                            ),
                          },
                          {
                            tabButton: "Reviews",
                            tabIcon: Palette,
                            tabContent: (
                              <GridContainer justify="center">
                                {
                                  reviews.length != 0
                                  ?
                                  reviews.map((reviewItem) => {
                                    return reviewItem.hasOwnProperty("review")
                                    ?
                                      <GridItem xs={12} sm={12} md={10}>
                                        <div className="reviewDescription">
                                        <img
                                          alt="Reviewer"
                                          src={require('./bg.jpg')}
                                          className="imageIcon"
                                        />
                                        </div>
                                        <div className="reviewDescription">
                                          <p className="m-bottom0"><span>{reviewItem.seekerFirstName} {reviewItem.seekerLastName}</span></p>
                                          <StarRatings
                                          className="m-top0"
                                          starDimension={15}
                                          starSpacing={0}
                                          rating={reviewItem.rating}
                                          starRatedColor="gold"
                                          numberOfStars={5}
                                          name='rating'
                                          />
                                          <p className="m-bottom0">{reviewItem.review}</p>
                                        </div>
                                      </GridItem>
                                      :
                                      ''
                                  })
                                  :
                                  <p>NO REVIEWS</p>
                                }
                              </GridContainer>
                            ),
                          },
                        ]}
                      />
                    </GridItem>
                  </GridContainer>
                </div>
              </div>
            </div>
          </div>
        );
    }
    else {
        return (<Loader />)
    }
  }
  else {
    return (<div className="seek-details-container">
            {/* //displaying when we have no users */}
            <h1>Oops......You got logged out!!!</h1>
        </div>)
  }
}

