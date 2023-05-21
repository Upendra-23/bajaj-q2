import React, { useState, useEffect } from "react";
export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterSkills, setFilterSkills] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json"
    )
      .then((response) => response.json())
      .then((data) => setEmployees(data.employees))
      .catch((error) => console.log("Error fetching JSON data:", error));
  });

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const skill = e.target.value;
    if (e.target.checked) {
      setFilterSkills((prevSkills) => [...prevSkills, skill]);
    } else {
      setFilterSkills((prevSkills) =>
        prevSkills.filter((prevSkill) => prevSkill !== skill)
      );
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const { name, skills } = employee;
    const lowerCaseName = name?.toLowerCase();
    const lowerCaseSkills = skills.map((skill) => skill?.toLowerCase());

    const isNameMatch =
      lowerCaseName?.includes(searchValue) || searchValue === "";
    const isSkillsMatch =
      filterSkills.length === 0 ||
      filterSkills.every((skill) => lowerCaseSkills?.includes(skill));

    return isNameMatch && isSkillsMatch;
  });
  return (
    <div>
      <h1>Employee Details</h1>
      <div className="search-container">
        <input
          type="text"
          id="search-name"
          placeholder="Search by name..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        <div className="filter-container">
          <label>Filter by skills:</label>
          <div className="checkboxes">
            <label>
              <input
                type="checkbox"
                value="HTML"
                checked={filterSkills.includes("html")}
                onChange={handleCheckboxChange}
              />
              HTML
            </label>
            <label>
              <input
                type="checkbox"
                value="CSS"
                checked={filterSkills.includes("css")}
                onChange={handleCheckboxChange}
              />
              CSS
            </label>
            <label>
              <input
                type="checkbox"
                value="JavaScript"
                checked={filterSkills.includes("javascript")}
                onChange={handleCheckboxChange}
              />
              JavaScript
            </label>
          </div>
        </div>
      </div>
      <div id="developers-container">
        {filteredEmployees.map((developer, index) => (
          <div key={index} className="developer-card">
            <h2>{developer.name || "N/A"}</h2>\+
            <p>Designation: {developer.designation || "N/A"}</p>
            <ul className="skill-list">
              {developer.skills &&
                developer.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
