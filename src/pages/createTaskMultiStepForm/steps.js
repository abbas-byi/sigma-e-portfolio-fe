import React from 'react';

const  Step1 = ({ formData, setFormData }) => {
  return (
    <div>
      <h2>Step 1: First Name & Last Name</h2>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
      </div>
    </div>
  );
}

const Step2 = ({ formData, setFormData }) => {
  return (
    <div>
      <h2>Step 2: Date of Birth & Gender</h2>
      <div className="mb-3">
        <label htmlFor="dob" className="form-label">
          Date of Birth
        </label>
        <input
          type="date"
          className="form-control"
          id="dob"
          value={formData.dob}
          onChange={(e) =>
            setFormData({ ...formData, dob: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          className="form-select"
          id="gender"
          value={formData.gender}
          onChange={(e) =>
            setFormData({ ...formData, gender: e.target.value })
          }
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}

const Step3 = ({ formData, setFormData }) => {
  return (
    <div>
      <h2>Step 3: Email & Password</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
      </div>
    </div>
  );
}

const Step4 = ({ formData, setFormData }) => {
  return (
    <div>
      <h2>Step 3: Email & Password</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
      </div>
    </div>
  );
}

export default [
  Step1,
  Step2,
  Step3,
  Step4
]