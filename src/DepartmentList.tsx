import React, { useState } from 'react';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

import departmentData from './data.json'; // Import your JSON data

function DepartmentList() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

  const handleToggle = (department: string) => {
    setExpanded((prevExpanded) => {
      const isDepartmentExpanded = prevExpanded.includes(department);
      return isDepartmentExpanded ? prevExpanded.filter((dep) => dep !== department) : [...prevExpanded, department];
    });
  };

  const handleCheckboxToggle = (item: string) => {
    if (checked.includes(item)) {
      setChecked((prevChecked) => prevChecked.filter((dept) => dept !== item));
    } else {
      setChecked((prevChecked) => [...prevChecked, item]);
    }
  };

  const handleParentCheckboxToggle = (department: string) => {
    const subDepartments = departmentData.find((dept) => dept.department === department)?.sub_departments;
    
    if (subDepartments) {
      const isAllSubDepartmentsChecked = subDepartments.every((subDept) => checked.includes(subDept));
      
      if (isAllSubDepartmentsChecked) {
        setChecked((prevChecked) => prevChecked.filter((dept) => dept !== department && !subDepartments.includes(dept)));
      } else {
        setChecked((prevChecked) => [...prevChecked, department, ...subDepartments]);
      }
    }
  };

  const renderDepartment = (dept: any) => {
    const isDepartmentExpanded = expanded.includes(dept.department);
    const isAllSubDepartmentsChecked = dept.sub_departments.every((subDept: string) => checked.includes(subDept));
    const isIndeterminate = dept.sub_departments.some((subDept: string) => checked.includes(subDept)) && !isAllSubDepartmentsChecked;

    return (
      <div key={dept.department}>
        <ListItem button onClick={() => handleToggle(dept.department)}>
          <ListItemIcon>
            {isDepartmentExpanded ? <ExpandMore /> : <ChevronRight />}
          </ListItemIcon>
          <Checkbox
            edge="start"
            checked={isAllSubDepartmentsChecked}
            indeterminate={isIndeterminate}
            onChange={() => handleParentCheckboxToggle(dept.department)}
          />
          <ListItemText primary={dept.department} />
        </ListItem>
        <Collapse in={isDepartmentExpanded}>
          <List>
            {dept.sub_departments.map((subDept: string) => (
              <ListItem key={subDept}>
                <Checkbox
                  edge="start"
                  checked={checked.includes(subDept)}
                  tabIndex={-1}
                  onChange={() => handleCheckboxToggle(subDept)}
                />
                <ListItemText primary={subDept} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </div>
    );
  };

  return (
    <List>
      {departmentData.map((dept) => renderDepartment(dept))}
    </List>
  );
}

export default DepartmentList;
