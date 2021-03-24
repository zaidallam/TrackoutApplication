import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { NewTemplateWindow, Template } from './helper_components/templates'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../css/post_auth/Templates.css'
import '../../css/post_auth/FormPages.css'
import '../../css/post_auth/General.css'

export const Templates = () => {

    const { isAuth, logout, authUser, setIsLoading } = useContext(Context);

    const [ isNewTemplateActive, setIsNewTemplateActive ] = useState(false);

    const [sourceTemplates, setSourceTemplates] = useState([]);
    const [templatesPool, setTemplatesPool] = useState([])
    const [activeTemplates, setActiveTemplates] = useState([]);

    const [totalPages, setTotalPages] = useState(1);
    const [selectedPage, setSelectedPage] = useState(1);

    const [selectedTemplateType, setSelectedTemplateType] = useState('all')

    const [deleteConfirmStyle, setDeleteConfirmStyle] = useState('hide');
    const [deleteFailStyle, setDeleteFailStyle] = useState('hide');

    const fetchTemplates = () => {
        setIsLoading(true);
        axios({
            method: 'GET',
            withCredentials: true,
            url: `localhost:5000/users/${authUser}?resource=templates`
        })
        .then((res) => {
            setSourceTemplates(res.data.reverse());
            setIsLoading(false);
        })
        .catch(() => {
            console.log('fetching failed');
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchTemplates()
    }, []);

    useEffect( () => {
        setTemplatesPool(sourceTemplates)
        setActiveTemplates(sourceTemplates.slice(0, 9));
        setTotalPages(Math.ceil(sourceTemplates.length / 9));
    }, [sourceTemplates] );

    const switchPage = (page) => {
        setActiveTemplates(templatesPool.slice((page - 1)*9, (page - 1)*9+9));
    }

    useEffect(() => {

        if (selectedTemplateType === 'all') {
            setTemplatesPool(sourceTemplates)
            setActiveTemplates(sourceTemplates.slice(0, 9));
            setTotalPages(Math.ceil(sourceTemplates.length / 9));
            setSelectedPage(1);
            Array.from(document.querySelectorAll("#page-select")).forEach(
                input => (input.value = 1)
            );
        } else {
            setTemplatesPool(sourceTemplates.filter( template => template.type === selectedTemplateType ));
            setActiveTemplates(sourceTemplates.filter( template => template.type === selectedTemplateType ).slice(0, 9));
            setTotalPages(Math.ceil( sourceTemplates.filter( template => template.type === selectedTemplateType ).length / 9 ) )
            setSelectedPage(1);
            Array.from(document.querySelectorAll("#page-select")).forEach(
                input => (input.value = 1)
            );
    
        }
      
    }, [selectedTemplateType]);

    const resetList = () => {
        setSelectedTemplateType('all');
        Array.from(document.querySelectorAll("#template-type")).forEach(
            input => (input.value = 'all')
        );
        Array.from(document.querySelectorAll("#page-select")).forEach(
            input => (input.value = 1)
        );
    } 
    
    if (isAuth) {
        return (
            <>
            <div className="grid-2 page-container" id="templates">
                <NavBar selected="templates"/>
                <RenderNewTemplateWindow isActive={isNewTemplateActive} setActive={setIsNewTemplateActive} fetchTemplates={fetchTemplates} resetList={resetList} />
                <section className="content-section grid-1 fade-in">
                    <div>
                        <h2>TEMPLATES</h2><button className="new-template" onClick={() => setIsNewTemplateActive(true)}>NEW TEMPLATE</button>
                    </div>
                    <div className="filters flex-row">
                        <label htmlFor="type">TYPE:</label>
                        <select name="template-type" id="template-type" onChange={ e => setSelectedTemplateType(e.target.value) }>
                            <option value="all">All</option>
                            <option value="warmup-cooldown">Warmup/Cooldown</option>
                            <option value="strength">Strength</option>
                            <option value="cardio">Cardio</option>
                            <option value="mobility">Mobility</option>
                        </select><br className="mobile-only" />
                        <label htmlFor="page-select">PAGE</label>
                        <input type="number" id="page-select" name="page-select" defaultValue='1' onChange={ e => setSelectedPage(e.target.value) }/>
                        <label htmlFor="page-select">OF {totalPages}</label>
                        <button onClick={ e => { e.preventDefault(); switchPage(selectedPage) } }>GO</button><br />
                        <div className={deleteConfirmStyle}>TEMPLATE DELETED</div>
                        <div className={deleteFailStyle}>ERROR: TEMPLATE NOT DELETED</div>
                    </div>
                    <div className="templates-list grid-3">
                    
                        {activeTemplates.map(template => <Template template={template} key={template._id} deleteConfirmStyle={deleteConfirmStyle} setDeleteConfirmStyle={setDeleteConfirmStyle} setDeleteFailStyle={setDeleteFailStyle} setSourceTemplates={setSourceTemplates} sourceTemplates={sourceTemplates} resetList={resetList} />)}

                    </div>
                    <nav className="mobile-hide">
                        <ul>
                            <li className="red-text log-out"><Link onClick={(e) => {e.preventDefault(); logout()}} to="/">Log Out</Link></li>
                        </ul>
                    </nav>
                </section>
                <NavBarMobile />
            </div>
            </>
        )
    } else {
        return <Redirect to="/" />
    }
}

const RenderNewTemplateWindow = ( { isActive, setActive, fetchTemplates, resetList } ) => {
    if (isActive) {
        return <NewTemplateWindow setActive={setActive} fetchTemplates={fetchTemplates} resetList={resetList} />
    } else {
        return <></>
    }
}