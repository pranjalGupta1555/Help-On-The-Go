import StarRatings from 'react-star-ratings';

import React, { useState, useEffect } from "react";
import { useStateValue } from '../../Store/StateProvider';

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
import Badge from "../Badge/Badge";

import configuration from '../../config.js';
import "./UserProfile.scss"


export default function ProfilePage(props) {
  const [{ userCredentials }, dispatch] = useStateValue();
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [experience, setExperience] = useState('');
  const [daysOfWorking, setDaysOfWorking] = useState([]);
  const [hourlyWage, setHourlyWage] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [introductoryStatement, setIntroductoryStatement] = useState('');
  const [averageRating, setAverageRating] = useState('');
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

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const years = ['< 1 year', ' 1-2 years', '3-4 years', '> 5 years']
  const places = ['San Fransico', 'Boston', 'Los Angeles']


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

  const getGeneralUserInfo = () => {
    fetch(`${configuration.URL}/users/${userCredentials.userDetails.id}`)
      .then((response) => {
        return response.json()})
      .then((jsonResponse) => {
        let data = jsonResponse.data;
        console.log("check51 "+JSON.stringify(data));
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

  const getReviewsOfUser = (userId) => {
    fetch(`${configuration.URL}/helperreviews/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
      })
  }

  const getAllDomainsAndSkills = () => {
    let allSkillsArray = [];
    let allDomainsWithSkillsArray = [];
    fetch(`${configuration.URL}/domains`)
      .then((response) => response.json())
      .then((domains) => {
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
          getGeneralUserInfo();
      }).catch((err) => {
          console.log(err);
      })
  }

  const saveDomainsAndSkills = () => {
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

  const deleteUserSkill = (skillName) => {
    let updatedUserSkillsArray = skillset.filter((item) => {
      return item != skillName;
    }) 
    let formData = {
      skillset: updatedUserSkillsArray
    }
    updateUser(formData);
  }

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
      
    getGeneralUserInfo();
    getReviewsOfUser(userCredentials.userDetails.id);
    getAllDomainsAndSkills();

  }, [])

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
                    <img src={require("./bg.jpg")} alt="..." className="profileImage" />
                  </div>
                  <div className="name">
                    <h3 className="title">{firstName} {lastName}</h3>
                    <h6>{tagLine}</h6>
                    <dl>
                      {
                        <div>
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
                  starRatedColor="blue"
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
              <CustomButton variant="lightOpaqueButton roundedButton m-bottom20" text="UPDATE" clickFn={() => changeDisplayStyle("view")}/>
            </div>
            <CustomModal displayStyle={displayModal} heading="UPDATE PROFILE" changeDisplayStyle={changeDisplayStyle}>
            <div className="formDiv">
                    {/* <form> */}
                        <label for="username">Username: </label>
                        <input className="m-bottom20" type="text" id="username" name="username" defaultValue={userCredentials.username} readOnly></input><br></br>
                        <label for="tagline">Tag Line: </label>
                        <input className="m-bottom20" type="text" id="tagline" name="tagline" placeholder="Enter your Tag line" defaultValue={tagLine} onChange={handleTagLineChange}></input><br></br>
                        <label for="desc">Description: </label>
                        <textarea className="m-bottom20" type="text" id="desc" name="desc" placeholder="Something about yourself" cols="50" rows="4" defaultValue={introductoryStatement} onChange={handleIntroductoryStatementChange}></textarea><br></br>
                        <CustomDropdown datalist={places} title="Choose location"
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
                        <button name="submit" onClick={submitUserInfo} class="p-10">Submit</button>
                    {/* </form> */}
                </div>
            </CustomModal>
            <GridContainer justify="center">
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
                            <h6>DOMAINS</h6>
                            {
                              userDomains.map((domainName) => {
                                return <Badge><a onClick={() => deleteUserDomain(domainName)}><span className="close">&times;</span></a>{domainName}</Badge>
                              })
                            }
                            <h6 className="m-top40">SKILLS</h6>
                            {
                              skillset.map((skillName) => {
                                return <Badge><a onClick={() => deleteUserSkill(skillName)}><span className="close">&times;</span></a>{skillName}</Badge>
                              })
                            }
                            <CustomDropdown title={"Add Domains"}
                                 selectedItem={selectedDomains} datalist={allDomains} handleChange={handleDomainChange}/>
                            <CustomDropdown title={"Add Skills"}
                                 datalist={temporaryDomainSkills} handleChange={handleSkillChange}/>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={10}>
                            <CustomButton text="ADD SKILLS" variant="lightButton" clickFn={saveDomainsAndSkills}/>
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
                                    <p className="test">{reviewItem.seekerFirstName} {reviewItem.seekerLastName}</p>
                                    <StarRatings
                                    className="m-top0"
                                    starDimension={15}
                                    starSpacing={0}
                                    rating={reviewItem.rating}
                                    starRatedColor="blue"
                                    numberOfStars={5}
                                    name='rating'
                                    />
                                    <p className="test">{reviewItem.review}</p>
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

