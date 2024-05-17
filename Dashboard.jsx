import React, { useState, useEffect } from 'react'
import './css/Dashboard.css';
import { FaUsers, FaStore } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { MdContactPhone } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";

import PieChart from './PieChart';
import MyBarChart from './BarChrt';

function Dashboard() {

    const [user, setuser] = useState([]);
    const [total_user, setTotaluser] = useState(0);
    const [store, setstore] = useState([]);
    const [total_store, setTotalStore] = useState(0);
    const [contact, setcontact] = useState([]);
    const [total_contact, setTotalcontact] = useState(0);
    const [feedback, setfeedback] = useState([]);
    const [total_feedback, setTotalfeedback] = useState(0);
    const [newsletter, setNewsLetter] = useState([]);
    const [total_newsletter, setTotalNewsLetter] = useState(0);
    useEffect(() => {
        Promise.all([Fetchusers(), Fetchstore(), Fetchcontact(), Fetchfeedback(), FetchNewsLetter()])
            .then(() => {
                count();
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [user, store, contact, feedback]);
    function count() {
        var total = user ? user.length : 0;
        setTotaluser(total);

        var total1 = store ? store.length : 0;
        setTotalStore(total1);

        var total2 = contact ? contact.length : 0;
        setTotalcontact(total2);

        var total3 = feedback ? feedback.length : 0;
        setTotalfeedback(total3);

        var total4 = newsletter ? newsletter.length : 0;
        setTotalNewsLetter(total4);

    }
    async function Fetchusers() {
        let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=allfetchuser")
        result = await result.json();
        // console.log("message", result);
        if (result.message === "Data Fetch successful") {
            // console.log(result.details);
            setuser(result.details);
        }
    }
    async function Fetchstore() {
        let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=allfetchstore")

        result = await result.json();
        // console.log("message", result);
        if (result.message === "Data Fetch successful") {
            // console.log(result.details);
            setstore(result.details);
        }
    }
    async function Fetchcontact() {
        let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchcontact")
        result = await result.json();
        // console.log("message", result);
        if (result.message === "Data Fetch successful") {
            // console.log(result.details);
            setcontact(result.details);
        }
    }
    async function Fetchfeedback() {
        let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchfeedback")
        result = await result.json();
        // console.log("message", result);
        if (result.message === "Data Fetch successful") {
            // console.log(result.details);
            setfeedback(result.details);
        }
    }

    async function FetchNewsLetter() {
        let result = await fetch("http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchnewletter")
        result = await result.json();
        // console.log("message", result);
        if (result.message === "Data Fetch successful") {
            // console.log(result.details);
            setNewsLetter(result.details);
        }
    }
    return (
        <div>
            <div className="dashboard-data">
                <div className="row">
                    <div className='col-2 users mx-2 rounded my-3'>
                        <div className="row ">
                            <div className="col-8 my-3">
                                <h2 className='m-0'>{total_user}</h2>
                                <strong className='fs-5'>Users</strong>
                            </div>
                            <div className="col-4 my-4">
                                <FaUsers className='icn'></FaUsers>
                            </div>
                        </div>
                    </div>

                    <div className='col-2 stores mx-2 rounded  my-3'>
                        <div className="row">
                            <div className="col-8 my-3">
                                <h2 className='m-0'>{total_store}</h2>
                                <strong className='fs-5'>Stores</strong>
                            </div>
                            <div className="col-4 my-4">
                                <FaStore className='icn'></FaStore>
                            </div>
                        </div>
                    </div>

                    <div className='col-2 contact-dash mx-2 rounded  my-3'>
                        <div className="row">
                            <div className="col-8 my-3">
                                <h2 className='m-0'>{total_contact}</h2>
                                <strong className='fs-5'>Contact</strong>
                            </div>
                            <div className="col-4 my-4">
                                <MdContactPhone className='icn'></MdContactPhone>
                            </div>
                        </div>
                    </div>

                    <div className='col-2 feedback-dash mx-2 rounded  my-3'>
                        <div className="row">
                            <div className="col-8 my-3">
                                <h2 className='m-0'>{total_feedback}</h2>
                                <strong className='fs-5'>Feedback</strong>
                            </div>
                            <div className="col-4 my-4">
                                <VscFeedback className='icn'></VscFeedback>
                            </div>
                        </div>
                    </div>

                    <div className='col-2 newsletter-dash mx-2 rounded  my-3'>
                        <div className="row">
                            <div className="col-8 my-3">
                                <h2 className='m-0'>{total_newsletter}</h2>
                                <strong className='fs-5'>Add Store</strong>
                            </div>
                            <div className="col-4 my-4">
                                <GiNewspaper className='icn'></GiNewspaper>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                       
                        <div className="col-6 px-5" style={{width:"40vw",height:"40vh"}}>
                            <MyBarChart ></MyBarChart>
                        </div>
                        <div className="col-6 px-5">
                            <PieChart></PieChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard