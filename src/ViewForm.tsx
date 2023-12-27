import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from './Navbar';

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

const cards = [
  "Visa",
  "MasterCard",
  "American Express",
  "Discover",
]

interface FormData {
  firstname: string;
  midname: string;
  lastname: string;


  card_firstname: string;
  card_midname: string;
  card_lastname: string;

  card_num: string;
  card_type: string;

  /** Exp in the format yyyy-mm */
  exp: string;

  authorized_payment: string;

  phone: string;
  email: string;

  addr: string;
  addr_type: string;
  addr_num: string;
  city: string;
  zip: string;
  state: string;
}

const ViewForm: React.FC = () => {
  const navigate = useNavigate();

  const { uid } = useParams();

  // Allow users to input same card name as user name
  const [cardNameSame, setCardNameSame] = useState<boolean>(false)
  
  // State to store form data
  const [formData, setFormData] = useState<FormData>({
    firstname : '',
    midname : '',
    lastname : '',
  
    card_firstname : '',
    card_midname : '',
    card_lastname : '',
    exp: '',

    card_num: '',
    card_type: '',

    authorized_payment: '',

    phone: '',
    email: '',
  
    addr : '',
    addr_type : '',
    addr_num: '',
    city : '',
    zip: '',
    state: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/user', {
        method: 'POST',
        body: uid,
      }).then((response) => response.json())
      .then(res => {
        console.log("Success! Got user! : ", res)
        if(res.error) {
          alert("Your phone number has not been registered")
          navigate(`/creditcardform`)
        }

        setFormData(res)
      }).catch(error => {
        console.log("Error: ", error)
        // alert("Your phone number has not been registered")
        // navigate(`/creditcardform`)
      })
  }, [])

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if(cardNameSame) {
      setFormData((prevData) => ({
        ...prevData,
        ["card_firstname"]: formData.firstname,
        ["card_midname"]: formData.midname,
        ["card_lastname"]: formData.lastname
      }));
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  
  // Handle form submission
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can perform further actions here, such as sending the form data to a server

    // For now, let's log the form data to the console
    console.log('Form submitted:', formData);

    fetch('http://localhost:8080/api/updateInput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json())
    .then(res => {
      console.log("Success: ", res)
    }).catch(error => {
      console.log("Error: ", error)
      // alert("Your phone number has not been registered")
      // navigate(`/creditcardform`)
    })
  };


  const downloadFile = async (e: any) => {
    try {
      const response = await fetch('http://localhost:8080/api/download', {
          method: 'POST',
          body: uid,
        });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch the file (status ${response.status}).`);
      }
  
      console.log("Success! Got user! : ", response)
  
  
      const readableStream = response.body;
  
      // Accumulate chunks in an array
      const chunks = [];
      const reader = readableStream?.getReader();
      
      if(!reader) {return;}

      while (true) {
        const { done, value } = await reader.read();
  
        if (done) {
          break;
        }
  
        chunks.push(value);
      }
  
      // Combine chunks into a single Uint8Array
      // const combinedUint8Array = Uint8Array.from(chunks.reduce((acc, chunk) => [...acc, ...chunk], []));
      const combinedUint8Array = chunks.reduce((acc, chunk) => new Uint8Array([...acc, ...chunk]), new Uint8Array());

      // Convert Uint8Array to Blob
      const blob = new Blob([combinedUint8Array], { type: 'application/pdf' });
  
      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'g-1450.pdf';
  
      // Append the link to the body and trigger a click to start the download
      document.body.appendChild(link);
      link.click();
  
      // Remove the link from the body
      document.body.removeChild(link);
  
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }

  const card_name =
    <tr>
      <td>
        <label>
          Given Name (First Name):
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
        </label>
      </td>
      <td>
        <label>
          Middle Name (if any):
          <input
            type="text"
            name="midname"
            value={formData.midname}
            onChange={handleInputChange}
          />
        </label>
      </td>
      <td>
        <label>
          Family Name (Last Name):
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            />
        </label>
      </td>
    </tr>

  const card_name2 = 
    <tr>
      <td>
        <label>
          Given Name (First Name):
          <input
            type="text"
            name="card_firstname"
            disabled={cardNameSame}
            value={cardNameSame ? formData.firstname : formData.card_firstname}
            onChange={handleInputChange}
          />
        </label>
      </td>
      <td>
        <label>
          Middle Name (if any):
          <input
            type="text"
            name="card_midname"
            disabled={cardNameSame}
            value={cardNameSame ? formData.midname : formData.card_midname}
            onChange={handleInputChange}
          />
        </label>
      </td>
      <td>
        <label>
          Family Name (Last Name):
          <input
            type="text"
            name="card_lastname"
            disabled={cardNameSame}
            value={cardNameSame ? formData.lastname : formData.card_lastname}
            onChange={handleInputChange}
            />
        </label>
      </td>
      <td>
        <div className="row">
          <label>
            Same As Above
            <input
              type="checkbox"
              name="card_nameSame"
              checked={cardNameSame}
              onChange={(event) => {
                setCardNameSame(event.target.checked)
              }}
            />
          </label>
        </div>
      </td>
    </tr>

  const card_contact = 
    <tr>
      <td colSpan={2}>
        <label>
          Card Holder Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
      </td>
      <td colSpan={2}>
        <label>
          Card Holder Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
      </td>
    </tr>

  const card_address =
    <tr>
      <td colSpan={2}>
        <label>
          Street Number and Name
          <input
            type="text"
            name="addr"
            value={formData.addr}
            onChange={handleInputChange}
          />
        </label>
      </td>
      <td>
        <div className="row">
          <label>
            Apt.
            <input
              type="checkBox"
              name="apt"
              checked={formData.addr_type === "apt"}
              onChange={(event) => {
                setFormData({...formData, addr_type: event.target.checked ? "apt" : ""})
              }}
            />
          </label>
          <label>
            Ste.
            <input
              type="checkBox"
              name="apt"
              checked={formData.addr_type === "ste"}
              onChange={(event) => {
                setFormData({...formData, addr_type: event.target.checked ? "ste" : ""})
              }}
            />
          </label>
          <label>
            Flr.
            <input
              type="checkBox"
              name="apt"
              checked={formData.addr_type === "flr"}
              onChange={(event) => {
                setFormData({...formData, addr_type: event.target.checked ? "flr" : ""})
              }}
            />
          </label>
        </div>
      </td>
      <td>
        <label>
          Number
          <input
            type="number"
            name="addr_num"
            value={formData.addr_num}
            onChange={handleInputChange}
          />
        </label>
      </td>
    </tr>
    
    const card_address2 =
      <tr>
        <td colSpan={2}>
          <label>
            City or Town
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </label>
        </td>
        <td>
          <label>
            State
            <select name="state" value={formData.state} onChange={(event) => {
              setFormData({
                ...formData,
                state: event.target.value,
              })
            }}>
              <option disabled selected> -- select an option -- </option>
              {states.map((state) => <option value={state} key={state}>{state}</option>)}
            </select>
          </label>
        </td>
        <td>
          <label>
            ZIP code
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
            />
          </label>
        </td>
      </tr>

  const card_info =
    <tr>
      <td>
        <label>
          Card Number
          <input
            type="tel"
            name="card_num"
            placeholder="xxxx xxxx xxxx xxxx"
            value={formData.card_num}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Expiration Date
          <input
            type="month"
            name="exp"
            value={formData.exp}
            onChange={handleInputChange}
          />
        </label>
      </td>
      <td>
        <div className="col">
          Card Type
          {cards.map((card) => <label key={card}>
            <input
              type="checkbox"
              name="card_type"
              checked={formData.card_type === card}
              onChange={(event) => {
                setFormData({...formData, card_type: event.target.checked ? card : ""})
              }}
            />
            {card}
          </label>)}
        </div>
      </td>
      <td>
        <label>
          Authorized Payment Amount
          <input
            type="number"
            name="authorized_payment"
            value={formData.authorized_payment}
            onChange={handleInputChange}
          />
        </label>
      </td>
    </tr>

  let body = (
    <div className="form-container">
      {NavigationBar}
      <form className="submission-form" onSubmit={handleSubmit}>
        <div className="form-row-name">
          <table>
            <tbody>
              <h3>Applicant's/Petitioner's/Requester's Information (Full Legal Name)</h3>
              {card_name}
              <h3>Credit Card Billing Information (Credit Card Holder's Name as it Appears on the Card)</h3>
              {card_name2}
              {card_contact}
              {card_address}
              {card_address2}
              <tr>
                <td colSpan={10}><hr/></td>
              </tr>
              {card_info}
            </tbody>
          </table>
        </div>

      <div className="button-container"><button type="submit">Save Changes</button></div> 
      </form>
      <button onClick={downloadFile}>Download File</button>
    </div>
  )

  return body

};

export default ViewForm;