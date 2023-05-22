import React, { useState } from 'react'
import "./contact.css"
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase.config';

const Contact = () => {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [lname, setLname] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");



    const submit = async () => {
        console.log(message, name, company, state, city, area, phone, email);
        if (name !== "" && message !== "" && lname !== "" && state !== "" && area !== "" && city !== "" && phone !== "" && email !== "") {
            const docRef = await addDoc(collection(db, "contact"), {
                name: name,
                lastName : lname,
                message: message,
                state: state,
                city: city,
                area: area,
                phone: phone,
                email: email
            });
            alert("Submited")
        } else {
            alert("Fill full form")
        }
    }

    return (<>
        <div className="row">
            <div className="col">
                <h2>Navnath Trader's</h2>
                <p>N-43-C/A-1/15-4, Navnath Trader's,<br />
                    trimurti chowk, cidco, Nashik <br />
                    Phone: +91 91587 44445 / 22-42644344 <br />
                    Timings: 9.00 am to 9.00 pm (Mon-Sat) <br />
                    Email : navnathhardware@gmail.com</p>
            </div>
            <div className="col">
                <h3 class="uppercase">Get in Touch</h3>
                <div className="contact-form">
                    <p class="form-field">Message*<br />
                        <textarea name="your-message" cols="40" rows="10" className='textarea' aria-required="true" aria-invalid="false" onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
                    </p>
                    <table>
                        <tbody><tr>
                            <td>
                                <p class="form-field">First Name*<br />
                                    <span class="fullName"><input type="text" name="fullName" aria-required="true" aria-invalid="false" onChange={(e) => setName(e.target.value)} /></span></p>
                            </td>
                            <td>
                                <p class="form-field">Last Name*<br />
                                    <span class="company"><input type="text" name="name" class="" aria-invalid="false" onChange={(e) => setLname(e.target.value)} /></span> </p>
                            </td>
                        </tr>
                            <tr>
                                <td colspan="2">
                                    <span><select name="state" class=" wpcf7-select" aria-invalid="false" onChange={(e) => setState(e.target.value)}><option value="Select State">Select State</option><option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option><option value="Andhra Pradesh">Andhra Pradesh</option><option value="Arunachal Pradesh">Arunachal Pradesh</option><option value="Assam">Assam</option><option value="Bihar">Bihar</option><option value="Chandigarh">Chandigarh</option><option value="Chhattisgarh">Chhattisgarh</option><option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option><option value="Daman and Diu">Daman and Diu</option><option value="Delhi">Delhi</option><option value="Goa">Goa</option><option value="Gujarat">Gujarat</option><option value="Haryana">Haryana</option><option value="Himachal Pradesh">Himachal Pradesh</option><option value="Jammu and Kashmir">Jammu and Kashmir</option><option value="Jharkhand">Jharkhand</option><option value="Karnataka">Karnataka</option><option value="Kerala">Kerala</option><option value="Ladakh">Ladakh</option><option value="Lakshadweep">Lakshadweep</option><option value="Madhya Pradesh">Madhya Pradesh</option><option value="Maharashtra">Maharashtra</option><option value="Manipur">Manipur</option><option value="Meghalaya">Meghalaya</option><option value="Mizoram">Mizoram</option><option value="Nagaland">Nagaland</option><option value="Odisha">Odisha</option><option value="Puducherry">Puducherry</option><option value="Punjab">Punjab</option><option value="Rajasthan">Rajasthan</option><option value="Sikkim">Sikkim</option><option value="Tamil Nadu">Tamil Nadu</option><option value="Telangana">Telangana</option><option value="Tripura">Tripura</option><option value="Uttar Pradesh">Uttar Pradesh</option><option value="Uttarakhand">Uttarakhand</option><option value="West Bengal">West Bengal</option></select></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="form-field">City*<br />
                                        <span class="city"><input type="text" name="city" class=" wpcf7-validates-as-required" aria-required="true" aria-invalid="false" onChange={(e) => setCity(e.target.value)} /></span> </p>
                                </td>
                                <td>
                                    <p class="form-field">Area/Locality<br />
                                        <span class="area"><input type="text" name="area" class="" aria-invalid="false" onChange={(e) => setArea(e.target.value)} /></span> </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="form-field">Phone*<br />
                                        <span class=" phone"><input type="text" name="phone" class=" wpcf7-validates-as-required" aria-required="true" aria-invalid="false" onChange={(e) => setPhone(e.target.value)} /></span> </p>
                                </td>
                                <td>
                                    <p class="form-field">Email*<br />
                                        <span class=" email"><input type="email" name="email" class=" wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email" aria-required="true" aria-invalid="false" onChange={(e) => setEmail(e.target.value)} /></span> </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={submit}>Submit</button>

                </div>

            </div>
        </div>
    </>
    )
}

export default Contact