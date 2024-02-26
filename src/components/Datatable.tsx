// DataTable.tsx
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import 'datatables.net'; // Import DataTable
import $ from 'jquery';
import './Datatable.css'
import { Paper } from '@mui/material';

interface User {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  idType: string;
  govtId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  // Add other fields as needed
}

interface DataTableProps {
  submittedUsers: User[];
}

const DataTable: React.FC<DataTableProps> = ({ submittedUsers }) => {
  useEffect(() => {
    // Initialize DataTable when the component mounts
    $('#example').DataTable();
  }, [submittedUsers]);

  return (
    <Paper>
          <div className="shadow-lg rounded-md p-4" style={{border:'1px solid #00FFFF	', marginTop:'30px'}}>
    <h2 className="text-2xl font-bold mb-4" style={{textDecoration:'underline'}}>Users Registered</h2>
    <div className="table-responsive">
      <table id="example" className="display">
        <thead className="bg-gray-200">
          <tr style={{backgroundColor:'#00FFFF	'}}>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Mobile</th>
            <th>ID Type</th>
            <th>Govt Issued ID</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Pincode</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody>
          {submittedUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.sex}</td>
              <td>{user.mobile}</td>
              <td>{user.idType}</td>
              <td>{user.govtId}</td>
              <td>{user.address}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.country}</td>
              <td>{user.pincode}</td>
              {/* Add other columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

    </Paper>

  );
};

const mapStateToProps = (state: { form: { submittedUsers: User[] } }) => ({
  submittedUsers: state.form.submittedUsers,
});

export default connect(mapStateToProps)(DataTable);
