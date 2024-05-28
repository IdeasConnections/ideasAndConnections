import React, { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { countries } from "../../../../../assets/countries";
import defaultProfile from "../../../../../assets/profile.png";
import { useUserAuth } from "../../../../../context/UserContext";
import FileUploadModal from "./FileUploadModal";
import "./ProfileEdit.css";

const ProfileEdit = ({ goBack }) => {
  const { darkMode, user, editProfile, uploadImage } = useUserAuth();
  const [editInputs, setEditInputs] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    headline: user?.headline || "",
    position: user?.position || "",
    educations: user?.educations || [
      {
        // Initialize with existing data or an empty array
        school: "",
        fieldOfStudy: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
        activities: "",
      },
    ],
    country: user?.country || "",
    postalCode: user?.postalCode || "",
    location: user?.location || "",
    companies: user?.companies || [
      {
        // Initialize with existing data or an empty array
        companyName: "",
        designation: "",
        joinDate: "",
        leaveDate: "",
        country: "",
        description: "",
      },
    ],
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    about: user?.about || "",
    skills: user?.skills || [],
  });
  const [currentImage, setCurrentImage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [newSkill, setNewSkill] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const getInput = (event) => {
    const { name, value } = event.target;
    if (name === "skills") {
      setNewSkill(value);
    } else if (name.startsWith("education.")) {
      const [fieldName, subFieldName] = name.split(".");
      setEditInputs((prevState) => ({
        ...prevState,
        education: {
          ...prevState.education,
          [subFieldName]: value,
        },
      }));
    } else {
      setEditInputs({ ...editInputs, [name]: value });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (newSkill.trim() !== "") {
        setEditInputs({
          ...editInputs,
          skills: [...editInputs.skills, newSkill.trim()],
        });
        setNewSkill("");
      }
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...editInputs.skills];
    updatedSkills.splice(index, 1);
    setEditInputs({ ...editInputs, skills: updatedSkills });
  };

  const updateProfileData = () => {
    const fullPhoneNumber = `${countryCode} ${editInputs.phoneNumber}`; // Include the country code
    const updatedInputs = { ...editInputs, phoneNumber: fullPhoneNumber };
    editProfile(user?.uid, updatedInputs);
    toast.success("Profile updated successfully");
    setTimeout(goBack, 1000);
  };

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  const uploadImageTostorage = () => {
    uploadImage(currentImage, user?.uid, setModalOpen, setProgress);
  };

  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEducations = [...editInputs.educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [name]: value,
    };
    setEditInputs({ ...editInputs, educations: updatedEducations });
  };

  // Function to add a new education entry
  const addEducation = () => {
    setEditInputs({
      ...editInputs,
      educations: [
        ...editInputs.educations,
        {
          school: "",
          fieldOfStudy: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
          activities: "",
        },
      ],
    });
  };

  // Function to remove an education entry
  const removeEducation = (index) => {
    const updatedEducations = [...editInputs.educations];
    updatedEducations.splice(index, 1);
    setEditInputs({ ...editInputs, educations: updatedEducations });
  };

  const handleCompanyChange = (event, index) => {
    const { name, value } = event.target;
    const updatedCompanies = [...editInputs.companies];
    updatedCompanies[index] = {
      ...updatedCompanies[index],
      [name]: value,
    };
    setEditInputs({ ...editInputs, companies: updatedCompanies });
  };

  // Function to add a new education entry
  const addCompany = () => {
    setEditInputs({
      ...editInputs,
      companies: [
        ...editInputs.companies,
        {
          companyName: "",
          designation: "",
          joinDate: "",
          leaveDate: "",
          country: "",
          description: "",
        },
      ],
    });
  };

  // Function to remove an education entry
  const removeCompany = (index) => {
    const updatedCompanies = [...editInputs.companies];
    updatedCompanies.splice(index, 1);
    setEditInputs({ ...editInputs, companies: updatedCompanies });
  };

  return (
    <div className='profileEdit-card-container d-flex flex-column justify-content-center align-items-center flex '>
      <FileUploadModal
        progress={progress}
        currentImage={currentImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getImage={getImage}
        uploadImageTostorage={uploadImageTostorage}
      />
      <Card className={`profileEdit ${darkMode ? "dark-mode" : ""} `}>
        <Card.Body>
          <div className='edit-btn'>
            <button onClick={goBack}>Go Back</button>
          </div>
          <Card.Title> Edit Profile</Card.Title>
          <div className='profile-edit-input'>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                className='profile-img'
                src={user?.imageLink || defaultProfile}
                alt='profile image'
              />
              <div
                style={{
                  position: "absolute",
                  top: "200px",
                  left: "200px",
                  transform: "translate(25%, 80%)",
                  zIndex: "1",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <FaPencilAlt
                    className='pencil-icon'
                    style={{
                      color: "black",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                    onClick={() => setModalOpen(true)}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  width: "100%",
                }}
              >
                <label htmlFor='firstName'>First Name *</label>
                <input
                  className='edit-input'
                  type='text'
                  id='firstName'
                  // placeholder="First Name"
                  name='firstName'
                  onChange={getInput}
                  value={editInputs.firstName}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  width: "100%",
                }}
              >
                <label htmlFor='lastName'>Last Name *</label>
                <input
                  className='edit-input'
                  type='text'
                  id='lastName'
                  // placeholder="Last Name"
                  name='lastName'
                  onChange={getInput}
                  value={editInputs.lastName}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                width: "100%",
              }}
            >
              <label htmlFor='headline'>Headline *</label>
              <textarea
                className='textarea-input'
                id='headline'
                name='headline'
                onChange={getInput}
                rows={3}
                value={editInputs.headline}
              />
            </div>
            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  width: "100%",
                }}
              >
                <label htmlFor='email'>Email *</label>
                <input
                  className='edit-input'
                  type='email'
                  id='email'
                  // placeholder="First Name"
                  name='email'
                  onChange={getInput}
                  value={editInputs.email}
                />
              </div>
              <div style={{ display: "flex", gap: "20px", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    width: "100%",
                  }}
                >
                  <label htmlFor='phoneNumber'>Phone Number *</label>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <select
                      className='edit-input'
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{ width: "60px", marginRight: "5px" }}
                    >
                      <option value='' disabled hidden>
                        +91
                      </option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      className='edit-input'
                      type='tel'
                      id='phoneNumber'
                      name='phoneNumber'
                      onChange={getInput}
                      value={editInputs.phoneNumber}
                      style={{ flex: "1" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                width: "100%",
              }}
            >
              <label htmlFor='country'>Country</label>
              <select
                className='edit-input'
                id='country'
                name='country'
                onChange={getInput}
                value={editInputs.country}
              >
                <option value='' disabled hidden>
                  Select country
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  width: "40%",
                }}
              >
                <label htmlFor='postalCode'>Postal Code</label>
                <input
                  className='edit-input'
                  type='text'
                  id='postalCode'
                  // placeholder="First Name"
                  name='postalCode'
                  onChange={getInput}
                  value={editInputs.postalCode}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  width: "100%",
                }}
              >
                <label htmlFor='location'>Location Within that area</label>
                <input
                  className='edit-input'
                  type='text'
                  id='location'
                  // placeholder="Last Name"
                  name='location'
                  onChange={getInput}
                  value={editInputs.location}
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card className={`profileEdit1 ${darkMode ? "dark-mode" : ""} `}>
        <Card.Body>
          <Card.Title>Edit About</Card.Title>
          <div className='profile-edit-input'>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                width: "100%",
              }}
            >
              <label htmlFor='about'>About</label>
              <textarea
                className='textarea-input'
                id='about'
                name='about'
                onChange={getInput}
                rows={3}
                value={editInputs.about}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card className={`profileEdit1 ${darkMode ? "dark-mode" : ""} `}>
        <Card.Body>
          <Card.Title> Edit Education</Card.Title>
          {editInputs.educations.map((education, index) => (
            <Card
              key={index}
              className={`profileEdit1 ${darkMode ? "dark-mode" : ""} `}
            >
              <Card.Body>
                <Card.Title>Edit Education {index + 1}</Card.Title>
                <div className='profile-edit-input'>
                  <label htmlFor={`school${index}`}>School</label>
                  <input
                    className='edit-input'
                    type='text'
                    id={`school${index}`}
                    name={`school`}
                    onChange={(event) => handleEducationChange(event, index)}
                    value={education.school}
                  />
                  <label htmlFor={`fieldOfStudy${index}`}>Field of Study</label>
                  <input
                    className='edit-input'
                    type='text'
                    id={`fieldOfStudy${index}`}
                    name={`fieldOfStudy`}
                    onChange={(event) => handleEducationChange(event, index)}
                    value={education.fieldOfStudy}
                  />
                  <label htmlFor={`degree${index}`}>Degree</label>
                  <input
                    className='edit-input'
                    type='text'
                    id={`degree${index}`}
                    name={`degree`}
                    onChange={(event) => handleEducationChange(event, index)}
                    value={education.degree}
                  />
                  <label htmlFor={`activities${index}`}>
                    Activities & Societies
                  </label>
                  <input
                    className='edit-input'
                    type='text'
                    id={`activities${index}`}
                    name={`activities`}
                    onChange={(event) => handleEducationChange(event, index)}
                    value={education.activities}
                  />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "20px",
                      }}
                    >
                      <label htmlFor={`startDate${index}`}>Start Date</label>
                      <input
                        className='edit-input'
                        type='text'
                        id={`startDate${index}`}
                        name={`startDate`}
                        onChange={(event) =>
                          handleEducationChange(event, index)
                        }
                        value={education.startDate}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor={`endDate${index}`}>End Date</label>
                      <input
                        className='edit-input'
                        type='text'
                        id={`endDate${index}`}
                        name={`endDate`}
                        onChange={(event) =>
                          handleEducationChange(event, index)
                        }
                        value={education.endDate}
                      />
                    </div>
                  </div>
                  <label htmlFor={`description${index}`}>Description</label>
                  <textarea
                    className='textarea-input'
                    type='text'
                    id={`description${index}`}
                    name={`description`}
                    onChange={(event) => handleEducationChange(event, index)}
                    value={education.description}
                    rows={3}
                  />
                  <button onClick={() => removeEducation(index)}>Remove</button>
                </div>
              </Card.Body>
            </Card>
          ))}
          <Button
            onClick={addEducation}
            style={{
              backgroundColor: "white",
              color: "black",
              marginTop: "5px",
            }}
          >
            Add Education
          </Button>
        </Card.Body>
      </Card>
      <Card className={`profileEdit1 ${darkMode ? "dark-mode" : ""} `}>
        <Card.Body>
          <Card.Title>Edit Experiance</Card.Title>
          {editInputs.companies.map((company, index) => (
            <Card
              key={index}
              className={`profileEdit1 ${darkMode ? "dark-mode" : ""} `}
            >
              <Card.Body>
                <Card.Title>Edit Experiance {index + 1}</Card.Title>
                <div className='profile-edit-input'>
                  <label htmlFor={`companyName${index}`}>Company Name</label>
                  <input
                    className='edit-input'
                    type='text'
                    id={`companyName${index}`}
                    name={`companyName`}
                    onChange={(event) => handleCompanyChange(event, index)}
                    value={company.companyName}
                  />
                  <label htmlFor={`designation${index}`}>Designation</label>
                  <input
                    className='edit-input'
                    type='text'
                    id={`designation${index}`}
                    name={`designation`}
                    onChange={(event) => handleCompanyChange(event, index)}
                    value={company.designation}
                  />

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "20px",
                      }}
                    >
                      <label htmlFor={`joinDate${index}`}>Join Date</label>
                      <input
                        className='edit-input'
                        type='text'
                        id={`joinDate${index}`}
                        name={`joinDate`}
                        onChange={(event) => handleCompanyChange(event, index)}
                        value={company.joinDate}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor={`leaveDate${index}`}>End Date</label>
                      <input
                        className='edit-input'
                        type='text'
                        id={`leaveDate${index}`}
                        name={`leaveDate`}
                        onChange={(event) => handleCompanyChange(event, index)}
                        value={company.leaveDate}
                      />
                    </div>
                  </div>
                  <label htmlFor={`country${index}`}>Country</label>
                  <input
                    className='edit-input'
                    type='text'
                    id={`country${index}`}
                    name={`country`}
                    onChange={(event) => handleCompanyChange(event, index)}
                    value={company.country}
                  />

                  <label htmlFor={`description${index}`}>Description</label>
                  <textarea
                    className='textarea-input'
                    type='text'
                    id={`description${index}`}
                    name={`description`}
                    onChange={(event) => handleCompanyChange(event, index)}
                    value={company.description}
                    rows={3}
                  />
                  <button onClick={() => removeCompany(index)}>Remove</button>
                </div>
              </Card.Body>
            </Card>
          ))}
          <Button
            onClick={addCompany}
            style={{
              backgroundColor: "white",
              color: "black",
              marginTop: "5px",
            }}
          >
            Add Company
          </Button>
        </Card.Body>
      </Card>
      <Card className={`profileEdit1 ${darkMode ? "dark-mode" : ""} `}>
        <Card.Body>
          <Card.Title>Edit Skills</Card.Title>
          <div className='profile-edit-input'>
            <div>
              <label htmlFor='skills'>Skills</label>
              <div>
                {editInputs.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    pill
                    variant='primary'
                    className='mr-1 mb-2'
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <div style={{ display: "flex" }}>
                      {skill}
                      <FaTimes
                        className='ml-1'
                        onClick={() => handleRemoveSkill(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </Badge>
                ))}
              </div>
              <input
                className='edit-input'
                type='text'
                id='skills'
                name='skills'
                onChange={getInput}
                onKeyDown={handleKeyDown}
                value={newSkill}
                placeholder='Enter new skill and press Enter'
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />

      <Button
        variant='primary'
        style={{
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
          marginTop: "10px",
          display: "flex", // Add display: flex
          justifyContent: "center", // Add justifyContent: center
          alignItems: "center", // Add alignItems: center
        }}
        type='Submit'
        onClick={updateProfileData}
        className='sticky-save-button'
      >
        Save
      </Button>
    </div>
  );
};
export default ProfileEdit;
